<template>
	<view class="product-list">
		<view class="product-item" v-for="(item, index) in productList" :key="index">
		  <image class="product-img" :src="item.img" mode="aspectFill"></image>
		  <view class="product-title">{{ item.title }}</view>
		  <view class="product-price">
			<text class="current-price">
				<text style="font-size: 24rpx;font-weight: normal;margin-right: 4rpx;">¥</text>
				<text>{{ item.money }}</text>
			</text>
			<text class="old-price">¥{{ item.oldMoney }}</text>
		  </view>
		</view>
	</view>
</template>

<script>
export default {
    name: 'ActiveProduct',
    props: {
        productList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            
        }
    },
    computed: {

    },
    created() {

    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>

<style scoped lang="scss">
.product-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 一行三列 */
  padding: 20rpx;
  gap: 20rpx; /* 商品间距 */
}

.product-item {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: auto;
  aspect-ratio: 1; /* makes images square */
  object-fit: cover;
  border-radius: 16rpx;
}

.product-title {
	margin: 12rpx 0;
  font-size: 28rpx;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制两行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 36rpx;
  height: 72rpx;
}

.product-price {
  padding: 0 16rpx 16rpx;
  display: flex;
  align-items: baseline;
  gap: 12rpx;
}

.current-price {
  font-size: 38rpx;
  color: #E44E45;
  font-weight: bolder;
  display: flex;
  align-items: baseline;
}

.old-price {
  font-size: 24rpx;
  color: #999;
  text-decoration: line-through;
}
</style>