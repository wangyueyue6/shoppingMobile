
<!-- 基层网格治理app（公众服务应用版）- 小秘书页面 -->
<template>
	<view class="robotBox">
		<!-- 自定义导航栏 -->
		<NavBar :scrollTop="scrollTop" />
		<!-- 顶部图片部分 -->
		<view class="topBox">
			<image src="../../static/imgs/robot.png" mode=""></image>
			<view class="titleBox">
				<view class="title">
					Hi~,我是您的专属客服！
				</view>
				<view class="subtitle">
					小秘书为您服务
				</view>
			</view>
		</view>
		<!-- 对话部分 -->
		<view class="dialogueBox">
			<!-- 聊天组件 -->
			<chat></chat>
		</view>
	</view>
</template>

<script>
	import chat from '@/components/chat/index.vue'
	import NavBar from '@/components/nvabar/inde.vue'
	export default {
		components:{
			chat,
			NavBar
		},
		data() {
			return {
				scrollTop:0
			};
		}
	}
</script>

<style lang="scss">
.robotBox{
	width: 100vw;
	height: 100vh;
}
.topBox{
	width: 100%;
	display: flex;
	align-items: center;
	image{
		width: 160upx;
		height: 164upx;
	}
	box-sizing: border-box;
	padding:32upx 32upx 0;
}

.titleBox{
	margin-left: 42upx;
	.title{
		font-family: SourceHanSans-Medium;
		font-size: 40upx;
		color: #212121;
		margin-bottom: 14upx;
	}
	.subtitle{
		font-family: SourceHanSans-Normal;
		font-size: 28upx;
		color: rgba(33,33,33,.6);
	}
}

.dialogueBox{
	width: 100%;
	//  #ifdef H5
	height: calc(100% - 282upx);
	 // #endif
	//  #ifdef MP-WEIXIN
	height: calc(100% - 400upx);
	 // #endif
	background-color: #F8F9FC;
	border-radius: 40upx 40upx 0 0;
}
</style>
