<template>
  <div class="task-list">
    <input
      type="file"
      name="file"
      @change="readExcel"
      multiple="multiple"
      class="upload__input"
      style="height: 40px; width: 300px"
    />
    <table style="margin: 0 auto">
      <!-- 设置居中,如果没获取到内容则不显示 -->
      <tr>
        <th v-for="h in content[0]" :key="h.id">{{ h }}</th>
      </tr>
      <tr v-for="row in content.slice(1)" :key="row.id">
        <td v-for="item in row" :key="item.id">{{ item }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import XLSX from "xlsx";
import transformSheets from "./xlsx.js"; //导入转制函数

export default {
  name: "TaskList",
  data() {
    return {
      content: "", //初始化数据
      err: "",
    };
  },
  created() {
    console.log(1232311);
    var url = "/zidian.xlsx"; //放在public目录下的文件可以直接访问

    //读取二进制excel文件,参考https://github.com/SheetJS/js-xlsx#utility-functions
    //读取二进制excel文件,参考https://github.com/SheetJS/js-xlsx#utility-functions
    axios
      .get(url, { responseType: "arraybuffer" })
      .then((res) => {
        console.log(res.data);
        var data = new Uint8Array(res.data);
        var wb = XLSX.read(data, { type: "array" });
        var sheets = wb.Sheets;
        this.content = transformSheets(sheets);
      })
      .catch((err) => {
        this.err = err;
      });
  },
  methods: {
    readExcel(e) {
      var files = e.target.files;

      var fileReader = new FileReader();
      fileReader.onload = function (ev) {
        try {
          var data = ev.target.result,
            workbook = XLSX.read(data, {
              type: "binary",
            }), // 以二进制流方式读取得到整份excel表格对象
            persons = []; // 存储获取到的数据
        } catch (e) {
          console.log("文件类型不正确");
          return;
        }

        // 表格的表格范围，可用于判断表头是否数量是否正确
        var fromTo = "";
        // 遍历每张表读取
        for (var sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            fromTo = workbook.Sheets[sheet]["!ref"];
            console.log(fromTo);
            persons = persons.concat(
              XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            );
            // break; // 如果只取第一张表，就取消注释这行
          }
        }

        console.log(persons);
        let arr = [];
        persons.forEach((item, index) => {
          arr.push({ key: item.key, value: item.value });
        });
        console.log(JSON.stringify(arr));
      };

      // 以二进制方式打开文件
      fileReader.readAsBinaryString(files[0]);
    },
    // ab2str(buf) {
    //   return String.fromCharCode.apply(null, new Uint16Array(buf));
    // },
  },
};
</script>