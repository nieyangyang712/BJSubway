<template>
  <div class="staple">
  <Row :gutter="12">
      <Col span="3"><Input  clearable v-model="materialDemand.infoName" placeholder="素材名称" /></Col>
      <Col span="3"><Input  clearable v-model="materialDemand.reviewUserName" placeholder="审核人名称" /></Col>
       <Col span="3">
         <Select v-model="materialDemand.commitStatus" placeholder="审核状态" >
            <template v-for = "item in commitStatus">
                <Option v-if="item.itemValue != 1 && item.itemValue !=5"  :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                <Option v-else-if="item.itemValue"  :value="item.itemValue" style="display:none" :key="item.itemValue">{{ item.itemName }}</Option>
            </template>
         </Select>
      </Col>
      <Col span="3">
            <DatePicker type="datetime" v-model="materialDemand.startTime" format="yyyy-MM-dd HH:mm" placeholder="开始时间" ></DatePicker>
      </Col>
      <Col span="3">
            <DatePicker type="datetime" v-model="materialDemand.endTime" format="yyyy-MM-dd HH:mm" placeholder="结束时间" ></DatePicker>
      </Col>
      <Col span="2"><Button type="primary" icon="md-search" @click="handleListApproveHistory()">查询</Button></col>
  </Row>
    <div class="listfile">
        <Table border ref="selection" :columns="historyColumns" :data="historyData"></Table>
        <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="dataCount" :page-size="pageSize" show-total  @on-change="changepage"></Page>
        </div>
    </div>
    </div>
    <Modal v-model="modal1" title="审核信息" @on-ok="auditSubmit" @on-cancel="cancel" width="600" >
        <Form label-position="right" :label-width="120">
            <Row>
                <Col span="20">
                    <FormItem label="审核状态：" prop="lable">
                        <Select v-model="commitStatu" aria-placeholder="请选择" style="width:170px">
                            <template v-for = "item in commitStatus">
                                <Option v-if="item.itemValue != 3 && item.itemValue !=4" style="display:none" :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                                <Option v-else-if="item.itemValue"  :value="item.itemValue" :key="item.itemValue">{{ item.itemName }}</Option>
                            </template>
                        </Select>
                    </FormItem>
                    <FormItem label="审核人：">
                        <span>{{reviewUserName}}</span>
                    </FormItem>
                    <FormItem label="审核时间：">
                        <span>{{reviewDate}}</span>
                    </FormItem>
                    <FormItem label="审核意见：">
                        <Input type="textarea" v-model="reviewInfo"></Input>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </Modal>
    <detail ref="detail" :historyData="historyData"></detail>
    <audition ref="audition" :historyData="historyData"></audition>
  </div>
</template>

<script>
import detail from 'src/views/material/modal/details.vue'
import audition from 'src/views/material/modal/audition.vue'
import Cookies from 'js-cookie';
import {FromDates,FromTimes,nowTime,defaultTime,formerTime} from 'src/utils/time.js';

export default {
        components:{
            detail,audition
        },
        data () {
            const  letter = this.$store.state.parameter.deserve; //字典
            return {  
                fileSize: null,
                selectData:"",
                ajaxHistoryData:[], 
                dataCount:1,// 初始化信息总条数
                pageSize:10, // 每页显示多少条
                below: 0, //下一页或者上一页的第一项索引值
                //查询字段
                materialDemand:{infoName:'',reviewUserName:'',commitStatus:letter.M003[1].itemValue,startTime:formerTime(3),endTime:nowTime()},
                ruleValidate: {
                    infoName: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ]
                },
                accordion_value: '1',
                modal1: false,
                compile: 0,
                commitStatus: letter.M003, //审核状态
                reviewUserName:this.$store.state.user.name,
                reviewDate:nowTime(),
                reviewInfo:'',
                commitStatu:'',
                cacheData:{},
                historyColumns: [
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
                            return h('div', {   props: {}, },texts)
                    }},
                    {title: '文本信息',key: 'infoComment',width:150},
                    {title: '素材大小',key: 'fileSize',width:100},
                    {title: '素材时长',key: 'fileDuration',width:100},
                    {title: '描述',key: 'infoComment',width:100},
                    {title: '审核人',key: 'reviewUserName',width:100},
                    {title: '操做',key: 'action',width: 150,align: 'right',fixed:'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: { type: 'primary',size: 'small' },
                                    style: { marginRight: '5px'},
                                    on: { click: () => {  this.detailedMaterial(params.index)}}
                                }, '详情'),
                                 h('Button', {
                                    props: { type: 'primary',size: 'small' },
                                    style: { marginRight: '5px' },
                                    on: { click: () => {this.audition(params.index)} }
                                }, '试听'),
                                h('Button', {
                                    props: { type: 'error', size: 'small'},
                                    on: { click: () => {this.assessor(params.index)}}
                                }, '审核')
                                
                            ])
                        }
                    }
                ],
                historyData:[],
                cacheData:{},
            }   
        },
        methods: {
            assessor(index){
                this.modal1=true;
            },
            detailedMaterial (index) {   //详情
                this.$nextTick(()=>{
                    this.$refs.detail.details(index)
                });
            },
            audition (index) {   //试听
                this.$nextTick(()=>{
                    this.$refs.audition.audition(index)
                });
            },
            //审核提交
            auditSubmit(){
                this.cacheData = JSON.parse(JSON.stringify(this.historyData[this.compile]));    
                let auditData = new FormData();
                this.cacheData.reviewUserId = "01ZZZZ01"+this.$store.state.user.uid;
                this.cacheData.commitStatus = this.commitStatu;
                this.cacheData.reviewUserName = this.$store.state.user.name;
                this.cacheData.reviewInfo = this.reviewInfo;
                this.cacheData.createTime = FromTimes(this.historyData[this.compile].createTime);
                this.cacheData.reviewDate = FromTimes(new Date());
                for(var key in this.cacheData){             
                    auditData.append(key, this.cacheData[key]);
                }
                debugger
                this.$axios({
                        method: 'post',
                        //headers: {'Content-Type': 'application/x-www-form-urlencoded','charset':'UTF-8'},
                        data:auditData,
                        url: this.baseURL + '/material/MaterialInfo/update_Material',
                        
                    })
                    .then((res)=> {
                        console.log(res);
                        if(res.status == "200"){
                            if(res.data.code == "0"){
                                alert('Success!');
                            }else{
                                alert(res.data.msg)
                            }
                        }
                    })
                    .catch((error)=> {}
                );
            },
            ok () {
                this.$Message.info('OK!');
                setTimeout(() => {
                    this.loading = false;
                    this.$nextTick(() => {
                        this.loading = true;
                    });
                }, 2000);
            },
            cancel () {
                this.$Message.info('Clicked cancel');
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

                 let this1 = this;
                  this.$axios({
                         method: 'post',
                         url: this.baseURL + '/material/MaterialInfo/getList?currentPage='+this.dataCount+'&pageSize='+this1.pageSize+'&offset='+0,
                         params:this.materialDemand
                    })
                    .then((res)=> {
                         console.log(res.data.list);
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
        },
        created(){
           this.handleListApproveHistory();
           
        },
        mounted(){
        },
         beforeDestroy(){
        }
    }
</script>
<style type="text/css">
    .listfile{padding:15px 0 15px 0;}
  /* .ivu-checkbox-wrapper{display: none} */
   .vue-treeselect__control{height:33px !important}
</style>