export default {
    //payLoad 携带的额外参数
    addCart(context,payLoad){
        //payLoad为新添加的商品，查找之前数组中是否有该商品
        let oldProduct = null;
        for(let item of context.state.cartList){
            if(item.iid===payLoad.iid){
                oldProduct = item
            }
        }
        //oldProduct 已添加的商品
        if(oldProduct){
            // oldProduct.count +=1
            context.commit('addCounter',oldProduct)
        }else {
            payLoad.count = 1
            // state.cartList.push(payLoad)
            context.commit('addToCart',payLoad)
        }

    }
}