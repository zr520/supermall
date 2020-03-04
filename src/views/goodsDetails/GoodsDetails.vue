<template>
    <div class="good-details">
        <detail-nav-bar class="navbar">
        </detail-nav-bar>
        <scroll class="scroll-container" ref="scroll">
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
        </scroll>
    </div>
</template>

<script>
    import {getDetail,Goods,Shop} from "network/detail";
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import Scroll from "components/common/scroll/Scroll";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    export default {
        name: "GoodsDetails",
        components: {DetailGoodsInfo, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar},
        data(){
            return{
                id:this.$route.query.id,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
            }
        },
        mounted() {
            this.getDetail(this.id)
        },
        methods:{
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
                }).catch(reason => {

                })
            },
            //监听子组件展示商品详情页的图片是否全部加载完
            detailImageLoad(){
                this.$refs.scroll.refresh
            },
        }
    }
</script>

<style scoped>
    .good-details{
        position: relative;
        z-index: 9;
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