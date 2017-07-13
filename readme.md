AC Markdownize / ACでMarkdownを使う
==================================

License: MIT

BBT大学とBBT大学院の AirCampus の投稿欄にマークダウンを綺麗に表示する機能と投稿を別窓で開く機能を付与します。これより、投稿の可読性と表現力を向上し、より有益なディスカッションが育まれることを期待しています。

追加される機能
--------------

1. 投稿で Markdwon 記法(MD)が使用している場合に綺麗にレンダリングされるようになります。MD 表示は On / Off で切り替えができます。レンダリングはあくまで利用者の環境内だけなので、他の利用者の表示には影響は与えません。
1. 投稿を別窓で開く機能が追加されます。

補足: MD に完全準拠はしていません。通常のテキスト文も極力 MD に近い解釈で綺麗に表示するようにがんばっているので、その狭間で揺れるような記法に落ち着いています。

シンプルな例:

![Example 1](https://github.com/boarnasia/ac-markdownize/raw/master/release/images/example1.png)

複雑な例:

![Example 2](https://github.com/boarnasia/ac-markdownize/raw/master/release/images/example2.png)

インストール方法
----------------

[Tempermonkey][tm] をインストールした後、↓の URL を開くとインストール画面が表示されるので、指示に従ってインストールして下さい。

- https://github.com/boarnasia/ac-markdownize/raw/master/release/index.user.js

![Install](https://github.com/boarnasia/ac-markdownize/raw/master/release/images/install.png)

動く環境
--------

[Tempermonkey][tm] が動く環境ならどこでも動くと思いますが、基本的には Chrome でしか確認していません。たまに Firefox も見てるぐらいです。

2017-07-13 時点で [Tempermonkey][tm] がサポートしている環境:

- Chrome
- Microsoft Edge
- Safari
- Firefox
- Opera Next
- Dolphin Browser
- UC Browser

改造の仕方
----------

clone して npm run gulp すると release/index.user.js が生成されるので、それをコピペして使用してください。

手順はこんな感じ:

```bash
$ cd ${working dir}
$ git clone git@github.com:boarnasia/ac-markdownize.git
$ cd ac-markdownize
$ npm install
$ npm run gulp
```

更新履歴
--------

* 2017-07-13 Ver 1.0.2
  * 最初のリリース

[tm]: http://tampermonkey.net/
