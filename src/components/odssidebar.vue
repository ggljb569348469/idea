<template>
            <div class="sidebar" id="odssidebar"> 
                        <div style="margin-top:100px"><img style="width: 30px;height: 30px;" src="../static/img/logo.jpg"></div> 
                        <i class="el-icon-goods" style="color: white;font-size: 16px;width: 31px;height:70px;margin-top: 50px"><a href="javascript:;" @click="tocart" style="color: white;text-decoration: none">购物车</a></i> 
                        <i class="el-icon-arrow-up" style="color: white;font-size: 16px;width: 31px;height:100px;margin-top: 250px"><a href="javascript:;" @click="toadmin" style="color: white;text-decoration: none">管理员入口</a></i> 
                    </div>
</template>

<script>
export default {
    name: 'odssidebar',
    methods: {
            tocart() {
                if (this.$store.state.username != '') {
                    this.$router.push({
                        path: '/cart',
                    })
                }
                else {
                    this.$message({
                        message: '请先登录再使用购物车！',
                        type: 'warning'
                    });
                }
            },
            toadmin(){
                this.$router.push({
                    path: '/adminlogin',
                })
            }
        },
}
</script>

<style lang="scss" scoped>
.sidebar {
    background-color: #000;
    position: fixed;
    height: 100%;
    width: 31px;
    top: 54px;
    right: 0;
    z-index: 98;
    text-align: center;
}
* {
    margin: 0;
    padding: 0;
    list-style: none;
}
.sidebar i:hover{
    background-color: red;
}
</style>
