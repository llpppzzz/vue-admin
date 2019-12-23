<template>
	<div class="detail-block">
    <div class="block-title">
      <span class="block-title-span">{{ title }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DetailBlock',
  props: {
    title: {
      default: 'title',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-block {
  margin-bottom: 24px;
  .block-title {
    font-size: 18px;
    font-weight: 500;
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #E4E7ED;
    margin-bottom: 16px;
  }
  .block-title-span {
    position: relative;
    text-indent: 10px;
  }
  .block-title-span::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 6px;
    background: #409EFF;
  }
}
</style>
