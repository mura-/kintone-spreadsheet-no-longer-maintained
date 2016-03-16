jQuery.noConflict();

(($, PLUGIN_ID) => {

  var arrColumnConfig = (config) => {
    return Object.keys(config).map((key) => {
      if (key.substring(0, 6) === "column") {
        return config[key];
      }
    });

  }

  var config = kintone.plugin.app.getConfig(PLUGIN_ID);
  var fields = [];

  $(document).ready(() => {
    kintone.api(kintone.api.url('/k/v1/preview/form', true), 'GET', {
      'app': kintone.app.getId()
    }, (resp) => {
      fields = [];
      Object.keys(resp.properties).forEach((i, key) => {
        if ('code' in resp.properties[key]) {
          fields.push(resp.properties[key].code);
        }
      });
      console.dir(fields);
      var options = fields.map((i, key) => {
        return {text: fields[key], value: fields[key]};
      });
       
      window.vue = new Vue({
        el: '#form',
        data: {
          options: options,
          columns: arrColumnConfig(config)
        },
        methods: {
          delColumn(index) {
            this.columns.splice(index, 1);
          },
          addColumn(index) {
            this.columns.splice(index, 0, this.options[0]);
          },
          registConfig() {
            var config = {};
            this.columns.forEach((column, i) => {
              config[`columns${i}`] = column;
            });
            kintone.plugin.app.setConfig(config);
          },
          cancel() {
            history.back();
          }
        },
      });
    })
  });


  // config = {
  //   "column0": "レコード番号",
  //   "column1": "会社名",
  //   "column2": "先方担当者名",
  //   "column3": "見込み時期",
  //   "column4": "確度",
  //   "column5": "製品名",
  //   "column6": "単価",
  //   "column7": "ユーザー数",
  //   "column8": "小計"
  // };

  // kintone.plugin.app.setConfig(config);

})(jQuery, kintone.$PLUGIN_ID);

