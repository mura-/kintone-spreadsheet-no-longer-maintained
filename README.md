kintone スプレッドシート
==========================

## Description

kintoneの一覧画面をExcelのようなスプレッドシートの見た目で閲覧、編集ができます。
現在ベータ版です。

![イメージ](https://raw.githubusercontent.com/mura-/kintone-spreadsheet/master/image.gif)

[DEMO](https://dev-demo.cybozu.com/k/39/)   
デモ環境についての説明は [こちら](https://cybozudev.zendesk.com/hc/ja/articles/208217653)  
（DEMOはスプレッドシートの挙動確認のみ。設定はできません）  

## Features

- kintoneアプリの任意のフィールドを設定できる
- 設定されたフィールドはスプレッドシート上に表示され、レコードの編集、追加、削除ができる
- ドロップダウンフィールド、ラジオボタンフィールドに対応
![イメージ](https://raw.githubusercontent.com/mura-/kintone-spreadsheet/master/dropdown.gif)
- ユーザーフィールドとチェックボックスに対応（表示のみ）
- kintoneの検索機能とページネーション、並び替えに対応

### Cautionary note
- 同期処理のため10秒に1回リフレッシュされます。
  APIの使用制限にかかる恐れもあるので長時間の開きっぱなしはオススメしません。

## Usage
1. プラグインを[Downloadする](https://github.com/mura-/kintone-spreadsheet/releases/)
1. プラグインを[インポートする](https://help.cybozu.com/ja/k/admin/plugin.html)
1. プラグインの設定をする

## Installation
プラグイン自体の拡張や変更などをしたい場合は、以下の手順で行ってください。

1. [Node.js](https://nodejs.org/en/)をインストールする
1. 依存ライブラリのインストール  
  `npm install`
1. 設定ファイルの変更
  1. `cp gulp/config.js.sample gulp/config.js`
  1. `gulp/config.js` 内の `plugin.compiler` の値と `plugin.key` の値を編集する。  
1. ビルド  
  `npm run build`

※プラグインの作成手順については[こちら](https://cybozudev.zendesk.com/hc/ja/articles/203455680-kintone-%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E9%96%8B%E7%99%BA%E6%89%8B%E9%A0%86)

### 開発モード
ファイルを変更する度に逐一ビルドします。  
`npm run dev`

### テスト実行
今のところはユーティリティ関数のみテストしています。  
`npm test`

## Author

[@mura-](https://www.facebook.com/kazuki.murahama)

## Other
- 不具合についてはISSUEで連絡いただくか、PRいただけると幸いです。

## License

MIT
