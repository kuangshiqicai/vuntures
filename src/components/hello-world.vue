<template>
  <div class="content">
    <div class="time">当前调用时间：{{ currentTime }}</div>
    <div class="status">当前调用状态：{{ status }}</div> 
    <div class="info" v-for="(value, key, index) in data" :key="index">
      {{ index }}. {{ key }} - {{ value }}
    </div>
  </div>
</template>

<script>
// import $ from '../libs/util';
import UserApi from '../apis/user';
export default {
  name: 'HelloWorld',
  inject: ['GLOBAL'],
  data () {
    return {
      intervalId:null,
      data: {},
      currentTime: '',
      status: '',
      msg: 'Hello Jest',
    }
  },
  methods:{
   // 定时刷新数据函数
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        console.log("刷新" + new Date());
        this.currentTime = new Date();
        this.initData(); //加载数据函数
      }, 5000);
    }, 
    // 停止定时器
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },
    initData() {
        UserApi.getUserInfo().then(res => {
        console.log('res', res);
        this.data = res;
        this.status = '成功';
      }).catch(err => {
        this.status = '失败';
      });
    }
  },
  created(){
    // this.initData(); //加载数据函数
    this.dataRefreh();
  },
  destroyed(){
      // 在页面销毁后，清除计时器
      this.clear();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: left;
}
.info {
  /* text-align: left; */
  color: #42b983;
}
</style>
