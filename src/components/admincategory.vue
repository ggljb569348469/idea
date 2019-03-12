<template>
         <el-container direction="vertical">
            <adminheader></adminheader>
            <el-container>
            <adminnavi></adminnavi>
            <template v-if="flag">
            <el-container direction="vertical">
            <div>
            <el-input v-model="father" placeholder="请输入父类别"></el-input>
            <el-button type="success" @click="addfather">新增</el-button>
            </div>
             <el-table
                :data="fatherlist"
                style="width: 37%">
                <el-table-column
                  prop="name"
                  label="父类别名称"
                  width="200">
                <template slot-scope="scope"> 
                <label>{{scope.row.name}}</label>
            </template>
                </el-table-column> 
             <el-table-column
                  label="操作"
                  width="200">
                  <template slot-scope="scope">
                    <el-button 
                      @click.native.prevent="manageson(scope.$index, fatherlist)" 
                      type="text"
                      size="small"> 
                      管理子类别 
                    </el-button> 
                    <el-button 
                      @click.native.prevent="deletefather(scope.$index, fatherlist)" 
                      type="text" 
                      size="small"> 
                      删除 
                    </el-button> 
                  </template> 
                </el-table-column>
              </el-table>
            </el-container>
            </template>

            <template v-if="!flag">
            <el-container direction="vertical">
            <div>
            <el-input v-model="son" placeholder="请输入子类别"></el-input>
            <el-button type="success" @click="addson">添加</el-button>
            <el-button type="danger" @click="change">返回</el-button>
            </div>
             <el-table 
                :data="sonlist" 
                style="width: 37%"> 
                <el-table-column 
                  prop="name" 
                  label="子类别名称" 
                  width="200"> 
            <template slot-scope="scope"> 
            <label>{{scope.row.name}}</label>
            </template>
                </el-table-column> 
             <el-table-column 
                  label="操作" 
                  width="200"> 
                  <template slot-scope="scope"> 
                    <el-button 
                      @click.native.prevent="deleteson(scope.$index, sonlist)" 
                      type="text" 
                      size="small"> 
                      删除 
                    </el-button> 
                  </template> 
                </el-table-column>
              </el-table>
            </el-container>
            </template>
                </el-container>
                </el-container>
</template>

<script>
export default {
     data:function(){
            return{
                fatherid:'',
                son:'',
                father:'',
                flag:true,
                categorylist:[],
                fatherlist:[],
                sonlist:[]
            }
        },
        mounted:function () {
            this.selectallcategory();
        },
        methods: {
            selectallcategory(){
                this.$http.get('/admin/selectallcategory').then(function (result) {
                    var a = JSON.parse(result.bodyText);
                    this.categorylist=a.list;
                    this.fatherlist=[];
                    for(var i=0;i<this.categorylist.length;i++){
                        if(!this.categorylist[i].fid){
                            this.fatherlist.push(this.categorylist[i]);
                        }
                    }});
            },
            change(){
              this.flag=true;
              this.selectallcategory();
            },
            manageson(index, rows) {
                this.sonlist=[];
                this.flag = false;
                this.fatherid = rows[index].catagoryid;
              for(var i=0;i<this.categorylist.length;i++){
                  if(this.categorylist[i].fid==this.fatherid){
                      this.sonlist.push(this.categorylist[i])
                  }
              }
            },
            deletefather(index, rows) {
            var id=rows[index].catagoryid;
            this.$http.get('/admin/deletefather?id='+id).then(function (result) {
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                });
            })
                rows.splice(index, 1);
            },
            addfather(){
                for(var i=0;i<this.fatherlist.length;i++) {
                    if (this.father == this.fatherlist[i].name) {
                        this.$message({
                            message: '父类别名称已存在！请重新输入！',
                            type: 'warning'
                        });
                        return false
                    }
                }
              if(this.father==''){
                  this.$message({
                      message: '请输入父类别名称！',
                      type: 'warning'
                  });
              }
              else{
                  this.$http.get('/admin/addfather?name='+this.father).then(function (result) {
                      this.fatherlist=[];
                      this.selectallcategory();
                      })
                  }

            },
            addson(){
                for(var i=0;i<this.sonlist.length;i++) {
                    if (this.son == this.sonlist[i].name) {
                        this.$message({
                            message: '子类别名称已存在！请重新输入！',
                            type: 'warning'
                        });
                        return false
                    }
                }
                if(this.son==''){
                    this.$message({
                        message: '请输入子类别名称！',
                        type: 'warning'
                    });
                }
                else{
                    this.$http.get('/admin/addson?name='+this.son+'&fid='+this.fatherid).then(function (result) {
                        this.sonlist.push({catagory:'',name:this.son,fid:''});
                    })
                }
            },
            deleteson(index, rows) {
                var name=rows[index].name;
                this.$http.get('/admin/deleteson?name='+name).then(function (result) {
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                })
                rows.splice(index, 1);
            },
        },
}
</script>

<style>

</style>
