<!-- 秒杀模块 -->
<template>
    <view class="seckill-box">
        <view class="flex flex-between flex-middle">
            <view class="flex flex-middle">
                <view class="seckill-img"></view>
                <view class="seckill-title flex flex-middle">
                    限时限量抢好物
                </view>
            </view>
			<u-count-down
				:time="remainingTime"
				format="HH:mm:ss"
				autoStart
				millisecond
				@change="onChange"
				@finish="onFinish"
			>
				<view class="time-box flex flex-middle">
					<view class="time-custom flex">
						<view class="time-item">{{ getH1(timeData.hours) }}</view>
						<view class="time-item margn-info">{{ getH2(timeData.hours) }}</view>
					</view>
					<view class="time-doc">:</view>
					<view class="time-custom flex">
						<view class="time-item">{{ getM1(timeData.minutes) }}</view>
						<view class="time-item margn-info">{{ getM2(timeData.minutes) }}</view>
					</view>
					<view class="time-doc">:</view>
					<view class="time-custom flex">
						<view class="time-item">{{ getS1(timeData.seconds) }}</view>
						<view class="time-item margn-info">{{ getS2(timeData.seconds) }}</view>
					</view>
				</view>
			</u-count-down>
        </view>
		<scroll-view scroll-x class="scroll-container">
			<view class="product-list">
				<view
					v-for="(item, index) in 5"
					:key="index"
					class="product-item"
					@click="onClick"
				>
					<image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" mode="aspectFill" class="img-box"></image>
				</view>
			</view>
		</scroll-view>
    </view>
</template>

<script>
export default {
    name: 'Seckill',
    components: {
    },
    data() {
        return {
			timeData: {},
			remainingTime: 6 * 60 * 60 * 1000,
			lastLeaveTime: null,
        }
    },
    props: {
		productList: {
			type: Array,
			default: () => []
		}
	},
    computed: {

    },
	onHide() {
		console.log('1111111111');
		// 页面隐藏时记录离开时间
		this.lastLeaveTime = Date.now();
		uni.setStorageSync('seckill_countdown_leave_time', this.lastLeaveTime.toString());
		uni.setStorageSync('seckill_countdown_remaining', JSON.stringify(this.timeData));
	},
	onUnload() {
		console.log('2222222222');
		// 页面卸载时记录离开时间
		this.lastLeaveTime = Date.now();
		uni.setStorageSync('seckill_countdown_leave_time', this.lastLeaveTime.toString());
		uni.setStorageSync('seckill_countdown_remaining', JSON.stringify(this.timeData));
	},
    created() {
		this.checkRemainingTime()
    },
    mounted() {

    },
	beforeDestroy() {
	    this.lastLeaveTime = Date.now();
	    uni.setStorageSync('seckill_countdown_leave_time', this.lastLeaveTime.toString());
	    uni.setStorageSync('seckill_countdown_remaining', JSON.stringify(this.timeData));
	},
    methods: {
		// 切换tab时保存时间
		saveRemainingTime () {
			this.lastLeaveTime = Date.now();
			uni.setStorageSync('seckill_countdown_leave_time', this.lastLeaveTime.toString());
			uni.setStorageSync('seckill_countdown_remaining', JSON.stringify(this.timeData));
		},
		onChange(e) {
			this.timeData = e
			uni.setStorageSync('seckill_countdown_remaining', JSON.stringify(e));
		},

		onFinish () {
			uni.removeStorageSync('seckill_countdown_remaining');
			uni.removeStorageSync('seckill_countdown_leave_time');
		},
		
		onClick () {
			uni.navigateTo({
			    url: `/pages/goods-detail/index?id=1`
			})
		},

		checkRemainingTime() {
			// 初始化时从本地存储读取剩余时间和上次离开时间
			const savedTime = uni.getStorageSync('seckill_countdown_remaining');
			const savedLeaveTime = uni.getStorageSync('seckill_countdown_leave_time');
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

        getH1 (hour) {
            const hourNum = Number(hour)
			if (hourNum > 0) {
				return Math.floor(hourNum / 10);
			} else {
				return 0
			}
        },

        getH2 (hour) {
            const hourNum = Number(hour)
			if (hourNum > 0) {
				return Math.floor(hourNum % 10);
			} else {
				return 0
			}
        },
		
		getM1 (minute) {
			const minuteNum = Number(minute)
			if (minuteNum > 0) {
				return Math.floor(minuteNum / 10);
			} else {
				return 0
			}
		},
		getM2 (minute) {
			const minuteNum = Number(minute)
			if (minuteNum > 0) {
				return Math.floor(minuteNum % 10);
			} else {
				return 0
			}
		},

        getS1 (seconds) {
			const secondsNum = Number(seconds)
			if (secondsNum > 0) {
				return Math.floor(secondsNum / 10);
			} else {
				return 0
			}
		},
		getS2 (seconds) {
			const secondsNum = Number(seconds)
			if (secondsNum > 0) {
				return Math.floor(secondsNum % 10);
			} else {
				return 0
			}
		},
    },
}
</script>

<style scoped lang="scss">
	.seckill-box {
		width: calc(100% - 40rpx);
		padding: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		
		.seckill-img {
			background-image: url('../../static/home/miao_sha.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			width: 124rpx;
			height: 42rpx;
		}
		
		.seckill-title {
			font-size: 22rpx;
			color: #999999;
			position: relative;
			padding-left: 14rpx;
			margin-left: 14rpx;
			
			&::before {
				content: '';
				height: 24rpx;
				width: 2rpx;
				position: absolute;
				top: calc(50% - 10rpx);
				left: 0rpx;
				background-color: #bfbfbf;
			}
		}
		
		.time-box {
			display: flex;
			  align-items: center; /* 关键：子项垂直居中 */
			  height: 36rpx;
			  line-height: 36rpx;
			  margin-top: 2rpx;
			
			.time-item {
				background-color: #fd8d11;
				width: 36rpx;
				height: 36rpx;
				border-radius: 50%;
				color: #fff;
				font-size: 22rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			
			.margn-info {
				margin-left: -10rpx;
			}
			
			.time-doc {
				color: #fd8d11;
				margin: 0 4rpx;
				margin-top: -6rpx;
			}
		}
		
		.scroll-container {
			width: 100%; 
			white-space: nowrap; 
			overflow-x: auto; 
			-webkit-overflow-scrolling: touch; 
			
			.product-list {
				display: inline-flex;
				flex-wrap: nowrap; 
				gap: 20rpx; /* 间距 */
				margin-top: 30rpx;
				
				.product-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 100%;
					flex: 0 0 calc((100vw - 134rpx) / 3);
					aspect-ratio: 1;
					
					.img-box {
						width: 100%;
						height: auto;
						aspect-ratio: 1; /* makes images square */
						object-fit: cover;
						border-radius: 16rpx;
					}
				}
			}
		}
	}
</style>