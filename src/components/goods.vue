<template>
        <div class="goods"> 
                <div class="filter"> 
                <section class="section"> 
                    <nav class="choose"> 
                        你的选择: 
                         <mark v-for="item,key in choose" @click="delFn(key)" > 
                             {{item}} 
                             <a href="javascript:;" 
                             >x</a> 
                         </mark> 
                    </nav> 
                    <ul class="type"> 
                        <li v-for="item,i in dataList"> 
                            {{item.title}}： 
                            <a v-for="value,j in item.list" href="javascript:;" v-bind:class="{active:item.index===j}" @click="showFn(value,i,j)"> 
                                {{value}} 
                            </a> 
                        </li> 
                    </ul> 
              
                </section> 
            </div> 
                <div class="goodslist">
                        <el-row> 
                            <el-col :span="4" v-for="(item,key) in this.$store.state.itemlist" :key="item.itemid"> 
                                <el-card class="card" shadow="hover"> 
                                    <a href="javascript:;" @click="todetails(item.itemid)"><img v-bind:src="item.itemimg" class="image"></a> 
                                    <div style="padding: 14px;"> 
                                        <span>{{item.itemname}}</span> 
                                        <br> 
                                        <span style="color: #f5222d">¥{{item.price}}</span> 
                                        <div class="bottom clearfix"> 
                                            <el-button type="text" class="button" @click="todetails(item.itemid)">立即购买</el-button> 
                                        </div> 
                                    </div> 
                                </el-card> 
                            </el-col> 
                        </el-row> 
                    </div> 
            </div>
</template>

<script>
export default {
     data:function(){
            return {
                catagorylist:[],
                sizelist:[],
                colorlist:[],
                dataList:[
                    {
                        title: '类别',
                        list:''
                    },
                    {
                        title: '尺寸',
                        list:''
                    },
                    {
                        title: '颜色',
                        list:''
                    }
                ],
                choose:{},
                selected:{}
            }
        },
        mounted:function () {
                 this.$http.get('/ods/allgoods').then(function (result) {
                    var a = JSON.parse(result.bodyText);
                    this.$store.state.itemlist = a.list;
                }),
            this.$http.get('/ods/getcategory').then(function (result) {
                var a = JSON.parse(result.bodyText);
                this.catagorylist = a.list;
                for(var i=0;i<this.catagorylist.length;i++){
                    this.dataList[0].list=this.dataList[0].list+this.catagorylist[i].name+",";
                }
                this.dataList[0].list=this.dataList[0].list.split(",")
            }),
            this.$http.get('/ods/getsizecategory').then(function (result) {
                    var a = JSON.parse(result.bodyText);
                    this.sizelist = a.list;
                for(var i=0;i<this.sizelist.length;i++){
                    this.dataList[1].list=this.dataList[1].list+this.sizelist[i].sizes+",";
                }
                this.dataList[1].list=this.dataList[1].list.split(",")
            }),
            this.$http.get('/ods/getcolorcategory').then(function (result) {
                var a = JSON.parse(result.bodyText);
                this.colorlist = a.list;
                for(var i=0;i<this.colorlist.length;i++){
                    this.dataList[2].list=this.dataList[2].list+this.colorlist[i].color+",";
                }
                this.dataList[2].list=this.dataList[2].list.split(",")
            })
        },
        methods:{
                showFn(value,i,j){
                    this.$set(this.choose,i,value)
                    //找到操作的一行，把这一行的数据中的index设置为点击的标签的下标
                    this.dataList[i].index = j;
                    for(i=0;i<3;i++){
                        if(this.choose[i]==undefined){
                            this.selected[i]='';
                        }
                        else{
                            this.selected[i]=this.choose[i]
                        }
                    }
                    var s='/ods/designatedgoods?category='+this.selected[0]+'&sizes='+this.selected[1]+'&color='+this.selected[2]
                   this.$http.get(s).then(function (result) {
                       var a = JSON.parse(result.bodyText);
                       this.$store.state.itemlist=a.list;
                    });
                },
                delFn(key){
                    this.$delete(this.choose,key);
                    this.dataList[key].index = -1;
                    for(i=0;i<3;i++){
                        if(this.choose[i]==undefined){
                            this.selected[i]='';
                        }
                        else{
                            this.selected[i]=this.choose[i]
                        }
                    }
                    if(this.selected[0]==''&&this.selected[1]==''&&this.selected[2]==''){
                        this.$http.post('/ods/allgoods').then(function (result) {
                            var a = JSON.parse(result.bodyText);
                            this.$store.state.itemlist = a.list;
                        })
                    }
                   else {
                        var s = '/ods/designatedgoods?category=' + this.selected[0] + '&sizes=' + this.selected[1] + '&color=' + this.selected[2]
                        this.$http.get(s).then(function (result) {
                            var a = JSON.parse(result.bodyText);
                            this.$store.state.itemlist = a.list;
                        });
                    }
                },
                todetails(itemid){
                    this.$router.push({
                        path: '/goodsinfo',
                        query:{
                            id:itemid
                        }
                    })
                  }
                },
}
</script>

<style lang="scss" scoped>
        .goods{
            margin-top: 100px;
            padding-left: 10px;
            float: left;
            height: 60%;
            width: 99%;
        }
        .card{
            margin: 5px;
            padding: 0;
        }
        .bottom {
            margin-top: 13px;
            line-height: 12px;
        }

        .button {
            margin-right: 5px;
            padding: 0;
            float: right;
        }
        .button :hover{
            color:red;
        }

        .image {
            width: 100%;
            display: block;
        }

        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }

        .clearfix:after {
            clear: both
        }
        .filter{
            margin-top: 0px;
            margin-left: 30%;
        }
        .goodslist{
            margin-top: 20px;
            margin-left:50px;
        }
        .section {
            width: 760px;
            height: 260px;
            -webkit-box-shadow: 0px 0px 4px rgba(0,0,0,.2);
            box-shadow: 0px 0px 4px rgba(0,0,0,.2);
        }
        .choose {
            width: 760px;
            height: 50px;
            margin: 0 auto;
            line-height: 50px;
            text-indent: 21px;
        }
        .type {
            width: 100%;
            height: 210px;
            padding: 17px 0 16px 28px;
        }
        .type li {
            height: 55px;
            color: #8a8a8a;
            line-height: 25px;
        }
        .type a {
            margin: 0 12px 0 11px;
            color: #000;
            text-decoration: none;
        }
        .choose mark {
            position: relative;
            display: inline-block;
            height: 24px;
            line-height: 24px;
            border: 1px solid black;
            color: red;
            margin: 12px 5px 0;
            background: none;
            padding: 0 30px 0 6px;
            text-indent: 0;
        }
        .choose mark a {
            position: absolute;
            top: 3px;
            right: 2px;
            display: inline-block;
            width: 18px;
            height: 18px;
            background: black;
            color: #fff;
            line-height: 18px;
            font-size: 16px;
            text-align: center;
        }
         .active {
            background: red;
        }
        
</style>
