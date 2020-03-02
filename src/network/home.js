import {request} from './request'


//首页轮播图，为你推荐数据
export function getHomeMultidate() {
    return request(
        {
            url:'/home/multidata'
        }
    )
}

//首页新品，最新，等数据
export function getHomeGoods(type,page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}