<template>
  <div class="l-date-picker" @click="showPicker">
    <el-date-picker
      ref="datePicker"
      v-model="dateRange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      size="small"
      :picker-options="options"
      :clearable="false"
      :editable="false"
      @change="changeDate">
    </el-date-picker>
  </div>
</template>

<script>
/**
 * 日历控件封装
 * @param value [日期范围] 通过 v-model 绑定
 * @param showFastAll [是否展示全部快捷按钮]
 * @param picker-options [当前时间日期选择器特有的选项]
 * @event change [事件]
 */

import moment from 'moment'

const DEFAULTSHORTCUTS = [{
  text: '最近一周',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近三个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近六个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一年',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 360)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '全部',
  onClick(picker) {
    picker.$emit('pick', [])
  }
}]
export default {
  name: 'LDatePicker',
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    showFastAll: {
      type: Boolean,
      default: false
    },
    pickerOptions: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      dateRange: this.value || [moment().subtract(1, 'months'), moment()]
    }
  },
  computed: {
    dateText() {
      if (this.dateRange.length) {
        return `${moment(this.dateRange[0]).format('YYYY-M-D')} 至 ${moment(this.dateRange[1]).format('YYYY-M-D')}`
      } else {
        return '全部时间'
      }
    },
    options() {
      const shortcuts = this.showFastAll ? DEFAULTSHORTCUTS : DEFAULTSHORTCUTS.filter(item => item.text !== '全部')
      return {
        shortcuts,
        ...this.pickerOptions
      }
    }
  },
  watch: {
    value(val) {
      this.dateRange = val
    }
  },
  created() {
  },
  methods: {
    showPicker() {
      this.$refs.datePicker.handleRangeClick()
    },
    changeDate() {
      this.$emit('input', this.dateRange)
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss">
  .l-date-picker {
    display: inline-block;
  }
</style>
