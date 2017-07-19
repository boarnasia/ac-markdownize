class store {

  constructor() {
    this.state = {}
    this.store_key = "markdownize"

    this.load()
  }

  /*
   * データストアの取得して返す
   */
  load() {
    const def = {
      version: "0.4.5",
      markdown: true,
      popup: {
        size: { width: 800, height: 600 }
      }
    };

    const state_string = localStorage.getItem(this.store_key);
    this.state = store_string !== null ? JSON.parse(store_string) : def;

    // ストアデータの互換性が無くなる時はここに変換処理を差し込む

    return this
  }

  /*
   * データストアを保存する
   */
  save() {
    localStorage.setItem(
      this.store_key,
      JSON.stringify(this.state)
    );

    return this
  }
}

exports.default = store

