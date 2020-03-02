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
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper,{
                //better-scroll 包裹的组件默认为false，必须设置成true才行
                click:true
            })
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>