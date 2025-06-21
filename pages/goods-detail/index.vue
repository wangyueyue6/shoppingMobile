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
		</view>
		详情
		
		
		<view class="bottom-box">
			底部
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				imgList: [
                    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                ],
				current: 0
			}
		},
		onLoad() {

		},
		mounted() {
			
		},
		methods: {
			backFun () {
				uni.navigateBack()
			}
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
	
	.swiper-box {
		width: 100%;
		position: relative;
		
		.back-btn {
			background-color: rgba(255, 255, 255, 0.5);
			padding: 18rpx;
			position: absolute;
			top: calc(30px + constant(safe-area-inset-top));
			top: calc(30px + env(safe-area-inset-top));
			left: 30rpx;
			border-radius: 100rpx;
		}
	}
	
	.indicator {
	    display: flex;
		flex-direction: row;
	    justify-content: flex-end;
		position: absolute;
		bottom: 60rpx;
		// right: calc(50% - 20rpx);
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
	
	
	.bottom-box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
        padding: 20rpx;
		padding-bottom: calc(0 + constant(safe-area-inset-bottom));
		padding-bottom: calc(0 + env(safe-area-inset-bottom));
	}
}
</style>
