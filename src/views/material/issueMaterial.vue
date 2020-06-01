<template>
  <div class="staple">
  <Row :gutter="12">
      <Col span="3"><Input  clearable  placeholder="素材编号或名称" /></Col>
      <Col span="3"><Input  clearable  placeholder="素材编制节点编号或名称" /></Col>
 
      <Col span="2"><Button type="primary" icon="md-search">查询</Button></col>
      <!-- <Col span="2" push="3"><Button type="primary" @click="modal1 = true" >信息录入</Button></col> -->
      <Col span="1" push="14"><Button type="primary" >删除</Button></col>
  </Row>
    <div class="listfile">
        <Table border ref="selection" :columns="columns4" :data="data1"></Table>
        <!-- <Button @click="handleSelectAll(true)">Set all selected</Button>
        <Button @click="handleSelectAll(false)">Cancel all selected</Button> -->
        <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="100" :current="1"></Page>
        </div>
    </div>
    </div>
   
        <Modal v-model="modal2" title="详情" @on-ok="ok" @on-cancel="cancel" width="800" >
        <Form :model="formValidate" label-position="right" :label-width="120">
            <Row>
            
             <Col span="11">
                    <FormItem label="素材编号：" prop="lable">
                        <span>{{data1[compile].lable}}</span>
                    </FormItem>
                    <FormItem label="素材名称：">
                        <span>{{data1[compile].name}}</span>
                    </FormItem>
                    <FormItem label="素材状态：">
                        <span>{{data1[compile].state}}</span>
                    </FormItem>
                    <FormItem label="素材类型：">
                        <span>{{data1[compile].type}}</span>
                    </FormItem>
                    <FormItem label="素材编制节点编号：">
                        <span>{{data1[compile].numbered}}</span>
                    </FormItem>
                    <FormItem label="素材编制节点名称：">
                        <span>{{data1[compile].designation}}</span>
                    </FormItem>
                    <FormItem label="审核人：">
                        <span>{{data1[compile].auditPerson}}</span>
                    </FormItem>
                    <FormItem label="描述：">
                        <span>{{data1[compile].describe}}</span>
                    </FormItem>
                    
                </Col>
                <Col span="11">
                    <FormItem label="素材编制人：">
                        <span>{{data1[compile].person}}</span>
                    </FormItem>
                    <FormItem label="素材编制日期：">
                        <span>{{data1[compile].date}}</span>
                    </FormItem>
                    <FormItem label="素材语音格式：">
                        <span>{{data1[compile].layout}}</span>
                    </FormItem>
                    <FormItem label="素材文本信息：">
                        <span>{{data1[compile].message}}</span>
                    </FormItem>
                    <FormItem label="素材大小：">
                        <span>{{data1[compile].size}}</span>
                    </FormItem>
                    <FormItem label="素材时长：">
                        <span>{{data1[compile].duration}}</span>
                    </FormItem>
                    <FormItem label="审核日期：">
                        <span>{{data1[compile].auditData}}</span>
                    </FormItem>
                </Col>
            </Row>
    </Form>
    </Modal>
  </div>
</template>

<script>

export default {
        data () {
            return { 
                formValidate: {lable: '', name: '',state: '',type: '',numbered: '',designation:'',person:'', date:'', layout: '',message: '',size: '',duration: ''},
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ]
                },
                accordion_value: 1,
                modal1: false,
                modal2: false,
                compile: 0,
               // value: null,
                condition_val1: null,
                condition_val2: null,
                condition_val3: null,
                // define options
                condition: [{"id":4,"label":"审核未通过"},{"id":3,"label":"审核通过"},{"id":5,"label":"未编辑"},{"id":1,"label":"编辑中"},{"id":2,"label":"待审核"}], //状态
                genre: [{"id":2,"label":"实时录制"},{"id":1,"label":"预录制"}, {"id":3,"label":"TTS"}], //类型
                grouping: [{"id":1,"label":"紧急"},{"id":3,"label":"背景广播"},{"id":2,"label":"日常"}], //分组
                language: [{"id":1,"label":"中文"},{"id":2,"label":"英文"}], //语种
                voice: [{"id":1,"label":"MP3"}], //语音格式
                columns4: [
                    {type: 'selection', width: 60 , align: 'center'},
                    {title: '素材标签',key: 'lable',width:100},
                    {title: '素材名称',key: 'name',width:100 },
                    {title: '素材状态',key: 'state',width:100},
                    {title: '素材类型',key: 'type',width:100},
                    {title: '编制节点编号',key: 'numbered',width:120 },
                    {title: '编制节点名称',key: 'designation',width:120},
                    {title: '素材编制人',key: 'person',width:100},
                    {title: '编制日期',key: 'date',sortable: true,width:120},
                    {title: '语音格式',key: 'layout',width:100},
                    {title: '文本信息',key: 'message',width:100},
                    {title: '素材大小',key: 'size',width:100},
                    {title: '素材时长',key: 'duration',width:100},
                    {title: '描述',key: 'describe',width:130},
                    {title: '审核人',key: 'auditPerson',width:100},
                    {title: '审核日期',key: 'auditData',width:100},
                    {title: '发布人',key: 'issuePerson',width:100},
                    {title: '发布日期',key: 'issueData',width:100},
                    {title: '发布节点集',key: 'issueNode',width:120},
                    {title: '操做',key: 'action',width: 190,align: 'center',fixed:'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary', size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '详情'),
                                 h('Button', {
                                    props: {
                                        type: 'primary',size: 'small'
                                    },
                                     style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.audition(params.index)
                                        }
                                    }
                                }, '试听'),
                                ,
                                h('Button', {
                                    props: {
                                        type: 'error',size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                data1:[{"lable":"Jone","name":"ere","state":"审核未通过","type":"TTS录制","grouping":"紧急","numbered":"45","designation":"rtrt","person":"李四","date":"2016-10-01","layout":"MP4","message":"rty t8 ir rjpr","size":"12M","duration":"80s","describe":"软硬件投入开发","auditPerson":"张一","auditData":"2018-12-21","issuePerson":"冯六","issueData":"2018-09-12 10:15","issueNode":";"},{"lable":"Jone","name":"ere","state":"待审核","type":"实时录制","grouping":"日常","numbered":"45","designation":"rtrt","person":"王五","date":"2018-11-01","layout":"MP4","message":"rty t8 ir rjpr","size":"12M","duration":"80s","describe":"软硬件投入开发","auditPerson":"张一","auditData":"2018-05-09","issuePerson":"张三","issueData":"2018-05-12 13:15","issueNode":";"}],
            }
        },
        methods: {
            choose(data){
                console.log(data)   
            },
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
            show (index) {
               
                this.compile = index;
                 this.modal2 = true;
                 console.log(this.data1[index])
                // this.$Modal.info({
                //     title: '修改',
                //     content: `Name：${this.data1[index].name}<input v-model="${this.data1[index].name}" value="${this.data1[index].name}"></input>`
                // })
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(this.formValidate);
                        console.log("condition:"+ this.condition_val1);
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            remove (index) {
                this.data1.splice(index, 1);
            },
            audition (index) {
                alert("试听");
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
        },
        created(){
        //    this.$axios.get('../../static/json/material.json').then((response)=>{
        //             console.log(response.data.fodder)
        //             // this.data1 = response.data.fodder;
        //              this.condition = response.data.condition;
        //              this.genre = response.data.genre;
        //              this.grouping = response.data.grouping;
        //         }).catch((response)=>{
        //             console.log(response)
        //         })
        },
        mounted(){
        }
    }


</script>


<style type="text/css">
.ar-recorder__records-limit{top:60px !important;}
    .listfile{padding:15px 0 15px 0;}
  /* .ivu-checkbox-wrapper{display: none} */
   .vue-treeselect__control{height:33px !important}
</style>