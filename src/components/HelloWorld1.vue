<template>
  <div>
    <input
        type="file"
        ref="upload"
        accept=".xls,.xlsx"
        class="outputlist_upload"
    />

    <el-button
        class="redBn"
        type="primary"
        @click="saveExcel()"
        style="margin-right: 20px"
    >
      保存</el-button
    >

    <el-button
        class="redBn"
        type="primary"
        @click="searchExcel()"
        style="margin-right: 20px"
    >
      数据库查找</el-button
    >
    <!-- <h3>Import XLSX</h3>
    <input type="file" @change="onChange" />
    <xlsx-read :file="file">
      <xlsx-json>
        <template #default="{collection}">
          <div>
            {{ collection }}
          </div>
        </template>
      </xlsx-json>
    </xlsx-read> -->
  </div>
</template>

<style lang="scss">
</style>
<script>
import axios from "axios";
import XLSX from "xlsx";
import { XlsxRead, XlsxJson } from "vue-xlsx";

export default {
  name: "REQUEST",
  components: {
    XlsxRead,
    XlsxJson
  },
  data() {
    return {
      attributes1: [],
      units1: [],
      data1: [],
      attributes2: [],
      units2: [],
      data2: [],
      file: null,
      sheetName1: "",
      sheetName2: "",
      originData1: [],
      originData2: [],
    };
  },
  mounted() {
    this.$refs.upload.addEventListener("change", (e) => {
      //绑定监听表格导入事件
      this.readExcel(e);
    });
  },

  methods: {
    // onChange(event) {
    //   console.log(new Date().getTime());
    //   this.file = event.target.files ? event.target.files[0] : null;
    //   console.log(event.target.files)
    // }

    async readExcel(e) {
      const start = new Date().getTime();
      //表格导入
      const files = e.target.files;
      console.log(files);
      if (files.length <= 0) {
        //如果没有文件名
        return false;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$Message.error("上传格式不正确，请上传xls或者xlsx格式");
        return false;
      }

      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          // 清空数据
          this.attributes1 = [];
          this.attributes2 = [];
          this.units1 = [];
          this.units2 = [];
          this.data1 = [];
          this.data2 = [];
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
            cellDates: true,
            dateNF: "yyyy-mm-dd"
          });
          console.log(workbook);
          const wsname1 = workbook.SheetNames[0]; //取第一张表
          console.log("开始读取" + wsname1);
          this.sheetName1 = wsname1;
          let ws1 = XLSX.utils.sheet_to_json(workbook.Sheets[wsname1], {
            header: 1,
            defval: "0",
            raw: false,
          }); //生成json表格内容
          //编辑数据
          for (let i = 0; i < ws1[2].length; i++) {
            if (i >= 2) {
              this.units1.push(ws1[2][i]);
            } else {
              this.attributes1.push(ws1[2][i]);
            }
          }
          this.attributes1.push(this.units1);
          console.log(this.attributes1);
          for (let i = 3; i < ws1.length; i++) {
            if (ws1[i][0] != 0) {
              this.data1.push(ws1[i]);
            }
          }
          console.log(this.data1);
          const wsname2 = workbook.SheetNames[1];
          this.sheetName2 = wsname2;
          console.log("开始读取" + wsname2);
          let ws2 = XLSX.utils.sheet_to_json(workbook.Sheets[wsname2], {
            header: 1,
            defval: "0",
            raw: false,
          }); //生成json表格内容
          // console.log(ws2);
          //编辑数据
          for (let i = 0; i < ws2[1].length; i++) {
            if (i >= 2) {
              this.units2.push(ws2[1][i]);
            } else {
              this.attributes2.push(ws2[1][i]);
            }
          }
          this.attributes2.push(this.units2);
          console.log(this.attributes2);
          for (let i = 2; i < ws2.length; i++) {
            if (ws2[i][0] != 0) {
              this.data2.push(ws2[i]);
            }
          }
          this.originData1 = this.data1;
          this.originData2 = this.data2;
          console.log(this.data2);
          console.log(new Date().getTime() - start);
          this.sendData(this.attributes1, this.data1, this.sheetName1);
          this.$refs.upload.value = "";
        } catch (e) {
          console.log(e);
          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
    },

    saveExcel() {
      var sheetName = this.sheetName1;
      var sheetData = this.originData1;
      var header = [];
      for (let i = 0; i < this.attributes1.length; i++) {
        if (i != 2) {
          header.push(this.attributes1[i]);
        } else {
          for (let j = 0; j < this.attributes1[i].length; j++) {
            header.push(this.attributes1[i][j]);
          }
        }
      }
      sheetData.unshift(header);
      var workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      XLSX.writeFile(workbook, "out.xls");
    },

    sendData(attributes, data1, type) {
      var data = {};
      data.attributes = attributes;
      data.data = data1;
      data.type = type;
      console.log("函数执行了");
      axios({
        url: `/API/saveinfo`,
        method: "post",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
        dataType: "json",
      })
          .then((res) => {
            console.log("连接成功"); //这里打印出来是为了更直观的看到连接成功了
            console.log(res); //res是后端返回来的数据，如果连接成功，则把res打印出来
            var data = res.data.msg; //这里进行传回数据的赋值
            console.log(data);
          })
          .catch(function (error) {
            console.log("连接失败");
            console.log(error); //如果连接失败，则抛出错误的信息
          });
    },

    searchExcel() {
      axios({
        url: `/API/getinfo`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        dataType: "json",
      })
          .then((res) => {
            console.log("连接成功"); //这里打印出来是为了更直观的看到连接成功了
            console.log(res); //res是后端返回来的数据，如果连接成功，则把res打印出来
          })
          .catch(function (error) {
            console.log("连接失败");
            console.log(error); //如果连接失败，则抛出错误的信息
          });
    },
  },
};
</script>
