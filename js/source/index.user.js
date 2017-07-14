// ==UserScript==
// @name         AC Markdownize / ACでMarkdownを使う
// @version      1.0.2
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
  const theme = `{{{css}}}`;
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

