<template>
         <el-header style="text-align: right; font-size: 12px;"> 
            <label style="font-size: 12px;">ODS运动户外商城后台管理系统</label>
                            <el-dropdown> 
                                <i class="el-icon-setting" style="margin-right: 15px"></i> 
                                <el-dropdown-menu slot="dropdown"> 
                                    <el-dropdown-item @click.native="logout">注销</el-dropdown-item> 
                                </el-dropdown-menu> 
                            </el-dropdown> 
                            <span>欢迎您！管理员{{this.$store.state.adminname}}</span> 
            </el-header>
</template>

<script>
export default {
    methods:{
            logout(){
                this.$store.state.adminname='';
                this.$router.push({
                    path: '/adminlogin',
                })
            }
        },
}
</script>

<style>

</style>
