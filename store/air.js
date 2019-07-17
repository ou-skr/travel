// // 暴露state函数 函数里面有整个注册完返回来的数据 有token 有user对象 里面有user的信息
export const state = () => ({
    userInfo: {
        token: '',
        user: {}
        // 关于保存把数据保存在本地的问题 因为nuxt是同构程序，可以在浏览器和服务器node.js执行 所以判断是否在浏览器下还是服务器下执行的代码
        // 如果是服务器下执行的代码可以运行，但是在浏览器下执行的代码不能够执行
        // user：JSON.parse(window.localStorage.getItem("userInfo")||`{}`)
    }
})
// 这些格式是nuxt决定这样使用的
export const mutations = {
    setUserInfo(state, data) {
        state.userInfo = data
        // 保存在本地，但是不能执行这段代码 因为浏览器不支持，只能使用插件来解决
        // localStorage.setItem("userInfo",JSON.stringify(data))
    },
    // 清除注册来的数据
    clearUserInfo(state, info) {
        if (process.browser) {
            localStorage.removeItem("userInfo")
        }
        state.localStorage = {}
    }
}

export const actions = {
    // 注册
    zhuce({ commit }, data) {
        return this.$axios({
            url: `/accounts/register`,
            method: 'POST',
            data: data
        }).then(res=>{
            const data=res.data
            commit("setUserInfo",data)
            return data
        })
    }
}

