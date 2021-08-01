<template>
    <div class="intro" :class="{reverse:reverse}">
        <div class="intro-wrap image">
            <slot name="image">
                <img :src="url">
            </slot>
        </div>
        <div class="intro-wrap info">
            <div class="info-wrap">
                <slot class="title">
                    <h1 class="title">{{title}}</h1>
                </slot>
                <slot name="content">
                    <div class="content" v-html="content"></div>
                </slot>
                <div class="desc">
                    <template v-for="(item,index) of info" :key="'desc_'+index">
                        <slot name="info" :info="item">
                            <a :href="item.link" target="_blank" class="desc-item">
                                <img :src="item.url" class="desc-item-image">
                                <p class="desc-item-title">{{item.title}}</p>
                            </a>
                        </slot>
                    </template>
                </div>
            </div>


            </div>
    </div>
</template>

<script>
export default {
    name:"introduction",
    props:{
        url:String,
        title:String,
        content:String,
        info:Array,
        reverse:{
            type:Boolean,
            default:false
        }


    },
    setup(){
        
    }
}
</script>

<style lang="scss" scoped>

.intro{
    display:flex;
    align-items:center;
    justify-content: center;
    padding: 100px 30px;

    &-wrap {
        flex: 1;/** flex:1 可以实现div空间平分 */
        text-align: center;
    }

    .image {
    order: 0;

        img {
            width: 300px;
        }
    }
    .info{
        order:1;

        .title {
            font-size: 54px;
            text-align: left;
            line-height: 46px;
            color: #2e3a59;
            margin-bottom: 33px;
            font-weight: 700;
            font-family: GlowSansSC-ExtendedHeavy;
        }
        .content {
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 26px;
            letter-spacing: 1.25px;
            color: #336a99;
            font-family: PingFang SC;
            text-align: left;
            max-width: 450px;
            min-width: 300px;
            p{
                margin: 5px;
            }
        }


        .desc{
            margin-top: 36px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
        &-item{
            width: 76px;
            height: 76px;
            background: #fff;
            box-shadow: 0 10.3151px 41.2606px rgba(0, 0, 0, 0.05);
            border-radius: 19px;
            margin-right: 20px;
            margin-bottom: 20px;
            padding: 10px;
            box-sizing: border-box;
            &-image{
                width: 50px;
                height: 50px;
                margin-bottom: 8px;
                }
            &-title {
                font-size: 14px;
                line-height: 14px;
                letter-spacing: 1px;
                color: #020202;
                }
            }
        }
    }

}
.reverse {
    /** reverse 调整顺序 */
  .image {
    order: 1;
  }

  .info {
    order: 0;
    display: flex;
    justify-content: flex-end;
  }
}
</style>