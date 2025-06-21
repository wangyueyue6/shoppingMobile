<template>
	<view class="home small">
		哈哈哈哈哈哈
		<view class="m-b-10">
			<UploadImg
				:list="imgsList"
				:isMultiple="true"
				:maxCount="5"
				:acceptType="accept"
				@getImgList="getImgList"
			/>
		</view>
        <view class="m-b-20" @click="jumpFun" style="width: 100rpx;background-color: blue;">
            点我跳转
        </view>
		<view class="m-b-20" @click="onClick">
			弹窗
		</view>
		<view class="m-b-20" style="width: 300rpx;background-color: red;color: #fff;font-size: 30rpx;padding: 20rpx 0;" @click="jumpSver">
			客服
		</view>
		<view class="footer">
			我是底部
		</view>
	</view>
</template>

<script>
	import UploadImg from '@/components/upload/index.vue'
	import {fetchData} from '@/api/login.js'
	export default {
		name: 'Home',
		components: {
			UploadImg
		},
		data() {
			return {
				accept: 'image, file',
				imgsList: [{url: 'https://meichuangyx-test.oss-cn-hangzhou.aliyuncs.com/ADMIN/34455c99-bfbe-4773-bb25-9a4022855bcb.jpg'}]
			}
		},
		props: {},
		computed: {
			
		},
		created() {
			
		},
		mounted() {
			const params = {
				accountNo: '',
				password: '',
				tenantCode: ''
			}
			fetchData('/account/user-profile', {}).then(res => {
				console.log('==========>>>', res);
			})
		},
		methods: {
			jumpSver () {
				uni.navigateTo({
					url: '/pages/service/index'
				})
			},
			onClick () {
				uni.showActionSheet({
					itemList: ['图片', '视频'],
					success: function(res) {
						if (res.tapIndex == 0) {
							// 图片
							that.$refs.img.chooseFile()
							that.uploadIndex = 0
						}
						if (res.tapIndex == 1) {
							// 视频
							that.$refs.video.chooseFile()
							that.uploadIndex = 1
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
            jumpFun () {
                uni.navigateTo({
                    url:`/pages/demo/index`
                })
            },
			getImgList (e) {
				console.log('获取图片集合', e);
				this.imgsList = [...e]
			},
			// 下拉刷新,重新获取页面数据（父组件调用）
			reloadTab() {
				
			}
		},
	}
</script>

<style scoped lang="scss">
	.home {
		height: 120vh;
		position: relative;
		padding-bottom: 40rpx;
		
		
		.footer {
			position: absolute;
			bottom: 0;
			left: 50%;
		}
	}
</style>