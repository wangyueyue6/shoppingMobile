// 环境配置
const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

const config = {
  dev: {
    baseURL: 'http://192.168.1.16:8848/api',
    timeout: 5000
  },
  prod: {
    baseURL: 'https://api.example.com',
    timeout: 10000
  }
};

export default config[env];
export const baseURL = config[env].baseURL;