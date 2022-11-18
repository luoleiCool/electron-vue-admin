<template>
  <div>
    <el-upload
        :method="method"
        :action="action"
        :multiple="multiple"
        :accept="accept"
        :auot-upload="auotUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<style lang="scss">
</style>
<script>



export default {
  name: "REQUEST",
  data() {
    return {
      method:"post", 	//请求方式
      action:"http://localhost:9090/energy/excelImp/uploadExcel", 		//请求地址
      multiple:"false", 	//是否允许选择多个文件
      accept:"xls,xlsx", 		//可以使用的文件类型
      auotUpload:"true"	//是否在选择文件后自动上传文件
    };
  },
  mounted() {

  },
  methods: {

  }
};
</script>
