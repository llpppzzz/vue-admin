<template>
  <div class="l-input-search" @keyup.enter="handleClick">
    <el-input class="input-search" :placeholder="placeholder" :value="value" size="small" v-on="inputListeners">
      <i class="el-icon-search" slot="suffix" @click="handleClick"></i>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'InputSearch',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入搜索内容'
    }
  },
  computed: {
    inputListeners: function() {
      const vm = this
      return Object.assign({},
        this.$listeners, {
          input(val) {
            vm.$emit('input', val)
          }
        }
      )
    }
  },
  watch: {
  },
  methods: {
    handleClick(e) {
      this.$emit('confirm', e)
    }
  }
}
</script>

<style lang="scss">
  .l-input-search {
    display: inline-block;
    .el-icon-search {
      cursor: pointer;
      margin-right: -5px;
      line-height: 32px;
      width: 34px;
      color: #fff;
      font-weight: 600;
      font-size: 16px;
      border-radius: 0 4px 4px 0;
      background: #4095FF;
      &:hover {
        background: #6af;
      }
    }
  }
</style>
