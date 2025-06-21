import config from './config';

const token1 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTI2MzYzNzAsInRlbmFudElkIjoiMCIsImlkIjoiMSIsImdlbmVyYXRlZFRpbWUiOjE3NTAwNDQzNzA0MjMsImV4cGlyZWRUaW1lIjoxNzUyNjM2MzcwNDIzfQ.C_FGiahfhaOZQ7DyL3KZuvFrP2KTD28pK1GZmNzesrKdX9XhPtbic-6_hxg2X9TqUOU_YBxarkL4RSU2ZxrvKRsaSn3yndlcnLjHXvA8jnaZnwltw2-FDtArFNEZWLC71cla0l9ONMxO8PRYNmsQpFfaEQUu_Xhg1O5kFCnZlqWDhrcWLbBv2f8-qpd2glEXqr0lWBOaNkUMK3wzMJ_Sb3vMVoC0i8ODFfwSI3AVNidFBnK4zMLB7YdE7Rqphi8j71qayyoWRpZqSAAZdvyrhytjaGtdFD2ijxp7Zn-uwRbzor1bqu_TCjPzfiAoZh6IeD5zMqqx91uudLHEJV5W4g'

class HttpRequest {
    constructor() {
        this.queue = {}; // 请求队列（用于防止重复请求）
        this.baseURL = config.baseURL;
        this.timeout = config.timeout;
		this.isRefreshingToken = false;
        this.pendingRequests = []; // 等待中的请求队列
    }

    // 获取axios实例（uni-app中实际使用uni.request）
    getInstance() {
        const instance = uni.request;
        this.setInterceptors(instance);
        return instance;
    }

    // 设置拦截器
    setInterceptors(instance) {
        // 请求拦截
        instance.interceptors = {
            request: {
                use: (successFn, errorFn) => { 
                    // uni.request没有拦截器，需要手动处理
                }
            },
            response: {
                use: (successFn, errorFn) => {
                    // uni.request没有拦截器，需要手动处理
                }
            }
        };
    }

    // 实际请求方法（适配uni.request）
  async request(options) {
    // 防止重复请求
    const requestKey = `${options.method}-${options.url}-${JSON.stringify(options.data)}`;
    if (this.queue[requestKey]) {
      return Promise.reject(new Error('请勿重复请求'));
    }
    this.queue[requestKey] = true;

    // 添加token和默认请求头
    const token = token1 || uni.getStorageSync('token');
    options.header = options.header || {};
    if (token) {
		// `Bearer ${token}`
      options.header['authori-zation'] = `${token}`; // 修正拼写错误
    }
    
    // 设置默认Content-Type
    if (options.method && options.method.toUpperCase() === 'POST') {
      options.header['Content-Type'] = options.header['Content-Type'] || 'application/json';
    }

    // 完整URL
    options.url = this.baseURL + options.url;

    try {
      const response = await new Promise((resolve, reject) => {
        // 处理POST请求数据,对post请求序列化
        const requestData = options.method && options.method.toUpperCase() === 'POST' 
          ? JSON.stringify(options.data)
          : options.data;
        
        uni.request({
          ...options,
          data: requestData, // 确保POST请求数据被正确序列化
          success: (res) => {
            delete this.queue[requestKey];
			// 后期改0
            if (res.statusCode === 401) {
              this.handleTokenExpired(options, resolve, reject);
              return;
            }
			// 后期改1
            if (res.statusCode !== 200) {
              reject(new Error(res.data.message || `请求失败: ${res.statusCode}`));
              return;
            }
            resolve(res.data);
          },
          fail: (err) => {
            delete this.queue[requestKey];
            reject(err);
          }
        });
      });
      
      return response;
    } catch (error) {
		// 后期改2
      if (error.message !== '请勿重复请求') {
        uni.showToast({
          title: error.message || '请求失败',
          icon: 'none'
        });
      }
      throw error;
    }
  }

    // Token过期处理
    handleTokenExpired(originalRequest, resolve, reject) {
        if (this.isRefreshingToken) {
            // 如果正在刷新，将请求存入队列
            return this.pendingRequests.push({ originalRequest, resolve, reject });
        }

        this.isRefreshingToken = true;

        uni.showModal({
            title: '提示',
            content: '登录已过期，请重新登录',
            showCancel: false,
            success: () => {
                uni.navigateTo({ url: '/pages/login/login' });
                this.isRefreshingToken = false;
                this.pendingRequests = [];
            },
            fail: () => {
                this.isRefreshingToken = false;
                reject(new Error('登录已过期'));
            }
        });
    }

    // GET请求
    get(url, params = {}, options = {}) {
        return this.request({
            url,
            data: params,
            method: 'GET',
            ...options
        });
    }

    // POST请求
    post(url, data = {}, options = {}) {
        return this.request({
            url,
            data,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                ...options.header
            },
            ...options
        });
    }
}

// 导出单例实例
const http = new HttpRequest();
export default http;