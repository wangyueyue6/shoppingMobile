<template>
    <view class="product-item" @click="handleClick">
        <view class="img-box">
            <image class="product-image" :src="product.image" mode="aspectFill"></image>
        </view>
        <text class="product-name">{{ product.name }}</text>
        <view class="product-info">
            <text class="product-price">¥{{ product.price }}</text>
            <text class="product-sales">销量: {{ product.sales }}</text>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        handleClick() {
            this.$emit('click', this.product)
        }
    }
}
</script>

<style lang="scss">
.product-item {
    width: 33.33%;
    display: flex;
    flex-direction: column;
    padding: 10rpx;
    box-sizing: border-box;

    .img-box {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        border-radius: 10rpx;
        background-color: #f5f5f5;
        position: relative;
        overflow: hidden;

        .product-image {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
    }
    

    .product-name {
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
</style>