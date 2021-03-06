AC Markdownize / ACでMarkdownを使う
==================================

License: MIT

BBT大学とBBT大学院の AirCampus の投稿欄にマークダウンを綺麗に表示する機能と投稿を別窓で開く機能を付与します。これより、投稿の可読性と表現力を向上し、より有益なディスカッションが育まれることを期待しています。

追加される機能
--------------

1. 投稿で Markdwon 記法(MD)が使用している場合に綺麗にレンダリングされるようになります。MD 表示は On / Off で切り替えができます。レンダリングはあくまで利用者の環境内だけなので、他の利用者の表示には影響は与えません。
1. 投稿を別窓で開く機能が追加されます。

補足: MD に完全準拠はしていませんが GFM([Github Flavored Markdown](https://guides.github.com/features/mastering-markdown/<Paste>)) に近い記法になっています。通常のテキスト文も極力 MD に近い解釈で綺麗に表示するようにがんばっているので、その狭間で揺れるような記法に落ち着いています。

シンプルな例:

![Example 1](https://github.com/boarnasia/ac-markdownize/raw/master/release/images/example1.png)

複雑な例:

![Example 2](https://github.com/boarnasia/ac-markdownize/raw/master/release/images/example2.png)

拡張 Markdown 記法
------------------

### blockquote 周りの違い

こういった blockquote があった場合
```
>
> > test
> test
>
test
```

こういう markdown であるかのように振る舞うようにしています
```
> > test
>
> test

test
```

何故かと言うとこんな感じ。
```
> ← blockquote の最初の空行は blockquote として解釈されないので見苦しい
> > test
> ← blockquote のレベルが変わった際に空行がないと
>   継続行が前のレベルに吸収されるため分かりづらい
> test
> ← 同じくblockquoteが終わっても空行がないと
    継続行が前のレベルに吸収されるため分かりづらい
test
```

### footnote 記法の追加

こんな記法が出来るようにしてます

![example footnote](https://github.com/boarnasia/ac-markdownize/raw/master/release/images/example-footnote.png)


記法は [PHP Markdown Extra](https://michelf.ca/projects/php-markdown/extra/#footnotes) と同じような感じになるようにしています。

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
$ npm run gulp -- test
$ npm run gulp
```

[tm]: http://tampermonkey.net/
