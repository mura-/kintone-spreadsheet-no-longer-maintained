import assert from "power-assert";
import utils from "../src/js/utils";

describe("ユーティリティのテスト", () => {
  
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


