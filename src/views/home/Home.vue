<template>
    <div class="home">
        <NavBar class="home-nav">
            <div slot="center">蘑菇街</div>
        </NavBar>
        <home-swiper :banner="banner"></home-swiper>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";

    import {getHomeMultidate} from "network/home";

    export default {
        name: "Home",
        components: {
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
                    // console.log(res,'res')
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
    .home-nav{
        background-color: var(--color-tint);
        color: #FFF;
    }
</style>