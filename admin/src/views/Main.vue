<template>      
    <el-container class="co1" >
        <el-header style="height:80px"> 
          周同学音乐
          <div class="uploadButton">
            <el-button @click="$router.push('/musics/new')" type="primary" >新增音乐<i class="el-icon-upload el-icon--right"></i></el-button>
          </div>
        </el-header>
        <el-main>
            <el-row :gutter="20" >
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-color">
                    <el-link href="https://element.eleme.io" :underline="false" class="musicLink" ><strong>七里香</strong></el-link>
                    <div class=inButton >
                      <el-button icon="el-icon-caret-right" circle type="primary" ></el-button>     
                      <el-button icon="el-icon-delete-solid" circle  type="danger"></el-button>  
                    </div>                   
                </div>
            </el-col>
            </el-row>
        </el-main>     
    </el-container>   
</template>  

<style>
  
  html,body{
      margin:0;
      padding:0;
   }
   .uploadButton{  
     margin-left: 70%;
     margin-top:-40px;    
   }
  .el-header {
    color: white;
    text-align: center; 
    padding-top: 10px;
    font-size: 40px;   
    font-family:"Times New Roman",Georgia,Serif;
    }
    .co1{
     padding-top: 40px; 
     width: 100%;
     background-color: #f1939c;
     min-height: 100vh;     
    }
   .el-row {   
    margin-bottom: 20px;
    align-self: center;
  }
  .el-col {
    border-radius: 4px;

  }

  .bg-color {
    background: #fffef8;
  }
    .grid-content {
    
    border-radius: 100px;
    min-height: 50px;
    overflow: hidden;
 
  }
    .musicLink{
      color: rgb(248, 248, 248);
      margin-top:12px;
      font-size: 18px;
      margin-left: 30px;
    }
    .inButton{
      display: inline;
      margin-right:10px;
      margin-top:5px;
      float:right
    }
</style>