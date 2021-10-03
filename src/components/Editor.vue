<template>
  <div>
    <link
      rel="stylesheet"
      href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"
    />
    <el-row>
      <el-col :span="24">
        <el-select
          @change="setHistory()"
          v-model="savedHistory"
          placeholder="History"
          clearable
          no-data-text="No Data "
        >
          <el-option
            v-for="item in history"
            :key="item.name"
            :label="item.name"
            :value="item.data"
          >
          </el-option>
        </el-select>
        <el-button @click="saveLog()">Save</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="content" v-html="content" />
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col class="col">
        <el-button @click="minimize()" size="mini">
          {{ minimizeName }}</el-button
        >
        <el-button @click="run()" size="mini"> Run</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="jsSpan" class="col">
        <span>JS</span>
        <br />
        <el-input
          id="JStext"
          type="textarea"
          :rows="textRows"
          placeholder="Please input"
          v-model="JsText"
        >
        </el-input>
      </el-col>
      <el-col :span="htmlSpan" class="col">
        <span>HTML</span>
        <br />
        <el-input
          type="textarea"
          :rows="textRows"
          placeholder="Please input"
          v-model="htmlText"
        >
        </el-input>
      </el-col>
      <el-col :span="cssSpan" class="col">
        <span>CSS</span>
        <br />
        <el-input
          type="textarea"
          :rows="textRows"
          placeholder="Please input"
          v-model="CssText"
        >
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script>
import { mapState, mapActions } from "vuex";
function runJS() {
  eval(document.getElementById("JStext").value);
}

export default {
  name: "Editor",
  props: {
    msg: String,
  },
  data() {
    return {
      savedHistory: "",
      textRows: 15,
      htmlSpan: 8,
      cssSpan: 8,
      jsSpan: 8,
      minimizeName: "Minimize",
      content: "Content",
      htmlText: "<h1 id='demo' class='test'>Test</h1>",
      CssText: ".test{color: #42b983;}",
      JsText: "document.getElementById('demo').style.color = '#E54F0D';",
    };
  },
  created() {},
  computed: {
    ...mapState("history", ["history"]),
  },
  methods: {
    ...mapActions("history", ["updateHistory"]),

    minimize() {
      if (this.minimizeName == "Minimize") {
        this.textRows = 2;
        this.minimizeName = "Maximize";
      } else {
        this.textRows = 20;
        this.minimizeName = "Minimize";
      }
    },
    run() {
      this.content = this.htmlText + `<style>${this.CssText}</style>`;
      setTimeout(() => {
        runJS();
      }, 100);
    },
    setHistory() {
      if (this.savedHistory != "") {
        this.htmlText = this.savedHistory.htmlText;
        this.CssText = this.savedHistory.CssText;
        this.JsText = this.savedHistory.JsText;
      }
    },
    saveLog() {
      this.updateHistory({
        htmlText: this.htmlText,
        CssText: this.CssText,
        JsText: this.JsText,
      });
    },
  },
  watch: {
    htmlText() {
      this.htmlSpan = 12;
      this.cssSpan = 6;
      this.jsSpan = 6;
    },
    CssText() {
      this.htmlSpan = 6;
      this.cssSpan = 12;
      this.jsSpan = 6;
    },
    JsText() {
      this.htmlSpan = 6;
      this.cssSpan = 6;
      this.jsSpan = 12;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col {
  left: 0px;
  border-style: solid;
  border-width: thin;
}
.content {
  min-height: 300px;
  border-style: solid;
  border-width: thin;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>