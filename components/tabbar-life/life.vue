<template>
    <view class="home">
        生活圈
    </view>
</template>

<script>
export default {
    name: 'Life',
    components: {
    },
    data() {
        return {
            
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