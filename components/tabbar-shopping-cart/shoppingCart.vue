<template>
    <view class="shoppingCart-page" :style="{height: (contentHeight - 2) + 'rpx'}">
        <view class="top-box flex flex-between">
        	<view class="">
        		共<text style="color: #fd8d11;margin: 0 4rpx;">{{ selectNum }}</text>件商品
        	</view>
			 <view class="manage-text" :class="{manageBox: isClick}" @click="onclick">管理</view>
        </view>
		<scroll-view class="content-box" scroll-y="true" :style="{height: (contentHeight - 2 - 230) + 'rpx'}">
			<goodsListVue :goodsList="goodsList" @updateList="updateList" />
			<u-divider
				v-if="goodsList.length > 0"
				text="没有更多内容拉~"
				textColor="#ACACAC"
				lineColor="transparent"
			></u-divider>
			<view class="no-data" v-if="goodsList.length == 0">
				<u-empty
					mode="car"
					text="您的购物车空空如也~"
				>
				</u-empty>
			</view>
		</scroll-view>
		<view class="bottom-box" :style="{bottom: bottomHeight + 'rpx'}">
			<view class="flex flex-between flex-middle" v-if="isClick">
				<view class="flex-one" @click.stop="onSelectAll('manage')" >
					<u-radio-group v-model="selectAll" style="pointer-events: none" :disabled="goodsList.length == 0">
						<u-radio shape="circle" :name="true" label="全选" activeColor="#f9931f"></u-radio>
					</u-radio-group>
				</view>
				<u-button
					type="primary"
					shape="circle"
					text="删除"
					color="#f9931f"
					customStyle="width: 210rpx; height: 70rpx;"
					@click="handleDelete"
				></u-button>
			</view>
			<view class="flex flex-between" v-else>
				<view class="cart-btn flex flex-middle">
					<view class="" @click.stop="onSelectAll('cart')">
						<u-radio-group v-model="selectAll" style="pointer-events: none" :disabled="goodsList.length == 0">
							<u-radio shape="circle" :name="true" label="全选" activeColor="#f9931f"></u-radio>
						</u-radio-group>
					</view>
					<view class="total-box flex">
						<text>合计：</text>
						<view class="flex" style="align-items: baseline;margin-bottom: 4rpx;">
							<text class="t-icon">¥</text>
							<text class="t-money">68.29</text>
						</view>
					</view>
				</view>
				<u-button
                    type="primary"
                    shape="circle"
                    :text="`${selectNum > 0 ? `去结算(${selectNum})` : '去结算'}`"
                    color="#f9931f"
                    customStyle="width: 210rpx; height: 70rpx;"
                    @click="handleGoPay"
                ></u-button>
			</view>
		</view>
    </view>
</template>

<script>
	import goodsListVue from './goodsList.vue'
	import { getVisibleArea } from '@/utils/tool.js'
export default {
    name: 'ShoppingCart',
    components: {
		goodsListVue
    },
    data() {
        return {
            selectNum: 0,
			isClick: false,
			contentHeight: 0,
			bottomHeight: 0,
			selectAll: false,
			goodsList: [
				{
					 img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
					 title: '古驰真皮垃圾小皮包哈哈哈哈哈哈哈哈哈哈看看看看',
					 money: 89,
					 num: 1,
					 isSlect: true,
				},
				{
					 img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
					 title: '古驰真皮垃圾小皮包哈哈哈哈哈哈哈哈哈哈看看看看',
					 money: 89,
					 num: 1,
					 isSlect: false,
				},
				{
					 img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
					 title: '古驰真皮垃圾小皮包哈哈哈哈哈哈哈哈哈哈看看看看',
					 money: 89,
					 num: 1,
					 isSlect: false,
				}
			]
        }
    },
    props: {},
    computed: {

    },
    created() {

    },
    mounted() {
        this.getContentHeight()
        // 去除顶部搜索框高度
        uni.onWindowResize(() => {
           this.getContentHeight()
        })
    },
    methods: {
        // 结算
        handleGoPay () {
            if (this.selectNum === 0) return uni.showToast({
                title: '请选择商品',
                icon: 'none'
            })
        },
		// 删除
		handleDelete () {
			if (this.selectNum === 0) return uni.showToast({
			    title: '请选择商品',
			    icon: 'none'
			})
			this.goodsList = this.goodsList.filter(item => !item.isSlect);
			this.selectAll = false
			this.getCount()
		},

		updateList (index) {
			const newList = [...this.goodsList]
			newList[index].isSlect = !newList[index].isSlect
			this.goodsList = newList
			this.selectAll = this.goodsList.every(item => item.isSlect === true)
			this.getCount()
		},
		
		// 全选切换
		onSelectAll (type) {
			if (!this.goodsList.length) return
			this.selectAll = !this.selectAll
			this.goodsList = this.goodsList.map(o => {
				return {
					...o,
					isSlect: this.selectAll
				}
			})
			this.getCount()
		},
		
		getCount () {
			const count = this.goodsList.filter(item => item.isSlect === true).length
			this.selectNum = count
		},
		
		getContentHeight () {
			uni.getSystemInfo({
			    success: (res) => {
			        const pxToRpxRatio = 750 / res.windowWidth
			        // 计算可视区域高度（屏幕高度 - TabBar高度 - 状态栏高度）
			        // 假设TabBar高度为50px
			        const tabBarHeight = 50 * pxToRpxRatio
			        const bottomSafeArea = res.safeAreaInsets && res.safeAreaInsets.bottom ?  res.safeAreaInsets.bottom : 0
			        this.contentHeight = res.windowHeight * pxToRpxRatio - tabBarHeight - res.statusBarHeight * pxToRpxRatio - bottomSafeArea * pxToRpxRatio
					this.bottomHeight = tabBarHeight + bottomSafeArea * pxToRpxRatio
			    }
			})
		},
		// 点击管理按钮
		onclick () {
			this.isClick = !this.isClick
			this.selectAll = false
			this.goodsList = this.goodsList.map(o => {
				return {
					...o,
					isSlect: false
				}
			})
			this.selectNum = 0
		},
        // 下拉刷新,重新获取页面数据（父组件调用）
        reloadTab() {

        }
    },
}
</script>

<style scoped lang="scss">
.shoppingCart-page {
	background-color: #f1f4f7;
	overflow: hidden;
	flex: 1;
    
	.top-box {
		width: calc(100% - 40rpx);
		background-color: #fff;
		padding: 30rpx 20rpx 20rpx 20rpx;
		margin-bottom: 20rpx;
		font-size: 28rpx;
		
		.manage-text {
			padding-left: 20rpx;
		}
		
		.manageBox {
			color: #fd8d11;
		}
	}
	
	.content-box {
		padding-bottom: 30rpx;
	}
	
	.no-data {
		width: 100%;
		height: 60vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
    .bottom-box {
		background-color: #fff;
		position: fixed;
		left: 0;
		width: calc(100% - 40rpx);
		padding: 20rpx 20rpx;
		
		.cart-btn {
			width: 100%;
			
			.total-box {
				margin-left: 20rpx;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				
				.t-icon {
					font-size: 22rpx;
					color: #E44E45;
				}
				
				.t-money {
					font-size: 38rpx;
					color: #E44E45;
					font-weight: bolder;
				}
			}
		}
	}
}
</style>