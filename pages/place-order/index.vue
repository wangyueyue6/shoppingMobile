<template>
	<view class="place-order">
		<NavBar :scrollTop="scrollTop" />
		<view class="card-box address flex  flex-between flex-middle">
			<view class="adress-left">
				<view class="order-user flex">
					<text>蒙娜丽莎</text>
					<text>18815531982</text>
				</view>
				<view class="a-text flex">
					<view class="a-left">
						默认地址
					</view>
					<view class="a-content">
						安徽省合肥市肥东县军民楼5栋402哈哈哈哈哈哈哈哈哈哈
					</view>
				</view>
			</view>
			<u-icon name="arrow-right" color="#999" size="16"></u-icon>
		</view>
		
		<view class="card-box product flex flex-middle">
			<image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" mode=""></image>
			<view class="p-right">
				<view class="title">加厚漏风小破一没品流浪加风管就将计就计</view>
				<view class="flex flex-between">
					<view class="price">
						<text>¥</text>
						<text>899</text>
					</view>
					<view class="num">
						x1
					</view>
				</view>
			</view>
		</view>
		<view class="card-box product-price">
			<view class="flex flex-between m-b-10">
				<view class="label">商品总价</view>
				<view class="total">¥899</view>
			</view>
			<view class="flex flex-between m-b-10">
				<view class="label">优惠券</view>
				<view class="coupon-box flex">
					<text>-</text>
					<text class="coupon">¥10</text>
					<u-icon name="arrow-right" color="#999" size="13"></u-icon>
				</view>
			</view>
			<view class="">
				<view class="label">留言</view>
				<u--textarea v-model="value1" placeholder="请输入您想要留言的内容哦~" border="none" style="background-color: #f6f6f6;margin-top: 12rpx;"></u--textarea>
			</view>
		</view>
		
		<view class="bottom-box flex flex-between flex-middle">
			<view class="btn-left flex ">
				<view class="btn-text">合计:</view>
				<view class="btn-price felx">
					<text>¥</text>
					<text>899.9</text>
				</view>
			</view>
			<view class="">
				<u-button color="#f8931f" shape="circle" customStyle="width: 240rpx;color: #fff;" style="margin-left: 20rpx;" @click="onPlay">
					<text style="font-size: 32rpx;">提交订单</text>
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/nvabar/inde.vue'
	export default {
		name: 'placeOrder',
		components: {
			NavBar
		},
		data() {
			return {
				scrollTop: 0,
				value1: ''
			}
		},
		props: {
			
		},
		computed: {
			
		},
		created() {

		},
		mounted() {
			
		},
		methods: {
			
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
	}
</script>

<style lang="scss" scoped>
.place-order {
	min-height: calc(100vh - 130rpx - constant(safe-area-inset-bottom));
	min-height: calc(100vh - 130rpx - env(safe-area-inset-bottom));
	overflow-y: auto;
	background-color: #f6f6f6;
	position: relative;
	
	.card-box {
		width: calc(100% - 80rpx);
		padding: 20rpx 20rpx;
		margin: 20rpx 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
	}
	
	.address {
		display: flex;
		justify-content: space-between;
		
		.adress-left {
			width: calc(100% - 50rpx);
			
			.order-user {
				font-size: 30rpx;
				color: #333;
				font-weight: 500;
				
				& > :last-child {
					font-size: 28rpx;
					margin-left: 20rpx;
				}
			}
			
			.a-text {
				align-items: flex-start;
				margin-top: 10rpx;
				
				.a-left {
					flex-shrink: 0;
					background-color: #fff5eb;
					color: #F8931F;
					font-size: 24rpx;
					align-self: flex-start;
					margin-top: 4rpx;
					padding: 6rpx 14rpx;
					border-radius: 8rpx;
				}
				
				.a-content {
					text-wrap: wrap;
					line-height: 38rpx;
					font-size: 28rpx;
					color: #666;
					width: calc(100% - 160rpx);
					margin-left: 20rpx;
				}
			}
		}
	}
	
	.product {
		
		image {
			width: 130rpx;
			height: 130rpx;
			border-radius: 10rpx;
		}
		
		.p-right {
			margin-left: 20rpx;
			width: calc(100% - 150rpx);
			
			
			.title {
				font-size: 28rpx;
				color: #333;
				font-weight: 500;
				margin-bottom: 20rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				width: 100%;
			}
			
			.price {
				font-size: 22rpx;
				color: #E44E45;
				margin-left: 4rpx;
				
				& > :last-child {
					font-size: 40rpx;
					font-weight: bolder;
					margin-left: 4rpx;
				}
			}
			
			.num {
				color: #999;
				font-size: 26rpx;
				margin-top: 6rpx;
			}
		}
	}
	
	.product-price {
		.label {
			font-size: 28rpx;
			font-weight: 430;
			color: #333;
		}
		
		.total {
			font-size: 28rpx;
			font-weight: bold;
			color: #333;
		}
		
		.coupon-box {
			align-items: baseline;
			color: #F8931F;
			
			.coupon {
				margin-right: 6rpx;
				font-size: 26rpx;
			}
		}
		
	}
	
	.bottom-box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: calc(100% - 40rpx);
		padding: 20rpx 20rpx;
		background-color: #fff;
		padding-bottom: calc(30rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(30rpx + env(safe-area-inset-bottom));
		z-index: 200;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
		
		.btn-left {
			align-items: baseline;
			
			.btn-text {
				font-size: 28rpx;
				color: #333;
			}
			
			.btn-price {
				font-size: 22rpx;
				color: #E44E45;
				margin-left: 4rpx;
				
				& > :last-child {
					font-size: 40rpx;
					font-weight: bolder;
					margin-left: 4rpx;
				}
			}
		}
	}
}
</style>

