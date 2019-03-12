<template>
         <div class="cartlist">
            <el-table 
                ref="multipleTable" 
                :data="cartlist" 
                tooltip-effect="dark" 
                style="width: 100%" 
                @selection-change="handleSelectionChange"> 
                <el-table-column 
                  type="selection" 
                  width="55"> 
                </el-table-column> 
                <el-table-column 
                  prop="itemid"        
                  label="商品编号" 
                  width="120"> 
                </el-table-column> 
                <el-table-column 
                  prop="img" 
                  label="商品图片" 
                  width="150"> 
                 <template slot-scope="scope"> 
                  <img  :src="scope.row.img" alt="" style="width: 75px;height: 75px"> 
                 </template>
                </el-table-column>
                <el-table-column 
                  prop="itemname" 
                  label="商品名称" 
                  width="120"> 
                </el-table-column> 
                <el-table-column 
                  prop="price" 
                  label="单价" 
                  width="120"> 
                 <template slot-scope="scope"> 
                  <span>¥{{scope.row.price}}</span> 
                 </template>
                </el-table-column> 
                <el-table-column 
                  prop="number" 
                  label="商品数量" 
                  width="250"> 
               <template slot-scope="scope"> 
                      <div> 
                        <el-input 
                          v-model="scope.row.number" @change="handleInput(scope.row)"> 
                          <el-button slot="prepend" @click="del(scope.row)"><i class="el-icon-minus"></i></el-button> 
                          <el-button slot="append" @click="add(scope.row)"><i class="el-icon-plus"></i></el-button> 
                        </el-input> 
                      </div> 
                    </template>
                </el-table-column> 
                <el-table-column 
                  prop="littletotal" 
                  label="小计" 
                  width="150"> 
                 <template slot-scope="scope"> 
                  <span>¥{{scope.row.price*scope.row.number}}</span> 
                 </template>
                </el-table-column> 
             <el-table-column 
                  label="删除商品" 
                  width="120"> 
                  <template slot-scope="scope"> 
                    <el-button 
                      @click.native.prevent="deleteRow(scope.$index, cartlist)" 
                      type="text" 
                      size="small"> 
                      删除 
                    </el-button> 
                  </template> 
                </el-table-column>
              </el-table> 
              <div style="margin-top: 20px"> 
             <span>
                <el-button @click="clearcart">清空购物车</el-button>
            </span>
              </div>
            <div style="text-align: right">
            <label style="color:red;" >总数：</label><span>{{this.count}}</span>
            <label style="color:red;" >应付金额：</label><span>¥{{this.total}}</span>
            </div>
              <div style="margin-top: 30px;text-align: right"> 
                <el-button @click="togoods" type="primary">继续购物</el-button> 
                <el-button @click="toorder" type="danger">提交订单</el-button> 
              </div>
            </div>
</template>

<script>
export default {
    data:function(){
              return{
                  count:'0',
                  total:'0',
                  cartlist:[],
                  multipleSelection: []
              }
        },
        mounted:function () {
            this.$http.get('/ods/selectusercart?username='+this.$store.state.username).then(function (result) {
                var a = JSON.parse(result.bodyText);
                this.cartlist = a.list;
            })
        },
        methods: {
            toorder(){
                if(this.multipleSelection.length>0){
                this.$router.push({
                    path: '/orders',
                    query:{
                        orderlist:this.multipleSelection,
                        count:this.count,
                        total:this.total
                    }
                 })
                    this.clearcart();
                }
                else{
                    this.$message({
                        message: '至少选择一样商品！',
                        type: 'warning'
                    });
                }
            },
            togoods(){
                this.$router.push({path: '/goods'})
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.total='0';
                this.count='0';
                   for(var i=0;i<this.multipleSelection.length;i++){
                     this.total=parseFloat(this.total)+parseFloat(this.multipleSelection[i].price*this.multipleSelection[i].number);
                     this.count=parseFloat(this.count)+parseInt(this.multipleSelection[i].number);
                     }
                if(this.multipleSelection.length==0){
                    this.$message({
                        message: '请选择商品！',
                        type: 'warning'
                    });
                 }
            },
            deleteRow(index, rows) {
                var cartid=rows[index].cartid;
                this.$http.get('/ods/delectcart?username='+this.$store.state.username+'&cartid='+cartid).then(function (result) {
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                })
                rows.splice(index, 1);
            },
            clearcart(){
                if(this.cartlist.length>0) {
                    for (var i = 0; i < this.cartlist.length; i++) {
                        this.$http.get('/ods/delectcart?username=' + this.$store.state.username + '&cartid=' + this.cartlist[i].cartid).then(function (result) {
                        })
                    }
                    this.$message({
                        message: '清空购物车成功！',
                        type: 'success'
                    });
                }
                else{
                    this.$message({
                        message: '购物车已经为空的状态了！',
                        type: 'warning'
                    });
                }
                this.cartlist=[];
            },
            handleInput:function(value){
                if(null==value.number || value.number==""){
                    value.number=1;
                }
                value.goodTotal=(value.number*value.price).toFixed(2);//保留两位小数
                //增加商品数量也需要重新计算商品总价
            },
            add:function(addGood){
                //输入框输入值变化时会变为字符串格式返回到js
                //此处要用v-model，实现双向数据绑定
                if(typeof addGood.number=='string'){
                    addGood.number=parseInt(addGood.number);
                };
                addGood.number+=1;
            },
            del:function(delGood){
                if(typeof delGood.number=='string'){
                    delGood.number=parseInt(delGood.number);
                };
                if(delGood.number>1){
                    delGood.number-=1;
                }
            },
        },
}
</script>

<style lang="scss" scoped>
 .cartlist{
            width: 70%;
            margin-top: 50px;
            margin-left: 10%;
            padding: 50px;
        }
</style>
