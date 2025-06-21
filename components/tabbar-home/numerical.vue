<template>
    <view class="numerical">
        <view class="top-img"></view>
		<activeProduct :productList="productList" />
    </view>
</template>

<script>
	import activeProduct from '../active-product/index.vue'
export default {
    name: 'Numerical',
    components: {
		activeProduct
    },
	props: {
		productList: {
		    type: Array,
		    default: () => [
		        {
		           img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
		           title: '李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈',
		            money: 256,
		            oldMoney: 9999
		        },
		        {
		           img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
		           title: '李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈',
		            money: 256,
		            oldMoney: 9999
		        },
		        {
		           img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
		           title: '李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈',
		            money: 256,
		            oldMoney: 9999
		        },
		        {
		           img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
		           title: '李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈',
		            money: 256,
		            oldMoney: 9999
		        },
		        {
		           img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
		           title: '李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈李宁休闲鞋耐磨访华著称情侣时尚中帮哈哈哈',
		            money: 256,
		            oldMoney: 9999
		        },
		    ]
		}
	},
    data() {
        return {
            
        }
    },
    computed: {

    },
    created() {

    },
    mounted() {
        
    },
    methods: {
        // 下拉刷新,重新获取页面数据（父组件调用）
        reloadTab() {

        }
    },
}
</script>

<style scoped lang="scss">
.numerical {
	width: calc(100% - 0rpx);
	background-color: #fff;
	border-radius: 20rpx;
	
	.top-img {
		background-image: url('../../static/home/shu_ma.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 100%;
		height: 260rpx;
		margin-bottom: 20rpx;
	}
}
</style>