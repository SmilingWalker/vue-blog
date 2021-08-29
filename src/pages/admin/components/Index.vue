<template>
  <div class="home">
    <div class="row">
      <router-link to="/home/articles/list" class="data">
        <i class="icon el-icon-notebook-2"></i>
        <div>
          <p>文章总数</p>
          <span class="count">
            {{ info.quantity.article || 0 }}
          </span>
        </div>
      </router-link>
      <router-link to="/home/message/list" class="data">
        <i class="icon el-icon-chat-dot-round"></i>

        <div>
          <p>留言总数</p>

          <span class="count">
            {{ info.quantity.message || 0 }}
          </span>
        </div>
      </router-link>
      <router-link to="/home/user/list" class="data">
        <i class="icon el-icon-user"></i>

        <div>
          <p>注册总数</p>

          <span class="count">
            {{ info.quantity.user|| 0 }}
          </span>
        </div>
      </router-link>
      <div class="data">
        <i class="icon el-icon-thumb"></i>
        <div>
          <p>阅读总数</p>

          <span class="count">
            {{ info.quantity.browse || 0 }}
          </span>
        </div>
      </div>
    </div>
    <div id="main"></div>
  </div>
</template>

<script>
import chalk from './chalk.json'
export default {
  name: "Home",
  data() {
    return {
      info: {
        quantity:{},
        statistics:{}
      },
      dateList:[]
    };
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var echarts = require('echarts');
      console.log(chalk)
      echarts.registerTheme("chalk", chalk)
      const myChart=echarts.init(document.getElementById("main"),"chalk");

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "博客信息",
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
          data: ['文章',"留言","注册",'回复'],
        },
        xAxis: {
          data: this.dateList,
        },
        yAxis: {},
        series:this.format()
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getDate(){
      const dateList=[]
     for(let i=0;i<7;i++){
        const date=new Date(new Date() - 24 * 60 * 60 * 1000 * i);
        const year=date.getFullYear()
        const mo=date.getMonth()+1
        const month=mo<10?'0'+mo:mo
        const da=date.getDate()
        const day=da<10?'0'+da:da
        dateList.push(`${year}/${month}/${day}`)
     }
      this.dateList=dateList.reverse()
    },
    format(){
    const data=[]
    const name={
      user:'注册',
      message:'留言',
      reply:'回复',
      article:'文章'

    }
    // 每个种类
    Object.keys(this.info.statistics).forEach((key)=>{
        // 格式化数据
      const option={
        name:name[key],
        type:'line',
        data:[]
      }
      const item=this.info.statistics[key]
      // console.log(item,option,data)
      for(let i=0,leng=this.dateList.length;i<leng;i++){
          const date=this.dateList[i]
          let count=0
          for(let j=0,length=item.length;j<length;j++){
            // console.log(j)
            if(date==item[j].date){
              count=item[j].num
              break
            }
          }
          option.data.push(count)
      }
      data.push(option)
    })
    console.log(data)
    return data
  }
  },
  mounted() {
  },
  created() {
    this.getDate()
    this.$get("/apis/admin/blog/info").then((res) => {
      this.info = res.data;
      this.myEcharts();
    });
  },
  
};
</script>
<style lang="scss" scoped>
.home {
  .row {
    display: flex;
    flex-wrap: wrap;

    .data {
      flex-grow: 1;
      padding: 32px;
      background-color: #fff;
      color: #666;
      margin: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      border: 1px solid #f5f7fa;
      cursor: pointer;

      &:hover {
        box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      }

      p {
        margin-bottom: 10px;
        color: #666;
      }

      .icon {
        font-size: 54px;
        margin-right: 15px;
        font-weight: bold;
      }

      .el-icon-notebook-2 {
        color: #f7f494;
      }

      .el-icon-chat-dot-round {
        color: #fc97af;
      }

      .el-icon-user {
        color: #87f7cf;
      }

      .el-icon-thumb {
        color: #72ccff;
      }

      .count {
        font-size: 24px;
        color: #666;
      }
    }
  }
  #main{
    width: 100%
    height 360px
    margin-top 10px
  }
}

@media screen and (max-width: 700px) {
  .data {
  }
}
</style>
