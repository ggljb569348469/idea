<template>
    <div class="orderlist"> 
        <el-table 
                ref="singleTable" 
                :data="orderlist" 
                highlight-current-row 
                style="width: 100%"> 
                <el-table-column 
                  type="index" 
                  width="100"> 
                </el-table-column> 
                <el-table-column 
                  property="itemname" 
                  label="商品名称" 
                  width="250"> 
                </el-table-column> 
                <el-table-column 
                  property="img" 
                  label="商品图片" 
                  width="175"> 
                 <template slot-scope="scope"> 
                  <img  :src="scope.row.img" alt="" style="width: 100px;height: 100px"> 
                 </template>
                </el-table-column> 
                <el-table-column 
                  property="price" 
                  label="单价" 
                  width="200"> 
                 <template slot-scope="scope"> 
                  <span>¥{{scope.row.price}}</span> 
                 </template>
                </el-table-column> 
                <el-table-column 
                  property="number" 
                  label="数量" 
                  width="150"> 
                 <template slot-scope="scope"> 
                  <span>x{{scope.row.number}}</span> 
                 </template>
                </el-table-column> 
                <el-table-column 
                  prop="littletotal" 
                  label="小计" 
                  width="200"> 
                 <template slot-scope="scope"> 
                  <span>¥{{scope.row.price*scope.row.number}}</span> 
                 </template>
                </el-table-column> 
              </el-table> 
            <div style="margin-top: 20px;text-align: left;"> 
            <el-form ref="form" label-width="80px"> 
              <el-form-item label="买家留言:"> 
              <el-input type="textarea" v-model="detail"></el-input> 
              </el-form-item> 
              <el-form-item label="收货地址:"> 
               <el-select v-model="pickaddress" value-key="address" placeholder="请选择收货地址"> 
                  <el-option v-for="(item,key) in this.addresslist" :key="item.addressid" :label="item.address" :value="item"></el-option> 
                </el-select> 
            <el-button type="text" @click="addaddress">添加收货地址</el-button>
              </el-form-item>
            </el-form>
            </div>
              <div style="margin-top: 20px;text-align: right"> 
            <label style="color:red;" >总数：</label><span>{{this.count}}</span>
            <label style="color:red;" >应付金额：</label><span>¥{{this.total}}</span>
            <p><el-button @click="createorder">结算</el-button></p> 
              </div>
            </div>
</template>

<script>
export default {
     data:function(){
            return{
                reorderlist:[
                    {orderid:''}
                ],
                orderlist:[],
                count:'',
                total:'',
                addresslist:[],
                pickaddress:'',
                detail:'',
                oid:''
            }
        },
        methods:{
            createorder(){
                if(this.orderlist.length>0){
                this.$http.get('/ods/createorder?username='+this.$store.state.username+'&price='+this.total+'&number='+this.count+'&detail='+this.detail+'&address='+this.pickaddress.address).then(function (result) {
                    var a = JSON.parse(result.bodyText);
                    this.reorderlist = a.list;
                    this.oid=this.reorderlist[0].orderid;
                    console.log(this.oid);
                    for(var i=0;i<this.orderlist.length;i++) {
                        this.$http.get('/ods/createorderitem?itemid=' + this.orderlist[i].itemid +'&orderid=' +this.oid+'&itemname=' + this.orderlist[i].itemname + '&number=' + this.orderlist[i].number + '&price=' + this.orderlist[i].price + '&totalfee=' + this.orderlist[i].price * this.orderlist[i].number + '&img=' + this.orderlist[i].img).then(function (result) {})
                    }
                })
                }
          },
            addaddress(){
                this.$prompt('请输入新地址', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value })=>{
                    this.$message({
                    type: 'success',
                    message: '添加地址成功！'
                })
                this.address.push(value);
                this.$http.get('/ods/addaddress?username='+this.$store.state.username+'&address='+value).then(function (result) {})
            }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
            }
        },
        mounted:function () {
            this.orderlist=this.$route.query.orderlist;
            this.count=this.$route.query.count;
            this.total=this.$route.query.total;
            this.$http.get('/ods/getaddressbyname?username='+this.$store.state.username).then(function (result) {
                var a = JSON.parse(result.bodyText);
                this.addresslist = a.list;
            })
        },
}
</script>

<style lang="scss" scoped>
 .orderlist{
            width: 70%;
            margin-top: 50px;
            margin-left: 10%;
            padding: 50px;
        }
</style>
