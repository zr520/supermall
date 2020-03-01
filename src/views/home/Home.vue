<template>
    <div class="home">
        <NavBar class="home-nav">
            <div slot="center">蘑菇街</div>
        </NavBar>
        <home-swiper :banner="banner"></home-swiper>
        <recommend-view :recommend="recommend"></recommend-view>
        <feature-view></feature-view>
    </div>
</template>

<script>
    import {getHomeMultidate} from "network/home";
    import NavBar from "components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";

    export default {
        name: "Home",
        components: {
            FeatureView,
            RecommendView,
            HomeSwiper,
            NavBar,
        },
        mounted() {
            this.getHomeMultidate()
        },
        data(){
            return{
                result:'',
                banner:[],
                recommend:[]
            }
        },
        methods:{
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
</style>