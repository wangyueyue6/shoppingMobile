<!-- 随手拍-列表页面 -->
<template>
	<view class="photoUpload">
		<z-paging ref="paging" v-model="listData" @query="getList">
			<view slot="top" :style="{background: `rgba(255,255,255,${scrollTop}%)`}">
				<!-- 自定义导航栏 -->
				<NavBar :scrollTop="scrollTop" />
			</view>
			<!-- 列表部分 -->
			<view class="listBox">
				<view class="listItem" v-for="(item,index) of listData" :key="index" @click="details(item)">
					<view class="eventNmeBox">
						<view class="eventNme">
							<view class="u-line-1 name">
								{{item.eventTitle}}
							</view>
						</view>
					</view>
					<!-- 时间 -->
					<view class="itemTitle itemTime">
						<!-- <image src="../static/photoUpload/timeIcon.png" mode=""></image> -->
						{{item.createTime}}
					</view>
					<view class="itemTitle operate">
						<view class="seat">
							<!-- <image class="seatImg" src="../static/photoUpload/eventSeat.png" mode="widthFix">
							</image> -->
							<view class="address">{{item.eventSite}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 底部按钮部分 -->
			<view slot="bottom">
				<!-- 按钮 -->
				<view class="reportBtn">
					<u-button :customStyle="reportStyle" type="primary" text="上报" @click="reportClick"></u-button>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
	// import {getListData} from '../../common/api/reportThings.js'
	import NavBar from '@/components/nvabar/inde.vue'
	export default {
		mixins: [ZPMixin],
		components: {NavBar},
		data() {
			return {
				// 列表数据
				listData:[],
				// 获取手机顶部状态栏的高度
				barheight: this.StatusBar,
				// 页面滑动距离
				scrollTop: 0,
				// 上报按钮样式
				reportStyle: {
					'height': '96rpx',
					'font-size': '32rpx',
					'background': '#1764fa',
					'color': '#fff',
					'border-radius': '12rpx',
					'font-family': 'SourceHanSans-Medium',
				},
			};
		},
		//监听用户页面滑动
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods:{
			// 刷新服务管理列表
			refreshService(){
				this.$refs.paging.reload()
			},
			// 获取数据
			getList(pageNo, pageSize){
				// getListData(
				// 	{
				// 		pageNum: pageNo,
				// 		pageSize: pageSize,
				// 		name: '',
				// 	},
				// 	{
				// 		header: {
				// 			Authorization: this.$store.state.token
				// 		},
				// 		load: false //加载动画
				// 	}
				// ).then(res => {
				// 	this.$refs.paging.completeByTotal (res.data.data, res.data.total);
				// }).catch(err => {
				// 	this.$refs.paging.complete(false);
				// })
				this.$refs.paging.completeByTotal ([], 1);
			},
			
			// 详情点击
			details(item){
				uni.navigateTo({
					url:`/subpagesHainan/photoUpload/details?detailId=${item.id}`
				})
			},
			
			// 上报点击
			reportClick(){
				uni.navigateTo({
					url:`/subpagesHainan/photoUpload/uploadForm`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.photoUpload{
	width: 100vw;
	min-height: 100vh;
	box-sizing: border-box;
}

.topBox{
	width: 100%;
	height: 208upx;
	box-sizing: border-box;
	padding: 0 0 0 48upx;
	display: flex;
	align-items: center;
	position: relative;
	background: #f4f8fb;
	
	.topIcon{
		width: 202upx;
		height: 208upx;
		position: absolute;
		right: 56upx;
		bottom: 0;
	}
}
.title{
	font-family: AlimamaShuHeiTi-Bold;
	font-size: 52upx;
	color: #020D1D;
	text{
		color: #1D76F2;
	}
}
.subtitle{
	font-family: SourceHanSans-Normal;
	font-size: 26upx;
	color: rgba(0,30,72,.6);
	margin-top: 16upx;
}

.listBox{
	width: 100%;
	box-sizing: border-box;
	padding: 0 32upx;
}

	.listItem {
		width: 100%;
		min-height: 268upx;
		border-radius: 16upx;
		background-color: #fff;
		margin-bottom: 28upx;
		box-sizing: border-box;
		padding: 32upx 0;
		display: flex;
		flex-direction: column;
		position: relative;


		.taskType {
			width: 128upx;
			height: 36upx;
			position: absolute;
			top: -2upx;
			right: 40upx;

			image {
				// width: 100%;
				height: 100%;
				will-change: transform;
			}

		}


		.eventNmeBox {
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin-bottom: 20upx;
			box-sizing: border-box;
			padding: 0 32upx;

			.eventNme {
				width: 100%;
				display: flex;
				align-items: center;

				.name {
					max-width: calc(100% - 132upx);
					font-family: SourceHanSans-Medium;
					font-size: 32upx;
					color: #212121;
					// @include fontSizeColor(32upx, rgba(0, 0, 0, .85))
				}

				::v-deep.u-tag--primary--plain {
					margin-right: 12upx !important;
				}

				::v-deep.u-tag--error {
					margin-left: 20upx;
				}
			}

			.sign {
				display: inline-block;
				min-width: 12%;
				text-align: right;
				font-size: 24upx;
				color: #ff4800;
			}

			.sign {
				color: orange;
			}
		}

		.itemTitle {
			font-family: SourceHanSans-Normal;
			font-size: 28upx;
			color: rgba(70, 75, 105, .59);
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: 0 32upx;
		}

		.itemTime {
			// @include fontSizeColor(28upx, rgba(10,38,80,.69));
			padding-bottom: 32upx;
			border-bottom: 2upx solid rgba(70, 75, 105, .10);

			image {
				width: 28upx;
				height: 28upx;
				margin-right: 16upx;
			}
		}

		.operate {
			padding-top: 18upx;

			.seat {
				display: flex;
				align-items: center;
				width: calc(100% - 160upx);

				.seatImg {
					width: 32upx !important;
					margin-right: 4upx;
				}

				.address {
					max-width: calc(100% - 36upx - 92upx);
					font-family: SourceHanSans-Normal;
					// @include fontSizeColor(28upx, rgba(23,100,250,.7))
				}

				.distance {
					width: 80upx;
					height: 36upx;
					background: rgba(23, 100, 250, .05);
					border-radius: 8rpx 8rpx 8rpx 8rpx;
					margin-left: 12upx;
					text-align: center;
					// @include fontSizeColor(24upx, $themeColor)
				}
			}
		}
	}

.reportBtn{
	width: 100%;
	height: 196upx;
	background: #FFFFFF;
	opacity: 1;
	box-sizing: border-box;
	padding: 24upx 32upx;
	box-shadow: 0px -2px 4px 1px rgba(0,0,0,0.04);
}
</style>
