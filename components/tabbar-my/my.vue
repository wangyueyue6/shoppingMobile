<template>
    <view class="my-box">
        <view class="top-bg">
			<view class="user-info flex flex-between flex-middle">
				<view class="flex flex-middle">
					<view class="avt-box">
						<u--image width="140rpx" height="140rpx" :src="avatarImg" shape="circle"></u--image>
						<UploadImg
							ref="uploadRef"
							class="upoload-box"
							:maxCount="1"
							:acceptType="accept"
							@getImgList="getImgList"
						/>
					</view>
					<view class="info-box">
						<view class="flex flex-middle">
							<text>吴凡</text>
							<view class="jue-se"></view>
						</view>
						<view class="phone">
							18815531982
						</view>
					</view>
				</view>
				<view class="user-icon flex">
					<view class="icon icon-bg1">
						<view class="vip-desc"></view>
					</view>
					<view class="icon icon-bg2"></view>
					<view class="icon icon-bg3"></view>
				</view>
			</view>
			<view class="num-box">
				<u-grid :border="false" col="4">
				    <u-grid-item :customStyle="{ padding: '20rpx 0' }">
				        <view class="grid-text-number">{{ 6 || 0 }}</view>
				        <text class="grid-text">优惠券</text>
				    </u-grid-item>
					<u-grid-item :customStyle="{ padding: '20rpx 0' }">
					    <view class="grid-text-number">{{ 2 || 0 }}</view>
					    <text class="grid-text">贡献值</text>
					</u-grid-item>
					<u-grid-item :customStyle="{ padding: '20rpx 0' }">
					    <view class="grid-text-number">{{ 0 || 0 }}</view>
					    <text class="grid-text">消费券</text>
					</u-grid-item>
					<u-grid-item :customStyle="{ padding: '20rpx 0' }">
					    <view class="grid-text-number">{{ 18 || 0 }}</view>
					    <text class="grid-text">数字权证</text>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="vip-bg">
				<u-button class="buttom-vip" color="linear-gradient(to right, #f8dda0, #fbf0d3)" shape="circle" customStyle="width: 160rpx;color: #392100;">
					<text style="font-size: 32rpx;">开通</text>
				</u-button>
			</view>
        </view>
		
		<view class="card-box m-t-10">
			<view class="flex flex-between flex-middle orders">
				<view class="card-title">
					订单中心
				</view>
				<view class="flex flex-middle more">
					查看全部<u-icon name="arrow-right" color="#999999 " size="16"></u-icon>
				</view>
			</view>
			<u-grid :border="false" col="5">
			    <u-grid-item v-for="(item, index) in orderList" :key="index" :customStyle="{ padding: '20rpx 0' }">
			        <image class="grid-img" :src="item.img" mode=""></image>
			        <text class="grid-font">{{ item.title }}</text>
			    </u-grid-item>
			</u-grid>
		</view>
		<view class="card-box">
			<view class="flex flex-between flex-middle orders">
				<view class="card-title">
					本地生活
				</view>
				<view class="flex flex-middle more">
					查看订单<u-icon name="arrow-right" color="#999999 " size="16"></u-icon>
				</view>
			</view>
			<u-grid :border="false" col="2">
			    <u-grid-item :customStyle="{ padding: '20rpx 0' }">
			        <view class="grid-number2">{{ 6 || 0 }}</view>
			        <text class="grid-font">本地生活抵扣券</text>
			    </u-grid-item>
				<u-grid-item :customStyle="{ padding: '20rpx 0' }">
				    <view class="grid-number2">{{ 6 || 0 }}</view>
				    <text class="grid-font">本地生活积分</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="card-box">
			<view class="flex flex-between flex-middle orders">
				<view class="card-title">
					我的服务
				</view>
				<view class="flex flex-middle more"></view>
			</view>
			<u-grid :border="false" col="4">
			    <u-grid-item v-for="(item, index) in serviceList" :key="index" :customStyle="{ padding: '20rpx 0' }">
			        <image class="grid-img2" :src="item.img" mode=""></image>
			        <text class="grid-font">{{ item.title }}</text>
			    </u-grid-item>
			</u-grid>
		</view>
    </view>
</template>

<script>
	import UploadImg from '@/components/upload/index.vue'
export default {
    name: 'My',
    components: {
		UploadImg
    },
    data() {
        return {
			accept: 'image',
			avatarImg: 'https://meichuangyx-test.oss-cn-hangzhou.aliyuncs.com/ADMIN/34455c99-bfbe-4773-bb25-9a4022855bcb.jpg',
			orderList: [
				{
					img: require('../../static/my/order_icon1.png'),
					title: '待付款'
				},
				{
					img: require('../../static/my/order_icon2.png'),
					title: '待发货'
				},
				{
					img: require('../../static/my/order_icon3.png'),
					title: '待收货'
				},
				{
					img: require('../../static/my/order_icon4.png'),
					title: '待评价'
				},
				{
					img: require('../../static/my/order_icon5.png'),
					title: '已取消'
				},
			],
			serviceList: [
				{
					title: '浏览历史',
					img: require('../../static/my/s_icon1.png'),
				},
				{
					title: '操作设置',
					img: require('../../static/my/s_icon2.png'),
				},
				{
					title: '积分抽奖',
					img: require('../../static/my/s_icon3.png'),
				},
				{
					title: '联系客服',
					img: require('../../static/my/s_icon4.png'),
				},
				{
					title: '我的发票',
					img: require('../../static/my/s_icon5.png'),
				},
				{
					title: '我的积分',
					img: require('../../static/my/s_icon6.png'),
				},
				{
					title: '地址信息',
					img: require('../../static/my/s_icon7.png'),
				},
				{
					title: '我的收藏',
					img: require('../../static/my/s_icon8.png'),
				},
			]
        }
    },
    props: {},
    computed: {
		
    },
    created() {

    },
    mounted() {
        
    },
    methods: {
		getImgList (e) {
			this.avatarImg = e.length > 0 ? e[0].url : ''
			this.$nextTick(() => {
				this.$refs.uploadRef.fileList = []
			})
		},
        // 下拉刷新,重新获取页面数据（父组件调用）
        reloadTab() {

        }
    },
}
</script>

<style scoped lang="scss">
.my-box {
	background-color: #f5f5f5;
    
	.top-bg {
		background-image: url('../../static/my/icon1.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 480rpx;
		overflow: hidden;
		position: relative;
		
		.user-info {
			width: calc(100% - 40rpx);
			margin: 0rpx 20rpx;
			padding-top: 30rpx;
			
			.avt-box {
				position: relative;
				overflow: hidden;
				background-color: #fff;
				padding: 6rpx;
				border-radius: 50%;
				
				.upoload-box {
					position: absolute;
					top: 6rpx;
					right: 0;
					left: 6rpx;
					bottom: 0;
					opacity: 0;
				}
			}
			
			.info-box {
				color: #fff;
				margin-left: 16rpx;
				font-size: 30rpx;
				
				.jue-se {
					background-image: url('../../static/my/icon3.png');
					background-size: 100% auto;
					background-repeat: no-repeat;
					width: 80rpx;
					height: 36rpx;
					margin-left: 10rpx;
				}
				
				.phone {
					font-size: 28rpx;
					margin-top: 14rpx;
				}
			}
			
			
			.user-icon {
				
				.icon {
					background-size: 100% 100%;
					background-repeat: no-repeat;
					width: 46rpx;
					height: 46rpx;
				}
				
				.icon-bg1 {
					background-image: url('../../static/my/icon5.png');
					position: relative;
				}
				
				.icon-bg2 {
					background-image: url('../../static/my/icon7.png');
					margin-left: 40rpx;
					width: 46rpx;
					height: 50rpx;
				}
				
				.icon-bg3 {
					background-image: url('../../static/my/icon6.png');
					margin-left: 40rpx;
				}
				
				.vip-desc {
					width: 106rpx;
					height: 52rpx;
					background-image: url('../../static/my/icon4.png');
					background-size: 100% 100%;
					background-repeat: no-repeat;
					position: absolute;
					top: -58rpx;
					left: -30rpx;
				}
			}
		}
		
		.num-box {
			color: #fff;
			padding: 0 20rpx;
			
			.grid-text-number {
				font-size: 40rpx;
				font-weight: bolder;
			}
			
			.grid-text {
				font-size: 30rpx;
			}
		}
		
		.vip-bg {
			background-image: url('../../static/my/icon2.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			width: calc(100% - 40rpx);
			height: 160rpx;
			margin: 0 20rpx;
			position: absolute;
			bottom: 0rpx;
			left: 0rpx;
			
			.buttom-vip {
				position: absolute;
				right: 30rpx;
				top: 30rpx;
				font-size: 54rpx !important;
			}
		}
	}
	
	.card-box {
		margin: 0 20rpx 20rpx 20rpx;
		width: calc(100% - 80rpx);
		padding: 0 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		padding-bottom: 20rpx;
		
		.orders {
			padding: 20rpx 10rpx;
			
			.card-title {
				font-weight: 32rpx;
				font-weight: bolder;
			}
			
			.more {
				color: #999;
				font-size: 28rpx;
			}
		}
		
		.grid-img {
			width: 80rpx;
			height: 80rpx;
			margin-bottom: 6rpx;
		}
		
		.grid-img2 {
			width: 66rpx;
			height: 66rpx;
			margin-bottom: 10rpx;
		}
		
		.grid-font {
			font-size: 28rpx;
			color: #333333;
		}
		
		.grid-number2 {
			font-size: 42rpx;
			color: #333333;
			font-weight: bolder;
		}
	}
	
	.m-t-10 {
		margin-top: 30rpx;
	}

}
</style>