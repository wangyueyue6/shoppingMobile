<template>
	<view class="pro-box">
		<view class="product-item" v-for="(product, index) in products" :key="index" @click="handleClick(product)">
		    <view class="img-box">
		        <image class="product-image" :src="product.image" mode="aspectFill"></image>
		    </view>
		    <text class="product-name">{{ product.name }}</text>
		    <!-- <view class="product-info">
		        <text class="product-price">¥{{ product.price }}</text>
		        <text class="product-sales">销量: {{ product.sales }}</text>
		    </view> -->
		</view>
	</view>
</template>

<script>
export default {
    props: {
        products: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleClick(item) {
            this.$emit('onClick', item)
        }
    }
}
</script>

<style lang="scss">
.pro-box {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 一行三列 */
    padding: 10rpx;
    gap: 20rpx; /* 商品间距 */
	box-sizing: border-box;

    .product-item {
        display: flex;
        flex-direction: column;
        overflow: hidden;
    
        .img-box {
            width: 100%;
			height: 0;
			padding-bottom: 100%; /* 保持正方形 */
			overflow: hidden;
			border-radius: 10rpx;
			position: relative;
    
            .product-image {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
				bottom: 0;
				right: 0;
				/* #ifdef MP */
				height: auto;
				min-height: 100%;
				/* #endif */
            }
        }
        
    
        .product-name {
			width: 100%;
			text-align: center;
            margin-top: 10rpx;
            font-size: 24rpx;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    
        .product-info {
            display: flex;
            justify-content: space-between;
            margin-top: 6rpx;
    
            .product-price {
                font-size: 24rpx;
                color: #ff6600;
                font-weight: bold;
            }
    
            .product-sales {
                font-size: 20rpx;
                color: #999;
            }
        }
    }
}
</style>