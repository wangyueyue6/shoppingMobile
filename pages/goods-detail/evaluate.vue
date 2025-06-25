<template>
	<view class="user-data">
		<view class="top-info flex flex-between flex-middle">
			<image :src="item.img" mode=""></image>
			<view class="top-right">
				<view class="flex flex-between flex-middle" style="width: 100%;">
					<view class="title">
						{{ item.title }}
					</view>
					<view class="time">{{ item.time }}</view>
				</view>
				<view class="">
					{{ item.type }}
				</view>
			</view>
		</view>
		<view class="desc">
			{{ item.desc }}
		</view>
		<view class="view-img">
			<image
				v-for="(url, index) in item.imgList"
				:key="index"
				:src="url"
				class="img-item"
			></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Evaluate',
		data() {
			return {
			}
		},
		props: {
			item: {
				type: Object,
				default: () => ({
					img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
					title: '超甜的布丁',
					time: '2025/12/12',
					type: '纯色秋装连帽外套春秋款木灰色  XXL',
					desc: '材质特性：这件衣服穿起来贼难受材质特性：这件衣服穿起来贼难受材质特性：这件衣服穿起来贼难受',
					imgList: [
						'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
						'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
						'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
					]
				})
			}
		},
		computed: {
			
		},
		created() {

		},
		mounted() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.user-data {
	// margin-bottom: 30rpx;
	// border-bottom: 2rpx solid #f6f6f6;
	// padding-bottom: 30rpx;
	
	.top-info {
		width: 100%;
		
		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
		}
		
		.top-right {
			width: calc(100% - 120rpx);
			margin-left: 20rpx;
			color: #999;
			
			.title {
				font-size: 30rpx;
				color: #333;
				font-weight: bolder;
				width: 66%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			
			.time {
				font-size: 22rpx;
			}
			
			:last-child {
				font-size: 24rpx;
				margin-top: 6rpx;
			}
		}
	}
	
	.desc {
		width: 100%;
		margin: 16rpx 0;
		color: #333333;
		font-size: 28rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 6;  /* 限制显示 2 行 */
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.view-img {
		display: grid;
		grid-template-columns: repeat(3, 1fr); /* 一行三列 */
		gap: 20rpx; /* 商品间距 */
		box-sizing: border-box;
		
		.img-item {
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			aspect-ratio: 1;
			height: auto;
			object-fit: cover;
			border-radius: 20rpx;
		}
	}
}
</style>

