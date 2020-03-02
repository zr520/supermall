<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles"
        :class="{active:index===currentIndex}"
             @click="tabChoose(index)"
        >
            <span>{{item}}</span>
        </div>

    </div>
</template>

<script>
    export default {
        name: "TabControl",
        props:{
            titles:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return{
                currentIndex:0
            }
        },
        methods:{
            tabChoose(index){
                this.currentIndex = index
                this.$emit('tabClick',index)
            }
        }
    }
</script>

<style scoped>
    .tab-control{
        display: flex;
        width: 100%;
        flex-direction: row;
        text-align: center;
        background-color: #fff;
    }
    .tab-control div{
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        flex: 1;
    }
    .tab-control div span{
       padding: 3px;
    }
    .active{
        color: var(--color-high-text);
    }

    .active span{
        border-bottom: 3px solid var(--color-tint);
    }
</style>