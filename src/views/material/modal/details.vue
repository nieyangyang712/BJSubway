<template>
    <div>
        <Modal  v-model="detailed" title="详情" @on-ok="ok" @on-cancel="cancel" width="1000" >
            <Form v-if="detailed" label-position="right" :label-width="120">
                <Row>
                    <Col span="11">
                        <FormItem label="素材名称">
                            <Input v-model="historyData[compile].infoName" disabled></Input>
                        </FormItem>
                        <FormItem label="素材状态">
                            <Select v-model="historyData[compile].commitStatus" clearable disabled>
                                <Option v-for="item in commitStatus" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="素材类型">
                            <Select v-model="historyData[compile].typeNo" clearable disabled>
                                <Option v-for="item in typeNo" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                            <FormItem label="音库"  prop="ttsLibrary">
                            <Select v-model="historyData[compile].ttsLibrary" clearable disabled>
                                <Option v-for="item in ttsLibrary" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>     
                        <FormItem label="语速"  prop="ttsSpeed">
                            <Select v-model="historyData[compile].ttsSpeed" clearable disabled>
                                <Option v-for="item in ttsSpeed" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="试听">
                            <audio  class="musicPlayPanel" :src="frequency" controls="controls" style="height:30px;width:320px;"></audio>
                        </FormItem>
                    </Col>
                    <Col span="11">
                        <FormItem label="素材编制人">
                            <Input :value="historyData[compile].createUserName" disabled></Input>
                        </FormItem>
                        <FormItem label="素材编制日期">
                            <Input :value="historyData[compile].createTime" disabled></Input>
                        </FormItem>
                        <FormItem label="素材语音格式">
                            <Select v-model="historyData[compile].fileFormat" clearable disabled>
                                <Option v-for="item in fileFormat" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="风格"  prop="ttsStyle">
                            <Select v-model="historyData[compile].ttsStyle" clearable disabled>
                                <Option v-for="item in ttsStyle" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="前背景类型"  prop="fbGroundType">
                            <Select v-model="historyData[compile].fbGroundType" clearable disabled>
                                <Option v-for="item in fbGroundType" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="素材大小">
                            <Input v-model="historyData[compile].fileSize" disabled></Input>
                        </FormItem>
                        <FormItem label="素材时长">
                            <Span class="duration">{{historyData[compile].fileDuration}}</Span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="22">
                        <FormItem label="素材文本信息">
                            <Input type="textarea" v-model="historyData[compile].infoComment" disabled></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    props:['historyData'],
    data(){
        const  letter = this.$store.state.parameter.deserve; //字典
        return{
            commitStatus: letter.M003, //审核状态
            typeNo: letter.M005, //类型
            fileFormat: letter.M018, //语音格式
            ttsLibrary: letter.M013, //音库
            ttsStyle: letter.M015, //风格
            ttsSpeed: letter.M016, //语速
            fbGroundType: letter.M401, //素材前背景类型
            detailed: false,
            compile: 0,
            frequency: '',
            cacheData:{}
        }
    },
    methods:{
        details(index){
            this.detailed = true;
            this.compile = index;
            this.cacheData = JSON.parse(JSON.stringify(this.historyData[index]));
            this.historyData[index].commitStatus = this.$store.state.parameter.deserve.M003[this.historyData[index].commitStatus - 1].itemValue;
            this.historyData[index].typeNo = this.$store.state.parameter.deserve.M005[this.historyData[index].typeNo - 1].itemValue;
            this.historyData[index].fileFormat = this.$store.state.parameter.deserve.M018[this.historyData[index].fileFormat - 1].itemValue;
            this.historyData[index].createTime = new Date(+new Date(new Date(this.historyData[index].createTime).toJSON())+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
            this.historyData[index].ttsLibrary = this.$store.state.parameter.deserve.M013[this.historyData[index].ttsLibrary - 1].itemValue;
            this.historyData[index].ttsSpeed = this.$store.state.parameter.deserve.M016[this.historyData[index].ttsSpeed - 1].itemValue;
            this.historyData[index].ttsStyle = this.$store.state.parameter.deserve.M015[this.historyData[index].ttsStyle - 1].itemValue;
            this.historyData[index].fbGroundType = this.$store.state.parameter.deserve.M401[this.historyData[index].fbGroundType - 1].itemValue;
            let fileURL = 'data:audio/mpeg;base64,';
            this.frequency = "";
            this.$axios({
                method: 'get',
                url: this.baseURL + '/material/MaterialInfo/getFileByte',
                params:{infoid:this.historyData[index].infoId}
            })
            .then((res)=> {
                console.log(res.data)
                if(res.data.code == 0){
                    fileURL = fileURL+res.data.result;
                    this.frequency = fileURL;
                     $("#frequency")[0].src=fileURL;
                }else if(res.data.code == 1){
                    console.log(res.data.msg)
                }
            })
            .catch((error) =>{}
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

