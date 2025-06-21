import http from '@/utils/http.js';

export const getUserInfo = (params) => {
  return http.get('/user/info', params, {
    returnFullResponse: true // 可选：需要完整响应时开启
  });
};

export const login = (data) => {
  return http.post('/auth/login', data);
};

// 支持动态 method 的调用
export const fetchData = (url, data) => {
  return http.request({
    url,
    method: 'get', // 允许传入 GET/POST/PUT/DELETE 等
    data
  });
};