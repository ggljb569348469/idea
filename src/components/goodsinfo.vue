<template>
       <div class="goodsinfo"> 
            <div class="goodsimg"> 
            <img v-bind:src="this.goodsinfolist[0].itemimg"> 
            </div> 
            <div class="goodsmes"> 
            <p>商品名称:</p><span>{{this.goodsinfolist[0].itemname}}</span> 
            <p>商品编号:</p><span>{{this.goodsinfolist[0].itemid}}</span> 
            <p>颜色:</p>
            <el-radio-group v-model="color" fill="black"  @change="changecolor"> 
                 <el-radio-button  v-for="(item,key) in this.colorlist" :label="item.color" :key="item.color">{{item.color}}</el-radio-button> 
            </el-radio-group>
            <p>尺码:</p>
            <el-radio-group v-model="sizes" fill="black" @change="changestate" > 
                 <el-radio-button  v-for="(item,key) in this.sizelist" :label="item.sizes" :key="item.sizes" >{{item.sizes}}</el-radio-button> 
            </el-radio-group>
            <p>价格:</p><span>¥{{this.goodsinfolist[0].price}}</span> 
            <p>库存:</p><span>{{this.goodsinfolist[0].stock}}</span> 
            <br>
             <el-input-number v-model="num1" size="small" @change="handleChange" :min="1" :max="10" label="计数器"></el-input-number>
            <br>
            <br>
            <el-row> 
              <el-button type="primary" @click="incart">加入购物车</el-button> 
              <el-button type="danger" @click="buynow">立即购买</el-button> 
            </el-row>
            </div> 
            <div class="goodsdetails"> 
            <p>商品说明:</p><div v-html="this.goodsinfolist[0].itemcontext"></div>
            </div>
            </div>
</template>

<script>
export default {
    data:function(){
            return {
                price1:'',
                skuid:'',
                num1:'1',
                color:'',
                sizes:'',
                goodsinfolist: [{
                    itemid:'',
                    itemname:'',
                    itemimg:'',
                    price:'',
                    stock:''
                }],
                skuinfolist:[],
                colorlist:[],
                sizelist:[]
            }
        },
        methods:{
            incart(){
                if(this.color!=''&&this.sizes!='') {
                    if (this.$store.state.username.length != 0) {
                        this.$http.get('/ods/incart?skuid='+this.skuid+'&itemid='+this.goodsinfolist[0].itemid+'&username='+this.$store.state.username+'&itemname='+ this.goodsinfolist[0].itemname+'-颜色:'+this.color+'-尺码:'+this.sizes+'&number='+this.num1+'&price='+this.price1+'&img='+this.goodsinfolist[0].itemimg).then(function (result) {
                        })
                        this.$message({
                            message: '加入购物车成功！',
                            type: 'success'
                        });
                    }
                    else {
                        this.$message({
                            message: '你还没登录呢！',
                            type: 'warning'
                        });
                    }
                }
                else{
                    this.$message({
                        message: '请选择规格！',
                        type: 'warning'
                    });
                    }
              },
            buynow(){
                if(this.color!=''&&this.sizes!='') {
                    if (this.$store.state.username.length != 0) {
                        this.$http.get('/ods/incart?skuid='+this.skuid+'&itemid='+this.goodsinfolist[0].itemid+'&username='+this.$store.state.username+'&itemname='+ this.goodsinfolist[0].itemname+'-颜色:'+this.color+'-尺码:'+this.sizes+'&number='+this.num1+'&price='+this.price1+'&img='+this.goodsinfolist[0].itemimg).then(function (result) {
                        })
                        this.$router.push({
                            path: '/cart'
                        });
                    }
                    else {
                        this.$message({
                            message: '你还没登录呢！',
                            type: 'warning'
                        });
                    }
                }
                else{
                    this.$message({
                        message: '请选择规格！',
                        type: 'warning'
                    });
                }
            },
            changecolor(item){
                if(this.sizes!=''){
                    this.changestate();
                }
                this.sizelist=[];
                for(var i=0;i<this.skuinfolist.length;i++){
                    if(this.skuinfolist[i].color==item){
                        this.sizelist.push(this.skuinfolist[i]);
                        this.goodsinfolist[0].itemimg=this.skuinfolist[i].img;
                        this.goodsinfolist[0].price=this.skuinfolist[i].price;
                    }
                }
                if(this.num1=='1'){
                    this.price1=this.goodsinfolist[0].price
                }
            },
            changestate(){
               if(this.color!=''){
                   for(var i=0;i<this.skuinfolist.length;i++){
                       if(this.skuinfolist[i].color==this.color&&this.skuinfolist[i].sizes==this.sizes){
                           this.goodsinfolist[0].stock=this.skuinfolist[i].stock;
                           this.skuid=this.skuinfolist[i].skuid;
                           return
                       }
                   }
                   }
                   else{
                   this.colorlist=[];
                   for(var i=0;i<this.skuinfolist.length;i++){
                       if(this.skuinfolist[i].sizes==this.sizes){
                           this.colorlist.push(this.skuinfolist[i]);
                           this.goodsinfolist[0].itemimg=this.skuinfolist[i].img;
                           this.goodsinfolist[0].price=this.skuinfolist[i].price;
                       }
                   }
               }
               },
            handleChange(){
                this.price1=this.num1*this.goodsinfolist[0].price
            }
        },
        mounted:function () {
            var id=this.$route.query.id;
            this.$http.get('/ods/selectgoodsbyid?id='+id).then(function (result) {
                var a = JSON.parse(result.bodyText);
                this.goodsinfolist = a.list;
                this.price1=this.goodsinfolist[0].price
            })
            this.$http.get('/ods/selectskubyid?id='+id).then(function (result) {
                var a = JSON.parse(result.bodyText);
                this.skuinfolist = a.list;
            })
            this.$http.get('/ods/goodscolorbyid?id='+id).then(function (result) {
                var a = JSON.parse(result.bodyText);
                this.colorlist = a.list;
            })
            this.$http.get('/ods/goodssizesbyid?id='+id).then(function (result) {
                    var a = JSON.parse(result.bodyText);
                    this.sizelist = a.list;
                })
        },
}
</script>

<style lang="scss" scoped>
        .goodsimg{
            float: left;
            margin-top: 150px;
            margin-left: 15%;
            width: 30%;
            height: 500px;
        }
        .goodsmes{
            float: left;
            margin-top: 150px;
            margin-left: 3%;
            padding-left: 10px;
            width: 30%;
            height: 500px;
        }
        .goodsimg img{
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }
        .goodsdetails{
            float: left;
            margin-top: 100px;
            margin-bottom: 50px;
            margin-left: 10%;
            width: 80%;
            height: auto;
        }
</style>
