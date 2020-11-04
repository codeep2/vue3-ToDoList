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
            @click="conso(i, j)"
          )
            div.calendar_day
              div.day
                span.gregorian {{ getCalendarDay[(i - 1) * 7 + (j - 1)].day }}
                span.lunar {{ getLunar(i, j) }}
              div.todo_item
                template(v-for="(todo, index) in getToDoItem(i, j)")
                  div.do_item(v-if="index === 0 && todo.content") {{ todo.content }}
                  div.done_item(v-if="index === 1") {{ todo.content }}
</template>

<script lang="ts">
import Lunar from '@/utils/lunar'
import { defineComponent, reactive, computed } from 'vue'
import { useStore } from 'vuex'

interface Date {
  year: number;
  month: number;
  day: number;
}

interface DayItem {
  year: number;
  month: number;
  day: number;
  week: number;
  iscurrent: boolean;
  istoday: boolean;
  lunar: unknown [];
  todo: {
    DO: string;
    DONE: string;
    STORAGE_KEY: string;
  };
}

export default defineComponent({
  setup () {
    const store = useStore()
    const date = new Date()
    const todos = computed(() => store.state.todos)
    const currentDay = reactive({
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate()
    }) as Date

    const setToDo = (year: number, month: number | string, day: number | string) => {
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      const dayItem: string = (year.toString()).concat(month.toString(), day.toString())
      store.commit('fetch', { STORAGE_KEY: dayItem })

      return todos?.value || {}
    }

    const getCalendarDay = computed(() => {
      // 先得出这个月1号是周几（firstDaysWeek）
      // 目的是为了算出日历开始日期
      const { year, month } = currentDay
      const firstDaysWeek = new Date(year, month, 1).getDay() || 7
      const now = new Date()
      const days: DayItem[] = []
      const maxDay = new Date(year, month + 1, 0).getDate()

      for (let i = 0; i < 42; i++) {
        // 当月天数
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
        const week = i % 7
        const todo = setToDo(year, dayItem.month, day)

        days.push(Object.assign(dayItem, { year, day, week, istoday, todo }))
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

    const getToDoItem = (i: number, j: number) => {
      const dayItem = getCalendarDay.value[(i - 1) * 7 + (j - 1)]
      const todos = []
      const doContent = dayItem?.todo?.DO?.[0]
      const doneContent = dayItem?.todo?.DONE?.[0]

      if (doContent) {
        todos.push(doContent)
      }
      if (doneContent) {
        if (!doContent) {
          todos.push({})
        }
        todos.push(doneContent)
      }
      return todos
    }

    return {
      currentDay,
      tdStyle,
      setToDo,
      getLunar,
      switchMonth,
      getToDoItem,
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
      let strMonth = dayItem.month.toString()
      let strDay = dayItem.day.toString()
      if (strDay.length === 1) { strDay = '0' + strDay }
      if (strMonth.length === 1) { strMonth = '0' + strMonth }
      const strDate = dayItem.year.toString() + strMonth + strDay
      this.$router.push({ name: 'todolist', params: { date: strDate } })
    },
    isHaveToDo (i: number, j: number) {
      const dayItem = this.getCalendarDay[(i - 1) * 7 + (j - 1)]
      if (dayItem.todo) {
        return true
      }
      return false
    },
    conso (i: number, j: number) {
      const dayItem = this.getCalendarDay[(i - 1) * 7 + (j - 1)]
      console.log(dayItem.todo)
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
          width: 160px;
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
                margin-top: -2px;
                white-space: nowrap;
                color: #6d4f44;
              }
            }
            .todo_item {
              font-size: 15px;
              .do_item, .done_item {
                height: 21px;
                color: #fbf7f5;
                overflow: hidden;
                cursor: pointer;
                border-radius: 4px;
              }
              .do_item {
                margin: 5px 0;
                background-color: #ce483ebd;
              }
              .done_item {
                background-color: #2f9a7a9e;
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
          background: #5f907f6b;
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
