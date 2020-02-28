//配置别名，便于直接引用
module.exports={
    configureWebpack:{
        resolve:{
            // extensions:[]    默认已经配置过了
            //默认@=src
            alias:{
                'assets':'@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}