<!-- 秒杀模块 -->
<template>
    <view class="shopping-box">
		<view class="flex flex-between">
		    <view class="flex flex-middle">
		        <view class="title-img"></view>
		        <view class="seckill-title flex flex-middle">
		            <view class="end-text">距离结束</view>
		            <u-count-down
		            	:time="30 * 60 * 60 * 1000"
		            	format="HH:mm:ss"
		            	autoStart
		            	millisecond
		            	@change="onChange"
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
		    </view>
		    <view class="right-box flex flex-middle">
		        更多<u-icon name="arrow-right" color="#999" size="15"></u-icon>
		    </view>
		</view>
		<view class="active-time flex">
			<view class="active-item" v-for="(item, index) in timeList" :key="index">
				<view class="">
					{{ item.time }}
				</view>
				<view class="text-info" :class="{activeText: item.isActive}">
					{{ item.isActive ? '正在抢购' : '即将开始' }}
				</view>
			</view>
		</view>
		<view class="product-info">
			<view class="product-item flex flex-between" v-for="(item, index) in productList" :key="index">
				<image class="product-img" :src="item.img" mode=""></image>
				<view class="right-content">
					<view class="">
						<view class="p-title">
							{{ item.title }}
						</view>
						<view class="slider-box flex flex-middle flex-between">
							<view class="slider-bg">
								<view class="slider-line" :style="{width: item.num + '%'}"></view>
							</view>
							<view class="slider-text">已抢{{ item.num }}%</view>
						</view>
					</view>
					<view class="flex flex-between flex-middle">
						<view class="flex money-box">
							<view class="money-icon">
								¥
							</view>
							<view class="money1">
								{{ item.money }}
							</view>
						</view>
						<view class="right-btn">
							<u-button type="primary" color="#fe8a0d"  shape="circle" size="mini" text="立即抢购"></u-button>
						</view>
					</view>
				</view>
			</view>
		</view>
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
			timeList: [
				{
					time: '10:00',
					isActive: true,
				},
				{
					time: '12:00',
					isActive: false,
				},
				{
					time: '14:00',
					isActive: false,
				},
				{
					time: '16:00',
					isActive: false,
				},
				{
					time: '18:00',
					isActive: false,
				},
			],
			activeIndex: 0
        }
    },
    props: {
		productList: {
			type: Array,
			default: () => [
				{
					img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
					title: '李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈',
					num: 40,
					money: 256,
				},
				{
					img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
					title: '李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈',
					num: 80,
					money: 256,
				}
			]
		}
	},
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
		onChange(e) {
			this.timeData = e
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
	.shopping-box {
		width: calc(100% - 0rpx);
		border-radius: 20rpx;
		
		.title-img {
			background-image: url('../../static/home/qiang_gou.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			width: 124rpx;
			height: 42rpx;
		}
		
		.end-text {
			font-size: 22rpx;
			color: #999999;
			position: relative;
			padding-left: 14rpx;
			margin-left: 14rpx;
			margin-right: 12rpx;
			
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
		
		.right-box {
			font-size: 26rpx;
			color: #999;
		}
		
		
		
		.active-time {
			background-color: #fd8d11;
			width: calc(100% - 40rpx);
			padding: 14rpx 20rpx;
			justify-content: space-between;
			border-radius: 20rpx;
			margin-top: 20rpx;
			
			.active-item {
				color: #FFF6F6;
				font-size: 32rpx;
				text-align: center;
				
				.text-info {
					font-size: 24rpx;
					color: #fff;
					margin-top: 4rpx;
				}
				
				.activeText {
					font-size: 20rpx;
					color: #F8931F;
					background-color: #fff;
					border-radius: 20rpx;
					margin-top: 6rpx;
					padding: 2rpx 8rpx;
				}
			}
		}
		
		
		.product-info {
			margin-top: 20rpx;
			
			.product-item {
				margin-bottom: 20rpx;
				background-color: #fff;
				padding: 20rpx;
				border-radius: 20rpx;
				
				&:last-child {
					margin-bottom: 0rpx;
				}
				
				.product-img {
					width: 200rpx;
					height: 200rpx;
					flex-shrink: 0;
					border-radius: 12rpx;
				}
				
				.right-content {
					width: calc(100% - 220rpx);
					display: flex;
					flex-direction: column;
					justify-content: space-between;

                    .p-title {
                        font-size: 30rpx;
                        width: 100%;
                        height: 80rpx;
                        line-height: 40rpx;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow:hidden;
                    }
					
					.slider-box {
						width: 100%;
						margin: 14rpx 0 20rpx 0;
						
						.slider-bg {
							width: calc(100% - 120rpx);
							height: 6rpx;
							border-radius: 12rpx;
							background-color: #FFF6F6;
							margin-right: 20rpx;
							position: relative;
							
							.slider-line {
								height: 6rpx;
								border-radius: 12rpx;
								background-color: #F8931F;
								transition: width 0.3s;
								position: absolute;
								left: 0;
								top: 0;
							}
						}
						
						.slider-text {
							font-size: 22rpx;
							color: #999;
						}
					}
					
					.money-box {
						color: #E44E45;
						font-size: 42rpx;
						align-items: baseline;
						
						.money-icon {
							font-size: 24rpx;
							margin-right: 4rpx;
						}
						
						.money1 {
							font-weight: bolder;
						}
					}
					
					.right-btn {
						width: 130rpx;
					}
				}
				
			}
		}
	}
</style>