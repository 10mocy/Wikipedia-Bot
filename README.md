# Wikipedia Bot
Wikipediaの情報を、Discord / Twitterに送信します。

## 使い方

### Discord
1. [ここ](https://discordapp.com/oauth2/authorize?client_id=356430678684073986&scope=bot&permissions=0)をクリックして、サーバにBotを接続します。
1. Wikipediaが右側のオンライン表示にいるチャンネルにて、「〜#とは」に反応するようになります。

### Twitter(独自アプリケーション)
1. [ここ](https://apps.twitter.com/app/new)をクリックして、アプリケーションの必要事項を記入します。
1. 「Keys and Access Tokens」から Consumer Key (API Key), Consumer Secret (API Secret) をメモ(コピー)します。
1. 下部にある「Your Access Token」から Access Token, Access Token Secret をメモ(コピー)します。
1. Wikipedia Botをクローン(ダウンロード)し、`token.js`を作成します。
    * 内容は以下のとおりです。
    ```javascript:token.js
        exports.twitter = {
            consumer_key: "Consumer Key",
            consumer_secret: "Consumer Secret",
            access_token_key: "Access Token",
            access_token_secret: "Access Token Secret"
        };
     ```
1. リポジトリ内で`node twitter`を実行します。
1. ホームタイムラインにて、「〜#とは」に反応するようになります。

### Twitter(@mnmonzkを利用する)
1. [ここ](http://twitter.com/share?text=Wikipedia%20Bot利用希望です。&via=mnmonzk&related=mnmonzk)をクリックして、@mnmonzkにツイートを送信してください。
1. @mnmonzkをフォローします。
1. フォローが返されたら、「〜#とは」に反応するようになります。

## 依存ライブラリ
* [twitter](https://www.npmjs.com/package/twitter)
* [discord.js](https://discord.js.org/#/)
* [sync-request](https://www.npmjs.com/package/sync-request)

## ライセンス
[クリエイティブ・コモンズ 表示-継承ライセンス(CC BY-SA 3.0)](https://creativecommons.org/licenses/by-sa/3.0/deed)
