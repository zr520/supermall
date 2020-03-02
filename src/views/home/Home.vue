<template>
    <div class="home">
        <NavBar class="home-nav">
            <div slot="center">蘑菇街</div>
        </NavBar>
        <home-swiper :banner="banner"></home-swiper>
        <recommend-view :recommend="recommend"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="titles" class="tab-control" @tabClick="tabClick"></tab-control>
        <goods-list :goodsList="showGoods"></goods-list>
    </div>
</template>

<script>
    import {getHomeMultidate,getHomeGoods} from "network/home";

    import NavBar from "components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";
    import TabControl from "../../components/content/tabControl/TabControl";
    import GoodsList from "../../components/content/goods/GoodsList";

    export default {
        name: "Home",
        components: {
            GoodsList,
            TabControl,
            FeatureView,
            RecommendView,
            HomeSwiper,
            NavBar,
        },
        mounted() {
            this.getHomeMultidate(),
            this.getHomeGoods('pop'),
            this.getHomeGoods('new'),
            this.getHomeGoods('sell')
        },
        data(){
            return{
                result:'',
                banner:[],
                recommend:[],
                titles:['流行','新款','精选'],
                goods:{
                    'pop':{page:1,list:[]},
                    'new':{page:1,list:[]},
                    'sell':{page:1,list:[]},
                },
                currentTabType:'pop'
            }
        },
        computed:{
            showGoods(){
                return this.goods[this.currentTabType].list
            }
        },
        methods:{
            /**
             * 子组件tab的切换
             */
            tabClick(index){
                switch (index) {
                    case 0:
                        this.currentTabType = 'pop'
                        break;
                    case 1:
                        this.currentTabType = 'new'
                        break;
                    case 2:
                        this.currentTabType = 'sell'
                        break;
                }
            },

            /**
             * 网络请求相关
             */
            getHomeMultidate(){
                getHomeMultidate().then(res=>{
                    console.log('请求首页轮播图和为你推荐数据成功')
                    this.result = res
                    this.banner = res.data.banner.list
                    this.recommend = res.data.recommend.list
                }).catch(err=>{
                    console.log(err,'err')
                })
            },
            getHomeGoods(type){
                const page = this.goods[type].page
                getHomeGoods(type,page).then(res=>{
                    console.log('请求首页流行,最新,精选数据成功')
                    this.goods[type].list.push(...res.data.list)
                    // console.log(this.goods[type].list)
                }).catch(err=>{
                    console.log(err,'err')
                })
            },
        }
    }
</script>

<style scoped>
    .home{
        padding-top: 44px;
        padding-bottom: 44px;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: #FFF;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9;
    }
    .tab-control{
        position: sticky;
        top: 44px;
        z-index: 9;
    }
</style>