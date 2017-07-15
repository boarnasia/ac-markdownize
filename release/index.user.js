// ==UserScript==
// @name         AC Markdownize / ACでMarkdownを使う
// @version      1.0.3
// @description  BBT大学とBBT大学院の AirCampus の投稿欄にマークダウンを綺麗に表示する機能を付与しします。この機能を付与することにより、投稿の可読性と表現力を向上し、より有益なディスカッションが育まれることを期待しています。
// @author       Boarnasia
// @match        http*://aircamp.us/course/*
// @match        http*://bbtmba.aircamp.us/course/*
// @require      https://code.jquery.com/jquery-3.2.1.slim.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.6/marked.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js
// ==/UserScript==

$(function() {
  'use strict';

  const store = retrieveStore();

  /* markdown の変換オプション
     詳しくはこちら
     @see https://github.com/chjj/marked#options-1 */
  marked.setOptions({
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: false,
    smartypants: true,
    highlight: hl_cb
  });

  /* テーマ設定
   * テーマは他のデザインと干渉しないように特定の領域以下にだけ適用されるように作ってます。 */
  const theme = `@charset "UTF-8";
#forum_message_body > .message-content {
  /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
  */
  /* This css is slightly adjusted from original by boarnasia.  */
  /* HTML5 display-role reset for older browsers */ }
  #forum_message_body > .message-content html, #forum_message_body > .message-content body, #forum_message_body > .message-content div, #forum_message_body > .message-content span, #forum_message_body > .message-content applet, #forum_message_body > .message-content object, #forum_message_body > .message-content iframe,
  #forum_message_body > .message-content h1, #forum_message_body > .message-content h2, #forum_message_body > .message-content h3, #forum_message_body > .message-content h4, #forum_message_body > .message-content h5, #forum_message_body > .message-content h6, #forum_message_body > .message-content p, #forum_message_body > .message-content blockquote, #forum_message_body > .message-content pre,
  #forum_message_body > .message-content a, #forum_message_body > .message-content abbr, #forum_message_body > .message-content acronym, #forum_message_body > .message-content address, #forum_message_body > .message-content big, #forum_message_body > .message-content cite, #forum_message_body > .message-content code,
  #forum_message_body > .message-content del, #forum_message_body > .message-content dfn, #forum_message_body > .message-content em, #forum_message_body > .message-content img, #forum_message_body > .message-content ins, #forum_message_body > .message-content kbd, #forum_message_body > .message-content q, #forum_message_body > .message-content s, #forum_message_body > .message-content samp,
  #forum_message_body > .message-content small, #forum_message_body > .message-content strike, #forum_message_body > .message-content strong, #forum_message_body > .message-content sub, #forum_message_body > .message-content sup, #forum_message_body > .message-content tt, #forum_message_body > .message-content var,
  #forum_message_body > .message-content b, #forum_message_body > .message-content u, #forum_message_body > .message-content i, #forum_message_body > .message-content center,
  #forum_message_body > .message-content dl, #forum_message_body > .message-content dt, #forum_message_body > .message-content dd, #forum_message_body > .message-content ol, #forum_message_body > .message-content ul, #forum_message_body > .message-content li,
  #forum_message_body > .message-content fieldset, #forum_message_body > .message-content form, #forum_message_body > .message-content label, #forum_message_body > .message-content legend,
  #forum_message_body > .message-content table, #forum_message_body > .message-content caption, #forum_message_body > .message-content tbody, #forum_message_body > .message-content tfoot, #forum_message_body > .message-content thead, #forum_message_body > .message-content tr, #forum_message_body > .message-content th, #forum_message_body > .message-content td,
  #forum_message_body > .message-content article, #forum_message_body > .message-content aside, #forum_message_body > .message-content canvas, #forum_message_body > .message-content details, #forum_message_body > .message-content embed,
  #forum_message_body > .message-content figure, #forum_message_body > .message-content figcaption, #forum_message_body > .message-content footer, #forum_message_body > .message-content header, #forum_message_body > .message-content hgroup,
  #forum_message_body > .message-content menu, #forum_message_body > .message-content nav, #forum_message_body > .message-content output, #forum_message_body > .message-content ruby, #forum_message_body > .message-content section, #forum_message_body > .message-content summary,
  #forum_message_body > .message-content time, #forum_message_body > .message-content mark, #forum_message_body > .message-content audio, #forum_message_body > .message-content video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    float: none; }
  #forum_message_body > .message-content article, #forum_message_body > .message-content aside, #forum_message_body > .message-content details, #forum_message_body > .message-content figcaption, #forum_message_body > .message-content figure,
  #forum_message_body > .message-content footer, #forum_message_body > .message-content header, #forum_message_body > .message-content hgroup, #forum_message_body > .message-content menu, #forum_message_body > .message-content nav, #forum_message_body > .message-content section {
    display: block; }
  #forum_message_body > .message-content body {
    line-height: 1; }
  #forum_message_body > .message-content ol, #forum_message_body > .message-content ul {
    list-style: none; }
  #forum_message_body > .message-content blockquote, #forum_message_body > .message-content q {
    quotes: none; }
  #forum_message_body > .message-content blockquote:before, #forum_message_body > .message-content blockquote:after,
  #forum_message_body > .message-content q:before, #forum_message_body > .message-content q:after {
    content: '';
    content: none; }
  #forum_message_body > .message-content table {
    border-collapse: collapse;
    border-spacing: 0; }

#forum_message_body > div.message-content {
  font-family: Arial, Verdana, メイリオ, Meiryo, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", sans-serif;
  font-size: 13px;
  margin-bottom: 1em; }
  #forum_message_body > div.message-content pre, #forum_message_body > div.message-content code {
    font-family: monospace, monospace;
    _font-family: 'courier new', monospace;
    background-color: #e8f2f9;
    font-size: 0.98em;
    border-radius: 0.3em; }
  #forum_message_body > div.message-content pre {
    white-space: pre;
    white-space: pre-wrap;
    word-wrap: break-word;
    border-radius: 1em;
    padding: 1em;
    margin: 1em 0; }
  #forum_message_body > div.message-content h1, #forum_message_body > div.message-content h2, #forum_message_body > div.message-content h3, #forum_message_body > div.message-content h4, #forum_message_body > div.message-content h5, #forum_message_body > div.message-content h6 {
    font-weight: bold;
    color: #2a6d9e;
    line-height: 1.2em;
    margin-top: 0.5em;
    margin-bottom: 1em;
    padding-left: 0.5em; }
  #forum_message_body > div.message-content h1, #forum_message_body > div.message-content h2 {
    border-style: solid;
    border-color: #4792c8;
    border-width: 0 0 0.2em 0; }
  #forum_message_body > div.message-content h4, #forum_message_body > div.message-content h5, #forum_message_body > div.message-content h6 {
    font-weight: bold; }
  #forum_message_body > div.message-content h1 {
    font-size: 1.6em; }
  #forum_message_body > div.message-content h2 {
    font-size: 1.4em; }
  #forum_message_body > div.message-content h3 {
    font-size: 1.2m; }
  #forum_message_body > div.message-content h4 {
    font-size: 1em; }
  #forum_message_body > div.message-content h5 {
    font-size: 0.95em; }
  #forum_message_body > div.message-content h6 {
    font-size: 0.9em; }
  #forum_message_body > div.message-content a {
    color: #00c;
    text-decoration: none;
    transition: all 0.3s; }
  #forum_message_body > div.message-content a:visited {
    color: #00e; }
  #forum_message_body > div.message-content a:hover {
    color: #6666ff;
    text-decoration: underline; }
  #forum_message_body > div.message-content a:active {
    color: #faa700; }
  #forum_message_body > div.message-content a:focus {
    outline: thin solid;
    outline-offset: 0.1em;
    outline-color: #6666ff; }
  #forum_message_body > div.message-content a:hover, #forum_message_body > div.message-content a:active {
    outline: 0; }
  #forum_message_body > div.message-content p {
    margin: 1em 0; }
  #forum_message_body > div.message-content img {
    max-width: 100%; }
  #forum_message_body > div.message-content blockquote {
    color: #549e4d;
    margin: 0;
    padding: 0.5em;
    border-left: 0.3em #549e4d solid;
    background-color: #f1fff0; }
    #forum_message_body > div.message-content blockquote h1, #forum_message_body > div.message-content blockquote h2, #forum_message_body > div.message-content blockquote h3, #forum_message_body > div.message-content blockquote h4, #forum_message_body > div.message-content blockquote h5, #forum_message_body > div.message-content blockquote h6 {
      color: #549e4d;
      border-color: #549e4d; }
    #forum_message_body > div.message-content blockquote p {
      margin: 0; }
  #forum_message_body > div.message-content hr {
    display: block;
    height: 2px;
    border: 0;
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #eee;
    margin: 1em 0;
    padding: 0; }
  #forum_message_body > div.message-content em {
    font-style: italic; }
  #forum_message_body > div.message-content b, #forum_message_body > div.message-content strong {
    font-weight: bold; }
  #forum_message_body > div.message-content sub, #forum_message_body > div.message-content sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline; }
  #forum_message_body > div.message-content sup {
    top: -0.5em; }
  #forum_message_body > div.message-content sub {
    bottom: -0.25em; }
  #forum_message_body > div.message-content ul, #forum_message_body > div.message-content ol {
    margin: 1em 0;
    padding: 0 0 0 2em; }
  #forum_message_body > div.message-content li > ul, #forum_message_body > div.message-content li > ol {
    margin: 0; }
  #forum_message_body > div.message-content ul li {
    list-style-type: disc; }
  #forum_message_body > div.message-content ol li {
    list-style-type: decimal; }
  #forum_message_body > div.message-content li p:last-child {
    margin: 0; }
  #forum_message_body > div.message-content dd {
    margin: 0 0 0 2em; }
  #forum_message_body > div.message-content img {
    border: 0;
    -ms-interpolation-mode: bicubic;
    vertical-align: middle; }
  #forum_message_body > div.message-content table {
    padding: 0.5em;
    min-width: 200px;
    border-collapse: collapse;
    border-spacing: 0; }
  #forum_message_body > div.message-content td, #forum_message_body > div.message-content th {
    border: 1px solid #e8f2f9;
    min-height: 1.2em;
    vertical-align: center;
    padding: 0.5em 1em;
    transition: all 0.3s; }
  #forum_message_body > div.message-content th {
    background: #83b8de;
    font-weight: bold;
    color: #fff; }
  #forum_message_body > div.message-content td {
    background: #fff; }
  #forum_message_body > div.message-content tr:nth-child(odd) td {
    background: #fff; }
  #forum_message_body > div.message-content tr:nth-child(even) td {
    background: #e8f2f9; }
  #forum_message_body > div.message-content tr:hover td {
    background: #abcfe9; }

.markdownize-ctrl {
  float: right;
  margin-left: 1em; }

.markdownize-toggle {
  cursor: pointer;
  padding: 0 0.5em;
  border-radius: 0.2em;
  transition: all 0.3s; }
  .markdownize-toggle.markdownize-toggle-on {
    background-color: #dbdbdb;
    color: #000; }
    .markdownize-toggle.markdownize-toggle-on.markdownize-toggle-hover {
      background-color: #e5e5e5;
      color: #737373; }
  .markdownize-toggle.markdownize-toggle-off {
    background-color: #eaeaea;
    color: #999999; }
    .markdownize-toggle.markdownize-toggle-off.markdownize-toggle-hover {
      background-color: #e5e5e5;
      color: #737373; }

#forum_message_body > .message-content {
  /*

  Original highlight.js style (c) Ivan Sagalaev <maniac@softwaremaniacs.org>

  */
  /* This css is slightly adjusted from original by boarnasia..  */
  /* User color: hue: 0 */
  /* Language color: hue: 90; */
  /* Meta color: hue: 200 */
  /* Misc effects */ }
  #forum_message_body > .message-content .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em; }
  #forum_message_body > .message-content .hljs,
  #forum_message_body > .message-content .hljs-subst {
    color: #444; }
  #forum_message_body > .message-content .hljs-comment {
    color: #888888; }
  #forum_message_body > .message-content .hljs-keyword,
  #forum_message_body > .message-content .hljs-attribute,
  #forum_message_body > .message-content .hljs-selector-tag,
  #forum_message_body > .message-content .hljs-meta-keyword,
  #forum_message_body > .message-content .hljs-doctag,
  #forum_message_body > .message-content .hljs-name {
    font-weight: bold; }
  #forum_message_body > .message-content .hljs-type,
  #forum_message_body > .message-content .hljs-string,
  #forum_message_body > .message-content .hljs-number,
  #forum_message_body > .message-content .hljs-selector-id,
  #forum_message_body > .message-content .hljs-selector-class,
  #forum_message_body > .message-content .hljs-quote,
  #forum_message_body > .message-content .hljs-template-tag,
  #forum_message_body > .message-content .hljs-deletion {
    color: #880000; }
  #forum_message_body > .message-content .hljs-title,
  #forum_message_body > .message-content .hljs-section {
    color: #880000;
    font-weight: bold; }
  #forum_message_body > .message-content .hljs-regexp,
  #forum_message_body > .message-content .hljs-symbol,
  #forum_message_body > .message-content .hljs-variable,
  #forum_message_body > .message-content .hljs-template-variable,
  #forum_message_body > .message-content .hljs-link,
  #forum_message_body > .message-content .hljs-selector-attr,
  #forum_message_body > .message-content .hljs-selector-pseudo {
    color: #BC6060; }
  #forum_message_body > .message-content .hljs-literal {
    color: #78A960; }
  #forum_message_body > .message-content .hljs-built_in,
  #forum_message_body > .message-content .hljs-bullet,
  #forum_message_body > .message-content .hljs-code,
  #forum_message_body > .message-content .hljs-addition {
    color: #397300; }
  #forum_message_body > .message-content .hljs-meta {
    color: #1f7199; }
  #forum_message_body > .message-content .hljs-meta-string {
    color: #4d99bf; }
  #forum_message_body > .message-content .hljs-emphasis {
    font-style: italic; }
  #forum_message_body > .message-content .hljs-strong {
    font-weight: bold; }
`;
  const css_html = `<style>${theme}</style>`;

  /* slct_original が元々のHTML、Markdown 化した HTML は slct_marked 。 */
  const slct_original = "#forum_message_body > pre.message-content";
  const slct_marked = "#forum_message_body > div.message-content";

  /* コメント領域の表示切り替えを把握するためのポーリング処理 */
  let timer = 0;        // timer id
  let old_txt = "";     // 変更検知用
  const interval = 300; // インターバル設定（ミリ秒）
  timer = setInterval(function() {
    const ele = $(slct_original);
    if (ele.length === 0) { return; }

    const new_txt = $("#forum_message_body > .forum_author").html() + ele.text();

    if (old_txt != new_txt) {
      if ($(slct_marked).length) { return; } // fixme: 多重で呼ばれる時（謎）があるので予防
      markdownize();
      insertPopupButton();
      insertMarkdownButton();

      old_txt = new_txt;
    }

  }, interval);

  /*
   * マークダウン化処理
   */
  function markdownize() {
    const ele = $(slct_original);
    const filterd_html = preFilter(ele.text());
    let marked_html = marked(filterd_html);
    marked_html = $(`<div class="message-content">${css_html}${marked_html}</div>`);

    ele.after(marked_html);

    postFilter();

    if (store.markdown) {
      ele.hide();
    } else {
      marked_html.hide();
    }
  }

  /*
   * ポップアップボタンの追加
   */
  function insertPopupButton() {
    let ele = $('#discussion-action-button-bar .copy_message_body');
    let btn = $('<p class="markdownize-ctrl"><a  href="#">別窓で開く</a></p>');

    $("a", btn).on("click", function(e) {
      e.preventDefault();

      const win = window.open("", new Date().getTime(),
        `width=${store.popup.size.width},height=${store.popup.size.height}`);
      const content = $("#forum_message_body_wrap").html();
      const title = $("#forum_message_body .forum_author h3").text().trim();
      const author = $("#forum_message_body .forum_author h4").text().trim();
      win.document.write(`
<!DOCTYPE HTML>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/statics/dist/css/webac.css" />
    <title>${author} | ${title}</title>
  </head>
  <body style="margin: 0.5em;">${content}</body>
</html>
      `);
      win.history.pushState(null, null, location.href);
      win.addEventListener('beforeunload', function(e) {
        store.popup.size.width = win.outerWidth;
        store.popup.size.height = win.outerHeight;
        archiveStore(store);
      });
    });
    ele.after(btn);
  }

  /* Markdown と元の表示とを切り替えるボタン。
     Markdown化後が読みづらい時はこれで切り替えましょう。 */
  function insertMarkdownButton() {
    const ele = $('#discussion-action-button-bar .copy_message_body');
    const btn = $('<p class="markdownize-ctrl markdownize-toggle">MD</p>');

    const pf = 'markdownize-toggle';

    btn.on("click", (e) => {
      if (btn.hasClass(`${pf}-on`)) {
        // マークダウンを表示している時は元に戻す
        $(slct_original).show();
        $(slct_marked).hide();

        btn.removeClass(`${pf}-on`);
        btn.addClass(`${pf}-off`);

        store.markdown = false;
        archiveStore(store);
      } else {
        // 元テキストを表示している時はマークダウンにする
        $(slct_original).hide();
        $(slct_marked).show();

        btn.removeClass(`${pf}-off`);
        btn.addClass(`${pf}-on`);

        store.markdown = true;
        archiveStore(store);
      }
    }).on('mouseover', (e) => {
        btn.addClass(`${pf}-hover`);
    }).on('mouseout', (e) => {
        btn.removeClass(`${pf}-hover`);
    });

    btn.addClass(store.markdown ? `${pf}-on` : `${pf}-off`);

    ele.after(btn);
  }

  /*
   * マークダウン処理を掛ける前のフィルター処理
   *
   *  1. 引用（>）の次の行がnewlineじゃない時はnewlineを挟む
   *  2. 引用（>）の継続がparagraphに誤認されるケースを回避
   */
  const lexer = new marked.Lexer();
  function preFilter(source) {
    const lines = source.split("\n");

    let previous_context = "(undefined)";
    let current_context = "(undefined)";
    let filtered_text = "";

    for (const idx in lines) {
      let line = lines[idx].replace(/\s+$/, "") + "\n";
      current_context = "(undefined)";

      for (const idx in lexer.rules) {
        const rule = lexer.rules[idx];

        if (line.match(rule)) {
          current_context = idx;
          break;
        }
      }


      // フィルター処理

      // 1. 引用（>）の次の行がnewlineじゃない時はnewlineを挟む
      if (previous_context == "blockquote" && current_context != "newline") {
        filtered_text += "\n";
      }

      // 2. 引用（>）の継続がparagraphに誤認されるケースを回避
      if (line.match(/^(\s*>)+\n$/)) {
        line = line.replace(/\n$/, "&nbsp;\n");
      }

      filtered_text += line;

      previous_context = current_context;
    }

    return filtered_text;
  }

  /*
   * マークダウン処理を掛けた後のフィルター処理
   *
   *  1. リンクを別窓で開くようする
   */
  function postFilter() {

    //  1. リンクを別窓で開くようする
    {
      const eles = $("a", slct_marked);
      for (let idx=0; idx<eles.length; idx++) {
        const ele = eles[idx];

        if ($(ele).attr("href") !== undefined) {
          let target = "_blank";
          if (ele.hostname.match(/(aircamp\.us|bbt757.com)$/)) {
            // 特定のURLが含まれるケースでは同じページで開くようにする
            target = "_self";
          }
          $(ele).attr("target", target);
        }
      }
    }
  }

  // コードハイライトのコールバック関数
  function hl_cb(code, lang, callback) {
    const html = `<h6>In ${lang}</h6>` + hljs.highlight(lang, code, true).value;
    return html;
  }

  /*
   * データストアの取得して返す
   */
  function retrieveStore() {
    const def = {
      version: "0.4.5",
      markdown: true,
      popup: {
        size: { width: 800, height: 600 }
      }
    };

    // ストアデータの互換性が無くなる時はここに変換処理を差し込む

    const store_string = localStorage.getItem("markdownize");
    const store = store_string !== null ? JSON.parse(store_string) : def;

    return store;
  }

  /*
   * データストアを保存する
   */
  function archiveStore(store) {
    localStorage.setItem("markdownize", JSON.stringify(store));
  }
});

