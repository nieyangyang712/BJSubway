<template>
       <Modal v-model="modal1" title="信息录入" @on-ok="ok('formValidate')" @on-cancel="cancel('formValidate')" :styles="{top:'20px'}" style="z-index:1021" width="1000">
        <Collapse v-model="accordion_value" accordion  @on-change="handleReset('formValidate')">
            <Panel name="1">
                预录素材
                <div slot="content">
                 <Form ref="formValidate" :model="formValidate" label-position="right" :rules="ruleValidate" :label-width="110">
                    <Row getter="40">
                        <Col span="11">
                            <FormItem label="上传素材">
                                <Upload :format="['mp3']" :before-upload="handleUploadFile"  action="">
                                    <Button type="ghost" icon="ios-cloud-upload-outline" accept="audio/mp3">选择文件</Button>
                                </Upload>
                            </FormItem>
                            <FormItem label="素材名称"  prop="infoName">
                                <Input v-model="formValidate.infoName"></Input>
                            </FormItem>
                            <FormItem label="素材分类"  prop="typeNo">
                                <Select v-model="formValidate.typeNo" clearable placeholder="素材分类" >
                                    <Option v-for="item in typeNo" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="素材分组"  prop="groupNo">
                                <Select v-model="formValidate.groupNo" clearable placeholder="素材分组">
                                    <Option v-for="item in groupNo" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                              <FormItem label="音库"  prop="ttsLibrary">
                                <Select v-model="formValidate.ttsLibrary" clearable placeholder="音库">
                                    <Option v-for="item in ttsLibrary" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>     
                            <FormItem label="语速"  prop="ttsSpeed">
                                <Select v-model="formValidate.ttsSpeed" clearable placeholder="语速">
                                    <Option v-for="item in ttsSpeed" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                          
                        </Col>
                        <Col span="11">
                            <FormItem label="素材大小"  prop="fileSize">
                                <Input disabled  v-model="formValidate.fileSize"></Input>
                            </FormItem>
                            <FormItem label="试听">
                                 <audio controls id="musicPlayPanel" style="height:30px;"><source type="audio/mpeg"></audio>
                            </FormItem>
                            <FormItem label="风格"  prop="ttsStyle">
                                <Select v-model="formValidate.ttsStyle" clearable placeholder="风格">
                                    <Option v-for="item in ttsStyle" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="前背景类型"  prop="fbGroundType">
                                <Select v-model="formValidate.fbGroundType" clearable placeholder="前背景类型">
                                    <Option v-for="item in fbGroundType" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="素材语音格式"  prop="fileFormat">
                                <Select v-model="formValidate.fileFormat" clearable placeholder="素材语音格式">
                                    <Option v-for="item in fileFormat" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="素材时长" style="display:block">
                                <span  id="duration">{{formValidate.fileDuration}}</span>
                            </FormItem>
                        </Col>                       
                    </Row>
                    <Row>
                        <Col span="22">
                           <FormItem label="素材文本信息" prop="infoComment">
                                <Input type="textarea" v-model="formValidate.infoComment"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                        <FormItem>
                            <Button type="primary" @click="preserveSubmit('formValidate')">保存</Button>
                            <Button type="primary" @click="handleSubmit('formValidate')">提交审核</Button>
                            <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                        </FormItem> 
                    </Form>
                </div>
            </Panel>
            <Panel name="2">
                 实录素材
                <div slot="content">
                    <Form ref="formValidate" :model="formValidate" label-position="right" :rules="ruleValidate" :label-width="110">
                    <Row getter="40">
                        <Col span="11">
                            <FormItem label="素材名称"  prop="infoName">
                                <Input v-model="formValidate.infoName"></Input>
                            </FormItem>
                            <FormItem label="素材分类" prop="typeNo">
                                <Select v-model="formValidate.typeNo" clearable placeholder="素材分类" >
                                    <Option v-for="item in typeNo" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="素材分组" prop="groupNo">
                                <Select v-model="formValidate.groupNo" clearable placeholder="素材分组">
                                    <Option v-for="item in groupNo" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                              <FormItem label="音库" prop="ttsLibrary">
                                <Select v-model="formValidate.ttsLibrary" clearable placeholder="音库">
                                    <Option v-for="item in ttsLibrary" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>     
                            <FormItem label="语速" prop="ttsSpeed">
                                <Select v-model="formValidate.ttsSpeed" clearable placeholder="语速">
                                    <Option v-for="item in ttsSpeed" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="11">
                           <FormItem label="素材大小" prop="fileSize">
                                <Input disabled  v-model="formValidate.fileSize"></Input>
                            </FormItem>
                            <FormItem label="风格" prop="ttsStyle">
                                <Select v-model="formValidate.ttsStyle" clearable placeholder="风格">
                                    <Option v-for="item in ttsStyle" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="前背景类型" prop="fbGroundType">
                                <Select v-model="formValidate.fbGroundType" clearable placeholder="前背景类型">
                                    <Option v-for="item in fbGroundType" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                           <FormItem label="素材语音格式" prop="fileFormat">
                                <Select v-model="formValidate.fileFormat" clearable placeholder="素材语音格式">
                                    <Option v-for="item in fileFormat" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="素材时长" >
                                <span>{{formValidate.fileDuration}}</span>
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
                           <FormItem label="素材文本信息" prop="infoComment">
                                <Input type="textarea" v-model="formValidate.infoComment"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem>
                            <Button type="primary" @click="preserveSubmit('formValidate')">保存</Button>
                            <Button type="primary" @click="handleSubmit('formValidate')">提交审核</Button>
                            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                    </FormItem> 
                    </Form>
                </div>
            </Panel>
            <!-- <Panel name="3">
                 TTS素材
                <div slot="content">
                 <Form ref="formValidate" :model="formValidate" label-position="right" :rules="ruleValidate" :label-width="70">
                    <Row>
                        <FormItem label="转换文字" >
                            <Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
                        </FormItem>
                        <Col span="11">
                             <FormItem label="音库">
                                <Select v-model="fodderLibrary" clearable placeholder="音库">
                                    <Option v-for="item in ttsLibrary" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="混音">
                                <Select v-model="fodderfileFormat" clearable placeholder="混音">
                                    <Option v-for="item in fileFormat" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="语速">
                                <Select v-model="fodderSpeed" clearable placeholder="语速">
                                    <Option v-for="item in ttsSpeed" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="11">
                            <FormItem label="风格">
                                <Select v-model="fodderttsStyle" clearable placeholder="风格">
                                    <Option v-for="item in ttsStyle" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="音量">
                                <Select v-model="fodderVolume" clearable placeholder="音量">
                                    <Option v-for="item in volume" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" >转换音频</Button>
                                
                            </FormItem>
                        </Col> 
                        <audio controls style="margin-left:380px;height:40px"><source type="audio/mpeg"></audio>
                                            
                    </Row>
                    <Row class="listfile">
                        <Col span="11">
                            <FormItem label="素材名称">
                                <Input v-model="formValidate.infoName"></Input>
                            </FormItem>
                        </Col>
                        <Col span="11">
                           <FormItem label="素材分组">
                                <Input v-model="formValidate.infoName"></Input>
                            </FormItem>
                        </Col>
                        <FormItem label="素材说明" >
                                <Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
                        </FormItem>  
                    </Row>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                        </FormItem> 
                    </Form>
                </div>
            </Panel> -->
          </Collapse>
        </Modal>
</template>
<script>
import {FromDates,FromTimes,nowTime,defaultTime,formerTime} from 'src/utils/time.js';
export default {
    name:"",
    props:{},
    data(){
        const  letter = this.$store.state.parameter.deserve; //字典
        return{
            commitStatus:'', //审核状态
            typeNo: letter.M005, //类型
            groupNo: letter.M006, //分组
            languageKbn: letter.M007, //语种
            fileFormat: letter.M018, //语音格式
            ttsLibrary: letter.M013, //音库
            ttsStyle: letter.M015, //风格
            ttsSpeed: letter.M016, //语速
            fbGroundType: letter.M401, //素材前背景类型
            frequency:'',  //编辑试听音乐
            modal1: false,  
            accordion_value: '1',  
            formValidate: {infoId:'',createUserName:'',commitStatus: '',fbGroundType:letter.M401[0].itemValue, compileNodeId: '',compileNodeName: '',createUserId: '',fileDuration: '',fileFormat:letter.M018[0].itemValue,fileSize:'', fileUrl:'', groupNo: letter.M006[0].itemValue,infoComment: '',infoName: '',issueDate: '',issueNodelist:'',issueUserId:'',languageKbn:'',reviewDate:'',reviewInfo:'',reviewUserId:'',reviewUserName:'',ttsLibrary:letter.M013[0].itemValue,ttsSpeed:letter.M016[0].itemValue,ttsStyle:letter.M015[0].itemValue,ttsText:'',typeNo:letter.M005[0].itemValue},
            ruleValidate: {
                    infoName: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    infoComment: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ]
            },
        }
    },
    methods: {
          handleUploadFile (file) {  //上传文件
                this.uploadFiles = "";
                this.uploadFiles = file;
                console.log(this.uploadFiles)
                this.fileSize = file.size / 1024;
                if (this.fileSize < 1024) {
                  this.fileSize = Math.floor(this.fileSize);
                } else {alert("文件过大"); }
                this.formValidate.fileSize = this.fileSize;
                let mPlayPanel = $("#musicPlayPanel");
                  mPlayPanel.attr("src", URL.createObjectURL(this.uploadFiles));
                  mPlayPanel.get('0').load();
                let myVid = mPlayPanel;
                  if(myVid != null){let duration;
                    myVid[0].load();
                    myVid[0].oncanplay =  ()=> { $("#duration").html(Math.floor(myVid[0].duration)); }
                }
                return false;
            },
            enhance(){    //编辑添加提交
                this.formValidate.fileDuration = $("#duration").html();
                this.formValidate.infoId = "06ZZZZ01"+FromDates();
                this.formValidate.createUserId = "06ZZZZ01"+this.$store.state.user.uid;
                this.formValidate.createUserName = this.$store.state.user.name;
                this.formValidate.createTime =  FromTimes(new Date());
                let formData = new FormData();
                for(var key in this.formValidate){             
                    formData.append(key, this.formValidate[key]);
                } 
                formData.append('materialfile',this.uploadFiles);
                this.$axios({
                        method: 'post',
                        data:formData,
                        url: this.baseURL + '/material/MaterialInfo/add_Material',
                        headers:{ 'Content-Type': 'multipart/form-data'},
                    })
                    .then((res)=> {
                        console.log(res);
                        if(res.status == "200"){
                            alert('Success!');
                        }
                    })
                    .catch((error)=> { })
            },
            handleSubmit (name) {    //提交审核
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.formValidate.reviewDate = FromTimes(new Date());
                        this.formValidate.commitStatus = 2; //待审核
                        this.enhance();
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            preserveSubmit (name) {  //保存
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.formValidate.reviewDate = defaultTime();
                        this.formValidate.commitStatus = 1; //编辑中
                        this.enhance();
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
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
                this.formValidate.fileSize = Math.ceil(data.blob.size/1024);  
                this.formValidate.fileDuration = this.time_to_sec(data.duration); 
                this.uploadFiles = new File([data.blob], {type: "audio/mp3"});
            }, 
            mic_failed(){
                alert("您的麦克风不起作用");
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }, 
            ok (name) {
                this.$Message.info('OK!');
            },
            cancel (name) {
                this.$Message.info('Clicked cancel');
            },     
    },
    created(){
    }
}
</script>

