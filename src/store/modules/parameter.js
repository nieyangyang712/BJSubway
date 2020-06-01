import axios from 'axios'

const baseURL = process.env.BASE_API;
const parameter = { 
    state:{
        deserve:[]
    },
    mutations:{
        getData(state,res){
            state.deserve = res.data;
        }
    },
    actions:{
        getData(context){
            // axios.get(baseURL+'/master/MasterInfo/dyadicArray',{changeOrigin: true}).then((res)=>{ 
            //     context.commit('getData',res)
            // }).catch((res)=>{
            //     console.log(res)
            // })
        },
    },

}

export default parameter

