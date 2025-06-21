export const getVisibleArea = () => {
    let contentHeight
    // 获取系统信息
    uni.getSystemInfo({
        success: (res) => {
            const pxToRpxRatio = 750 / res.windowWidth
            // 计算可视区域高度（屏幕高度 - TabBar高度 - 状态栏高度）
            // 假设TabBar高度为50px
            const tabBarHeight = 50 * pxToRpxRatio
            const bottomSafeArea = res.safeAreaInsets && res.safeAreaInsets.bottom ?  res.safeAreaInsets.bottom : 0
            contentHeight = res.windowHeight * pxToRpxRatio - tabBarHeight - res.statusBarHeight * pxToRpxRatio - bottomSafeArea * pxToRpxRatio
        }
    })
    return contentHeight
};