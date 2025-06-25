<template>
	<view class="home-page">
		<!-- :style="{height: contentHeight + 'rpx'}" -->
		<view class="content">
			<Home ref="page-home" v-if="activeTab == 0" />
			<Classify ref="type" v-if="activeTab == 1" />
			<Life ref="life" v-if="activeTab == 2" />
			<ShoppingCart ref="shopping-cart" v-if="activeTab == 3" />
			<My ref="my" v-if="activeTab == 4" />
		</view>
		
		<u-tabbar
		  :value="activeTab"
		  :fixed="true"
		  activeColor="#F8931F"
		  inactiveColor="#333333 "
		  :safeAreaInsetBottom="true"
		  @change="changeTab"
		>
			<template v-for="(item, index) in tabbar">
				<u-tabbar-item :text="item.name" :key="index">
				  <image
				  	class="u-page__item__slot-icon img-box"
				  	slot="active-icon"
				  	:src="item.activeUrl"
				  />
				  <image
				  	class="u-page__item__slot-icon img-box"
				  	slot="inactive-icon"
				  	:src="item.defaultUrl"
				  />
				</u-tabbar-item>
			</template>
		</u-tabbar>
	</view>
</template>

<script>
	import Home from '@/components/tabbar-home/home.vue'
	import Classify from '@/components/tabbar-classify/classify.vue'
	import Life from '@/components/tabbar-life/life.vue'
	import ShoppingCart from '@/components/tabbar-shopping-cart/shoppingCart.vue'
	import My from '@/components/tabbar-my/my.vue'

	import { getVisibleArea } from '@/utils/tool.js'
	export default {
		components: {
			Home,
			Classify,
			Life,
			ShoppingCart,
			My
		},
		data() {
			return {
				tabbar: [
					  {
						id: 'page-home',
						name: '首页',
						activeUrl: '/static/tabbar/home1.png',
						defaultUrl: '/static/tabbar/home2.png'
					  },
					  {
						id: 'type',
						name: '分类',
						activeUrl: '/static/tabbar/type1.png',
						defaultUrl: '/static/tabbar/type2.png'
					  },
					  {
						id: 'life',
						name: '生活圈',
						activeUrl: '/static/tabbar/life1.png',
						defaultUrl: '/static/tabbar/life2.png'
						
					  },
					  {
						id: 'shopping-cart',
						name: '购物车',
						activeUrl: '/static/tabbar/shopping1.png',
						defaultUrl: '/static/tabbar/shopping2.png'
					  },
					  {
						id: 'my-info',
						name: '我的',
						activeUrl: '/static/tabbar/my1.png',
						defaultUrl: '/static/tabbar/my2.png'
					  },
				],
				activeTab: 0,
				contentHeight: 0,
				scrollTop: 0
			}
		},
		onLoad() {

		},
		mounted() {
			const height = getVisibleArea()
			this.contentHeight = height
			uni.onWindowResize(() => {
				const height = getVisibleArea()
				this.contentHeight = height
			})
		},
		methods: {
			changeTab (e) {
				this.activeTab = e
				uni.setNavigationBarTitle({
					title: this.tabbar[e].name
				})
			},
		},
		
		//监听用户页面滑动
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
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

<style>
	.home-page {
		width: 100%;
		min-height: 100vh;
		background-color: #f1f4f7;
	}
	
	.content {
		flex: 1;
		  overflow-y: auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.img-box {
		width: 50rpx;
		height: 50rpx;
	}
</style>
