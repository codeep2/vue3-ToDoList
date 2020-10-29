/* eslint-disable @typescript-eslint/no-explicit-any */
<template lang="pug">
div.schedule
  div.schedule__date
    div.pre(@click="switchMonth('back')") &lt
    span.date {{ `${date.year}.${date.month + 1}` }}
    div.next(@click="switchMonth('forward')") &gt
  table.schedule__calendar
    thead
      th(v-for="week in weeks")
        div.week_wrap
          div {{ week }}
    tbody
      tr(v-for="i in 6" :key="i")
        template(v-for="j in 7" :key="j")
          td(:class="tdStyle(i, j)")
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
  day: number;
  iscurrent: boolean;
  istoday: boolean;
  lunar: unknown [];
}

export default defineComponent({
  setup () {
    const date = reactive({
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate()
    }) as Date

    const getCalendarDay = computed(() => {
      // 先得出这个月1号是周几（firstDaysWeek）
      // 目的是为了算出日历开始日期
      const { year, month } = date
      const firstDaysWeek = new Date(year, month, 1).getDay()
      const now = new Date()
      const days: DayItem[] = []

      for (let i = 0; i < 42; i++) {
        const maxDay = new Date(year, month + 1, 0).getDate()

        const day = new Date(year, month, -firstDaysWeek + i + 2).getDate()
        const iscurrent = !((i < firstDaysWeek - 1) || (i - firstDaysWeek + 2 > maxDay))
        const istoday = day === now.getDate() &&
          month === now.getMonth() &&
          year === now.getFullYear()
        const lunar = i < firstDaysWeek - 1
          ? Lunar.toLunar(year, month, day)
          : (i - firstDaysWeek + 2) > maxDay
            ? Lunar.toLunar(year, month + 2, day)
            : Lunar.toLunar(year, month + 1, day)
        days.push({ day, iscurrent, istoday, lunar })
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
        date.month -= 1
      }
      if (type === 'forward') {
        date.month += 1
      }
    }

    return {
      date,
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
