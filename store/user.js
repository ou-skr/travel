// 管理回来的数据
export const state=()=>({
    // 用一个对象把返回来的数据接受
    // userInfo是模块的名字
    userInfo:{
        // 用户验证的token
        token:'',
        // user是一个对像类型 返回的数据得知，这个user信息不能放密码
        user:{}
    }
})

export const mutations={
    // data就是登陆的时候拿到的对象 state就是原本定义的数据 mutations就是用来修改state的
    setUserInfo(state,data){
        // 把之前的state重新赋值，把获取到的登陆返回的数据赋值给state.userInfo这个对象
        state.userInfo=data
    },
    clearUserInfo(state,info){
        if(process.browser){
            localStorage.removeItem("userInfo")
        }
        state.userInfo={}
    }
}

export const actions={
    // 登陆
    login({commit},data){
        return this.$axios({
            url:'/accounts/login',
            method:'POST',
            data:data
        }).then(res=>{
            const data=res.data;
            // 保存到state中
            commit("setUserInfo",data);
            return data
        })
    },
        // 注册
        zhuce({ commit }, data) {
            return this.$axios({
                url: `/accounts/register`,
                method: 'POST',
                data: data
            }).then(res=>{
                console.log(res)
                const data=res.data
                commit("setUserInfo",data)
                return data
            })
        }
}