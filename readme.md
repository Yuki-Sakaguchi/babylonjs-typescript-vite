# Vite + TypeScript + Babylon.js で WebAR を作る

## WebAR を実行するために SSL 対応する
SSL でしか動かないので通常のローカルホスト立ち上げでは無く、証明書を作ってそれを使って立ち上げるようにする  
以下のコマンドを叩いて `key.pem` と `cert.pem` を生成して、`npm run dev` をしないと動かない  
これをすれば手元のスマホでも起動しているURLでサイトを閲覧することができます


```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

*  `Common Name?` 以外は全部エンターでOK
  * 上記の質問だけローカルIPを回答する
  * `npm run dev` に `--host` を追加して起動するとローカルIPが出てくるので `package.json` の `script` を修正して起動し直すと出てくる
  * 仮にローカルIPが `192.168.11.16` でホストが `3000` であれば、回答は `https://192.168.11.16:3000` となる
* これをすると `cert.pem` と `key.pem` が生成される
  * これらは各ローカルの情報になるので git 管理しないように注意
  * 後は `vite.config.ts` に `server.https.key` と `server.https.cert` を設定する

```ts
import { defineConfig } from "vite";
import * as fs from "fs";

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
    },
  },
});
```

## メモ
* Babylon.js で WebXR を作ろうとしたけど、iOS には対応していないらしい...
* Android でも使う時に ARKit のアプリのインストールをしないといけない
* それだけ精度が良いんだろうけど、Webの気軽さがないかもなぁと感じた