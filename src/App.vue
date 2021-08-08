<template>
  <NavBar title="晴空万里" logo="../../assets/image/qin.png" :section="section" :style="nav">
      <template #logo>
        <!-- 这里可对原始默认的span 标签进行替换 -->
      </template>
  </NavBar>
  <router-view v-slot="{ Component }">
      <transition name="fade">
        <keep-alive :include="['Blog', 'Index', 'Friends','Project']">
              <component :is="Component" />
        </keep-alive>
      </transition>
  </router-view>
  <login></login>
</template>
<script>
import NavBar from "./components/navbar/main.vue"
import {watch,reactive} from "vue"
import {useRoute} from "vue-router"
import Login from './views/index/login.vue'
export default {
  components:{
    NavBar,
    Login,
  },
  setup(){
    console.log(process.env);
    const route=useRoute()
    const nav =reactive( {
      normal: {
          "background-color": "#fff",
          'backdrop-filter': 'blur(3px)'
      },
      arrive: {
          "background-color": "#fff",
          "box-shadow": "0 4px 30px rgba(0,0,0,.07)",
      },
  });
    const section = [{
      title:"主页",
      link:"/",
      key:"home"
    },
    {
      title:"博客圈",
      link:"/blog",
      key:"blog"
    },
    {
      title:"友链圈",
      link:"/moments",
      key:"moments"
    },
    {
      title:"个人圈",
      link:"/personal",
      key:"personal",
      children:[
        {
            title:"项目",
            link:"/project",
            key:"project",
        },
          {
            title: "音乐圈",
            link: "/player",
            key: "music",
          },
      ]
    },
    {
      title:"留言板",
      link:"/message",
      key:"message"
    }];




    /** 静态的音乐模块 */
    /*
      store.dispatch("getMusicList");
     const getMusic = (current) => {
      const item = ByMusic.list[current];
     
      console.log(item)
      if (item.music_id && item.cover.length == 0) {
        var formData = new FormData();
        formData.append("input", item.music_id);
        formData.append("filter", "id");
        formData.append("type", item.type);
        formData.append("page", 1);
        http.post("/music", formData).then(function (res) {
          res.data[0].url = res.data[0].url.replace(/^http:\/\//i, "https://");
          res.data[0].pic = res.data[0].pic.replace(/^http:\/\//i, "https://");
          ByMusic.list[current].url = res.data[0].url;
          ByMusic.list[current].lrc = res.data[0].lrc;
          ByMusic.list[current].cover = res.data[0].pic;
          ByMusic.jump(current);
        });
      }
    };
    watch(
      () => store.state.index.musicList,
      (list) => {
        console.log(list);
        if(list.length==0)return
        let data = [];
        list.map((value) => {
          data.push({
            name: value.title,
            artist: value.name,
            url: "",
            lrc: "",
            cover: "",
            music_id: value.music_id,
            type: value.type,
          });
        });
        ByMusic.addMusic(data);
        getMusic(ByMusic.current);
        ByMusic.$watch("current", (current) => {
          getMusic(current);
        });
        ByMusic.showMode("fixed", true);
      }
    );
    */
    watch(
      ()=>route.name,
      (name)=>{
        console.log(name);
            if(name=='Home'||name=="BlogContent"||name=="Link"||name=="Project"||name=="Music"){
                nav.normal['background-color']='transparent'
                nav.normal['color']='#fff'
            }else{
                nav.normal['background-color']='#fff'
                nav.normal['color']='rgba(0, 0, 0, 0.35)'
            }

      }
    )


    
    return {
      section,
      nav
    }

  }
}
</script>
<style>
@import './assets/style/reset.css';
@import './assets/iconfont/iconfont.css';
body{
  display: block;
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #71daff;
}

</style>
