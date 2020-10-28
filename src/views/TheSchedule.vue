/* eslint-disable @typescript-eslint/no-explicit-any */
<template lang="pug">
div.schedule
  div.schedule__date
    div.pre(@click="backmonth") &lt
    span.date {{ `${today.year}年${today.month + 1}月` }}
    div.next(@click="addmonth") &gt
  table.schedule__calendar
    thead
      th(v-for="week in weeks")
        div.week_wrap
          div {{ week }}
    tbody
      tr(v-for="i in 6" :key="i")
        template(v-for="j in 7" :key="j")
          td
            div.calendar_day
              span {{ getCalendarDay[(i - 1) * 7 + (j - 1)] }}
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

interface Date {
  year: number;
  month: number;
  day: number;
}

export default defineComponent({
  setup () {
    const today: Date = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate()
    }

    const getCalendarDay = computed(() => {
      // 先得出这个月1号是周几（firstDaysWeek）
      // 得出是周几的目的是为了得出距离42天中的第一天是哪天
      const { year, month, day } = today
      const firstDaysWeek = new Date(year, month, day).getDay()
      const days: number[] = []
      for (let i = 0; i < 42; i++) {
        days.push(new Date(year, month, -firstDaysWeek + i + 1).getDate())
      }
      return days
    })

    return {
      today,
      getCalendarDay
    }
  },

  data () {
    return {
      weeks: ['Mon', 'Tue', 'Wed', 'Thu', 'fri', 'Sat', 'Sun']
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
