<template>
    <div class="cart-list">
        <scroll class="content">
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
           <div >
              1111111111
           </div>
            <div >
                1111111111
            </div>
            <div >
                1111111111
            </div>
            <div >
                1111111111
            </div> <div >
            1111111111
        </div>
            <div >
                1111111111
            </div>
            <div >
                1111111111
            </div> <div >
            1111111111
        </div>
            <div >
                1111111111
            </div>
            <div >
                1111111111
            </div> <div >
            1111111111
        </div>
            <div >
                1111111111
            </div>
            <div >
                1111111111
            </div> <div >
            1111111111
        </div>
            <div >
                1111111111
            </div>
            <div >
                1111111111
            </div> <div >
            1111111111
        </div>
            <div >
                1111111111
            </div>
            <div >
                1111111111
            </div> <div >
            1111111111
        </div>
            <div >
                1111111111
            </div>
            <div >
                1111111111
            </div> <div >
            1111111111
        </div>
            <div >
                1111111111
            </div>
            <div >
                1111111111
            </div> <div >
            1111111111
        </div>
            <div >
                1111111111
            </div>
            <div >
                1111111111
            </div> <div >
            1111111111
        </div>
            <div >
                1111111111
            </div>
            <div >
                1111111111
            </div> <div >
            1111111111
        </div>
            <div >
                1111111111
            </div>
            <div >
                1111111111
            </div>
        </scroll>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Scroll from "../../../components/common/scroll/Scroll";
    export default {
        name: "CartList",
        components: {Scroll},
        computed:{
            ...mapGetters(['cartList'])
        }
    }
</script>

<style scoped>
    .content{
        height: calc(100vh - 44px - 49px);
    }
</style>