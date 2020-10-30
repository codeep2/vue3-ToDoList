<template lang="pug">
div.schedule
  div.schedule__date
    div.pre(@click="switchMonth('back')") &lt
    span.date {{ `${currentDay.year}.${currentDay.month + 1}` }}
    div.next(@click="switchMonth('forward')") &gt
  table.schedule__calendar
    thead
      th(v-for="week in weeks")
        div.week_wrap
          div {{ week }}
    tbody
      tr(v-for="i in 6" :key="i")
        template(v-for="j in 7" :key="j")
          td(
            :class="tdStyle(i, j)"
            @dblclick="jumpTodo(i, j)"
          )
            div.calendar_day
              div.day
                span.gregorian {{ getCalendarDay[(i - 1) * 7 + (j - 1)].day }}
                span.lunar {{ getLunar(i, j) }}
</template>

<script lang="ts">
import Lunar from '@/utils/lunar'
import { defineComponent, reactive, computed } from 'vue'

interface Date {
  year: number;
  month: number;
  day: number;
}

interface DayItem {
  year: number;
  month: number;
  day: number;
  iscurrent: boolean;
  istoday: boolean;
  lunar: unknown [];
}

export default defineComponent({
  setup () {
    const date = new Date()
    const currentDay = reactive({
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate()
    }) as Date

    const getCalendarDay = computed(() => {
      // 先得出这个月1号是周几（firstDaysWeek）
      // 目的是为了算出日历开始日期
      const { year, month } = currentDay
      const firstDaysWeek = new Date(year, month, 1).getDay() || 7
      const now = new Date()
      const days: DayItem[] = []
      for (let i = 0; i < 42; i++) {
        // 当月天数
        const maxDay = new Date(year, month + 1, 0).getDate()
        const dayItem = {} as DayItem

        const day = new Date(year, month, -firstDaysWeek + i + 2).getDate()
        if (i < firstDaysWeek - 1) {
          dayItem.month = month
          dayItem.lunar = Lunar.toLunar(year, month, day)
          dayItem.iscurrent = false
        } else if (i - firstDaysWeek + 2 > maxDay) {
          dayItem.month = month + 2
          dayItem.lunar = Lunar.toLunar(year, month + 2, day)
          dayItem.iscurrent = false
        } else {
          dayItem.month = month + 1
          dayItem.lunar = Lunar.toLunar(year, month + 1, day)
          dayItem.iscurrent = true
        }
        const istoday = dayItem.iscurrent &&
          day === now.getDate() &&
          month === now.getMonth() &&
          year === now.getFullYear()

        days.push(Object.assign(dayItem, { year, day, istoday }))
      }
      return days
    })

    const tdStyle = (i: number, j: number) => {
      const dayItem = getCalendarDay.value[(i - 1) * 7 + (j - 1)]
      return {
        notcurrent: !(dayItem.iscurrent),
        today: dayItem.istoday
      }
    }

    const getLunar = (i: number, j: number) => {
      const lunarObj = getCalendarDay.value[(i - 1) * 7 + (j - 1)].lunar
      if ((lunarObj[6] as string).indexOf('初一') !== -1) {
        return lunarObj[5]
      }
      return lunarObj[6]
    }

    const switchMonth = (type: string) => {
      if (type === 'back') {
        currentDay.month -= 1
      }
      if (type === 'forward') {
        currentDay.month += 1
      }
    }

    return {
      date,
      currentDay,
      tdStyle,
      getLunar,
      switchMonth,
      getCalendarDay
    }
  },

  data () {
    return {
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  },

  methods: {
    jumpTodo (i: number, j: number) {
      const dayItem = this.getCalendarDay[(i - 1) * 7 + (j - 1)]
      let strday = dayItem.day.toString()
      if (strday.length === 1) { strday = '0' + strday }
      const strDate = dayItem.year.toString() + dayItem.month + strday
      this.$router.push({ name: 'todolist', params: { date: strDate } })
    }
  }
})
</script>

<style lang="scss" scoped>
.schedule {
  &__date {
    font-size: 26px;
    text-align: center;
    margin-top: 20px;
    .date {
      padding: 6px;
      color: #fae9e4;
      border-radius: 4px;
      background-color: #d47e6a;
    }
    .pre, .next {
      margin: 0 4px;
      padding: 6px 10px;
      background-color: #e6d8c1;
      display: inline-block;
      cursor: pointer;
    }
  }
  &__calendar {
    width: 100%;
    border-spacing: 0px;
    thead {
      th {
        padding: 30px 0 15px;
        .week_wrap {
          display: flex;
          justify-content: center;
          > div {
            width: 53px;
            height: 53px;
            line-height: 53px;
            border-radius: 50%;
            background-color: #d47e6a;
            color: #fae9e4;
          }
        }
      }
    }
    tbody {
      > tr {
        &:first-child {
          td {
            border-top: 1px solid #878787;
          }
        }
        td {
          border-right: 1px solid #878787;
          border-bottom: 1px solid #878787;
          .calendar_day {
            padding: 8px;
            height: 95px;
            .day {
              display: flex;
              justify-content: space-between;
              .gregorian {
                font-size: 17px;
              }
              .lunar {
                width: fit-content;
                white-space: nowrap;
                color: #6d4f44;
              }
            }
          }
          &:first-child {
            border-left: 1px solid #878787;
          }
          &:hover {
            background-color: #0a44403b;
          }
        }
        td.today {
          color: #52b159;
        }
        td.notcurrent {
          color: #c0c4cc;
          &:hover {
            color: white;
          }
        }
      }
    }
  }
}
</style>
