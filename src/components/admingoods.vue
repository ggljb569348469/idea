<template>
       <el-container direction="vertical">
            <adminheader></adminheader>
            <el-container>
            <adminnavi></adminnavi>
            <el-container direction="vertical">
            <el-dialog title="商品规格管理" :visible.sync="dialogsku"> 
                    <el-button 
                      @click.native.prevent="showaddsku" 
                      type="success"> 
                      添加规格 
                    </el-button> 
              <el-table :data="skulist"> 
                <el-table-column prop="color" label="颜色"></el-table-column> 
                <el-table-column prop="sizes" label="尺码"></el-table-column> 
                <el-table-column prop="img" label="规格图片"> 
                 <template slot-scope="scope"> 
                  <img  :src="scope.row.img" alt="" style="width: 75px;height: 75px"> 
                 </template>
            </el-table-column> 
                <el-table-column prop="price" label="价格"> 
                       <template slot-scope="scope">
                         <label>¥{{scope.row.price}}</label>
                       </template>
            </el-table-column> 
                <el-table-column prop="stock" label="库存"></el-table-column> 
             <el-table-column 
                  label="操作" 
                width="200px"
              > 
                  <template slot-scope="scope"> 
                    <el-button 
                      @click.native.prevent="handleskudetail(scope.row.skuid)" 
                      type="primary" 
                      size="small"> 
                      编辑 
                    </el-button> 
                    <el-button 
                      @click.native.prevent="deletesku(scope.row.skuid,scope.row.itemid)" 
                      type="danger" 
                      size="small"> 
                      删除 
                    </el-button> 
                  </template> 
                </el-table-column>
              </el-table> 
            </el-dialog>

            <el-dialog title="规格详情" :visible.sync="dialogskudetail" width="auto" top="10px" overflow:auto>   /*sku详细页面dialog*/
              <el-form :model="skuform"> 
                <el-form-item label="规格编号" :label-width="formLabelWidth"> 
                  <el-input :disabled="true" v-model="skuform.skuid" ></el-input> 
                </el-form-item> 
                <el-form-item label="颜色" :label-width="formLabelWidth"> 
                  <el-input v-model="skuform.color"></el-input> 
                </el-form-item> 
                <el-form-item label="尺码" :label-width="formLabelWidth"> 
                  <el-input v-model="skuform.sizes"></el-input> 
                </el-form-item> 
                <el-form-item label="规格图片" :label-width="formLabelWidth"> 
               <el-upload 
                           ref="upload" 
                           action="/upload/uploadsku" 
                           name="img" 
                           list-type="picture-card" 
                           :limit="1" 
                           :file-list="fileList" 
                           :on-exceed="onExceed" 
                           :before-upload="beforeUpload" 
                           :on-preview="handleskuPreview" 
                           :on-success="handleskuSuccess" 
                           :on-remove="handleskuRemove"> 
                    <i class="el-icon-plus"></i> 
                </el-upload> 
                </el-form-item> 
                <el-form-item label="价格" :label-width="formLabelWidth"> 
                  <el-input v-model="skuform.price"></el-input> 
                </el-form-item> 
                <el-form-item label="库存" :label-width="formLabelWidth"> 
                  <el-input v-model="skuform.stock"></el-input> 
                </el-form-item> 
              </el-form> 
              <div slot="footer" class="dialog-footer"> 
                <el-button @click="dialogskudetail=false;">取 消</el-button> 
                <el-button type="primary" @click.native.prevent="updatesku(skuform)">确 定</el-button> 
              </div> 
            </el-dialog>

             <el-dialog :visible.sync="dialogVisible">                         /*商品详细页面dialog*/
                    <img width="100%" :src="dialogImageUrl" alt=""> 
             </el-dialog>

            <el-dialog title="商品详情" :visible.sync="dialoggoods" width="auto" top="10px" overflow:auto> 
              <el-form :model="itemform"> 
                <el-form-item label="商品编号" :label-width="formLabelWidth"> 
                  <el-input :disabled="true" v-model="itemform.itemid" ></el-input> 
                </el-form-item> 
                <el-form-item label="商品名称" :label-width="formLabelWidth"> 
                  <el-input v-model="itemform.itemname"></el-input> 
                </el-form-item> 
                <el-form-item label="价格" :label-width="formLabelWidth"> 
                  <el-input v-model="itemform.price"></el-input> 
                </el-form-item> 
                <el-form-item label="商品主图" :label-width="formLabelWidth"> 
               <el-upload 
                           ref="upload" 
                           action="/upload/uploadgoods" 
                           name="itemimg" 
                           list-type="picture-card" 
                           :limit="1" 
                           :file-list="fileList" 
                           :on-exceed="onExceed" 
                           :before-upload="beforeUpload" 
                           :on-preview="handlePreview" 
                           :on-success="handleSuccess" 
                           :on-remove="handleRemove"> 
                    <i class="el-icon-plus"></i> 
                </el-upload> 
                </el-form-item> 
                <el-form-item label="商品描述" :label-width="formLabelWidth"> 
                <div id="editor">
                </div>
                </el-form-item> 
                <el-form-item label="类别编号" :label-width="formLabelWidth"> 
                  <el-input v-model="itemform.catagoryid"></el-input> 
                </el-form-item> 
              </el-form> 
              <div slot="footer" class="dialog-footer"> 
                <el-button @click="goodseditcancel">取 消</el-button> 
                <el-button type="primary" @click.native.prevent="updategoods(itemform)">确 定</el-button> 
              </div> 
            </el-dialog>

            <div> 
            <el-button @click.native.prevent="selectallgoods">查看所有商品</el-button>
            <el-input placeholder="请输入要搜索内容" v-model="keyword" class="input-with-select"> 
               <el-button slot="append" icon="el-icon-search" @click.native.prevent="selectsearchgoods"></el-button> 
              </el-input>
                    <el-button 
                      @click.native.prevent="showadditem" 
                      type="success"> 
                      添加商品 
                    </el-button> 
            </div>
             <el-table 
                :data="itemlist.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
                style="width: 100%"> 
                <el-table-column 
                  prop="itemid" 
                  label="商品编号" 
                  width="120"> 
                </el-table-column> 
                <el-table-column 
                  prop="itemname" 
                  label="商品名称" 
                  width="120"> 
                </el-table-column> 
                <el-table-column 
                  prop="price" 
                  label="价格" 
                  width="120"> 
            <template slot-scope="scope">
            <label>¥{{scope.row.price}}</label>
            </template>
                </el-table-column> 
                <el-table-column 
                  prop="itemimg" 
                  width="120" 
                  label="商品主图"> 
                 <template slot-scope="scope"> 
                  <img  :src="scope.row.itemimg" alt="" style="width: 75px;height: 75px"> 
                 </template>
                </el-table-column> 
             <el-table-column 
                  label="操作" 
              > 
                  <template slot-scope="scope"> 
                    <el-button 
                      @click.native.prevent="handledetail(scope.row.itemid)" 
                      type="primary" 
                      size="small"> 
                      商品详情 
                    </el-button> 
                    <el-button 
                      @click.native.prevent="handlesku(scope.row.itemid)" 
                      type="success" 
                      size="small"> 
                      管理规格 
                    </el-button> 
                    <el-button 
                      @click.native.prevent="deleteitem(scope.row.itemid)" 
                      type="danger" 
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
                        :total="itemlist.length"> 
                                </el-pagination>
                </el-container>
                </el-container>
                </el-container>
</template>

<script>
import $ from 'jquery'
import E from 'wangeditor'
export default {
     data:function(){
            return{
                myeditor:null,
                editorContent:'',
                //文件上传的参数
                dialogImageUrl: '',
                dialogVisible: false,
                //图片列表（用于在上传组件中回显图片）
                fileList: [{name: '', url: ''}],
                formLabelWidth: '120px',
                itemform:{
                    itemid:'',
                    itemname:'',
                    itemimg:'',
                    itemcontext:'',
                    catagoryid:'',
                    price:''
                },
                skuform:{
                    skuid:'',
                    itemid:'',
                    color:'',
                    sizes:'',
                    price:'',
                    stock:'',
                    img:''
                },
                keyword:'',
                dialogsku:false,
                dialoggoods:false,
                dialogskudetail:false,
                dialogadditem:false,
                dialogaddsku:false,
                itemlist:[],
                iteminfolist:[],
                skulist:[],
                currentPage:1, //初始页
                pagesize:5,    //    每页的数据
            }
        },
        mounted:function () {
            this.selectallgoods();
        },
        methods:{
            selectallgoods(){                                          /*  取出商品列表*/
                this.$http.get('/ods/allgoods').then(function (result) {
                    var a = JSON.parse(result.bodyText);
                    this.itemlist=a.list;});
            },
            selectsearchgoods(){                                        /*  通过关键字搜索商品信息*/
                this.$http.get('/ods/selectsearchgoods?keyword='+this.keyword).then(function (result) {
                    var a = JSON.parse(result.bodyText);
                    this.itemlist=a.list;});
            },
            handledetail(itemid){                                 /*  编辑商品表商品详细信息*/
                this.dialoggoods=true;
                if(itemid!=''){
                this.$http.get('/ods/selectgoodsbyid?id='+itemid).then(function (result) {
                    var editor = new E('#editor')
                    editor.customConfig.uploadImgShowBase64 = true;
                    editor.create()
                    var a = JSON.parse(result.bodyText);
                    this.iteminfolist=a.list;
                    this.itemform.itemid=this.iteminfolist[0].itemid;
                    this.itemform.itemname=this.iteminfolist[0].itemname;
                    this.fileList[0].url=this.itemform.itemimg=this.iteminfolist[0].itemimg;
                    this.itemform.itemcontext=this.iteminfolist[0].itemcontext;
                    this.itemform.catagoryid=this.iteminfolist[0].catagoryid;
                    this.itemform.price=this.iteminfolist[0].price;
                    editor.txt.html(this.itemform.itemcontext);
                    this.myeditor=editor;
                });
                }
                else{
                    var editor = new E('#editor')
                    editor.customConfig.uploadImgShowBase64 = true;
                    editor.create();
                    editor.txt.html(this.itemform.itemcontext);
                    this.myeditor=editor;
                }
                /*  iteminfo绑定一个dialog里的data*/
            },
            handlesku(itemid){                                   /*  编辑指定itemid商品的sku信息*/
                this.dialogsku=true;
                this.$http.get('/ods/selectskubyid?id='+itemid).then(function (result) {
                    var a = JSON.parse(result.bodyText);
                    this.skulist=a.list;
                });                  /* 用dialog表格展现sku*/
            },
            handleskudetail(skuid){
                this.dialogskudetail=true;
                if(skuid!=''){
                for(var i=0;i<this.skulist.length;i++){
                    if(this.skulist[i].skuid==skuid){
                this.skuform.itemid=this.skulist[i].itemid;
                this.skuform.skuid=this.skulist[i].skuid;
                this.skuform.color=this.skulist[i].color;
                this.skuform.sizes=this.skulist[i].sizes;
                this.fileList[0].url=this.skuform.img=this.skulist[i].img;
                this.skuform.price=this.skulist[i].price;
                this.skuform.stock=this.skulist[i].stock;
                    }
                }
                }
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
            deleteitem(itemid) {                                    /*  通过itemid删除商品*/
                this.$http.get('/admin/deletegoods?itemid='+itemid).then(function (result) {
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.selectallgoods();
                })
            },
            deletesku(skuid,itemid) {                                          /*通过skuid删除规格*/
                this.$http.get('/admin/deletesku?skuid='+skuid).then(function (result) {
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.handlesku(itemid);             /*刷新指定itemid的新的sku列表*/
                })
                },
            showadditem(){
                this.fileList=[{name: '', url: ''}];
                this.itemform={
                    itemid:'',
                    itemname:'',
                    itemimg:'',
                    itemcontext:'',
                    catagoryid:'',
                    price:''
                };
                this.dialoggoods=true;
                this.handledetail(this.itemform.itemid);              /*如果itemid为空则为增加商品！*/
            },
            showaddsku(){
                this.fileList=[{name: '', url: ''}];
                this.skuform={
                    skuid:'',
                    itemid:'',
                    color:'',
                    sizes:'',
                    price:'',
                    stock:'',
                    img:''
                };
                this.skuform.itemid=this.skulist[0].itemid;
                this.dialogskudetail=true;
                this.handleskudetail(this.skuform.skuid);              /*如果skuid为空则为增加规格！*/
            },
            updatesku(skuform){
            if(skuform.skuid!=''){
                this.$http.get('/admin/updatesku?skuid='+skuform.skuid+'&color='+skuform.color+'&sizes='+skuform.sizes+'&img='+skuform.img+'&price='+skuform.price+'&stock='+skuform.stock).then(function (result) {
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    this.dialogskudetail = false;
                    this.handlesku(skuform.itemid);
                })
            }
            else{
                this.$http.get('/admin/addsku?itemid='+this.skuform.itemid+'&color='+this.skuform.color+'&sizes='+this.skuform.sizes+'&img='+this.skuform.img+'&price='+this.skuform.price+'&stock='+this.skuform.stock).then(function (result) {
                        this.$message({
                            message: '添加规格成功！',
                            type: 'success'
                        });
                        this.dialogskudetail = false;
                        this.handlesku(this.skuform.itemid);})
                }
            },
            goodseditcancel(){
                $('#editor').empty();
                this.dialoggoods = false;
            },
            updategoods(itemform){                                              /*更新新增一起*/
                itemform.itemcontext=this.myeditor.txt.html()
                if(itemform.itemid!=''){
                this.$http.get('/admin/updategoods?itemid='+itemform.itemid+'&itemname='+itemform.itemname+'&itemimg='+itemform.itemimg+'&itemcontext='+itemform.itemcontext+'&catagoryid='+itemform.catagoryid+'&price='+itemform.price).then(function (result) {
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    $('#editor').empty();
                    this.dialoggoods = false;
                    this.selectallgoods();
                })
                }
                else{
                    this.$http.get('/admin/additem?itemname='+itemform.itemname+'&itemimg='+itemform.itemimg+'&itemcontext='+itemform.itemcontext+'&catagoryid='+itemform.catagoryid+'&price='+itemform.price).then(function (result) {
                        this.$message({
                            message: '添加商品成功！',
                            type: 'success'
                        });
                        $('#editor').empty();
                        this.dialoggoods = false;
                        this.selectallgoods();
                    })
                }
            },
            //文件上传成功的钩子函数
            handleSuccess(res, file) {
                this.$message({
                    type: 'info',
                    message: '图片上传成功',
                    duration: 3000
                });
                this.itemform.itemimg = file.response.msg; //将返回的文件储存路径赋值itemimg字段
            },
            handleskuSuccess(res, file) {
                this.$message({
                    type: 'info',
                    message: '图片上传成功',
                    duration: 3000
                });
                this.skuform.img = file.response.msg; //将返回的文件储存路径赋值itemimg字段
            },
            //删除文件之前的钩子函数
            handleRemove(file, fileList) {
                this.itemform.itemimg="./upload/white.jpg"
                this.$message({
                    type: 'info',
                    message: '已删除原有图片',
                    duration: 3000
                });
            },
            handleskuRemove(file, fileList){
                this.skuform.img="./upload/white.jpg"
                this.$message({
                    type: 'info',
                    message: '已删除原有图片',
                    duration: 3000
                });
            },
            //点击列表中已上传的文件时的钩子函数
            handlePreview(file) {
                this.dialogVisible=true;
                this.dialogImageUrl=this.itemform.itemimg;
            },
            handleskuPreview(file) {
                this.dialogVisible=true;
                this.dialogImageUrl=this.skuform.img;
            },
            //上传的文件个数超出设定时触发的函数
            onExceed(files, fileList) {
                this.$message({
                    type: 'info',
                    message: '最多只能上传一个图片',
                    duration: 3000
                });
            },
            //文件上传前的前的钩子函数
            //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isGIF = file.type === 'image/gif';
                const isPNG = file.type === 'image/png';
                const isBMP = file.type === 'image/bmp';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isGIF && !isPNG && !isBMP) {
                    this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
            },
        },
}
</script>

<style>

</style>
