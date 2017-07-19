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

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var markdownize = require('./markdownize');

// const store = retrieveStore();
//
// /* markdown の変換オプション
//    詳しくはこちら
//    @see https://github.com/chjj/marked#options-1 */
// marked.setOptions({
//   gfm: true,
//   tables: true,
//   breaks: true,
//   pedantic: false,
//   sanitize: true,
//   smartLists: false,
//   smartypants: true,
//   highlight: hl_cb
// });

/* テーマ設定
 * テーマは他のデザインと干渉しないように特定の領域以下にだけ適用されるように作ってます。 */
var theme = "@charset \"UTF-8\";\n#forum_message_body > .message-content {\n  /* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n  */\n  /* This css is slightly adjusted from original by boarnasia.  */\n  /* HTML5 display-role reset for older browsers */ }\n  #forum_message_body > .message-content html, #forum_message_body > .message-content body, #forum_message_body > .message-content div, #forum_message_body > .message-content span, #forum_message_body > .message-content applet, #forum_message_body > .message-content object, #forum_message_body > .message-content iframe,\n  #forum_message_body > .message-content h1, #forum_message_body > .message-content h2, #forum_message_body > .message-content h3, #forum_message_body > .message-content h4, #forum_message_body > .message-content h5, #forum_message_body > .message-content h6, #forum_message_body > .message-content p, #forum_message_body > .message-content blockquote, #forum_message_body > .message-content pre,\n  #forum_message_body > .message-content a, #forum_message_body > .message-content abbr, #forum_message_body > .message-content acronym, #forum_message_body > .message-content address, #forum_message_body > .message-content big, #forum_message_body > .message-content cite, #forum_message_body > .message-content code,\n  #forum_message_body > .message-content del, #forum_message_body > .message-content dfn, #forum_message_body > .message-content em, #forum_message_body > .message-content img, #forum_message_body > .message-content ins, #forum_message_body > .message-content kbd, #forum_message_body > .message-content q, #forum_message_body > .message-content s, #forum_message_body > .message-content samp,\n  #forum_message_body > .message-content small, #forum_message_body > .message-content strike, #forum_message_body > .message-content strong, #forum_message_body > .message-content sub, #forum_message_body > .message-content sup, #forum_message_body > .message-content tt, #forum_message_body > .message-content var,\n  #forum_message_body > .message-content b, #forum_message_body > .message-content u, #forum_message_body > .message-content i, #forum_message_body > .message-content center,\n  #forum_message_body > .message-content dl, #forum_message_body > .message-content dt, #forum_message_body > .message-content dd, #forum_message_body > .message-content ol, #forum_message_body > .message-content ul, #forum_message_body > .message-content li,\n  #forum_message_body > .message-content fieldset, #forum_message_body > .message-content form, #forum_message_body > .message-content label, #forum_message_body > .message-content legend,\n  #forum_message_body > .message-content table, #forum_message_body > .message-content caption, #forum_message_body > .message-content tbody, #forum_message_body > .message-content tfoot, #forum_message_body > .message-content thead, #forum_message_body > .message-content tr, #forum_message_body > .message-content th, #forum_message_body > .message-content td,\n  #forum_message_body > .message-content article, #forum_message_body > .message-content aside, #forum_message_body > .message-content canvas, #forum_message_body > .message-content details, #forum_message_body > .message-content embed,\n  #forum_message_body > .message-content figure, #forum_message_body > .message-content figcaption, #forum_message_body > .message-content footer, #forum_message_body > .message-content header, #forum_message_body > .message-content hgroup,\n  #forum_message_body > .message-content menu, #forum_message_body > .message-content nav, #forum_message_body > .message-content output, #forum_message_body > .message-content ruby, #forum_message_body > .message-content section, #forum_message_body > .message-content summary,\n  #forum_message_body > .message-content time, #forum_message_body > .message-content mark, #forum_message_body > .message-content audio, #forum_message_body > .message-content video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n    float: none; }\n  #forum_message_body > .message-content article, #forum_message_body > .message-content aside, #forum_message_body > .message-content details, #forum_message_body > .message-content figcaption, #forum_message_body > .message-content figure,\n  #forum_message_body > .message-content footer, #forum_message_body > .message-content header, #forum_message_body > .message-content hgroup, #forum_message_body > .message-content menu, #forum_message_body > .message-content nav, #forum_message_body > .message-content section {\n    display: block; }\n  #forum_message_body > .message-content body {\n    line-height: 1; }\n  #forum_message_body > .message-content ol, #forum_message_body > .message-content ul {\n    list-style: none; }\n  #forum_message_body > .message-content blockquote, #forum_message_body > .message-content q {\n    quotes: none; }\n  #forum_message_body > .message-content blockquote:before, #forum_message_body > .message-content blockquote:after,\n  #forum_message_body > .message-content q:before, #forum_message_body > .message-content q:after {\n    content: '';\n    content: none; }\n  #forum_message_body > .message-content table {\n    border-collapse: collapse;\n    border-spacing: 0; }\n\n#forum_message_body > div.message-content {\n  font-family: Arial, Verdana, \u30E1\u30A4\u30EA\u30AA, Meiryo, \"\u30D2\u30E9\u30AE\u30CE\u89D2\u30B4 Pro W3\", \"Hiragino Kaku Gothic Pro\", sans-serif;\n  font-size: 13px;\n  margin-bottom: 1em; }\n  #forum_message_body > div.message-content pre, #forum_message_body > div.message-content code {\n    font-family: monospace, monospace;\n    _font-family: 'courier new', monospace;\n    background-color: #e8f2f9;\n    font-size: 0.98em;\n    border-radius: 0.3em; }\n  #forum_message_body > div.message-content pre {\n    white-space: pre;\n    white-space: pre-wrap;\n    word-wrap: break-word;\n    border-radius: 1em;\n    padding: 1em;\n    margin: 1em 0; }\n  #forum_message_body > div.message-content h1, #forum_message_body > div.message-content h2, #forum_message_body > div.message-content h3, #forum_message_body > div.message-content h4, #forum_message_body > div.message-content h5, #forum_message_body > div.message-content h6 {\n    font-weight: bold;\n    color: #2a6d9e;\n    line-height: 1.2em;\n    margin-top: 0.5em;\n    margin-bottom: 1em;\n    padding-left: 0.5em; }\n  #forum_message_body > div.message-content h1, #forum_message_body > div.message-content h2 {\n    border-style: solid;\n    border-color: #4792c8;\n    border-width: 0 0 0.2em 0; }\n  #forum_message_body > div.message-content h4, #forum_message_body > div.message-content h5, #forum_message_body > div.message-content h6 {\n    font-weight: bold; }\n  #forum_message_body > div.message-content h1 {\n    font-size: 1.6em; }\n  #forum_message_body > div.message-content h2 {\n    font-size: 1.4em; }\n  #forum_message_body > div.message-content h3 {\n    font-size: 1.2m; }\n  #forum_message_body > div.message-content h4 {\n    font-size: 1em; }\n  #forum_message_body > div.message-content h5 {\n    font-size: 0.95em; }\n  #forum_message_body > div.message-content h6 {\n    font-size: 0.9em; }\n  #forum_message_body > div.message-content a {\n    color: #00c;\n    text-decoration: none;\n    transition: all 0.3s; }\n  #forum_message_body > div.message-content a:visited {\n    color: #00e; }\n  #forum_message_body > div.message-content a:hover {\n    color: #6666ff;\n    text-decoration: underline; }\n  #forum_message_body > div.message-content a:active {\n    color: #faa700; }\n  #forum_message_body > div.message-content a:focus {\n    outline: thin solid;\n    outline-offset: 0.1em;\n    outline-color: #6666ff; }\n  #forum_message_body > div.message-content a:hover, #forum_message_body > div.message-content a:active {\n    outline: 0; }\n  #forum_message_body > div.message-content p {\n    margin: 1em 0; }\n  #forum_message_body > div.message-content img {\n    max-width: 100%; }\n  #forum_message_body > div.message-content blockquote {\n    color: #549e4d;\n    margin: 0;\n    padding: 0.5em;\n    border-left: 0.3em #549e4d solid;\n    background-color: #f1fff0; }\n    #forum_message_body > div.message-content blockquote h1, #forum_message_body > div.message-content blockquote h2, #forum_message_body > div.message-content blockquote h3, #forum_message_body > div.message-content blockquote h4, #forum_message_body > div.message-content blockquote h5, #forum_message_body > div.message-content blockquote h6 {\n      color: #549e4d;\n      border-color: #549e4d; }\n    #forum_message_body > div.message-content blockquote p {\n      margin: 0; }\n  #forum_message_body > div.message-content hr {\n    display: block;\n    height: 2px;\n    border: 0;\n    border-top: 1px solid #aaa;\n    border-bottom: 1px solid #eee;\n    margin: 1em 0;\n    padding: 0; }\n  #forum_message_body > div.message-content em {\n    font-style: italic; }\n  #forum_message_body > div.message-content b, #forum_message_body > div.message-content strong {\n    font-weight: bold; }\n  #forum_message_body > div.message-content sub, #forum_message_body > div.message-content sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline; }\n  #forum_message_body > div.message-content sup {\n    top: -0.5em; }\n  #forum_message_body > div.message-content sub {\n    bottom: -0.25em; }\n  #forum_message_body > div.message-content ul, #forum_message_body > div.message-content ol {\n    margin: 1em 0;\n    padding: 0 0 0 2em; }\n  #forum_message_body > div.message-content li > ul, #forum_message_body > div.message-content li > ol {\n    margin: 0; }\n  #forum_message_body > div.message-content ul li {\n    list-style-type: disc; }\n  #forum_message_body > div.message-content ol li {\n    list-style-type: decimal; }\n  #forum_message_body > div.message-content li p:last-child {\n    margin: 0; }\n  #forum_message_body > div.message-content dd {\n    margin: 0 0 0 2em; }\n  #forum_message_body > div.message-content img {\n    border: 0;\n    -ms-interpolation-mode: bicubic;\n    vertical-align: middle; }\n  #forum_message_body > div.message-content table {\n    padding: 0.5em;\n    min-width: 200px;\n    border-collapse: collapse;\n    border-spacing: 0; }\n  #forum_message_body > div.message-content td, #forum_message_body > div.message-content th {\n    border: 1px solid #e8f2f9;\n    min-height: 1.2em;\n    vertical-align: center;\n    padding: 0.5em 1em;\n    transition: all 0.3s; }\n  #forum_message_body > div.message-content th {\n    background: #83b8de;\n    font-weight: bold;\n    color: #fff; }\n  #forum_message_body > div.message-content td {\n    background: #fff; }\n  #forum_message_body > div.message-content tr:nth-child(odd) td {\n    background: #fff; }\n  #forum_message_body > div.message-content tr:nth-child(even) td {\n    background: #e8f2f9; }\n  #forum_message_body > div.message-content tr:hover td {\n    background: #abcfe9; }\n\n.markdownize-ctrl {\n  float: right;\n  margin-left: 1em; }\n\n.markdownize-toggle {\n  cursor: pointer;\n  padding: 0 0.5em;\n  border-radius: 0.2em;\n  transition: all 0.3s; }\n  .markdownize-toggle.markdownize-toggle-on {\n    background-color: #dbdbdb;\n    color: #000; }\n    .markdownize-toggle.markdownize-toggle-on.markdownize-toggle-hover {\n      background-color: #e5e5e5;\n      color: #737373; }\n  .markdownize-toggle.markdownize-toggle-off {\n    background-color: #eaeaea;\n    color: #999999; }\n    .markdownize-toggle.markdownize-toggle-off.markdownize-toggle-hover {\n      background-color: #e5e5e5;\n      color: #737373; }\n\n#forum_message_body > .message-content {\n  /*\n\n  Original highlight.js style (c) Ivan Sagalaev <maniac@softwaremaniacs.org>\n\n  */\n  /* This css is slightly adjusted from original by boarnasia..  */\n  /* User color: hue: 0 */\n  /* Language color: hue: 90; */\n  /* Meta color: hue: 200 */\n  /* Misc effects */ }\n  #forum_message_body > .message-content .hljs {\n    display: block;\n    overflow-x: auto;\n    padding: 0.5em; }\n  #forum_message_body > .message-content .hljs,\n  #forum_message_body > .message-content .hljs-subst {\n    color: #444; }\n  #forum_message_body > .message-content .hljs-comment {\n    color: #888888; }\n  #forum_message_body > .message-content .hljs-keyword,\n  #forum_message_body > .message-content .hljs-attribute,\n  #forum_message_body > .message-content .hljs-selector-tag,\n  #forum_message_body > .message-content .hljs-meta-keyword,\n  #forum_message_body > .message-content .hljs-doctag,\n  #forum_message_body > .message-content .hljs-name {\n    font-weight: bold; }\n  #forum_message_body > .message-content .hljs-type,\n  #forum_message_body > .message-content .hljs-string,\n  #forum_message_body > .message-content .hljs-number,\n  #forum_message_body > .message-content .hljs-selector-id,\n  #forum_message_body > .message-content .hljs-selector-class,\n  #forum_message_body > .message-content .hljs-quote,\n  #forum_message_body > .message-content .hljs-template-tag,\n  #forum_message_body > .message-content .hljs-deletion {\n    color: #880000; }\n  #forum_message_body > .message-content .hljs-title,\n  #forum_message_body > .message-content .hljs-section {\n    color: #880000;\n    font-weight: bold; }\n  #forum_message_body > .message-content .hljs-regexp,\n  #forum_message_body > .message-content .hljs-symbol,\n  #forum_message_body > .message-content .hljs-variable,\n  #forum_message_body > .message-content .hljs-template-variable,\n  #forum_message_body > .message-content .hljs-link,\n  #forum_message_body > .message-content .hljs-selector-attr,\n  #forum_message_body > .message-content .hljs-selector-pseudo {\n    color: #BC6060; }\n  #forum_message_body > .message-content .hljs-literal {\n    color: #78A960; }\n  #forum_message_body > .message-content .hljs-built_in,\n  #forum_message_body > .message-content .hljs-bullet,\n  #forum_message_body > .message-content .hljs-code,\n  #forum_message_body > .message-content .hljs-addition {\n    color: #397300; }\n  #forum_message_body > .message-content .hljs-meta {\n    color: #1f7199; }\n  #forum_message_body > .message-content .hljs-meta-string {\n    color: #4d99bf; }\n  #forum_message_body > .message-content .hljs-emphasis {\n    font-style: italic; }\n  #forum_message_body > .message-content .hljs-strong {\n    font-weight: bold; }\n";
var css_html = "<style>" + theme + "</style>";

/* slct_original が元々のHTML、Markdown 化した HTML は slct_marked 。 */
var slct_original = "#forum_message_body > pre.message-content";
var slct_marked = "#forum_message_body > div.message-content";

/* コメント領域の表示切り替えを把握するためのポーリング処理 */
var timer = 0; // timer id
var old_txt = ""; // 変更検知用
var interval = 300; // インターバル設定（ミリ秒）
timer = setInterval(function () {
  var ele = $(slct_original);
  if (ele.length === 0) {
    return;
  }

  var new_txt = $("#forum_message_body > .forum_author").html() + ele.text();

  if (old_txt != new_txt) {
    if ($(slct_marked).length) {
      return;
    } // fixme: 多重で呼ばれる時（謎）があるので予防
    // markdownize();
    // insertPopupButton();
    // insertMarkdownButton();

    old_txt = new_txt;
  }
}, interval);

// /*
//  * マークダウン化処理
//  */
// function markdownize() {
//   const ele = $(slct_original);
//   const filterd_html = preFilter(ele.text());
//   let marked_html = marked(filterd_html);
//   marked_html = $(`<div class="message-content">${css_html}${marked_html}</div>`);
//
//   ele.after(marked_html);
//
//   postFilter();
//
//   if (store.markdown) {
//     ele.hide();
//   } else {
//     marked_html.hide();
//   }
// }
//
// /*
//  * ポップアップボタンの追加
//  */
// function insertPopupButton() {
//   let ele = $('#discussion-action-button-bar .copy_message_body');
//   let btn = $('<p class="markdownize-ctrl"><a  href="#">別窓で開く</a></p>');
//
//   $("a", btn).on("click", function(e) {
//     e.preventDefault();
//
//     const win = window.open("", new Date().getTime(),
//       `width=${store.popup.size.width},height=${store.popup.size.height}`);
//     const content = $("#forum_message_body_wrap").html();
//     const title = $("#forum_message_body .forum_author h3").text().trim();
//     const author = $("#forum_message_body .forum_author h4").text().trim();
//     win.document.write(`
// <!DOCTYPE HTML>
// <html lang="ja">
// <head>
//   <meta charset="utf-8">
//   <link rel="stylesheet" type="text/css" href="/statics/dist/css/webac.css" />
//   <title>${author} | ${title}</title>
// </head>
// <body style="margin: 0.5em;">${content}</body>
// </html>
//     `);
//     win.history.pushState(null, null, location.href);
//     win.addEventListener('beforeunload', function(e) {
//       store.popup.size.width = win.outerWidth;
//       store.popup.size.height = win.outerHeight;
//       archiveStore(store);
//     });
//   });
//   ele.after(btn);
// }
//
// /* Markdown と元の表示とを切り替えるボタン。
//    Markdown化後が読みづらい時はこれで切り替えましょう。 */
// function insertMarkdownButton() {
//   const ele = $('#discussion-action-button-bar .copy_message_body');
//   const btn = $('<p class="markdownize-ctrl markdownize-toggle">MD</p>');
//
//   const pf = 'markdownize-toggle';
//
//   btn.on("click", (e) => {
//     if (btn.hasClass(`${pf}-on`)) {
//       // マークダウンを表示している時は元に戻す
//       $(slct_original).show();
//       $(slct_marked).hide();
//
//       btn.removeClass(`${pf}-on`);
//       btn.addClass(`${pf}-off`);
//
//       store.markdown = false;
//       archiveStore(store);
//     } else {
//       // 元テキストを表示している時はマークダウンにする
//       $(slct_original).hide();
//       $(slct_marked).show();
//
//       btn.removeClass(`${pf}-off`);
//       btn.addClass(`${pf}-on`);
//
//       store.markdown = true;
//       archiveStore(store);
//     }
//   }).on('mouseover', (e) => {
//       btn.addClass(`${pf}-hover`);
//   }).on('mouseout', (e) => {
//       btn.removeClass(`${pf}-hover`);
//   });
//
//   btn.addClass(store.markdown ? `${pf}-on` : `${pf}-off`);
//
//   ele.after(btn);
// }
//
// /*
//  * マークダウン処理を掛ける前のフィルター処理
//  *
//  *  1. 引用（>）の次の行がnewlineじゃない時はnewlineを挟む
//  *  2. 引用（>）の継続がparagraphに誤認されるケースを回避
//  */
// const lexer = new marked.Lexer();
// function preFilter(source) {
//   const lines = source.split("\n");
//
//   let previous_context = "(undefined)";
//   let current_context = "(undefined)";
//   let filtered_text = "";
//
//   for (const idx in lines) {
//     let line = lines[idx].replace(/\s+$/, "") + "\n";
//     current_context = "(undefined)";
//
//     for (const idx in lexer.rules) {
//       const rule = lexer.rules[idx];
//
//       if (line.match(rule)) {
//         current_context = idx;
//         break;
//       }
//     }
//
//
//     // フィルター処理
//
//     // 1. 引用（>）の次の行がnewlineじゃない時はnewlineを挟む
//     if (previous_context == "blockquote" && current_context != "newline") {
//       filtered_text += "\n";
//     }
//
//     // 2. 引用（>）の継続がparagraphに誤認されるケースを回避
//     if (line.match(/^(\s*>)+\n$/)) {
//       line = line.replace(/\n$/, "&nbsp;\n");
//     }
//
//     filtered_text += line;
//
//     previous_context = current_context;
//   }
//
//   return filtered_text;
// }
//
// /*
//  * マークダウン処理を掛けた後のフィルター処理
//  *
//  *  1. リンクを別窓で開くようする
//  */
// function postFilter() {
//
//   //  1. リンクを別窓で開くようする
//   {
//     const eles = $("a", slct_marked);
//     for (let idx=0; idx<eles.length; idx++) {
//       const ele = eles[idx];
//
//       if ($(ele).attr("href") !== undefined) {
//         let target = "_blank";
//         if (ele.hostname.match(/(aircamp\.us|bbt757.com)$/)) {
//           // 特定のURLが含まれるケースでは同じページで開くようにする
//           target = "_self";
//         }
//         $(ele).attr("target", target);
//       }
//     }
//   }
// }
//
// // コードハイライトのコールバック関数
// function hl_cb(code, lang, callback) {
//   const html = `<h6>In ${lang}</h6>` + hljs.highlight(lang, code, true).value;
//   return html;
// }
//
// /*
//  * データストアの取得して返す
//  */
// function retrieveStore() {
//   const def = {
//     version: "0.4.5",
//     markdown: true,
//     popup: {
//       size: { width: 800, height: 600 }
//     }
//   };
//
//   // ストアデータの互換性が無くなる時はここに変換処理を差し込む
//
//   const store_string = localStorage.getItem("markdownize");
//   const store = store_string !== null ? JSON.parse(store_string) : def;
//
//   return store;
// }
//
// /*
//  * データストアを保存する
//  */
// function archiveStore(store) {
//   localStorage.setItem("markdownize", JSON.stringify(store));
// }
},{"./markdownize":2}],2:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var marked = require('marked');
var store = require('./store');

var markdownize = function markdownize() {
  _classCallCheck(this, markdownize);
};

exports.default = markdownize;
},{"./store":3,"marked":4}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var store = function () {
  function store() {
    _classCallCheck(this, store);

    this.state = {};
    this.store_key = "markdownize";

    this.load();
  }

  /*
   * データストアの取得して返す
   */


  _createClass(store, [{
    key: "load",
    value: function load() {
      var def = {
        version: "0.4.5",
        markdown: true,
        popup: {
          size: { width: 800, height: 600 }
        }
      };

      var state_string = localStorage.getItem(this.store_key);
      this.state = store_string !== null ? JSON.parse(store_string) : def;

      // ストアデータの互換性が無くなる時はここに変換処理を差し込む

      return this;
    }

    /*
     * データストアを保存する
     */

  }, {
    key: "save",
    value: function save() {
      localStorage.setItem(this.store_key, JSON.stringify(this.state));

      return this;
    }
  }]);

  return store;
}();

exports.default = store;
},{}],4:[function(require,module,exports){
(function (global){
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block.blockquote = replace(block.blockquote)
  ('def', block.def)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top, true);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0]
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2], true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.text(escape(this.smartypants(cap[0])));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = ''
        , body = ''
        , i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = { header: true, align: this.token.align[i] };
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
	// explicitly match decimal, hex, and named HTML entities 
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  mangle: true,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])