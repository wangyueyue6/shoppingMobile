<template>
	<view>
		<u-navbar fixed safeAreaInsetTop :placeholder="placeholder" :title="title" :title-style="titleStyle" :leftText="leftText" :autoBack="showBack"
			:leftIcon="showBack ? 'arrow-left': ''" :border="false" :bgColor="`rgb(255 255 255 / ${isScrollTop}%)`">
			<view class="u-nav-slot" slot="right">
				<view class="rightItem" v-for="(item,index) in rightText" :key="index" @click="rightClick(item,index)">{{item}}</view>
			</view>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		name: 'NavBar',
		data() {
			return {
				showBack: false
			}
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			titleStyle:{
				type:Object,
				default:()=>{
					return{
						'fontSize':'34rpx',
						'color':'#000'
					}
				}
			},
			scrollTop: {
				type: Number,
				default: 100
			},
			placeholder: {
				type: Boolean,
				default: true
			},
			rightText: {
				type: Array,
				default: () => {
					return []
				}
			},
			leftText:{
				type:String,
				default:''
			}
		},
		computed: {
			isScrollTop() {
				return this.scrollTop > 100 ? 100 : this.scrollTop / 1
			}
		},
		created() {

		},
		mounted() {
			let pages = getCurrentPages();
			// 判断有没有上个页面
			if (pages.length >= 2) {
				// 显示返回按钮
				this.showBack = true
			}
		},
		methods: {
			// 预测点击
			rightClick(item,index){
				let data = {
					item:item,
					index:index
				}
				this.$emit('rightClick',data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep.u-navbar__content__title {
		// @include fontSizeColor(36upx, #000)
	}
	::v-deep.u-navbar__content__left__text{
		// @include fontSizeColor(36upx, #0A2650)
	}
	.u-nav-slot{
		.rightItem{
			width: 124upx;
			height: 56upx;
			text-align: center;
			line-height: 56upx;
			// @include fontSizeColor(32upx,$themeColor)
			background: rgba(149,185,250,.40);
			border-radius: 28rpx 28rpx 28rpx 28rpx;
			margin-left: 4upx;
		}
	}
</style>

