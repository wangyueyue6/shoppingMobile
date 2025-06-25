<template>
    <view class="goods-box">
		<view class="goods-item flex flex-middle flex-between" v-for="(item, index) in goodsList" :key="index">
			<view class="left-radio" @click.stop="onSelect(item, index)">
				<u-radio-group v-model="item.isSlect" style="pointer-events: none">
					<u-radio shape="circle" :name="true" activeColor="#f9931f"></u-radio>
				</u-radio-group>
			</view>
			<view class="right-box flex">
				<image class="goods-img" :src="item.img" mode="aspectFill"></image>
				<view class="goods-content flex">
					<view class="title">{{index}}{{ item.title }}</view>
					<view class="flex flex-between wei-zhi">
						<view class="m-info flex">
							<text class="m-icon">¥</text>
							<text>{{ item.money }}</text>
						</view>
						<u-number-box v-model="item.num" inputWidth="28" bgColor="#fff" min="1" @change="valChange">
							<view
								slot="minus"
								class="minus"
								:class="{bgInfo: item.num == 1}"
							>
								<u-icon
									name="minus"
									size="12"
									color="#939393"
								></u-icon>
							</view>
							<view
								slot="plus"
								class="plus"
							>
								<u-icon
									name="plus"
									color="#939393"
									size="12"
								></u-icon>
							</view>
						</u-number-box>
					</view>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
export default {
    name: 'ShoppingCart',
    components: {
    },
    data() {
        return {
            
        }
    },
    props: {
		goodsList: {
			type: Array,
			 default: () => []
		}
	},
    computed: {
		goodsData (){
			return [...this.goodsList]
		}
    },
    created() {
		
    },
    mounted() {
        
    },
    methods: {
        onSelect(item, index) {
			this.$emit('updateList', index)
        },
		
		valChange () {
			
		}
    },
}
</script>

<style scoped lang="scss">
.goods-box {

    .goods-item {
		margin-bottom: 20rpx;
		width: calc(100% - 0rpx);
		
		.left-radio {
			padding: 20rpx 0rpx 20rpx 20rpx;
		}
		
		.right-box {
			width: calc(100% - 140rpx);
			background-color: #fff;
			padding: 20rpx;
			border-radius: 12rpx;
			margin-right: 20rpx;
			
			.goods-img {
				width: 140rpx;
				height: 140rpx;
				flex-shrink: 0;
				border-radius: 12rpx;
			}
			
			.goods-content {
				width: calc(100% - 150rpx);
				margin-left: 10rpx;
				justify-content: space-between;
				flex-direction: column;
				
				.title {
					font-size: 28rpx;
					white-space: nowrap;            /* 禁止换行 */
					    overflow: hidden;              /* 隐藏超出部分 */
					text-overflow: ellipsis;
					width: 100%;
				}
				
				.wei-zhi {
					align-items: flex-end;
				}
				
				.m-info {
					font-size: 34rpx;
					color: #d85b53;
					font-weight: bolder;
					align-items: baseline;
					
					.m-icon {
						font-size: 22rpx;
						font-weight: normal;
						margin-right: 4rpx;
					}
				}
			}
		}
	}
	
	.minus, .plus {
		width: 24rpx;
		height: 24rpx;
		background-color: #ebecee;
		padding: 6rpx 6rpx;
		border-radius: 4rpx;
	}
	
	.bgInfo {
		background-color: #f7f8fa;
	}
}
</style>