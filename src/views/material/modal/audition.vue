<template>
    <div>
        <Modal v-model="auditionModal" title="试听" @on-ok="ok" @on-cancel="cancel" >
            <Form label-position="right" :label-width="80">
                <Row getter="40">
                <FormItem v-if="auditionModal" label="素材大小">
                    <span>{{historyData[experiment].fileSize}}</span>
                </FormItem>
                <FormItem v-if="auditionModal" label="素材时长">
                    <span>{{historyData[experiment].fileDuration}}</span>
                </FormItem>
                <audio id="audios" controls="controls" style="height:35px;margin-top:20px;"></audio>
                </Row>
            </Form>
        </Modal>
    </div>
        
</template>
<script>
export default {
    props:['historyData'],
    data(){
        return{
            auditionModal: false, //试听
            experiment:0,
            infoId:0,
        }
    },
    methods:{
        audition (index) {   //试听
            this.experiment = index;
            console.log(this.historyData[index]);
            
            $("#audios")[0].src = "";
            if("materialId" in this.historyData[index]){
                this.infoId = this.historyData[index].materialId;
            }else{
                this.infoId = this.historyData[index].infoId
            }
            this.accept();
        },
        accept(){
            let fileURLS = 'data:audio/mpeg;base64,';
            this.$axios({
                method: 'get',
                url: this.baseURL + '/material/MaterialInfo/getFileByte',
                params:{infoid:this.infoId}
            })
            .then((res)=> {
                console.log(res.data)
                if(res.data.code == 0){
                    this.auditionModal = true;
                    fileURLS = fileURLS+res.data.result;
                    $("#audios")[0].src=fileURLS;
                }else if(res.data.code == 1){
                    alert(res.data.msg)
                }
            })
            .catch((error) =>{
                console.log(error)
            }
            )
        },
        palyStop(){   //关闭弹框时停止音频播放
            let audio = $("audio");
            for(let i=0; i<audio.length; i++){
                audio[i].pause()
            }
        },
        ok (name) {
            this.$Message.info('OK!');
            this.palyStop()
        },
        cancel (name) {
            this.$Message.info('Clicked cancel');
            this.palyStop()
        },
    }
}
</script>

