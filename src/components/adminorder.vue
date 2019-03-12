<template>
          <el-container direction="vertical">
            <adminheader></adminheader>
            <el-container>
            <adminnavi></adminnavi>
            <el-container direction="vertical">
            <el-dialog title="订单商品" :visible.sync="dialogTableVisible" center> 
             <span>订单商品详情</span>
              <el-table :data="orderitemlist"> 
                <el-table-column property="orderitemid" label="订单商品编号" width="150"></el-table-column> 
                <el-table-column property="itemid" label="商品编号" width="100"></el-table-column> 
                <el-table-column property="itemname" label="商品名称" width="100"></el-table-column> 
                <el-table-column property="img" label="商品图片" width="150"> 
                 <template slot-scope="scope"> 
                  <img  :src="scope.row.img" alt="" style="width: 75px;height: 75px"> 
                 </template>
                </el-table-column> 
                <el-table-column property="number" label="数量"> 
                 <template slot-scope="scope"> 
                   <label>x{{scope.row.number}}</label>
                 </template>
            </el-table-column> 
                <el-table-column property="price" label="单价"> 
                 <template slot-scope="scope"> 
                  <label>¥{{scope.row.price}}</label>
                 </template>
            </el-table-column> 
                <el-table-column property="totalfee" label="小计"> 
                 <template slot-scope="scope"> 
                     <label>¥{{scope.row.totalfee}}</label>
                 </template>
            </el-table-column> 
              </el-table> 
            </el-dialog>
            <el-dialog title="修改订单" :visible.sync="dialogFormVisible" width="25%" center> 
              <el-form :model="orderform"> 
                <el-form-item label="订单编号" :label-width="formLabelWidth"> 
                  <el-input :disabled="true" v-model="orderform.orderid" ></el-input> 
                </el-form-item> 
                <el-form-item label="买家" :label-width="formLabelWidth"> 
                  <el-input :disabled="true" v-model="orderform.username"></el-input> 
                </el-form-item> 
                <el-form-item label="金额" :label-width="formLabelWidth"> 
                  <el-input :disabled="true" v-model="orderform.price"></el-input> 
                </el-form-item> 
                <el-form-item label="订单状态" :label-width="formLabelWidth"> 
                  <el-select v-model="orderform.orderstate" placeholder="请选择订单状态"> 
                    <el-option label="未付款" value="未付款"></el-option> 
                    <el-option label="已付款" value="已付款"></el-option> 
                  </el-select> 
                </el-form-item> 
                <el-form-item label="买家留言" :label-width="formLabelWidth"> 
                  <el-input :disabled="true" v-model="orderform.detail"></el-input> 
                </el-form-item> 
                <el-form-item label="地址" :label-width="formLabelWidth"> 
                  <el-input v-model="orderform.address"></el-input> 
                </el-form-item> 
              </el-form> 
              <div slot="footer" class="dialog-footer"> 
                <el-button @click="dialogFormVisible = false">取 消</el-button> 
                <el-button type="primary" @click.native.prevent="updateorder(orderform)">确 定</el-button> 
              </div> 
            </el-dialog>
            <div> 
                <el-button @click.native.prevent="selectallorder">查看所有订单</el-button>
                <el-input placeholder="请输入要搜索内容" v-model="searchusername" class="input-with-select"> 
                <el-button slot="append" icon="el-icon-search" @click.native.prevent="selectorderbyusername"></el-button> 
              </el-input>
            </div>
             <el-table 
                :data="orderlist.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
                style="width: 100%"> 
                <el-table-column 
                  prop="orderid" 
                  label="订单编号" 
                  width="120"> 
                </el-table-column> 
                <el-table-column 
                  prop="username" 
                  label="买家" 
                  width="120"> 
                </el-table-column> 
                <el-table-column 
                  prop="price" 
                  label="金额" 
                  width="120"> 
                <template slot-scope="scope">
                <label>¥{{scope.row.price}}</label>
                </template>
                </el-table-column> 
                <el-table-column 
                  prop="orderstate" 
                  width="120" 
                  label="订单状态"> 
                <template slot-scope="scope">
                <label>{{scope.row.orderstate}}</label>
                </template>
                </el-table-column> 
                <el-table-column 
                  prop="createtime" 
                  width="150" 
                  :formatter="dateFormat"
                  label="生成时间"> 
                </el-table-column> 
                <el-table-column 
                  prop="detail" 
                  width="200" 
                  label="买家留言"> 
                </el-table-column> 
                <el-table-column 
                  prop="address" 
                  width="200" 
                  label="地址"> 
            <template slot-scope="scope">
            <label>{{scope.row.address}}</label>
            </template>
                </el-table-column> 
             <el-table-column 
                  label="操作" 
                  width="250"> 
                  <template slot-scope="scope"> 
                    <el-button 
                      @click.native.prevent="handledetail(scope.row.orderid)" 
                      type="text" 
                      size="small"> 
                      详情 
                    </el-button> 
                    <el-button 
                      @click.native.prevent="handleedit(scope.row.orderid)" 
                      type="text" 
                      size="small"> 
                      编辑 
                    </el-button> 
                    <el-button 
                      @click.native.prevent="deleteorder(scope.row.orderid)" 
                      type="text" 
                      size="small"> 
                      删除 
                    </el-button> 
                  </template> 
                </el-table-column>
              </el-table>
            <el-pagination 
                        @size-change="handleSizeChange" 
                        @current-change="handleCurrentChange" 
                        :current-page="currentPage" 
                        :page-sizes="[5, 10]"
                        :page-size="pagesize" 
                        layout="total,sizes, prev, pager, next, jumper" 
                        :total="orderlist.length"> 
                                </el-pagination>
                </el-container>
                </el-container>
                </el-container>
</template>

<script>
import moment from 'moment'
export default {
     data:function(){
            return{
                searchusername:'',
                orderitemlist:[],
                dialogTableVisible: false,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                orderform: {
                    orderid:'',
                    username:'',
                    price:'',
                    orderstate:'',
                    detail:'',
                    address:''
                },
                orderlist:[],
                currentPage:1, //初始页
                pagesize:5,    //    每页的数据
            }
        },
        mounted:function () {
           this.selectallorder();
        },
        methods:{
            handledetail(orderid){
                this.dialogTableVisible=true;
                this.$http.get('/admin/selectorderitembyorderid?orderid='+orderid).then(function (result) {
                    var a = JSON.parse(result.bodyText);
                    this.orderitemlist=a.list;});
            },
            handleedit(orderid){
                this.dialogFormVisible=true;
                for(var i=0;i<this.orderlist.length;i++){
                    if(this.orderlist[i].orderid==orderid){
                        this.orderform.orderid=this.orderlist[i].orderid;
                        this.orderform.username=this.orderlist[i].username;
                        this.orderform.price=this.orderlist[i].price;
                        this.orderform.orderstate=this.orderlist[i].orderstate;
                        this.orderform.detail=this.orderlist[i].detail;
                        this.orderform.address=this.orderlist[i].address;
                    }
                }
            },
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");

            },
            selectallorder(){
            this.$http.get('/admin/selectallorder').then(function (result) {
            var a = JSON.parse(result.bodyText);
            this.orderlist=a.list;});
            },
            selectorderbyusername(){
                this.$http.get('/admin/selectorderbyusername?username='+this.searchusername).then(function (result) {
                    var a = JSON.parse(result.bodyText);
                    this.orderlist=a.list;});
            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
            },
            deleteorder(orderid) {
                this.$http.get('/admin/deleteorder?orderid='+orderid).then(function (result) {
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.selectallorder();
                })
            },
            updateorder(orderform){
                this.$http.get('/admin/updateorder?orderid='+orderform.orderid+'&orderstate='+orderform.orderstate+'&address='+orderform.address).then(function (result) {
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    this.dialogFormVisible = false;
                    this.selectallorder();
                })
            },
        },
}
</script>

<style>

</style>
