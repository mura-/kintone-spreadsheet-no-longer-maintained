jQuery.noConflict();

(($, PLUGIN_ID) => {

  var arrColumnConfig = (config) => {
    var result = [];
    Object.keys(config).forEach((key) => {
      if (key.substring(0, 6) === "column") {
        result.push(config[key]);
      }
    });
    return result;
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
       
      var vue = new Vue({
        el: '#form',
        data: {
          options: options,
          columns: arrColumnConfig(config),
          elementId: 'elementId' in config ? config.elementId : '',
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
            config['elementId'] = this.elementId;
            kintone.plugin.app.setConfig(config);
          },
          cancel() {
            history.back();
          }
        },
      });
    })
  });

})(jQuery, kintone.$PLUGIN_ID);

