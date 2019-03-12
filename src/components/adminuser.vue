<template>
         <el-container direction="vertical">
            <adminheader></adminheader>
            <el-container>
            <adminnavi></adminnavi>
            <el-container direction="vertical">
             <el-table 
                :data="userlist.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
                style="width: 100%"> 
                <el-table-column 
                  prop="id" 
                  label="编号" 
                  width="180"> 
                </el-table-column> 
                <el-table-column 
                  prop="name" 
                  label="用户名" 
                  width="180"> 
                </el-table-column> 
                <el-table-column 
                  prop="password" 
                  label="密码" 
                  width="180"> 
                </el-table-column> 
                <el-table-column 
                  prop="context" 
                  label="个人描述"> 
                </el-table-column> 
                <el-table-column 
                  prop="phone" 
                  label="联系号码"> 
                </el-table-column> 
                <el-table-column 
                  prop="email" 
                  label="电子邮箱"> 
                </el-table-column> 
             <el-table-column 
                  label="操作" 
                  width="120"> 
                  <template slot-scope="scope"> 
                    <el-button 
                      @click.native.prevent="deleteuser(scope.row.id)" 
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
                        :total="userlist.length"> 
                                </el-pagination>
                </el-container>
                </el-container>
                </el-container>
</template>

<script>
export default {
     data:function(){
            return{
                userlist:[],
                currentPage:1, //初始页
                pagesize:5,    //    每页的数据
                  }
            },
        mounted:function () {
            this.selectalluser();
        },
        methods:{
            selectalluser(){
                this.$http.get('/user/selectalluser').then(function (result) {
                    var a = JSON.parse(result.bodyText);
                    this.userlist=a.list;});
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
            deleteuser(id) {
               this.$http.get('/user/deleteuser?id='+id).then(function (result) {
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                   this.selectalluser();
                })
            },
        },
}
</script>

<style>

</style>
