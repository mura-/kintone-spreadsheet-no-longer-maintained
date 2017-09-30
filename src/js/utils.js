const EXCEPT_FIELD_TYPES = ['RECORD_NUMBER', 'CREATED_TIME', 'UPDATED_TIME', 'CREATOR', 'MODIFIER', 'STATUS', 'STATUS_ASSIGNEE'];
var utils = {

  // kintoneのレコード更新・追加時は、$idなどアップデートできないフィールドがあるので、除外するためのメソッド
  setParams: (record) => {
    var result = {};
    for (let prop in record) {
      if (EXCEPT_FIELD_TYPES.indexOf(record[prop].type) === -1) {
        result[prop] = record[prop];
      }
    }
    return result;
  },

  // 現在の検索条件を出す
  getQuery: (condition, event) => {
    return `${condition} limit ${event.size} offset ${event.offset}`
  },

  // kintoneのレコード取得用メソッド
  getRecords: (query = '', callback, errorCallback) => {
    kintone.api('/k/v1/records', 'GET', {app: kintone.app.getId(), query},
      function(resp) {
        callback(resp);
      },
      function(resp) {
        errorCallback(resp);
      }
    );
  },

  // kintoneのレコード更新、追加用メソッド 
  saveRecords: (records, changedDatas, callback, errorCallback) => {
    var requests = [];
    var updateRecords = [];
    var insertRecords = [];
    var changedRows = [];
    var i;

    // 変更されたセルの配列から、変更があった行だけ抜き出す
    for(i = 0; i < changedDatas.length; i++) {
      changedRows.push(changedDatas[i][0]);
    }
    // 変更があった行番号の重複を排除
    changedRows = changedRows.filter(function (x, i, self) {
      return self.indexOf(x) === i;
    });

    // 変更があった行から、レコード追加か変更かを判断し、クエリをつくる
    for(i = 0; i < changedRows.length; i++) {
      if (records[changedRows[i]]["$id"].value === null) {
        insertRecords.push(
          utils.setParams(records[changedRows[i]])
        );
      } else {
        updateRecords.push({
          id: records[changedRows[i]]["$id"].value,
          record: utils.setParams(records[changedRows[i]])
        });
      }
    }

    // 更新用bulkRequest
    requests.push({
      method: "PUT",
      api: "/k/v1/records.json",
      payload: {
        app: kintone.app.getId(),
        records: updateRecords
      }
    });

    // 追加用bulkRequest
    requests.push({
      method: "POST",
      api: "/k/v1/records.json",
      payload: {
        app: kintone.app.getId(),
        records: insertRecords
      }
    });

    // bulkrequestで一括で追加、更新。
    // 失敗した場合はロールバックされる。
    kintone.api('/k/v1/bulkRequest', 'POST', {requests: requests},
      (resp) => {
        console.dir(requests);
        console.dir(resp);
        callback(resp);
      },
      (resp) => {
        if (typeof resp === "object") errorCallback(resp); // 何故か２回レスポンス（２回めはString）が返ってくるため型判定
      }
    );
  },

  // kintoneのレコード削除用メソッド
  deleteRecords: (records, index, amount, callback, errorCallback) => {
    var i;
    var ids = [];
    for(i = index; i < index+amount; i++) {
      ids.push(records[i]["$id"].value);
    }
    kintone.api('/k/v1/records', 'DELETE', {app: kintone.app.getId(), ids: ids},
      (resp) => {
        callback(resp);
      },
      (resp) => {
        errorCallback(resp);
      }
    );
  },

  getColHeaders: (columns) => {
    var result = [];
    columns.forEach((column) => {
      result.push(column.code);
    });
    return result;
  },

  getColumnData: (columns) => {
    return columns.map((column) => {
      var columnData = {data: `${column.code}.value`};

      // if type is DROP_DOWN, add type and source property
      if (column.type === "DROP_DOWN" || column.type === "RADIO_BUTTON") {
        columnData.type = "dropdown";
        columnData.source = Object.keys(column.options);
      }
      return columnData;
    });
  }
};

export default utils;
