<template>
	<view>
		<u-upload
		  :fileList="fileList"
		  @afterRead="afterRead"
		  @delete="deletePic"
		  name="up"
		  :capture="capture"
		  :multiple="isMultiple"
		  :maxCount="maxCount"
		  :accept="acceptType"
		></u-upload>
	</view>
</template>

<script>
	import { baseURL } from '../../utils/config'
	export default {
		name: 'Upload',
		data() {
			return {
				fileList: [],
				token1: '', // 测试用，后期删除
				capture: 'album' //, 'camera'
			}
		},
		props: {
			// 上传图片数量限制
			maxCount: {
				type: Number,
				default: 1
			},
			// 上传时是否支持多选
			isMultiple: {
				type: Boolean,
				default: false,
			},
			acceptType: {
				type: String,
				default: 'image'
			},
			list: {
				type: Array,
				default: () => []
			}
		},
		computed: {
			
		},
		created() {

		},
		mounted() {
			this.token1 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTI2MzYzNzAsInRlbmFudElkIjoiMCIsImlkIjoiMSIsImdlbmVyYXRlZFRpbWUiOjE3NTAwNDQzNzA0MjMsImV4cGlyZWRUaW1lIjoxNzUyNjM2MzcwNDIzfQ.C_FGiahfhaOZQ7DyL3KZuvFrP2KTD28pK1GZmNzesrKdX9XhPtbic-6_hxg2X9TqUOU_YBxarkL4RSU2ZxrvKRsaSn3yndlcnLjHXvA8jnaZnwltw2-FDtArFNEZWLC71cla0l9ONMxO8PRYNmsQpFfaEQUu_Xhg1O5kFCnZlqWDhrcWLbBv2f8-qpd2glEXqr0lWBOaNkUMK3wzMJ_Sb3vMVoC0i8ODFfwSI3AVNidFBnK4zMLB7YdE7Rqphi8j71qayyoWRpZqSAAZdvyrhytjaGtdFD2ijxp7Zn-uwRbzor1bqu_TCjPzfiAoZh6IeD5zMqqx91uudLHEJV5W4g'
		},
		watch: {
			list: {
				handler(val) {
					if (val) this.fileList = JSON.parse(JSON.stringify(val))
				},
				deep: true,
				immediate: true
			}
		} ,
		methods: {
			// 新增图片
		  async afterRead(event) {
			// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
			
			let lists = []
			if (this.isMultiple) {
				lists = lists.concat(event.file)
			} else {
				lists = [event.file]
			}
			let fileListLen = this.fileList.length;
			lists.map((item) => {
			  this.fileList.push({
				...item,
				status: "uploading",
				message: "上传中",
			  });
			});
			for (let i = 0; i < lists.length; i++) {
			  const result = await this.uploadFilePromise(lists[i].url);
			  let item = this.fileList[fileListLen];
			  this.fileList.splice(
				fileListLen,
				1,
				Object.assign(item, {
				  status: "success",
				  message: "上传成功",
				  url: result,
				})
			  );
			  fileListLen++;
			}
			let imgs = []
			this.fileList.forEach(o => {
				imgs.push({url: o.url})
			})
			this.$emit('getImgList', imgs)
		  },
		  // 上传图片
		  uploadFilePromise(url) {
			return new Promise((resolve, reject) => {
			  let a = uni.uploadFile({
				url: `${baseURL}/default/oss/upload`,
				filePath: url,
				name: "file",
				header: {
					'authori-zation': this.token1,
				},
				success: (res) => {
					const data = res.data ? JSON.parse(res.data) : null
					if (data) {
						uni.showToast({
							title: '上传成功'
						})
						resolve(data ? data.data : '');
					} else {
						uni.showToast({
							title: '上传失败，请重新上传！',
							icon: 'none'
						})
						reject('')
					}
				},
			  });
			});
		  },
		  // 删除图片
			deletePic (event) {
				this.fileList.splice(event.index, 1);
				const list = this.fileList.map(item => ({ url: item.url || '' }));
				this.$emit('getImgList', list)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>

