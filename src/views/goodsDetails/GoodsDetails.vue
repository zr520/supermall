<template>
    <div class="good-details">
        <detail-nav-bar class="navbar" @titleClick="titleClick" ref="nav">
        </detail-nav-bar>
        <scroll class="scroll-container" ref="scroll" @scroll="scrollLisTener" :probeType="3">
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo"
                           @detailImageLoad="detailImageLoad">
        </detail-goods-info>
        <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
        <goods-list :goodsList="recommends" ref="recommend"></goods-list>
        </scroll>
        <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
        <back-top @click.native="backTop" v-show="hide"></back-top>
    </div>
</template>

<script>
    import {debounce} from "common/utils";
    import {itemListenerMixin} from 'common/mixin'
    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import Scroll from "components/common/scroll/Scroll";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import GoodsList from "../../components/content/goods/GoodsList";
    import DetailBottomBar from "./childComps/DetailBottomBar";
    import BackTop from "components/content/backtop/BackTop";
    export default {
        name: "GoodsDetails",
        components: {
            BackTop,
            DetailBottomBar,
            GoodsList,
            DetailCommentInfo,
            DetailParamInfo,
            DetailGoodsInfo, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar},
        data(){
            return{
                id:this.$route.query.id,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},
                recommends:[],
                // itemListener:null
                themeTopYs:[],
                getThemeTopY: null,
                currentIndex: 0,
                hide:false,
            }
        },
        mixins:[itemListenerMixin],
        mounted() {
            this.getDetail(this.id)
            this.getRecommend()
            // const refresh = debounce(this.$refs.scroll.refresh,50)
            // //监听列表中图片是否加载完成
            // this.itemListener = ()=>{
            //     //,当图片都加载完成后，重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
            //     refresh()
            // }
            // this.$bus.$on('itemImageLoad',this.itemListener)
            //给getThemeTopY 赋值
            this.getThemeTopY = debounce(() => {
                this.themeTopYs = [];
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.param.$el.offsetTop-30)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop-30)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-30)
                this.themeTopYs.push(Number.MAX_SAFE_INTEGER);
            }, 100)
        },
        destroyed(){
            this.$bus.$off('itemImageLoad',this.itemListener)
        },
        methods:{
            //加入购物车
            addToCart(){
                //1.获取购物车所需要的信息
                const product = {};
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.id;
                //2.将商品添加到购物车里
                this.$store.dispatch('addCart',product)
            },
            /**
             * 子组件按钮返回顶部
             */
            backTop(){
                this.$refs.scroll.scroll.scrollTo(0,0,300)
            },
            //滚动监听
            scrollLisTener(position){
                //1.获取y值
                const positionY = -position.y;
                //2.将positionY的值和主题中的值进行对比
                let length = this.themeTopYs.length;
                for(let i = 0; i < length - 1; i++){
                    if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])){
                        this.currentIndex = i;
                        this.$refs.nav.currentIndex = this.currentIndex;
                    }
                }
                this.hide = positionY >1000
            },
            titleClick(index){
                // console.log(index)
                this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],100)
            },
            //获取推荐信息
            getRecommend(){
                getRecommend().then(res => {
                    //  console.log(res);
                    this.recommends = res.data.list;
                })
            },
            getDetail(id){
                getDetail(id).then(res=>{
                    // console.log(res)
                    const data = res.result
                    //获取顶部的图片轮播数据
                    this.topImages = res.result.itemInfo.topImages
                    //获取商品信息
                    this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                    //获取店铺信息
                    this.shop = new Shop(data.shopInfo)
                    //获取商品详细信息
                    this.detailInfo = data.detailInfo
                    //获取参数信息
                    this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
                    //获取评论信息
                    if(data.rate.cRate !== 0){
                        this.commentInfo = data.rate.list[0];
                        // console.log(this.commentInfo ,"------")
                    }
                }).catch(reason => {

                })
            },
            //监听子组件展示商品详情页的图片是否全部加载完
            detailImageLoad(){
                this.$refs.scroll.refresh
                this.getThemeTopY()
            },
        }
    }
</script>

<style scoped>
    .good-details{
        position: relative;
        z-index: 10;
        background-color: #fff;
    }
    .navbar{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .scroll-container{
        height: calc(100vh - 44px);
    }
</style>