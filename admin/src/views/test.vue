<template>
    <div>
       
        <p v-for="(item , i) in testList" :key =i> {{testList[i]}} </p>
         <el-button @click = "add()"> click me </el-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            testList:[]
        }
    },
    methods:{
        add(){
            this.testList.push("x")
        }
    }
}
</script>