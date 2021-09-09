<template>
	<div class="map">
		<div id="MapContainer" class="MapContainer"></div>
	</div>
</template>

<script>

// import AMap from "AMap"
import {onMounted } from "vue"

import AMapLoader from '@amap/amap-jsapi-loader';
export default {
	name:"Map",
	setup(){
		let map = null;
    const init = async ()=>{
      await AMapLoader.load({
          "key": "3db98cc19dbfc02a52607efa27551df6",              // 申请好的Web端开发者Key，首次调用 load 时必填
          "version": "1.4.15",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          "plugins": ['AMap.Geolocation'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
          "AMapUI": {             // 是否加载 AMapUI，缺省不加载
              "version": '1.1',   // AMapUI 缺省 1.1
              "plugins":[],       // 需要加载的 AMapUI ui插件
          },
          "Loca":{                // 是否加载 Loca， 缺省不加载
              "version": '1.3.2'  // Loca 版本，缺省 1.3.2
          },
      }).then((AMap)=>{
          map = new AMap.Map('MapContainer',
          {
            zoom:15,
            mapStyle:"amap://styles/dark",
            resizeEnable: true
          });
      }).catch(e => {
          console.log(e);
      })
    }

    //解析定位结果
    const  onComplete = (AMap,res)=>{
      AMap.plugin('AMap.MoveAnimation', function(){
          const animationMarker = new AMap.Marker({
              position: res.position,
          });
          animationMarker.moveTo(res.position, {
              duration: 1000,
              delay: 500,
          });
      });
    };
    //解析定位错误信息
    const onError = (data)=>{
        document.getElementById('status').innerHTML='定位失败'
        document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message;
    }
    onMounted( async ()=>{
      await init();
			AMapLoader.load({"plugins": ['AMap.Geolocation']}).
				then((AMap) => {
					var geolocation = new AMap.Geolocation({
							enableHighAccuracy: true,//是否使用高精度定位，默认:true
							timeout: 10000,          //超过10秒后停止定位，默认：5s
							position:'RB',    //定位按钮的停靠位置
							zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
					});
					map.addControl(geolocation);
          console.log(map);
					geolocation.getCurrentPosition(
            (status,result)=>{
              console.log("DADWDW");
							if(status=='complete'){
                onComplete(AMap,result);
							}else{
									onError(result)
							}
					});			
			}).catch((err) => {
				console.log(err);
			});
    })

		return

	}
}
</script>

<style lang="scss">
  .map{
    position: absolute;
    width: 30%;
    left:  3%;
    bottom: 3%;
    z-index: 9999; 
    .MapContainer{
      width: 300px;
      height: 300px;
      border-radius: 50%;
    }
  }
</style>