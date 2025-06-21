<template>
    <view class="home">
        <view class="top-search">
        	<view class="search-box">
        	    <u-icon name="search" color="#999999" size="26"></u-icon>
        	    <input class="search-input" placeholder="搜索商品" placeholder-class="placeholder"
        	        @confirm="handleSearch" />
        	</view>
        </view>
        <!-- 轮播 -->
		<view class="swiper-box">
			<u-swiper :list="list" indicator indicatorMode="line" circular height="300rpx"></u-swiper>
		</view>
        <!-- 功能 -->
		<view class="grid-container">
			<view class="grid-item" v-for="(item, index) in activeList"  :key="index">
				<image class="item-image" :src="item.icon" mode="widthFix"></image>
				<view class="item-name">
					{{ item.name }}
				</view>
			</view>
		</view>
        <!-- 限时秒杀 -->
        <view class="module-box">
            <Seckill />
        </view>
		<!-- 限时抢购 -->
		<view class="module-box margin-t">
			<SnaggingShopping />
		</view>
		<!-- 数码产品 -->
		<view class="module-box margin-t">
			<Numerical />
		</view>
		<!-- 大牌美妆 -->
		<view class="module-box margin-t">
			<BeautyMakeup />
		</view>
        <!-- 生鲜好货 -->
		<view class="module-box margin-t">
			<Fresh />
		</view>
    </view>
</template>

<script>
import { activeList } from './config.js'
import Seckill from './seckill.vue'
import SnaggingShopping from './snagging-shopping.vue'
import Numerical from './numerical.vue'
import BeautyMakeup from './beautyMakeup.vue'
import Fresh from './fresh.vue'
export default {
    name: 'Home',
    components: {
        Seckill,
		SnaggingShopping,
		Numerical,
        BeautyMakeup,
        Fresh
    },
    data() {
        return {
            list: [
				'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
				'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
				'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
			],
			
			activeList: activeList
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
        handleSearch(e) {
            
        },
        // 下拉刷新,重新获取页面数据（父组件调用）
        reloadTab() {

        },
    },
}
</script>

<style scoped lang="scss">
.home {
    position: relative;
    padding-bottom: 40rpx;
	
	.top-search {
		width: 100%;
		height: 360rpx;
		background-image: url('../../static/home/top_bg.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: relative;
		
		.search-box {
			position: absolute;
			top: 30rpx;
			right: 24rpx;
			width: 68%;
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
	
	.swiper-box {
		width: calc(100% - 48rpx);
		margin: -190rpx 24rpx 0 24rpx;
	}
	
	.grid-container {
		margin-top: 40rpx;
	  display: grid;
	  grid-template-columns: repeat(5, 1fr); /* 5 columns */
	  gap: 20rpx; /* spacing between items */
	  padding: 20rpx;
	  
	  .grid-item {
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    justify-content: center;
		margin-bottom: 20rpx;
		
		.item-image {
		  width: 80%;
		  height: auto;
		  aspect-ratio: 1; /* makes images square */
		  object-fit: contain;
		}
		
		.item-name {
		  margin-top: 10rpx;
		  text-align: center;
		  font-size: 26rpx;
		  color: #333333;
		  word-break: break-word; /* ensures long text breaks properly */
		}
	  }
	}
	
	.module-box {
		width: calc(100% - 48rpx);
		margin: 0rpx 24rpx;
	}
	
	.margin-t {
		margin-top: 20rpx;
	}
}
</style>