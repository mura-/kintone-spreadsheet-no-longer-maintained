jQuery.noConflict();

var getColumnsFromConfig = (config) => {
  var result = [];
  Object.keys(config).forEach((key) => {
    if (key.substring(0, 6) === "column") {
      result.push(config[key]);
    }
  });
  return result;
};

var getColumnData = (columns) => {
  return columns.map((column) => {
    return {
      data: `${column}.value`
    };
  });
};

(($, PLUGIN_ID) => {
  kintone.events.on('app.record.index.show', (event) => {

    var config = kintone.plugin.app.getConfig(PLUGIN_ID);
    if (!config) return false;
    console.dir(config);

    var columns = getColumnsFromConfig(config);
    var columnData = getColumnData(columns);

    var records = event.records;
    var container = document.getElementById(config.elementId);
    var hot = new Handsontable(container, {
        data: records,
        minSpareRows: 0,
        colHeaders: columns,
        contextMenu: false,
        columns: columnData
    });
  });
})(jQuery, kintone.$PLUGIN_ID);


