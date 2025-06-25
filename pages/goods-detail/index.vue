<template>
	<view class="goods-detail">
		<view class="swiper-box">
			<u-swiper
			  :list="imgList"
			  @change="e => current = e.current"
			  :autoplay="false"
			  height="580rpx"
			  radius="0"
			>
			  <view slot="indicator" class="indicator">
				<view
				  class="indicator__dot"
				  v-for="(item, index) in imgList"
				  :key="index"
				  :class="[index === current && 'indicator__dot--active']"
				></view>
			  </view>
			</u-swiper>
			<view class="back-btn flex flex-middle flex-cente" @click="backFun">
				<u-icon name="arrow-left" color="#fff" size="14"></u-icon>
			</view>
			<view class="qiang-gou flex flex-middle flex-between">
				<view class="">限时抢购</view>
				<view class="flex flex flex-middle">
					<view class="">倒计时</view>
					<u-count-down
						:time="remainingTime"
						format="HH:mm:ss"
						autoStart
						millisecond
						@change="onChange"
						@finish="onFinish"
					>
						<view class="time-box flex flex-middle">
							<view class="time-custom">
								<view class="time-item">{{ timeData.hours > 9 ? timeData.hours : '0' + timeData.hours }}</view>
							</view>
							<view class="time-doc">:</view>
							<view class="time-custom">
								<view class="time-item">{{ timeData.minutes > 9 ? timeData.minutes : '0' + timeData.minutes }}</view>
							</view>
							<view class="time-doc">:</view>
							<view class="time-custom">
								<view class="time-item">{{ timeData.seconds > 9 ? timeData.seconds : '0' + timeData.seconds }}</view>
							</view>
						</view>
					</u-count-down>
				</view>
			</view>
		</view>
		
		<view class="card-box pro-info">
			<view class="title">香奈儿哈哈哈哈哈哈哈哈哈啊哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈和</view>
			<view class="coupon flex">
				<view class="coupon-item" v-for="(item, index) in 5" :key="index">
					{{ index + '满30减5远' }}
				</view>
			</view>
			<view class="flex flex-between flex-middle">
				<view class="money">
					<text>¥</text>
					<text>1899.9</text>
				</view>
				<view class="xiao-liang">
					<text>月销</text>
					<text>999+</text>
				</view>
			</view>
		</view>
		<!-- 用户评价 -->
		<view class="user-top flex flex-between flex-middle">
			<view class="">用户评价(3)</view>
			<view class="flex">
				查看全部<u-icon name="arrow-right" color="#999" size="16"></u-icon>
			</view>
		</view>
		<view class="card-box ping-jia">
			<view class="ping-fen flex flex-middle">
				<view class="num-info">
					<view class="">99%</view>
					<view class="">用户满意</view>
				</view>
				<view class="tag-box flex">
					<view
						class="tag-item"
						v-for="(item, index) in 5"
						:key="index"
						:class="{ selectInfo: selectIndex == index }"
					>
						{{ index == 0 ? '全部' : '有图' }}
					</view>
				</view>
			</view>
			<view class="tall-content">
				<view class="" v-for="(item, index) in 2" :key="index">
					<Evaluate :class="index == 1 ? 'last-data' : 'border-info'" />
				</view>
			</view>
		</view>
		
		<!-- 商品详情 -->
		<view class="user-top flex flex-between flex-middle">
			<view class="">商品详情</view>
			<view class="flex"></view>
		</view>
		<view class="card-box ping-jia">
			<u-parse :content="content"></u-parse>
		</view>
		
		
		<view class="bottom-box flex flex-middle">
			<view class="left-box flex flex-between">
				<view class="btn-box">
					<view class="home-bg"></view>
					<view class="">首页</view>
				</view>
				<view class="btn-box">
					<view class="share-bg"></view>
					<view class="">分享</view>
				</view>
				<view class="btn-box">
					<view class="star-bg"></view>
					<view class="">收藏</view>
				</view>
			</view>
			<view class="flex flex-middle">
				<u-button class="buttom-vip" color="#fff4e8" shape="circle" customStyle="width: 220rpx;color: #F8931F;" @click="openPop">
					<text style="font-size: 32rpx;">加入购物车</text>
				</u-button>
				<u-button class="buttom-vip" color="#f8931f" shape="circle" customStyle="width: 220rpx;color: #fff;" style="margin-left: 20rpx;" @click="openPop">
					<text style="font-size: 32rpx;">立即购买</text>
				</u-button>
			</view>
		</view>
		
		<ShoppingCart :isShow="showPop" @closePop="closePop" />
	</view>
</template>

<script>
	import Evaluate from './evaluate.vue'
	import ShoppingCart from './shoppingCart.vue'
	export default {
		components: {
			Evaluate,
			ShoppingCart
		},
		data() {
			return {
				 remainingTime: 6 * 60 * 60 * 1000,
				 lastLeaveTime: null,
				bottomHeight: 0,
				imgList: [
                    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                ],
				selectIndex: 0,
				current: 0,
				timeData: {},
				content: `<p>露从今夜白，月是故乡明</p>
					<img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />`,
				showPop: false,
			}
		},
		onLoad() {

		},
		created() {
			this.checkRemainingTime()
		},
		mounted() {
			// this.getViewHeight()
		},
		onHide() {
			// 页面隐藏时记录离开时间
			this.lastLeaveTime = Date.now();
			uni.setStorageSync('countdown_leave_time', this.lastLeaveTime.toString());
			uni.setStorageSync('countdown_remaining', JSON.stringify(this.timeData));
		},
		onUnload() {
			// 页面卸载时记录离开时间
			this.lastLeaveTime = Date.now();
			uni.setStorageSync('countdown_leave_time', this.lastLeaveTime.toString());
			uni.setStorageSync('countdown_remaining', JSON.stringify(this.timeData));
		},
		methods: {
			openPop () {
				this.showPop = true
			},
			
			closePop () {
				this.showPop = false
			},
			
			onChange(e) {
				// console.log('000000000', e);
				this.timeData = e
				uni.setStorageSync('countdown_remaining', JSON.stringify(e));
			},
			
			onFinish () {
				uni.removeStorageSync('countdown_remaining');
				uni.removeStorageSync('countdown_leave_time');
			},
			
			checkRemainingTime() {
				// 初始化时从本地存储读取剩余时间和上次离开时间
				const savedTime = uni.getStorageSync('countdown_remaining');
				const savedLeaveTime = uni.getStorageSync('countdown_leave_time');
				
				if (savedTime && savedLeaveTime) {
					const leaveTime = parseInt(savedLeaveTime);
					const now = Date.now();
					const timePassed = now - leaveTime;
					
					// 解析保存的时间数据
					const { hours, minutes, seconds, milliseconds } = JSON.parse(savedTime);
					const totalRemaining = (hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;
					
					// 计算新的剩余时间（减去离开期间的时间）
					const newRemaining = totalRemaining - timePassed;
					
					// 如果时间已经过期，设置为0
					this.remainingTime = newRemaining > 0 ? newRemaining : 0;
				}
			},
			
			backFun () {
				uni.navigateBack()
			},
			
			// getViewHeight () {
			// 	uni.getSystemInfo({
			// 	    success: (res) => {
			// 	        const pxToRpxRatio = 750 / res.windowWidth
			// 	        // 假设TabBar高度为50px
			// 	        const tabBarHeight = 70 * pxToRpxRatio
			// 	        const bottomSafeArea = res.safeAreaInsets && res.safeAreaInsets.bottom ?  res.safeAreaInsets.bottom : 0
			// 			this.bottomHeight = tabBarHeight + bottomSafeArea * pxToRpxRatio + 20
			// 	    }
			// 	})
			// }
		},
		onPullDownRefresh () {
			// this.reloadTab()
			console.log('刷新拉');
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1200)
		},
		
		onReachBottom () {
			console.log('这个是触底事件');
		}
	}
</script>

<style scoped lang="scss">
.goods-detail {
	min-height: 100vh;
	padding-bottom: calc(140rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
	background-color: #f6f6f6;
	overflow-y: auto;
	position: relative;
	
	.swiper-box {
		width: 100%;
		position: relative;
		margin-bottom: 70rpx;
		
		.back-btn {
			background-color: rgba(255, 255, 255, 0.3);
			padding: 18rpx;
			position: absolute;
			top: calc(30px + constant(safe-area-inset-top));
			top: calc(30px + env(safe-area-inset-top));
			left: 30rpx;
			border-radius: 100rpx;
		}
		
		.qiang-gou {
			background-color: #f9911f;
			padding: 30rpx 20rpx;
			border-radius: 20rpx;
			width: calc(100% - 80rpx);
			z-index: 99;
			color: #fff;
			position: absolute;
			bottom: -50rpx;
			left: 20rpx;
		}
	}
	
	.indicator {
	    display: flex;
		flex-direction: row;
	    justify-content: flex-end;
		position: absolute;
		bottom: 60rpx;
		transform: translateX(-50%);
		z-index: 9999;
	
	    &__dot {
	      height: 8px;
	      width: 8px;
	      border-radius: 100px;
	      background-color: rgba(255, 255, 255, 0.35);
	      margin: 0 5px;
	      transition: background-color 0.3s;
	
	      &--active {
	        background-color: #ffffff;
	      }
	    }
	}
	
	
	
	.time-box {
		display: flex;
		  align-items: center; /* 关键：子项垂直居中 */
		  height: 36rpx;
		  line-height: 36rpx;
		  margin-top: 2rpx;
		  margin-left: 20rpx;
		
		.time-item {
			background-color: #fee8cf;
			width: 50rpx;
			height: 40rpx;
			border-radius: 100rpx;
			color: #FF8500;
			font-size: 24rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1;
		}
		
		.margn-info {
			margin-left: -10rpx;
		}
		
		.time-doc {
			color: #fff;
			margin: 0 4rpx;
			margin-top: -6rpx;
			font-size: 22rpx
		}
	}
	
	.card-box {
		width: calc(100% - 100rpx);
		margin: 20rpx;
		padding: 20rpx 30rpx;
		border-radius: 20rpx;
		background-color: #fff;
	}
	
	.pro-info {
		.title {
			width: 100%;
			line-height: 38rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;  /* 限制显示 2 行 */
			overflow: hidden;
			text-overflow: ellipsis;
			margin-bottom: 24rpx;
			font-size: 30rpx;
			color: #333;
			font-weight: bolder;
		}
		
		.coupon {
			flex-wrap: wrap;
			margin-bottom: 10rpx;
			
			.coupon-item {
				padding: 10rpx 20rpx;
				background-color: #fff7ed;
				font-size: 24rpx;
				color: #F8931F ;
				margin-bottom: 14rpx;
				margin-right: 14rpx;
				border-radius: 8rpx;
			}
		}
		
		.money {
			color: #E44E45;
			font-size: 22rpx;
			align-items: baseline;
			
			& > :last-child {
				font-size: 40rpx;
				font-weight: bolder;
				margin-left: 4rpx;
			}
		}
		
		.xiao-liang {
			color: #999999;
			font-size: 26rpx;
		}
	}
	
	.user-top {
		width: calc(100% - 40rpx);
		margin: 30rpx 20rpx 0 20rpx;
		
		& > :first-child {
			font-size: 30rpx;
			color: #333;
			font-weight: bold;
		}
		
		& > :last-child {
			font-size: 28rpx;
			color: #999;
		}
	}
	
	.ping-jia {
		
		.ping-fen {
			width: 100%;
			
			.num-info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: #F8931F;
				width: 126rpx;
				
				& > :first-child {
					font-weight: bolder;
					font-size: 40rpx;
				}
				
				& > :last-child {
					font-size: 32rpx;
				}
			}
			
			.tag-box {
				width: calc(100% - 126rpx - 50rpx);
				margin-left: 50rpx;
				flex-wrap: wrap;
				position: relative;
				
				&::before {
					content: '';
					position: absolute;
					top: calc(50% - 50rpx);
					left: -30rpx;
					background-color: #f6f6f6;
					width: 4rpx;
					height: 100rpx;
				}
				
				.tag-item {
					background-color: #f5f5f5;
					padding: 10rpx 24rpx;
					border-radius: 100rpx;
					color: #999;
					font-size: 28rpx;
					margin-right: 14rpx;
					margin-bottom: 14rpx;
					
				}
				
				.selectInfo {
					background-color: #fff7ed;
					color: #F8931F;
				}
			}
		}
		
		.tall-content {
			margin-top: 20rpx;
			
			.border-info {
				border-bottom: 2rpx solid #f6f6f6;
				margin-bottom: 30rpx;
				padding-bottom: 30rpx;
			}
			
			.last-data {
				border-bottom: none;
				margin-bottom: 0rpx;
				padding-bottom: 0rpx;
			}
		}
	}
	
	
	.bottom-box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: calc(100% - 40rpx);
		// height: 82rpx;
		background-color: #fff;
        padding: 20rpx;
		padding-bottom: calc(30rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(30rpx + env(safe-area-inset-bottom));
		z-index: 200;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
		
		.left-box {
			width: calc(100% - 460rpx);
			margin-right: 30rpx;
			
			
			.btn-box {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				color: #999;
				font-size: 26rpx;
				
				.home-bg {
					background-image: url('../../static/imgs/home.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					width: 40rpx;
					height: 40rpx;
					margin-bottom: 10rpx;
				}
				
				.share-bg {
					background-image: url('../../static/imgs/share.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					width: 38rpx;
					height: 38rpx;
					margin-bottom: 10rpx;
				}
				
				.star-bg {
					background-image: url('../../static/imgs/star.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					width: 40rpx;
					height: 40rpx;
					margin-bottom: 10rpx;
				}
			}
		}
	}
}
</style>
