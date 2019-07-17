import createPersistedState from 'vuex-persistedstate'

export default ({store})=>{
    window.onNuxtReady(()=>{
        createPersistedState({
            key:'store'  //把数据存到本地
        })(store)
    })
}