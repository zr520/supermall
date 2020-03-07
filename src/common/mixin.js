import {debounce} from './utils';


export const itemListenerMixin = {
    data(){
        return {
            itemListener: null,
        }
    },
    methods:{

    },
    mounted(){
        let refresh = debounce(this.$refs.scroll.refresh,50)
        //监听列表中图片是否加载完成
        this.itemListener = ()=>{
            //,当图片都加载完成后，重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
            refresh()
        }
        // console.log('我是混入的代码')
        this.$bus.$on('itemImageLoad',this.itemListener)
    }
}
