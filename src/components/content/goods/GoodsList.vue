<template>
    <div class="goodsList">
        <goods-list-item v-for="item in goodsList" :goodsItem="item"></goods-list-item>
    </div>
</template>

<script>
    import GoodsListItem from "./GoodsListItem";
    export default {
        name: "GoodsList",
        components: {GoodsListItem},
        props:{
            goodsList:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .goodsList {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 2px;
        background-color: #fff;
    }
</style>