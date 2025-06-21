<template>
    <!-- 聊天界面 -->
    <view class="chat-box" id="chat-box">
          <scroll-view class="scroll-view" id="scroll-view"  :scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="true">
              <view class="msg-box" id="msg-box">
                <view
                  v-for="(i, index) in list"
                  :key="index"
                  class="msg"
                  :style="i.userId == userId ? 'flex-direction:row-reverse' : ''"
                >
                  <view class="user-head">
                          <!-- 头像部分 -->
                    <view class="head"></view>
                  </view>
                  <view class="user-msg">
                    <span
                      :style="i.userId == userId ? ' float: right;' : ''"
                      :class="i.userId == userId ? 'right' : 'left'"
                      >{{ i.content }}</span
                    >
                  </view>
                </view>
              </view>
          </scroll-view>
          
  
      <view class="input-box">
        <input
          type="text"
          placeholder="输入发送内容"
          v-model="contentText"
          @keyup.enter="sendText()"
        />
        <view
          class="btn"
          :class="{ ['btn-active']: contentText }"
          @click="sendText()"
        >
          发送
        </view>
      </view>
    </view>
  </template>
  
  <script>
  export default {
      name:"chat",
    props: {
      openView: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        ws: null,
        count: 0,
        userId: null, //当前用户ID
        list: [
                  {
                      userId: '000',
                      content: '您好，有什么可以帮您？',
                  },
              ], //聊天记录的数组
        contentText: "", //input输入的值
              
              socketTask:null,
              is_open_socket:false,
              scrollTop:0,//滚动条位置
              scrollViewHeight:0,//滚动视图的高度
        defaultSocket: [
          '您好，有什么可以帮您？',
          '在呢，有什么可以帮您？',
          '小主让您久等了，有什么可以帮您？',
          '当前客服务较忙，请您耐心等候！',
          '嗯嗯，请问有什么可以帮您？',
        ],
        socketArr: []
      };
    },
    created() {
      this.getUserID();
    },
    mounted() {
      // this.initWebSocket();
          this.connectSocketInit();
          // 获取滚动视图的高度
          this.$nextTick(()=>{
              uni.createSelectorQuery().in(this).select('#scroll-view').boundingClientRect((res)=>{
                  this.scrollViewHeight = res.height
              }).exec()
          })
    },
  
    watch: {
      openView(newVal) {
        if (newVal == false) {
          if (this.ws != null) {
            this.ws.close();
            this.ws = null;
          }
        } else {
          console.log("0000", this.ws);
          if (this.ws == null) {
            this.initWebSocket();
          }
        }
      },
      list: {
        handler(val) {
          if (val.length > 1) {
            if (val[val.length - 1].userId != '000') {
              this.socketArr = this.socketArr.length == 0 ? JSON.parse(JSON.stringify(this.defaultSocket)) : this.socketArr
              const info = this.getRandomFromArray(this.socketArr)
              this.list.push({
                content: info,
                userId: '000'
              })
            }
          }
        },
        deep: true
      }
    },
  
    methods: {
      getRandomFromArray(arr) {
        if (!Array.isArray(arr) || arr.length === 0) return undefined;
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr.splice(randomIndex, 1)[0];
      },
      //根据时间戳作为当前用户ID
      getUserID() {
        let time = new Date().getTime();
        this.userId = time;
      },
          
      //滚动条到底部
          scrollToBottom(){
              this.$nextTick(()=>{
                  uni.createSelectorQuery().in(this).select('#msg-box').boundingClientRect((res)=>{
                      let top = res.height-this.scrollViewHeight;
                      if(top>0){
                          this.scrollTop=top;
                      }
                  }).exec()
              })
          },
          
      //发送聊天信息
      sendText() {
        let _this = this;
        if (!_this.contentText) {
          return;
        }
        let params = {
          userId: _this.userId,
          content: _this.contentText,
        };
        _this.list.push(params);
       
              
              uni.sendSocketMessage({
                  data:JSON.stringify(params),
                  success:(res)=>{
                      console.log('消息发送成功')
                  },
                  fail:((err)=>{
                      console.log('发送失败',err)
                  })
              })
              
        _this.contentText = "";
        setTimeout(() => {
                  _this.scrollToBottom()
        }, 500);
      },
          
      //进入页面创建websocket连接
          connectSocketInit() {
              let _this = this
              // 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
              this.socketTask = uni.connectSocket({
                  // 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
                  url: "ws://localhost:8888",
                  success(data) {
                      console.log("websocket连接成功");
                  },
              });
              
              uni.onSocketOpen((res) => {
                console.log('WebSocket连接已打开！');
                  this.is_open_socket = true;
              });
              uni.onSocketMessage((res) => {
                console.log('收到服务器内容：' + res.data);
                  //接收服务器返回的数据
                  let resData = JSON.parse(res.data);
                  if (resData.funName == "userCount") {
                    _this.count = resData.users;
                    _this.list = resData.chat;
                    console.log(resData.chat);
                  } else {
                      let obj = {
                          userId: resData.fromId, 
                          content: resData.content
                      }
                    _this.list.push(obj);
                  }
              });
          },
          
          // 关闭websocket【离开这个页面的时候执行关闭】
          closeSocket() {
              this.socketTask.close({
                  success(res) {
                      this.is_open_socket = false;
                      console.log("关闭成功", res)
                  },
                  fail(err) {
                      console.log("关闭失败", err)
                  }
              })
          },
  
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .chat-box {
    height: 100%;
    width: 100%;
    position: relative;
      
      .scroll-view{
          width: 100%;
          height: calc(100% - 4rem - 20px);
      }
  
    .msg-box {
      width: 100%;
      overflow-y: auto;
      border-radius: 20px;
      .msg {
        //   width: 95%;
        min-height: 2.5rem;
        margin: 1rem 0.5rem;
        position: relative;
        display: flex;
        justify-content: flex-start !important;
        .user-head {
          min-width: 2.5rem;
          width: 20%;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: #f1f1f1;
          display: flex;
          justify-content: center;
          align-items: center;
          .head {
            width: 1.2rem;
            height: 1.2rem;
          }
        }
        .user-msg {
          width: 80%;
          word-break: break-all;
          position: relative;
          z-index: 5;
          span {
            display: inline-block;
            padding: 0.5rem 0.7rem;
            border-radius: 0.5rem;
            margin-top: 0.2rem;
            font-size: 0.88rem;
          }
          .left {
            background: white;
            animation: toLeft 0.5s ease both 1;
            margin-left: 0.5rem;
          }
          .right {
            background: #136fff;
            color: white;
            animation: toright 0.5s ease both 1;
            margin-right: 0.5rem;
          }
          @keyframes toLeft {
            0% {
              opacity: 0;
              transform: translateX(-10px);
            }
            100% {
              opacity: 1;
              transform: translateX(0px);
            }
          }
          @keyframes toright {
            0% {
              opacity: 0;
              transform: translateX(10px);
            }
            100% {
              opacity: 1;
              transform: translateX(0px);
            }
          }
        }
      }
    }
  
    .msg-box::-webkit-scrollbar {
      display: none;
    }
    .input-box {
      // padding: 0 1rem;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 4rem;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
          box-sizing: border-box;
          padding: 0 32upx;
      input {
        // height: 2rem;
        display: inline-block;
        width: 100%;
        padding: 0.5rem;
        border: none;
        border-radius: 36upx;
        font-size: 0.88rem;
              background-color: #F5F7FB;
      }
      .btn {
        min-width: 2rem;
        background: #e0e0e0;
        padding: 0.5rem;
        font-size: 0.88rem;
        color: white;
        text-align: center;
        border-radius: 0.2rem;
        margin-left: 0.5rem;
        transition: 0.5s;
      }
      .btn-active {
        background: #409eff;
      }
    }
  }
  </style>
  