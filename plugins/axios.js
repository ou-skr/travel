import {Message} from 'element-ui'

// export default (nuxt)=>{
//     console.log(nuxt,123);//是一个对象，里面包含许多东西 有$axios
// }

export default ({$axios})=>{
    $axios.onError(err=>{
        const {statusCode,message} =err.response.data;
        if(statusCode===400){
            Message.warning({message})
        }
    })
}