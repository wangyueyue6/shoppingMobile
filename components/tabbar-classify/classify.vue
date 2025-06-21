<template>
    <view class="category-container" :style="{height: (contentHeight - 2) + 'rpx'}">
        <!-- 顶部搜索栏 -->
        <view class="search-bar">
            <view class="search-box">
                <u-icon name="search" color="#999999" size="26"></u-icon>
                <input class="search-input" placeholder="搜索商品" placeholder-class="placeholder"
                    @confirm="handleSearch" />
            </view>
        </view>

        <!-- 主体内容 -->
        <view class="main-content">
            <!-- 左侧分类导航 -->
            <scroll-view class="left-nav" :style="{height: (contentHeight - 106) + 'rpx'}" scroll-y :scroll-top="leftScrollTop">
                <view v-for="(item, index) in categories" :key="item.id" class="nav-item"
                    :class="{ active: currentCategory === index }" @click="changeCategory(index)">
                    {{ item.name }}
                </view>
            </scroll-view>

			<view class="right-box">
                <view class="type-box m-b-10  flex flex-middle">
                    <view class="type-item flex flex-middle">
                        <view
                            v-for="(item, index) in 3"
                            :key="index"
                            :class="{ currentTag: activeIndex === index }"
                            class="type-item-text"
                            @click="changeTab(index)"
                        >
                            分类{{ index }}
                        </view>
                    </view>
                    <view class="icon-info" @click="showPop = true"><u-icon name="arrow-down" color="#ccc" size="20"></u-icon></view>
                </view>

				<!-- 右侧内容区域 -->
				<scroll-view
                    class="right-content"
                    :style="{height: (contentHeight - 106 - 130) + 'rpx'}"
                    scroll-y
                    :scroll-top="rightScrollTop"
                    @scrolltolower="loadMore"
                >
				    <!-- 如果是分类 -->
				    <!-- <template v-if="showSubCategories">
				        <view class="sub-category-list">
				            <category-item 
				            v-for="sub in subCategories" 
				            :key="sub.id"
				            :item="sub"
				            @click="handleSubCategoryClick"
				            />
				        </view>
				        </template> -->
				
				    <!-- 如果是商品 -->
				    <template>
				        <view class="product-list">
				            <product-item v-for="product in products" :key="product.id" :product="product"
				                @click="handleProductClick" />
				        </view>
				
				        <!-- 加载更多 -->
				        <view class="load-more" v-if="loading">
				            <uni-load-more status="loading"></uni-load-more>
				        </view>
				        <view class="load-more" v-else-if="noMore">
				            没有更多了~
				        </view>
				    </template>
				</scroll-view>
			</view>
        </view>


        <u-popup :show="showPop" v-if="showPop" mode="top" :round="10" safeAreaInsetTop @close="closePop" style="position: absolute; top: 0; left: 0;">
            <view class="popup-box">
                <view class="search-box">
                    <u-icon name="search" color="#999999" size="26"></u-icon>
                    <input class="search-input" placeholder="搜索商品" placeholder-class="placeholder"
                        @confirm="handleSearch" />
                </view>
                <view class="tag-content">
                    <view>烧水壶</view>
                    <view class="tag-container"> 
                        <view
                            class="tag-item"
                            v-for="(item, index) in 7"
                            :key="index"
                            :class="{ popActive: popIndex === index }"
                            @click="popIndex = index"
                        >烧水壶</view>
                    </view>
                </view>
                <view class="text-pop flex flex-center flex-middle" @click="closePop">
                    点击收起<u-icon name="arrow-up" color="#999" size="16"></u-icon>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script>
import ProductItem from './productItem.vue'
import { getVisibleArea } from '@/utils/tool.js'
export default {
    name: 'Classify',
    components: {
        ProductItem
    },
    data() {
        return {
            currentCategory: 0,
            leftScrollTop: 0,
            rightScrollTop: 0,
            page: 1,
            pageSize: 10,
            loading: false,
            noMore: false,
            showSubCategories: true, // 默认显示子分类
            categories: [], // 一级分类
            subCategories: [], // 二级分类
            products: [], // 商品列表
            contentHeight: 0,
            activeIndex: 0, // 二级分类默认索引
            showPop: false,
            popIndex: 0
        }
    },
    props: {},
    computed: {

    },
    created() {
        this.initData()
    },
    mounted() {
        const height = getVisibleArea()
        // 去除顶部搜索框高度
        this.contentHeight = height
        uni.onWindowResize(() => {
            const height = getVisibleArea()
            this.contentHeight = height
        })
    },
    methods: {
        // 初始化数据
        initData() {
            this.generateCategories()
            this.generateSubCategories()
            this.generateProducts()
        },

        // 生成模拟的一级分类数据
        generateCategories() {
            const categories = []
            for (let i = 1; i <= 30; i++) {
                categories.push({
                    id: i,
                    name: `分类${i}`,
                    hasSub: i % 2 === 0 // 偶数分类有子分类
                })
            }
            this.categories = categories
        },

        // 生成模拟的二级分类数据
        generateSubCategories() {
            const subCategories = []
            for (let i = 1; i <= 12; i++) {
                subCategories.push({
                    id: i,
                    name: `子分类${i}`,
                    image: 'https://via.placeholder.com/100'
                })
            }
            this.subCategories = subCategories
        },

        // 生成模拟的商品数据
        generateProducts() {
            const products = []
            for (let i = 1; i <= 60; i++) {
                products.push({
                    id: i,
                    name: `商品${i}`,
                    price: (Math.random() * 100).toFixed(2),
                    image: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                    sales: Math.floor(Math.random() * 1000)
                })
            }
            this.products = products
        },

        // 切换一级分类
        changeCategory(index) {
            if (this.currentCategory === index) return

            this.currentCategory = index
            this.page = 1
            this.noMore = false
            this.rightScrollTop = 0

            // 模拟数据加载
            setTimeout(() => {
                this.showSubCategories = this.categories[index].hasSub
                if (this.showSubCategories) {
                    this.generateSubCategories()
                } else {
                    this.generateProducts()
                }
            }, 300)
        },

        changeTab (index) {
            this.activeIndex = index
        },

        // 加载更多
        loadMore() {
            console.log('加载更多');
            
            if (this.loading || this.noMore || this.showSubCategories) return

            this.loading = true
            setTimeout(() => {
                const newProducts = []
                for (let i = 1; i <= 6; i++) {
                    newProducts.push({
                        id: this.products.length + i,
                        name: `商品${this.products.length + i}`,
                        price: (Math.random() * 100).toFixed(2),
                        image: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                        sales: Math.floor(Math.random() * 1000)
                    })
                }
                this.products = [...this.products, ...newProducts]
                this.loading = false
                this.page++

                // 模拟没有更多数据
                if (this.page >= 3) {
                    this.noMore = true
                }
            }, 1000)
        },

        // 搜索
        handleSearch(e) {
            console.log('搜索:', e.detail.value)
            uni.showToast({
                title: `搜索: ${e.detail.value}`,
                icon: 'none'
            })
        },

        // 子分类点击
        handleSubCategoryClick(item) {
            console.log('点击子分类:', item)
            this.showSubCategories = false
            this.generateProducts()
        },

        // 商品点击
        handleProductClick(product) {
            console.log('点击商品:', product)
            uni.navigateTo({
                url: `/pages/product/detail?id=${product.id}`
            })
        },

        closePop () {
            this.showPop = false
        },
        // 下拉刷新,重新获取页面数据（父组件调用）
        reloadTab() {
            this.initData()
        }
    },
}
</script>

<style scoped lang="scss">
.category-container {
    display: flex;
    flex-direction: column;
    //   height: 100vh;
    flex: 1;
    background-color: #f7f7f7;
    overflow: hidden;

    .search-bar {
        background-color: #f9931f;
        /* 黄色背景 */
        padding: 20rpx;

        .search-box {
            display: flex;
            align-items: center;
            background-color: #fff;
            /* 白色搜索框 */
            border-radius: 50rpx;
            padding: 10rpx 10rpx;

            .search-input {
                flex: 1;
                height: 50rpx;
                font-size: 26rpx;
                margin-left: 14rpx;
            }

            .placeholder {
                color: #999;
            }
        }
    }

    .main-content {
        display: flex;
        flex: 1;
        overflow: hidden;

        .left-nav {
            width: 160rpx;
            background-color: #fff;

            .nav-item {
                height: 90rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 26rpx;
                color: #666666;
                border-left: 4rpx solid transparent;

                &.active {
                    background-color: #f7f7f7;
                    border-left-color: #f9931f;
                    color: #F8931F;
                    font-weight: bold;
                }
            }
        }

        .right-box {
            width: calc(100% - 160rpx - 60rpx);
            height: calc(100% - 60rpx);
            flex: 1;
            padding: 10rpx;
            margin: 20rpx 20rpx 20rpx 20rpx;
            background-color: #fff;
            border-radius: 12rpx;

            .type-box {
                position: relative;

                .type-item-text {
                    font-size: 26rpx;
                    color: #999999;
                    background-color: #f4f4f4;
                    min-width: 80rpx;
                    height: 50rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 24rpx;
                    border-radius: 100rpx;
                    margin-right: 10rpx;
                }

                .currentTag {
                    background-color: #feeedd;
                    color: #F8931F;
                }

                .icon-info {
                    position: absolute;
                    right: 6rpx;
                    top: calc(50% - 26rpx);
                    background-color: #f4f4f4;
                    width: 80rpx;
                    height: 50rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 70rpx;
                }
            }

            .right-content {
                flex: 1;
                overflow-y: auto;
    
                .sub-category-list {
                    display: flex;
                    flex-wrap: wrap;
                }
    
                .product-list {
                    display: flex;
                    flex-wrap: wrap;
                }
    
                .load-more {
                    text-align: center;
                    padding: 20rpx;
                    color: #999;
                    font-size: 24rpx;
                }
            }
        }

    }
}

.popup-box {
    padding: 20rpx;

    .search-box {
        display: flex;
        align-items: center;
        background-color: #f5f5f5;
        /* 白色搜索框 */
        border-radius: 50rpx;
        padding: 10rpx 10rpx;

        .search-input {
            flex: 1;
            height: 40rpx;
            font-size: 26rpx;
            margin-left: 14rpx;
        }

        .placeholder {
            color: #999;
        }
    }

    .tag-content {
        margin: 40rpx 0 30rpx 0;

        .tag-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20rpx;
            margin-top: 30rpx;
            
            .tag-item {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #f5f5f5;
                padding: 14rpx 0;
                color: #666;
                border-radius: 50rpx;
                font-size: 26rpx;
                transition: all 0.3s;
                
                &.popActive {
                    color: #f9931f;
                    background-color: #feeedd;
                    font-weight: bold;
                    box-sizing: border-box;
                    position: relative;

                    &::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        border: 2rpx solid #f9931f;
                        border-radius: 50rpx;
                    }
                }
            }
        }
        
    }
    .text-pop {
        color: #999;
        font-size: 24rpx;
        margin-top: 50rpx;
    }
}
</style>