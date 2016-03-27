import assert from "power-assert";
import utils from "../src/js/utils";

describe("ユーティリティのテスト", () => {
  var config = {
    column1: "col1",
    column2: "col2",
    column3: "col3",
    column4: "col4",
    column5: "col5",
    column6: "col6",
    column7: "col7",
    column8: "col8",
    column9: "col9",
    column10: "col10",
    column11: "col11",
    elementId: "sheet"
  };
  describe("getColumnsFromConfig", () => {

    it("configからcolumnsが取得でき, 余計なカラムがない", () => {
      var columns = utils.getColumnsFromConfig(config);
      assert(columns.toString() ===  ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'col8', 'col9', 'col10', 'col11'].toString());
    });

    it("configが空の場合は空の配列が返却される", () => {
      var columns = utils.getColumnsFromConfig({});
      assert(columns.toString() ===  [].toString());
    });

    it("configがcolumnから始まらないものは無視する", () => {
      var columns = utils.getColumnsFromConfig({hoge: 123});
      assert(columns.toString() ===  [].toString());
    });
  });

  describe("getColumnData", () => {
    it("columns配列から、handsontableで利用するためのオブジェクト配列に変換できる", () => {
      var columns = ['col1', 'col2', 'col3', 'col4', 'col5'];
      var columnsData = utils.getColumnData(columns);
      assert(JSON.stringify(columnsData) === JSON.stringify([
        {data: 'col1.value'},
        {data: 'col2.value'},
        {data: 'col3.value'},
        {data: 'col4.value'},
        {data: 'col5.value'},
      ]));
    })
  });

  describe("setParams", () => {
    var record = {
      "レコード番号": {
        "type":"RECORD_NUMBER",
        "value":"36"
      },
      "更新者": { 
        "type":"MODIFIER",
        "value": {
          "code":"Administrator",
          "name":"Administrator"
        }
      },
      "作成者": {
        "type":"CREATOR",
        "value": {
          "code":"Administrator",
          "name":"Administrator"
        }
      },
      "更新日時": {
        "type":"UPDATED_TIME",
        "value":"2016-03-17T02:28:00Z"
      },
      "作成日時": {
        "type":"CREATED_TIME",
        "value":"2016-03-17T02:28:00Z"
      },
      "ステータス": {
        "type":"STATUS",
        "value":"未処理"
      },
      "作業者": {
        "type":"STATUS_ASSIGNEE",
        "value":[]
      },
      "会社名": {
        "type":"SINGLE_LINE_TEXT",
        "value":"二宮商事"
      },
      "部署名": {
        "type":"SINGLE_LINE_TEXT",
        "value":""
      },
      "先方担当者名": {
        "type":"SINGLE_LINE_TEXT",
        "value":""
      },
      "TEL": {
        "type":"SINGLE_LINE_TEXT",
        "value":""
      },
      "FAX": {
        "type":"SINGLE_LINE_TEXT",
        "value":""
      },
      "メールアドレス": {
        "type":"SINGLE_LINE_TEXT",
        "value":""
      },
      "見込み時期": {
        "type":"DATE",
        "value":null
      },
      "確度": {
        "type":"RADIO_BUTTON",
        "value":"A"},
      "製品名": {
        "type":"DROP_DOWN",
        "value":""},
      "単価": {
        "type":"NUMBER",
        "value":""
      },
      "ユーザー数": {
        "type":"NUMBER",
        "value":""
      },
      "小計": {
        "type":"CALC",
        "value":""
      },
      "$revision": {
        "type":"__REVISION__",
        "value":"1"
      },
      "$id": {
        "type":"__ID__",
        "value":"36"
      }
    };
    it("kintoneのレコードオブジェクトから不要なデータを取り除く", () => {
      var params = utils.setParams(record);
      assert(
        true 
        && "レコード番号" in params === false
        && "作成日時" in params === false
        && "更新日時" in params === false
        && "作成者" in params === false
        && "更新者" in params === false
        && "ステータス" in params === false
        && "作業者" in params === false
      );
    });
    it("kintoneのレコードオブジェクトから不要なデータ以外は存在する", () => {
      var params = utils.setParams(record);
      assert(
        true 
        && "会社名" in params
        && "部署名" in params
        && "先方担当者名" in params
        && "TEL" in params
        && "FAX" in params
        && "メールアドレス" in params
        && "見込み時期" in params
        && "確度" in params
        && "製品名" in params
        && "単価" in params
        && "ユーザー数" in params
        && "小計" in params
      );
    });
  });

});


