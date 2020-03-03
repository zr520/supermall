<template>
    <div class="home">
        <NavBar class="home-nav">
            <div slot="center">蘑菇街</div>
        </NavBar>
        <Scroll class="content" ref="scroll"
                :probeType="3" @scroll="scroll" :pullUpLoad="true"
                @pullingUp="pullingUp">
        <home-swiper :banner="banner"></home-swiper>
        <recommend-view :recommend="recommend"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="titles" class="tab-control" @tabClick="tabClick"></tab-control>
        <goods-list :goodsList="showGoods"></goods-list>
        </Scroll>
        <back-top @click.native="backTop" v-show="hide"></back-top>
    </div>
</template>

<script>
    import {getHomeMultidate,getHomeGoods} from "network/home";
    import {debounce} from 'common/utils'

    import NavBar from "components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";
    import TabControl from "components/content/tabControl/TabControl";
    import GoodsList from "components/content/goods/GoodsList";
    import Scroll from "components/common/scroll/Scroll";
    import BackTop from "components/content/backtop/BackTop";

    export default {
        name: "Home",
        components: {
            BackTop,
            Scroll,
            GoodsList,
            TabControl,
            FeatureView,
            RecommendView,
            HomeSwiper,
            NavBar,
        },
        created(){

        },
        mounted() {
            const refresh = debounce(this.$refs.scroll.refresh,50)
            //监听列表中图片是否加载完成
            this.$bus.$on('itemImageLoad',()=>{
                //,当图片都加载完成后，重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
                refresh()
            })
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
                    'pop':{page:49,list:[]},
                    'new':{page:1,list:[]},
                    'sell':{page:1,list:[]},
                },
                currentTabType:'pop',
                hide:false
            }
        },
        computed:{
            showGoods(){
                return this.goods[this.currentTabType].list
            }
        },
        methods:{
            /**
             * 监听子组件tab的切换
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
             * 监听子组件scroll的滚动
             */
            scroll(position){
                // console.log(position)
                this.hide = (-position.y) >1000
            },
            /**
             * 监听子组件scroll的上拉加载更多
             */
            pullingUp(){
                console.log('上拉加载更多')
                this.goods[this.currentTabType].page  += 1;
                this.getHomeGoods(this.currentTabType)
            },

            /**
             * 子组件按钮返回顶部
             */
            backTop(){
                this.$refs.scroll.scroll.scrollTo(0,0,300)
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
                const page = this.goods[type].page;
                console.log(page,'page')
                getHomeGoods(type,page).then(res=>{
                    console.log('请求首页流行,最新,精选数据成功')
                    this.goods[type].list.push(...res.data.list);
                    // console.log(this.goods[type].list.page,'page1')
                    // console.log(this.goods[type].list)

                    //注意：每次触发上拉事件后，在回调函数的最后，都应该调用 finishPullUp() 方法。
                    // 在 finishPullUp() 方法调用前不会触发下一次的 pullingUp 事件。
                    this.$refs.scroll.scroll.finishPullUp();
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
    .content{
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 44px;
        left: 0;
        right: 0;
    }
</style>