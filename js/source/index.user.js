const Markdownize = require('./markdownize')

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
    // let html = `<div class="message-content">${css}${markdownize()}</div>`
    // insertPopupButton();
    // insertMarkdownButton();

    old_txt = new_txt;
  }

}, interval);

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
