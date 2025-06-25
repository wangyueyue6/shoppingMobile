<template>
	<view class="cart-data">
		<u-popup :show="showPop" mode="bottom" closeable :round="10" @close="closePop">
			<view class="pop-box">
				<view class="flex flex-middle">
					<image class="goods-img" :src="goodsData.img" mode=""></image>
					<view class="">
						<view class="price">
							<text>¥</text>
							<text>{{ goodsData.price }}</text>
						</view>
						<view class="type">
							已选：{{ goodsData.arr[selectIndex] }}
						</view>
					</view>
				</view>
				<view class="guige">规格</view>
				<view class="type-box flex">
					<view class="type-item" :class="{selectType: index == selectIndex}" v-for="(item, index) in goodsData.arr" :key="index" @click="onSelect(index)">
						{{ item }}
					</view>
				</view>
				<view class="flex flex-between flex-middle">
					<view class="guige">数量</view>
					<u-number-box v-model="goodsData.num" inputWidth="28" bgColor="#fff" min="1" @change="changeNum">
						<view
							slot="minus"
							class="minus"
							:class="{bgInfo: goodsData.num == 1}"
						>
							<u-icon
								name="minus"
								size="12"
								color="#939393"
							></u-icon>
						</view>
						<view
							slot="plus"
							class="plus"
						>
							<u-icon
								name="plus"
								color="#939393"
								size="12"
							></u-icon>
						</view>
					</u-number-box>
				</view>
				<view class="bottom-box flex flex-between">
					<u-button color="#F8931F" type="primary" :plain="true" shape="circle" customStyle="width: calc(50% - 10rpx);color: #F8931F;" @click="onPush">
						<text style="font-size: 32rpx;">加入购物车</text>
					</u-button>
					<u-button color="#f8931f" shape="circle" customStyle="width: calc(50% - 10rpx);color: #fff;" style="margin-left: 20rpx;" @click="onPlay">
						<text style="font-size: 32rpx;">立即下单</text>
					</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: 'ShoppingCartCom',
		data() {
			return {
				selectIndex: 0,
				
			}
		},
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			goodsData: {
				type: Object,
				default: () => ({
					img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
					price: 899,
					arr: ['米黄色', '澄清色', '大红色', '米黄色2', '澄清色3', '大红色4'],
					num: 1
				})
			}
		},
		computed: {
			showPop() {
				return this.isShow
			}
		},
		created() {

		},
		mounted() {
			
		},
		methods: {
			onPlay () {
				uni.navigateTo({
					url: '/pages/place-order/index'
				})
				this.$emit('closePop', false)
			},
			
			onPush () {
				
			},
			
			onSelect (index) {
				this.selectIndex = index
			},
			
			closePop() {
				this.$emit('closePop', false)
			},
			changeNum () {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.cart-data {
    
	.pop-box {
		width: calc(100% - 40rpx);
		padding: 20rpx;
		padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
		
		
		.goods-img {
			width: 140rpx;
			height: 140rpx;
			margin-right: 20rpx;
			border-radius: 14rpx;
		}
		
		.price {
			color: #E44E45;
			font-size: 22rpx;
			align-items: baseline;
			& > :last-child {
				font-size: 40rpx;
				margin-left: 4rpx;
				font-weight: bolder;
			}
		}
		
		.type {
			font-size: 26rpx;
			color: #999;
		}
		
		
		.guige {
			color: #999;
			font-size: 28rpx;
			margin: 30rpx 0 10rpx 0;
		}
		
		.type-box {
			flex-wrap: wrap;
			
			.type-item {
				margin: 0 14rpx 14rpx 0;
				font-size: 26rpx;
				color: #666;
				padding: 12rpx 20rpx;
				background-color: #f7f7f7;
				border-radius: 10rpx;
			}
			
			.selectType {
				color: #F8931F;
				background-color: #fff5eb;
			}
		}
		
		
		.minus, .plus {
			width: 24rpx;
			height: 24rpx;
			background-color: #ebecee;
			padding: 10rpx 8rpx;
			border-radius: 4rpx;
		}
		
		.bgInfo {
			background-color: #f7f8fa;
		}
		
		.bottom-box {
			margin: 60rpx 0 20rpx 0;
		}
	}
}
</style>

