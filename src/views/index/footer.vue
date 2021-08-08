<template>
  <div class="footer">
      <div class="container">
          <div class="footer-row service">
              <p class="title">Baymax•记录美好学习时光，分享学习点点滴滴</p>
              <ul class="link">
                  <li><router-link to="/blog">博客</router-link></li>
                  <li><router-link to="/comment">留言</router-link></li>
                  <li><router-link to="/link">友链</router-link></li>
                  <li><router-link to="/route">成长</router-link></li>
                  <li><router-link to="/">主页</router-link></li>
              </ul>
          </div>
          <div class="footer-row provide"></div>
          <div class="footer-row publicity"></div>
          <hr/>
          <div class="footer-row bottom">
              <p class="copyright">© 2020 - {{year}} <a href="http://www.yunmobai.cn/">云墨白</a> All Rights Reserved.<a target="_blank" href="/apis/sitemap">网站地图</a></p>
              <div class="share">
                    <a href="" target="_blank" class="btn iconfont icon-github"></a>
                    <a href="" target="_blank" class="btn iconfont icon-gitee2"></a>
                    <a href="" target="_blank" class="btn iconfont icon-qq"></a>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.footer {
    padding: 10px 30px;
    background: #fff;
    color: #a7a7a7;
    font-weight: bolder;
    font-size: 12px;
    line-height: 26px;
    letter-spacing: 2px;
    a {
        color: #a7a7a7;
        font-size: 14px;
        transition: all 0.3s;
    }
    .container {
        padding: 0 10px;
        box-sizing: border-box;
        .footer-row{
            display: flex;
            justify-content: space-between;
            align-content: center;
            flex-wrap: nowrap;

        }
        .service{
            font-size: 16px;
            .link {
                li {
                    float: right;
                    margin: 0 20px;
                    a{
                        color: #a7a7a7;
                        font-size: 15px;
                        transition: all 0.3s;
                         &:hover{
                            text-decoration: underline;
                            color: #3a8ee6;
                        }
                    }
                }
            }
        }
        hr {
            background-color: #f0f0f0;
        }
        .bottom {
            .share {
                display: flex;
                align-items: center;
                .btn {
                    padding: 5px 10px;
                    border-radius: 10px;
                    margin: 0 5px 0;
                    font-size:14px;
                    display: inline-block;
                    background: linear-gradient(180deg, #dcf4ff, #f4fcff);
                    &:hover{
                        background: linear-gradient(180deg, #fff0ce, #fffcf6);
                    }
                }
            }
        }
    }

}
@media(max-width: 700px){

.footer {
    padding: 10px;
    font-size :12px;
    letter-spacing: 2px;
    line-height: 24px;
    .container {
        padding: 0!important;
        .foot-row {
            justify-content: center!important;
        }
        .service{ 
            .title {
                font-size: 14px;
            }
            .link { 
                li {
                    margin: 0 5px!important;
                }
            }
        }
    }
    
        .provide{
            .search-wrap {
                padding: 1px 0!important;
                .search-ipt {
                    right: 50%!important;
                    transform: translateX(50%);
                }
            }
        }
        .publicity{
            span {
                margin: 0 5px;
            }
        }
        .bottom {
            .copyright {
                letter-spacing: 1px;
            }
        }
    }
}


</style>