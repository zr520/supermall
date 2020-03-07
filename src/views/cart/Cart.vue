<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">
                购物车({{cartLength}})
            </div>
        </nav-bar>
        <cart-list></cart-list>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import {mapGetters} from 'vuex'
    import CartList from "./childComps/CartList";
    export default {
        name: "Cart",
        components: {CartList, NavBar},
        computed:{
            ...mapGetters(['cartLength'])
        }
    }
</script>

<style scoped>
    .nav-bar{
        background-color: var(--color-tint);
        color: #fff;
        position: relative;
        z-index: 9;
    }
</style>