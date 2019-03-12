<template>
         <el-main class="el-main"> 
                        <el-carousel indicator-position="inside" height="700px"> 
                            <el-carousel-item v-for="item in img" :key="item"> 
                                <h3><img :src="item"></h3> 
                            </el-carousel-item> 
                        </el-carousel> 
             
                        <div class="manzone"> 
                            <p>男性专区</p> 
                            <a href="#/goods"><img src="../static/img/nt.jpg"></a> 
                            <p><a href="#">进入男性专区</a></p> 
                        </div> 
             
                        <div class="womanzone"> 
                            <p>女性专区</p> 
                            <a href="#/goods"><img src="../static/img/nvt.jpg"></a> 
                            <p><a href="#">进入女性专区</a></p> 
                        </div> 
             
                        <div class="childzone"> 
                            <p>儿童专区</p> 
                            <a href="#/goods"><img src="../static/img/tzt.jpg"></a> 
                            <p><a href="#">进入儿童专区</a></p> 
                        </div> 
                    </el-main>
</template>

<script>
import p1Img from '../static/img/p1.jpg'; 
import p2Img from '../static/img/p2.jpg'; 
import p3Img from '../static/img/p3.jpg'; 
import p4Img from '../static/img/p4.jpg'; 
export default {
    name: 'odsheader',
     data:function(){
            return {
                img: [
                    p1Img,
                    p2Img,
                    p3Img,
                    p4Img
                ],
            }
        }
}
</script>

<style lang="scss" scoped>
.manzone{
    text-align: center;
    margin-top: 50px;
}
.childzone img{
    height: 500px;
    width: 1150px;
}
.el-main {
    height: 2000px;
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    font-weight: bold;
}
.el-main a{
    text-decoration: none;
    color: #f5222d;
}
.el-carousel__item {
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    z-index: 0;
}
.el-carousel__item h3 {
    opacity: 1;
    height: 100%;
    margin: 0;
}
.el-carousel__item h3 img{
    margin-top: 90px;
    height: 600px;
    width: 1500px;
}
.el-carousel__item:nth-child(2n),.el-carousel__item:nth-child(2n+1){
    background-color: #ffffff;
}
</style>
