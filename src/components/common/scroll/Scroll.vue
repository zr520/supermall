<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        data(){
            return {
                scroll:null
            }
        },
        props:{
            probeType:{
                type:Number,
                default(){
                    return 0
                }
            },
            pullUpLoad:{
                type:Boolean,
                default(){
                    return false
                }
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper,{
                //better-scroll 包裹的组件默认为false，必须设置成true才行
                click:true,
                //probeType :
                //默认值：0,可选值：1、2、3作用：有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件
                probeType: this.probeType,
                //是否开启上拉加载更多，默认为false
                pullUpLoad: this.pullUpLoad
            }),
            //监听滚动事件
            this.scroll.on('scroll',(position)=>{
                // console.log(position)
                this.$emit('scroll',position)
            }),
            //监听上拉加载更多
            this.scroll.on('pullingUp',()=>{
                // console.log('上拉加载更多')
                this.$emit('pullingUp')
            })
        },
        methods:{
            //封装刷新的方法
            refresh(){
                this.scroll && this.scroll.refresh();
                // console.log('refresh')
            },
        }
    }
</script>

<style scoped>

</style>