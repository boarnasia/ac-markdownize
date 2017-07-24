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
'use strict';

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _blockquote_filter = require('./filters/blockquote_filter');

var _blockquote_filter2 = _interopRequireDefault(_blockquote_filter);

var _anchor_filter = require('./filters/anchor_filter');

var _anchor_filter2 = _interopRequireDefault(_anchor_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filters = [new _blockquote_filter2.default(), new _anchor_filter2.default()];

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
  highlight: highlight_callback
});

// コードハイライトのコールバック関数
function highlight_callback(code, lang, callback) {
  var html = '<h6>In ' + lang + '</h6>' + hljs.highlight(lang, code, true).value;

  return html;
}

var store = new _store2.default();

/* テーマ設定
 * テーマは他のデザインと干渉しないように特定の領域以下にだけ適用されるように作ってます。 */
var theme = '@charset "UTF-8";\n#forum_message_body > .message-content {\n  /* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n  */\n  /* This css is slightly adjusted from original by boarnasia.  */\n  /* HTML5 display-role reset for older browsers */ }\n  #forum_message_body > .message-content html, #forum_message_body > .message-content body, #forum_message_body > .message-content div, #forum_message_body > .message-content span, #forum_message_body > .message-content applet, #forum_message_body > .message-content object, #forum_message_body > .message-content iframe,\n  #forum_message_body > .message-content h1, #forum_message_body > .message-content h2, #forum_message_body > .message-content h3, #forum_message_body > .message-content h4, #forum_message_body > .message-content h5, #forum_message_body > .message-content h6, #forum_message_body > .message-content p, #forum_message_body > .message-content blockquote, #forum_message_body > .message-content pre,\n  #forum_message_body > .message-content a, #forum_message_body > .message-content abbr, #forum_message_body > .message-content acronym, #forum_message_body > .message-content address, #forum_message_body > .message-content big, #forum_message_body > .message-content cite, #forum_message_body > .message-content code,\n  #forum_message_body > .message-content del, #forum_message_body > .message-content dfn, #forum_message_body > .message-content em, #forum_message_body > .message-content img, #forum_message_body > .message-content ins, #forum_message_body > .message-content kbd, #forum_message_body > .message-content q, #forum_message_body > .message-content s, #forum_message_body > .message-content samp,\n  #forum_message_body > .message-content small, #forum_message_body > .message-content strike, #forum_message_body > .message-content strong, #forum_message_body > .message-content sub, #forum_message_body > .message-content sup, #forum_message_body > .message-content tt, #forum_message_body > .message-content var,\n  #forum_message_body > .message-content b, #forum_message_body > .message-content u, #forum_message_body > .message-content i, #forum_message_body > .message-content center,\n  #forum_message_body > .message-content dl, #forum_message_body > .message-content dt, #forum_message_body > .message-content dd, #forum_message_body > .message-content ol, #forum_message_body > .message-content ul, #forum_message_body > .message-content li,\n  #forum_message_body > .message-content fieldset, #forum_message_body > .message-content form, #forum_message_body > .message-content label, #forum_message_body > .message-content legend,\n  #forum_message_body > .message-content table, #forum_message_body > .message-content caption, #forum_message_body > .message-content tbody, #forum_message_body > .message-content tfoot, #forum_message_body > .message-content thead, #forum_message_body > .message-content tr, #forum_message_body > .message-content th, #forum_message_body > .message-content td,\n  #forum_message_body > .message-content article, #forum_message_body > .message-content aside, #forum_message_body > .message-content canvas, #forum_message_body > .message-content details, #forum_message_body > .message-content embed,\n  #forum_message_body > .message-content figure, #forum_message_body > .message-content figcaption, #forum_message_body > .message-content footer, #forum_message_body > .message-content header, #forum_message_body > .message-content hgroup,\n  #forum_message_body > .message-content menu, #forum_message_body > .message-content nav, #forum_message_body > .message-content output, #forum_message_body > .message-content ruby, #forum_message_body > .message-content section, #forum_message_body > .message-content summary,\n  #forum_message_body > .message-content time, #forum_message_body > .message-content mark, #forum_message_body > .message-content audio, #forum_message_body > .message-content video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n    float: none; }\n  #forum_message_body > .message-content article, #forum_message_body > .message-content aside, #forum_message_body > .message-content details, #forum_message_body > .message-content figcaption, #forum_message_body > .message-content figure,\n  #forum_message_body > .message-content footer, #forum_message_body > .message-content header, #forum_message_body > .message-content hgroup, #forum_message_body > .message-content menu, #forum_message_body > .message-content nav, #forum_message_body > .message-content section {\n    display: block; }\n  #forum_message_body > .message-content body {\n    line-height: 1; }\n  #forum_message_body > .message-content ol, #forum_message_body > .message-content ul {\n    list-style: none; }\n  #forum_message_body > .message-content blockquote, #forum_message_body > .message-content q {\n    quotes: none; }\n  #forum_message_body > .message-content blockquote:before, #forum_message_body > .message-content blockquote:after,\n  #forum_message_body > .message-content q:before, #forum_message_body > .message-content q:after {\n    content: \'\';\n    content: none; }\n  #forum_message_body > .message-content table {\n    border-collapse: collapse;\n    border-spacing: 0; }\n\n#forum_message_body > div.message-content {\n  font-family: Arial, Verdana, \u30E1\u30A4\u30EA\u30AA, Meiryo, "\u30D2\u30E9\u30AE\u30CE\u89D2\u30B4 Pro W3", "Hiragino Kaku Gothic Pro", sans-serif;\n  font-size: 13px;\n  margin-bottom: 1em; }\n  #forum_message_body > div.message-content pre, #forum_message_body > div.message-content code {\n    font-family: monospace, monospace;\n    _font-family: \'courier new\', monospace;\n    background-color: #e8f2f9;\n    font-size: 0.98em;\n    border-radius: 0.3em; }\n  #forum_message_body > div.message-content pre {\n    white-space: pre;\n    white-space: pre-wrap;\n    word-wrap: break-word;\n    border-radius: 1em;\n    padding: 1em;\n    margin: 1em 0; }\n  #forum_message_body > div.message-content h1, #forum_message_body > div.message-content h2, #forum_message_body > div.message-content h3, #forum_message_body > div.message-content h4, #forum_message_body > div.message-content h5, #forum_message_body > div.message-content h6 {\n    font-weight: bold;\n    color: #2a6d9e;\n    line-height: 1.2em;\n    margin-top: 0.5em;\n    margin-bottom: 1em;\n    padding-left: 0.5em; }\n  #forum_message_body > div.message-content h1, #forum_message_body > div.message-content h2 {\n    border-style: solid;\n    border-color: #83b8de;\n    border-width: 0 0 0.05em 0; }\n  #forum_message_body > div.message-content h1 {\n    font-size: 1.1em; }\n  #forum_message_body > div.message-content h2 {\n    font-size: 1.05em; }\n  #forum_message_body > div.message-content h3 {\n    font-size: 1em; }\n  #forum_message_body > div.message-content h4, #forum_message_body > div.message-content h5, #forum_message_body > div.message-content h6 {\n    font-size: 1em;\n    font-weight: normal; }\n  #forum_message_body > div.message-content a {\n    color: #00c;\n    text-decoration: none;\n    transition: all 0.3s; }\n  #forum_message_body > div.message-content a:visited {\n    color: #00e; }\n  #forum_message_body > div.message-content a:hover {\n    color: #6666ff;\n    text-decoration: underline; }\n  #forum_message_body > div.message-content a:active {\n    color: #faa700; }\n  #forum_message_body > div.message-content a:focus {\n    outline: thin solid;\n    outline-offset: 0.1em;\n    outline-color: #6666ff; }\n  #forum_message_body > div.message-content a:hover, #forum_message_body > div.message-content a:active {\n    outline: 0; }\n  #forum_message_body > div.message-content p {\n    margin: 1em 0; }\n  #forum_message_body > div.message-content img {\n    max-width: 100%; }\n  #forum_message_body > div.message-content blockquote {\n    color: #549e4d;\n    margin: 0;\n    padding: 0.5em;\n    border-left: 0.3em #549e4d solid;\n    background-color: #f1fff0; }\n    #forum_message_body > div.message-content blockquote h1, #forum_message_body > div.message-content blockquote h2, #forum_message_body > div.message-content blockquote h3, #forum_message_body > div.message-content blockquote h4, #forum_message_body > div.message-content blockquote h5, #forum_message_body > div.message-content blockquote h6 {\n      color: #549e4d;\n      border-color: #549e4d; }\n    #forum_message_body > div.message-content blockquote p {\n      margin: 0 0 1em 0; }\n    #forum_message_body > div.message-content blockquote p:last-child {\n      margin: 0 0 0 0; }\n  #forum_message_body > div.message-content hr {\n    display: block;\n    height: 2px;\n    border: 0;\n    border-top: 1px solid #aaa;\n    border-bottom: 1px solid #eee;\n    margin: 1em 0;\n    padding: 0; }\n  #forum_message_body > div.message-content em {\n    font-style: italic; }\n  #forum_message_body > div.message-content b, #forum_message_body > div.message-content strong {\n    font-weight: bold; }\n  #forum_message_body > div.message-content sub, #forum_message_body > div.message-content sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline; }\n  #forum_message_body > div.message-content sup {\n    top: -0.5em; }\n  #forum_message_body > div.message-content sub {\n    bottom: -0.25em; }\n  #forum_message_body > div.message-content ul, #forum_message_body > div.message-content ol {\n    margin: 1em 0;\n    padding: 0 0 0 2em; }\n  #forum_message_body > div.message-content li > ul, #forum_message_body > div.message-content li > ol {\n    margin: 0; }\n  #forum_message_body > div.message-content ul li {\n    list-style-type: disc; }\n  #forum_message_body > div.message-content ol li {\n    list-style-type: decimal; }\n  #forum_message_body > div.message-content li p:last-child {\n    margin: 0; }\n  #forum_message_body > div.message-content dd {\n    margin: 0 0 0 2em; }\n  #forum_message_body > div.message-content img {\n    border: 0;\n    -ms-interpolation-mode: bicubic;\n    vertical-align: middle; }\n  #forum_message_body > div.message-content table {\n    padding: 0.5em;\n    min-width: 200px;\n    border-collapse: collapse;\n    border-spacing: 0; }\n  #forum_message_body > div.message-content td, #forum_message_body > div.message-content th {\n    border: 1px solid #e8f2f9;\n    min-height: 1.2em;\n    vertical-align: center;\n    padding: 0.5em 1em;\n    transition: all 0.3s; }\n  #forum_message_body > div.message-content th {\n    background: #83b8de;\n    font-weight: bold;\n    color: #fff; }\n  #forum_message_body > div.message-content td {\n    background: #fff; }\n  #forum_message_body > div.message-content tr:nth-child(odd) td {\n    background: #fff; }\n  #forum_message_body > div.message-content tr:nth-child(even) td {\n    background: #e8f2f9; }\n  #forum_message_body > div.message-content tr:hover td {\n    background: #abcfe9; }\n\n.markdownize-ctrl {\n  float: right;\n  margin-left: 1em; }\n\n.markdownize-toggle {\n  cursor: pointer;\n  padding: 0 0.5em;\n  border-radius: 0.2em;\n  transition: all 0.3s; }\n  .markdownize-toggle.markdownize-toggle-on {\n    background-color: #dbdbdb;\n    color: #000; }\n    .markdownize-toggle.markdownize-toggle-on.markdownize-toggle-hover {\n      background-color: #e5e5e5;\n      color: #737373; }\n  .markdownize-toggle.markdownize-toggle-off {\n    background-color: #eaeaea;\n    color: #999999; }\n    .markdownize-toggle.markdownize-toggle-off.markdownize-toggle-hover {\n      background-color: #e5e5e5;\n      color: #737373; }\n\n#forum_message_body > .message-content {\n  /*\n\n  Original highlight.js style (c) Ivan Sagalaev <maniac@softwaremaniacs.org>\n\n  */\n  /* This css is slightly adjusted from original by boarnasia..  */\n  /* User color: hue: 0 */\n  /* Language color: hue: 90; */\n  /* Meta color: hue: 200 */\n  /* Misc effects */ }\n  #forum_message_body > .message-content .hljs {\n    display: block;\n    overflow-x: auto;\n    padding: 0.5em; }\n  #forum_message_body > .message-content .hljs,\n  #forum_message_body > .message-content .hljs-subst {\n    color: #444; }\n  #forum_message_body > .message-content .hljs-comment {\n    color: #888888; }\n  #forum_message_body > .message-content .hljs-keyword,\n  #forum_message_body > .message-content .hljs-attribute,\n  #forum_message_body > .message-content .hljs-selector-tag,\n  #forum_message_body > .message-content .hljs-meta-keyword,\n  #forum_message_body > .message-content .hljs-doctag,\n  #forum_message_body > .message-content .hljs-name {\n    font-weight: bold; }\n  #forum_message_body > .message-content .hljs-type,\n  #forum_message_body > .message-content .hljs-string,\n  #forum_message_body > .message-content .hljs-number,\n  #forum_message_body > .message-content .hljs-selector-id,\n  #forum_message_body > .message-content .hljs-selector-class,\n  #forum_message_body > .message-content .hljs-quote,\n  #forum_message_body > .message-content .hljs-template-tag,\n  #forum_message_body > .message-content .hljs-deletion {\n    color: #880000; }\n  #forum_message_body > .message-content .hljs-title,\n  #forum_message_body > .message-content .hljs-section {\n    color: #880000;\n    font-weight: bold; }\n  #forum_message_body > .message-content .hljs-regexp,\n  #forum_message_body > .message-content .hljs-symbol,\n  #forum_message_body > .message-content .hljs-variable,\n  #forum_message_body > .message-content .hljs-template-variable,\n  #forum_message_body > .message-content .hljs-link,\n  #forum_message_body > .message-content .hljs-selector-attr,\n  #forum_message_body > .message-content .hljs-selector-pseudo {\n    color: #BC6060; }\n  #forum_message_body > .message-content .hljs-literal {\n    color: #78A960; }\n  #forum_message_body > .message-content .hljs-built_in,\n  #forum_message_body > .message-content .hljs-bullet,\n  #forum_message_body > .message-content .hljs-code,\n  #forum_message_body > .message-content .hljs-addition {\n    color: #397300; }\n  #forum_message_body > .message-content .hljs-meta {\n    color: #1f7199; }\n  #forum_message_body > .message-content .hljs-meta-string {\n    color: #4d99bf; }\n  #forum_message_body > .message-content .hljs-emphasis {\n    font-style: italic; }\n  #forum_message_body > .message-content .hljs-strong {\n    font-weight: bold; }\n';
var css_html = '<style>' + theme + '</style>';

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
  var ele = $(slct_original);
  var ret = ele.text();

  for (var idx in filters) {
    ret = filters[idx].do(ret, 'pre');
  }ret = marked(ret);

  for (var _idx in filters) {
    ret = filters[_idx].do(ret, 'post');
  }var marked_html = $('<div class="message-content">' + css_html + ret + '</div>');

  $(slct_original).after(marked_html);

  if (store.state.markdown) {
    ele.hide();
  } else {
    marked_html.hide();
  }
}

/*
 * ポップアップボタンの追加
 */
function insertPopupButton() {
  var ele = $('#discussion-action-button-bar .copy_message_body');
  var btn = $('<p class="markdownize-ctrl"><a  href="#">別窓で開く</a></p>');

  $("a", btn).on("click", function (e) {
    e.preventDefault();

    var win = window.open("", new Date().getTime(), 'width=' + store.state.popup.size.width + ',height=' + store.state.popup.size.height);
    var content = $("#forum_message_body_wrap").html();
    var title = $("#forum_message_body .forum_author h3").text().trim();
    var author = $("#forum_message_body .forum_author h4").text().trim();
    win.document.write('\n<!DOCTYPE HTML>\n<html lang="ja">\n<head>\n  <meta charset="utf-8">\n  <link rel="stylesheet" type="text/css" href="/statics/dist/css/webac.css" />\n  <title>' + author + ' | ' + title + '</title>\n</head>\n<body style="margin: 0.5em;">' + content + '</body>\n</html>\n    ');
    win.history.pushState(null, null, location.href);
    win.addEventListener('beforeunload', function (e) {
      store.state.popup.size.width = win.outerWidth;
      store.state.popup.size.height = win.outerHeight;

      store.save();
    });
  });
  ele.after(btn);
}

/* Markdown と元の表示とを切り替えるボタン。
   Markdown化後が読みづらい時はこれで切り替えましょう。 */
function insertMarkdownButton() {
  var ele = $('#discussion-action-button-bar .copy_message_body');
  var btn = $('<p class="markdownize-ctrl markdownize-toggle">MD</p>');

  var pf = 'markdownize-toggle';

  btn.on("click", function (e) {
    if (btn.hasClass(pf + '-on')) {
      // マークダウンを表示している時は元に戻す
      $(slct_original).show();
      $(slct_marked).hide();

      btn.removeClass(pf + '-on');
      btn.addClass(pf + '-off');

      store.state.markdown = false;
      store.save();
    } else {
      // 元テキストを表示している時はマークダウンにする
      $(slct_original).hide();
      $(slct_marked).show();

      btn.removeClass(pf + '-off');
      btn.addClass(pf + '-on');

      store.state.markdown = true;
      store.save();
    }
  }).on('mouseover', function (e) {
    btn.addClass(pf + '-hover');
  }).on('mouseout', function (e) {
    btn.removeClass(pf + '-hover');
  });

  btn.addClass(store.state.markdown ? pf + '-on' : pf + '-off');

  ele.after(btn);
}
},{"./filters/anchor_filter":2,"./filters/blockquote_filter":4,"./store":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base_filter = require('./base_filter');

var _base_filter2 = _interopRequireDefault(_base_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnchorFilter = function (_BaseFilter) {
  _inherits(AnchorFilter, _BaseFilter);

  function AnchorFilter() {
    _classCallCheck(this, AnchorFilter);

    return _possibleConstructorReturn(this, (AnchorFilter.__proto__ || Object.getPrototypeOf(AnchorFilter)).call(this));
  }

  _createClass(AnchorFilter, [{
    key: 'postprocess',
    value: function postprocess(src) {
      var filtered = src;

      filtered = filtered.replace(/(<a href="(https?:)?\/\/(?!(aircamp|bbt757))[^"]*")/gi, '$1 target="_blank"');

      return filtered;
    }
  }]);

  return AnchorFilter;
}(_base_filter2.default);

exports.default = AnchorFilter;
},{"./base_filter":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseFilter = function () {
  function BaseFilter() {
    _classCallCheck(this, BaseFilter);

    this.state = {};
  }

  _createClass(BaseFilter, [{
    key: "do",
    value: function _do(src, mode) {
      var ret = "";
      switch (mode) {
        case "pre":
          return this.preprocess(src);

        case "post":
          return this.postprocess(src);
      }
    }
  }, {
    key: "preprocess",
    value: function preprocess(src) {
      return src;
    }
  }, {
    key: "postprocess",
    value: function postprocess(src) {
      return src;
    }
  }]);

  return BaseFilter;
}();

exports.default = BaseFilter;
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base_filter = require('./base_filter');

var _base_filter2 = _interopRequireDefault(_base_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlockquoteFilter = function (_BaseFilter) {
  _inherits(BlockquoteFilter, _BaseFilter);

  function BlockquoteFilter() {
    _classCallCheck(this, BlockquoteFilter);

    return _possibleConstructorReturn(this, (BlockquoteFilter.__proto__ || Object.getPrototypeOf(BlockquoteFilter)).apply(this, arguments));
  }

  _createClass(BlockquoteFilter, [{
    key: 'preprocess',
    value: function preprocess(src) {
      var ret = [];

      var lines = src.split('\n');

      var line = "";
      var prev = {
        level: 0,
        hasText: false,
        inEmptyLine: false,
        isNewline: false
      };
      var curr_level = 0;
      var hasText = false;
      var isNewline = false;
      var inEmptyLine = false;

      for (var idx in lines) {
        line = lines[idx].replace(/\s*$/, '');

        hasText = this._blockquote_has_text(line);
        isNewline = this._is_newline(line);
        curr_level = this._blockquote_level(line);

        // line = String(idx) + " " + line
        // line = line.replace(/\s*$/, "")

        // console.log(`${prev.level} ${curr_level} ${hasText} ${isNewline} ${inEmptyLine} ${line}`)
        if (curr_level > 0) {

          if (hasText) {
            inEmptyLine = false;

            if (curr_level < prev.level && prev.hasText == true) {
              ret.push("> ".repeat(curr_level).replace(/\s*$/, ''));
            }
          } else {
            if (prev.level === 0) {
              continue;
            } else if (inEmptyLine === false) {
              inEmptyLine = true;
            } else {
              continue;
            }
          }
        } else if (curr_level == 0 && prev.level > 0) {

          if (prev.inEmptyLine) {
            ret.pop();
          }

          if (isNewline === false) {
            inEmptyLine = false;
            ret.push("");
          }
        }

        ret.push(line);
        prev = {
          level: curr_level,
          hasText: hasText,
          inEmptyLine: inEmptyLine,
          isNewline: isNewline
        };
      }

      ret = ret.join('\n');

      return ret;
    }
  }, {
    key: '_is_newline',
    value: function _is_newline(line) {
      var m = line.match(/^$/);

      return m ? true : false;
    }
  }, {
    key: '_blockquote_has_text',
    value: function _blockquote_has_text(line) {
      var m = line.match(/^(\s*>)+\s*([^\s>]+)/);

      return m ? true : false;
    }
  }, {
    key: '_blockquote_level',
    value: function _blockquote_level(line) {
      var ret = 0;
      var m = line.match(/^(\s*>)+/);

      if (m) {
        while (m) {
          ret++;

          line = line.replace(/^\s*>/, '');
          m = line.match(/^(\s*>)+/);
        }
      }

      return ret;
    }
  }]);

  return BlockquoteFilter;
}(_base_filter2.default);

exports.default = BlockquoteFilter;
},{"./base_filter":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function () {
  function Store() {
    _classCallCheck(this, Store);

    this.state = {};
    this.store_key = "markdownize";
    this.load();
  }

  /*
   * データストアの取得して返す
   */


  _createClass(Store, [{
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
      this.state = state_string !== null ? JSON.parse(state_string) : def;

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

  return Store;
}();

exports.default = Store;
},{}]},{},[1])