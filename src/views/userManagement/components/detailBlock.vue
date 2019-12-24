<template>
	<div class="detail-block">
    <div class="block-title">
      <div class="block-title-box">
        <span class="block-title-span">{{ title }}</span>
        <slot name="pullLeft"></slot>
      </div>
      <slot name="pullRight"></slot>
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
    justify-content: space-between;
    border-bottom: 1px solid #E4E7ED;
    margin-bottom: 16px;
  }
  .block-title-span {
    position: relative;
    padding-left: 10px;
  }
  .block-title-span::before {
    content: '';
    display: block;
    position: absolute;
    top: 1px;
    left: 0;
    height: 20px;
    width: 6px;
    background: #409EFF;
  }
}
</style>
