<template>
    <div>
        <Modal  v-model="reserve" title="修改" mask-closable width="1000" :styles="{top:'20px'}" style="z-index:1021">
            <Form v-if="reserve" label-position="right" :label-width="120">
                <Row>
                    <Col span="11">
                        <FormItem label="素材名称">
                            <Input v-model="historyData[compile].infoName"></Input>
                        </FormItem>
                        <FormItem label="素材状态">
                            <Select v-model="historyData[compile].commitStatus" clearable disabled>
                                <Option v-for="item in commitStatus" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="素材类型">
                            <Select v-model="historyData[compile].typeNo" clearable>
                                <Option v-for="item in typeNo" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                            <FormItem label="音库"  prop="ttsLibrary">
                            <Select v-model="historyData[compile].ttsLibrary" clearable>
                                <Option v-for="item in ttsLibrary" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>     
                        <FormItem label="语速"  prop="ttsSpeed">
                            <Select v-model="historyData[compile].ttsSpeed" clearable>
                                <Option v-for="item in ttsSpeed" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="上传素材">
                            <Upload :format="['mp3']" :before-upload="handleUpload"  action="">
                                <Button type="ghost" icon="ios-cloud-upload-outline" accept="audio/mp3">选择文件</Button>
                            </Upload>
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
                            <Input :value="createTime" disabled></Input>
                        </FormItem>
                        <FormItem label="素材语音格式">
                            <Select v-model="historyData[compile].fileFormat" clearable>
                                <Option v-for="item in fileFormat" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="风格"  prop="ttsStyle">
                            <Select v-model="historyData[compile].ttsStyle" clearable >
                                <Option v-for="item in ttsStyle" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                            <FormItem label="前背景类型"  prop="fbGroundType">
                            <Select v-model="historyData[compile].fbGroundType" clearable>
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
                            <Input type="textarea" v-model="historyData[compile].infoComment"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="updatePreserveSubmit()">保存</Button>
                <Button type="primary" @click="updateHandleSubmit()">提交审核</Button>
                <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
            </div>
        </Modal>
        <Modal v-model="prepare" title="修改" mask-closable width="1000" :styles="{top:'20px'}" style="z-index:1021">
            <Form v-if="prepare" label-position="right" :label-width="120">
                <Row>
                    <Col span="11">
                        <FormItem label="素材名称">
                            <Input v-model="historyData[compile].infoName"></Input>
                        </FormItem>
                        <FormItem label="素材状态">
                            <Select v-model="historyData[compile].commitStatus" clearable disabled>
                                <Option v-for="item in commitStatus" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="素材类型">
                            <Select v-model="historyData[compile].typeNo" clearable>
                                <Option v-for="item in typeNo" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                            <FormItem label="音库"  prop="ttsLibrary">
                            <Select v-model="historyData[compile].ttsLibrary" clearable>
                                <Option v-for="item in ttsLibrary" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>     
                        <FormItem label="语速"  prop="ttsSpeed">
                            <Select v-model="historyData[compile].ttsSpeed" clearable>
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
                            <Input :value="createTime" disabled></Input>
                        </FormItem>
                        <FormItem label="素材语音格式">
                            <Select v-model="historyData[compile].fileFormat" clearable>
                                <Option v-for="item in fileFormat" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="风格"  prop="ttsStyle">
                            <Select v-model="historyData[compile].ttsStyle" clearable >
                                <Option v-for="item in ttsStyle" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                            <FormItem label="前背景类型"  prop="fbGroundType">
                            <Select v-model="historyData[compile].fbGroundType" clearable>
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
                    <Col span="21">
                        <audio-recorder
                            upload-url="some url"
                            :attempts="2"
                            :time="2"
                            :show-upload-button="false"
                            :select-record="select_record"
                            :mic-failed="mic_failed"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span="22">
                        <FormItem label="素材文本信息">
                            <Input type="textarea" v-model="historyData[compile].infoComment"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="updatePreserveSubmit()">保存</Button>
                <Button type="primary" @click="updateHandleSubmit()">提交审核</Button>
                <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {FromTimes} from 'src/utils/time.js';
export default {
    name:'updataMsg',
    props:['historyData'],
    data() {
        const  letter = this.$store.state.parameter.deserve; //字典
        return {
            reserve: false,
            prepare: false,
            commitStatus: letter.M003, //审核状态
            typeNo: letter.M005, //类型
            fileFormat: letter.M018, //语音格式
            ttsLibrary: letter.M013, //音库
            ttsStyle: letter.M015, //风格
            ttsSpeed: letter.M016, //语速
            fbGroundType: letter.M401, //素材前背景类型
            uploadFiles:'',
            frequency:'',
            compile:0,
            createTime:0,
            cacheData:{},
            updateMaterial:{}
        }
    },
    methods:{
        modifier(index){
            console.log(this.uploadFiles);
            this.compile = index;
            
            this.historyData[this.compile].commitStatus = this.$store.state.parameter.deserve.M003[this.historyData[this.compile].commitStatus-1].itemValue;
            this.historyData[this.compile].typeNo = this.$store.state.parameter.deserve.M005[this.historyData[this.compile].typeNo-1].itemValue;
            this.historyData[this.compile].fileFormat = this.$store.state.parameter.deserve.M018[this.historyData[this.compile].fileFormat-1].itemValue;
            this.createTime = new Date(+new Date(new Date(this.historyData[this.compile].createTime).toJSON())+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
            this.historyData[this.compile].ttsLibrary = this.$store.state.parameter.deserve.M013[this.historyData[this.compile].ttsLibrary-1].itemValue;
            this.historyData[this.compile].ttsSpeed = this.$store.state.parameter.deserve.M016[this.historyData[this.compile].ttsSpeed].itemValue;
            this.historyData[this.compile].ttsStyle = this.$store.state.parameter.deserve.M015[this.historyData[this.compile].ttsStyle-1].itemValue;
            this.historyData[this.compile].fbGroundType = this.$store.state.parameter.deserve.M401[this.historyData[this.compile].fbGroundType-1].itemValue;
            let fileURL = 'data:audio/mpeg;base64,';
            this.frequency = "";
            this.$axios({
                method: 'get',
                url: this.baseURL + '/material/MaterialInfo/getFileByte',
                params:{infoid:this.historyData[this.compile].infoId}
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
        updateAlter (){ //修改
            this.cacheData = JSON.parse(JSON.stringify(this.historyData[this.compile]));
            this.cacheData.fileDuration = $(".duration").html();
            this.cacheData.createTime = FromTimes(this.historyData[this.compile].createTime);
            this.cacheData.reviewDate = FromTimes(this.historyData[this.compile].reviewDate);
            let changeData = new FormData();
            for(var key in this.cacheData){             
                    changeData.append(key, this.cacheData[key]);
                }
            debugger
            this.$axios({
                    method: 'post',
                    data:changeData,
                    url: this.baseURL + '/material/MaterialInfo/update_Material',
                    headers:{ 'Content-Type': 'multipart/form-data'},
                })
                .then((res)=> {
                    console.log(res);
                    if(res.status == "200"){
                        this.reserve = false;
                        if(res.data.code == "1"){
                            alert(res.data.msg)
                        }else if(res.data.code == "0"){
                            alert('Success!');
                        }
                    }
                })
                .catch((error)=> {}
            );
        },
       
        updateHandleSubmit (name) {    //修改提交审核
            this.historyData[this.compile].commitStatus = 2; //待审核
            this.updateAlter();
        },
        updatePreserveSubmit (name) {  //修改保存
            this.historyData[this.compile].commitStatus = 1; //编辑中
            console.log(this.uploadFiles);
            debugger
            this.updateAlter();
        },
        handleUpload (file) {  //上传文件
            this.uploadFiles = file;
            console.log(this.uploadFiles);
            this.fileSize = file.size / 1024;
            if (this.fileSize < 1024) {
                this.fileSize = Math.floor(this.fileSize);
                this.historyData[this.compile].fileSize = this.fileSize;
            } else {alert("文件过大"); }
                $(".musicPlayPanel").attr("src", URL.createObjectURL(this.uploadFiles));
                $(".musicPlayPanel").get('0').load();
                console.log($(".musicPlayPanel"))
            let myVid = $(".musicPlayPanel");
                if(myVid != null){let duration;
                myVid[0].load();
                myVid[0].oncanplay =  ()=> { $(".duration").html(Math.floor(myVid[0].duration)); }
            }
            return false;
        }, 
        time_to_sec(time) {   //将分秒转换成秒数
            var s = '';
            var min = time.split(':')[0];
            var sec = time.split(':')[1];
            s = Number(min*60) + Number(sec);
            return s;
            },
        select_record(data){   //录音回调数据
            console.log(data);
            this.historyData[this.compile].fileSize = Math.ceil(data.blob.size/1024);  
            this.historyData[this.compile].fileDuration = this.time_to_sec(data.duration); 
            this.uploadFiles = new File([data.blob], {type: "audio/mp3"});
        }, 
        mic_failed(){
            alert("您的麦克风不起作用");
        },
        handleReset (name) {
            this.reserve = false;
        },
    },
    created(){
    }
}
</script>

