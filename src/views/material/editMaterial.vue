<template>
  <div class="staple">
  <Row :gutter="12">
      <Col span="3"><Input  clearable v-model="materialDemand.infoName" placeholder="素材名称" /></Col>
       <Col span="3">
         <Select v-model="materialDemand.commitStatus" clearable placeholder="审核状态" >
            <Option v-for="item in commitStatus" :value="item.countTrainee" :key="item.countTrainee">{{ item.itemName }}</Option>
         </Select>
      </Col>
      <Col span="3">
         <Select v-model="materialDemand.typeNo" clearable placeholder="素材分类" >
            <Option v-for="item in typeNo" :value="item.countTrainee" :key="item.countTrainee">{{ item.itemName }}</Option>
         </Select>
      </Col>
      <Col span="3"><Input  clearable v-model="materialDemand.createUserName" placeholder="编制人名称" /></Col>
      <Col span="3">
            <DatePicker type="datetime" v-model="materialDemand.startTime" format="yyyy-MM-dd HH:mm" placeholder="开始时间" ></DatePicker>
      </Col>
      <Col span="3">
            <DatePicker type="datetime" v-model="materialDemand.endTime" format="yyyy-MM-dd HH:mm" placeholder="结束时间" ></DatePicker>
      </Col>
      <Col span="2"><Button type="primary" icon="md-search" @click="handleListApproveHistory()">查询</Button></col>
      <Col span="2" push="1"><Button type="primary" @click="getChild()">信息录入</Button></col>
      <Col span="1" push="1"><Button type="error" @click="batchDelete">删除</Button></col>
  </Row>
    <div class="listfile">
        <Table border ref="selection" :columns="historyColumns" :data="historyData" @on-select-all='selectTable' @on-select='selectTable' @on-select-cancel='selectTable'></Table>
        <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="dataCount" :page-size="pageSize" show-total  @on-change="changepage"></Page>
        </div>
    </div>
    </div>
    <addMaterial  ref="addMaterial"></addMaterial>
    <updateMaterial ref="updateMaterial" :historyData="historyData"></updateMaterial>
    <audition ref="audition" :historyData="historyData"></audition>
  </div>
</template>

<script>
import addMaterial from 'src/views/material/modal/addMaterial.vue'
import updateMaterial from 'src/views/material/modal/updateMaterial.vue'
import audition from 'src/views/material/modal/audition.vue'
import Cookies from 'js-cookie';
import {FromDates,FromTimes,nowTime,defaultTime,formerTime} from 'src/utils/time.js';

export default {
        components:{
            addMaterial,updateMaterial,audition
        },
        data () {
            const  letter = this.$store.state.parameter.deserve; //字典
            return {  
                uploadFiles: null,
                fileSize: null,
                selectData:"",
                ajaxHistoryData:[], 
                dataCount:1,// 初始化信息总条数
                pageSize:10, // 每页显示多少条
                below: 0, //下一页或者上一页的第一项索引值                
                //查询字段
                materialDemand:{infoName:'',createUserName:'',commitStatus:letter.M003[0].countTrainee,typeNo:'',startTime:formerTime(3),endTime:nowTime()},
                uploadFiles:'',
                commitStatus: letter.M003, //审核状态
                typeNo: letter.M005, //类型
                fileFormat: letter.M018, //语音格式
                ttsLibrary: letter.M013, //音库
                ttsStyle: letter.M015, //风格
                ttsSpeed: letter.M016, //语速
                fbGroundType: letter.M401, //素材前背景类型
                historyColumns: [
                    {type: 'selection', width: 60 , align: 'center'},
                    {title: '素材编号',key: 'infoId',width:130},
                    {title: '素材名称',key: 'infoName' ,width:100},
                    {title: '素材状态',key: 'commitStatus',width:110,
                     render: (h, params) => {let _this = this;let texts = '';
                            for(let i=0; i<letter.M003.length; i++){
                                 if(params.row.commitStatus == i+1){ texts = letter.M003[i].itemName}
                            }
                            return h('div', {   props: {}, },texts)
                     }},
                    {title: '素材类型',key: 'typeNo',width:100,  
                     render: (h, params) => {let _this = this;let texts = '';
                             for(let i=0; i<letter.M005.length; i++){
                                 if(params.row.typeNo == i+1){ texts = letter.M005[i].itemName}
                             }
                            return h('div', {   props: {}, },texts)
                    }},
                    {title: '编制节点编号',key: 'compileNodeId',width:130 },
                    {title: '编制节点名称',key: 'compileNodeName',width:130},
                    {title: '编制人',key: 'createUserName',width:100},
                    {title: '编制日期',key: 'createTime',sortable: true,width:150,
                     render: (h, params) =>{ return h('div', FromTimes(params.row.createTime))}
                    },
                    {title: '语音格式',key: 'fileFormat',width:100,
                    render: (h, params) => {let _this = this;let texts = '';
                            for(let i=0; i<letter.M018.length; i++){
                                 if(params.row.fileFormat == i+1){ texts = letter.M018[i].itemName}
                            }
                            return h('div', { props: {}, },texts)
                    }},
                    {title: '文本信息',key: 'infoComment',width:150},
                    {title: '素材大小',key: 'fileSize',width:100},
                    {title: '素材时长',key: 'fileDuration',width:100},
                    {title: '操做',key: 'action',width: 150,align: 'right',fixed:'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: { type: 'primary', size: 'small'},
                                    style: { marginRight: '5px',
                                           display:(params.row.commitStatus == 1 || params.row.commitStatus == 4)?"inline-blok":"none"  //判断显示修改按钮
                                          },
                                    on: { click: () => {this.updateMaterial(params.index)}}
                                }, '修改'),
                                 h('Button', {
                                    props: { type: 'primary',size: 'small' },
                                    style: { marginRight: '5px' },
                                    on: { click: () => {this.audition(params.index)} }
                                }, '试听'),
                                h('Button', {
                                    props: { type: 'error',size: 'small' },
                                    on: { click: () => {  this.oneDelete(params.index)}}
                                }, '删除')
                            ])
                        }
                    }
                ],
                historyData:[],
            }   
        },
        methods: {
            updateMaterial (index) {   //编辑修改
                console.log(this.historyData[index].typeNo );
                if(this.historyData[index].typeNo == "1"){
                    this.$refs.updateMaterial.reserve = true;
                }else if(this.historyData[index].typeNo == "2"){
                    this.$refs.updateMaterial.prepare = true;
                }

                this.$nextTick(()=>{
                    this.$refs.updateMaterial.modifier(index);
                });
            },
            oneDelete (index) {  //删除指定数据
                console.log(this.historyData[index].infoId);
                let question = confirm("您确认删除？");
                if(question != "0"){
                    let data = {infoId:this.historyData[index].infoId,createUserId:"06ZZZZ01"+this.$store.state.user.uid,createUserName:this.$store.state.user.name};
                    this.$axios({
                            method: 'post',
                            url: this.baseURL + '/material/MaterialInfo/delete_Material',
                            params:data
                        })
                        .then((res)=> {
                            console.log(res)
                            if(res.status == "200"){
                                this.historyData.splice(index, 1);
                                alert('删除成功');
                            }
                        })
                        .catch((error)=> { }
                    )
                }
            },
            batchDelete(status){  //批量删除
                let electData1 = [];
                for(var key in this.selectData){
                    console.log(this.selectData[key].infoId)
                    electData1.push(this.selectData[key].infoId)    
                }
               console.log(electData1);
               let paramsData = new FormData();
               for(var i =0; i< electData1.length; i++){
                    paramsData.append("infoIds[]",electData1[i])
               };
               if(electData1.length > 0){
                     let question = confirm("您确认删除，这"+electData1.length+"条数据？");
                     paramsData.append("createUserId","06ZZZZ01"+this.$store.state.user.uid);
                     paramsData.append("createUserName",this.$store.state.user.name)
                if(question != "0"){
                    this.$axios({
                         method: 'post',
                         data:paramsData,
                         url: this.baseURL + '/material/MaterialInfo/delete_Material_List',
                         headers:{"Content-Type": "multipart/form-data"},
                    })
                    .then((res)=> {
                        console.log(res)
                         if(res.status == "200"){
                             this.handleListApproveHistory();
                             alert('删除成功');
                          }
                     })
                     .catch((error)=> { })
                }
               }
            },
            selectTable(data){   //列表左侧checkbox
                this.selectData = data;
                console.log(data);
            },
            audition(index){
                this.$nextTick(()=>{
                    this.$refs.audition.audition(index)
                });
            },
            // 获取历史记录信息
            handleListApproveHistory() {
                this.dataCount = 1;
                if(this.materialDemand.startTime !=""){
                    this.materialDemand.startTime = FromTimes(this.materialDemand.startTime);
                }
                if(this.materialDemand.endTime !=""){
                    this.materialDemand.endTime = FromTimes(this.materialDemand.endTime);
                }
                let formData = new FormData();
                for(var key in this.materialDemand){             
                    formData.append(key, this.materialDemand[key]);
                } 
                let sessionId = Cookies.get('status');
                let this1 = this;
                this.$axios({
                        headers: { "Authorization": sessionId,},
                        method: 'post',
                        url: this.baseURL + '/material/MaterialInfo/getList?currentPage='+this.dataCount+'&pageSize='+this1.pageSize+'&offset='+0,
                        params:this.materialDemand
                })
                    .then((res)=> {
                            console.log(res.data);
                            this1.ajaxHistoryData = res.data.list;
                            this1.dataCount = res.data.total;  
                            this1.historyData = this1.ajaxHistoryData;
                    })
                    .catch((error)=> { })
            },
             pages(num) { //修改每页显示条数时调用
                 this.pageSize = num;
                 this.changepage(1);
             },
             changepage(index) {
                 //index当前页码
                 this.below = (index);
                 let sessionId = Cookies.get('status');
                 let this1 = this;
                 this.$axios({
                         headers: { "Authorization": sessionId,},
                         method: 'post',
                         url: this.baseURL + '/material/MaterialInfo/getList?currentPage='+this1.below+'&pageSize='+this1.pageSize+'&nextPage='+this1.below,
                         params:this.materialDemand
                     })
                    .then((res)=> {
                         this1.historyData = res.data.list;
                    })
                    .catch((error) =>{})
             },
            getChild(){
                this.$refs.addMaterial.modal1 = true;
            }
        },
        created(){
           this.handleListApproveHistory();
        },
        mounted(){
        },
        
    }
</script>
<style type="text/css">
    .ar{width:100% !important;box-shadow:none !important;margin-left: 40px;}
    .ar-recorder__time-limit{display:none}
    .ar-recorder__records-limit{top:65px !important;}
    .ar-records{height:60px !important}
    .listfile{padding:15px 0 15px 0;}
  /* .ivu-checkbox-wrapper{display: none} */
   .vue-treeselect__control{height:33px !important}
</style>