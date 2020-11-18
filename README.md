# このプロジェクトについて

Docker を使用し開発環境を構築する手順を示します。

# 動作環境

作成時のバージョン

| 項目       | バージョン |
| ---------- | ---------- |
| PHP        | 7.4.11     |
| Nginx      | 1.19.3     |
| PostgreSQL | 13.0       |
| Laravel    | 8.10.0     |
| React      | 16.14.0    |
| Docker     | 19.03.1    |

<br>

# 環境構築手順

以下の操作は任意のフォルダに移動してから実施してください。

1. ソースを github からクローン

```
$ git clone https://github.com/tkymr827/Lateral_TODO.git
```

2. クローンしたフォルダに移動

```
$ cd Lateral_TODO
```

3. コンテナ起動  
   ※ 途中で`Docker Desktop - Share drive`と出てくる場合があるが、その時は`Share it`を押下する。  
   押下しなかったらエラーが出て中止されるので再実行する。

```
$ docker-compose up -d
```

4. コンテナに入り各資材をインストール

```
$ docker-compose exec php bash
$ cd src
$ composer install
$ npm install --no-bin-links
$ npm audit fix
$ npm run dev
```

5. `.env`ファイルの作成  
   4 の続きから

```
$ cp .env.example .env
$ php artisan key:generate
```

6. DB に接続
   .env ファイルの一部を書き換え保存する。

Before

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

After

```
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=user
DB_PASSWORD=pass
```

7. DB マイグレーション

```
$ php artisan migrate:refresh --seed
```

8. ブラウザで確認

-   Windows Home -> http://192.168.99.100:80
-   Windows Pro or Mac -> http://localhost:80

問題なければログイン画面が表示される。

9. ログイン確認
   ダミーデータとして初期ユーザを用意しています。

```
メールアドレス:lateral@example.com
パスワード:pass
```
