jQuery.noConflict();

(($, PLUGIN_ID) => {

  var config = kintone.plugin.app.getConfig(PLUGIN_ID);
  var fields = [];

  $(document).ready(() => {
    kintone.api(kintone.api.url('/k/v1/preview/form', true), 'GET', { 
      'app': kintone.app.getId()
    }, (resp) => {
      fields = [];
      Object.keys(resp.properties).forEach((i, key) => {
        if ('code' in resp.properties[key]) {
          fields.push(resp.properties[key]);
        }
      });
      console.dir(fields);

      var columns = config.columns ? JSON.parse(config.columns) : [];
      // 未設定の場合はデフォルト設定 
      if (columns.length <= 0) columns = [fields[0]];

      var vue = new Vue({
        el: '#form',
        data: {
          options: fields,
          columns: columns,
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
            config['columns'] = JSON.stringify(columns);
            config['elementId'] = this.elementId;
            kintone.plugin.app.setConfig(config);
          },
          cancel() {
            history.back();
          }
        }
      });
    })
  });

})(jQuery, kintone.$PLUGIN_ID);

