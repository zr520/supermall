<template>
    <swiper>
        <swiper-item v-for="item in banner">
            <a :href="item.link">
                <img :src="item.image" @load="homeswiperload">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper,SwiperItem} from 'components/common/swiper'

    export default {
        name: "HomeSwiper",
        components:{
            Swiper,
            SwiperItem
        },
        data(){
            return {
                isLoad:true,
            }
        },
        props:{
            banner:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            homeswiperload(){
                if(this.isLoad){
                    // console.log('---------')
                    this.$emit('homeswiperload')
                    this.isLoad = false
                }

            },
        }
    }
</script>

<style scoped>

</style>