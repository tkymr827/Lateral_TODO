0 から docker 環境を作るときのメモ

# 1.フォルダ構成 & 使用するバージョン

今回は下記のようにするとし、フォルダを作成する。

```
project
│
├── docker
│       ├── nginx
│       │   └── default.conf
│       │
│       └── php
│           └── dockerfile
├── src
│   └── Laravelファイル
│
└── docker-compose.yml
```

`src`フォルダは composer コマンドで自動生成されるので今は作らなくてよい

# 2.docker-compose.yml の基礎

ここから`docker-compose.yml`の中身を書いていきます。

まずは`docker-compose.yml`に以下を記述

```
version : '3'

services:
```

`version`  
Docker compose のバージョン。
今回は最新の 3 を使う。

`services`  
この下に作成するコンテナの記述をしていく

# 3.PHP 編

PHP のコンテナを記述していきます。

**docker-compose.yml**

```
version : '3'

services:
    # ここから追記
    php:
        build: ./docker/php
        volumes:
            - .:/var/www/html
```

`php`  
php コンテナという意味。  
名前は何でもいいけど分かりやすくしておく（後々のコマンドになるので）

`build`  
コンテナの元になる`dockerfile`が置いてあるパスを記述してある。  
要するに`./docker/php`にある`dockerfile`で環境作りますということ。

`volumes`  
ホスト・コンテナ感でのファイルの共有指定。  
あまり良く分かってない要勉強。

**dockerfile**

```
FROM php:7.4.11-fpm
ENV TZ Asia/Tokyo
ENV COMPOSER_ALLOW_SUPERUSER 1

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

RUN apt-get update && apt-get install -y git zip unzip vim
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql

WORKDIR /var/www/html
```

dockerfile には ↑ のように記述

`FROM php:7.4.11-fpm`  
使用するイメージ指定

# Nginx 編

```
version: "3"

services:
    php:
        build: ./docker/php
        volumes:
            - .:/var/www/html

    # ここから追記
    nginx:
        image: nginx:1.19.3
        ports:
            - 80:80
        volumes:
            - .:/var/www/html
```

`nginx`  
コンテナ名

`image`  
イメージの指定

`ports`  
ホストの 80 番ポートとコンテナの 80 番ポートを繋げる  
要勉強

`volumes`  
要勉強

ここまでできたら一旦ビルドする

```
docker-compose up -d --build
```

ビルド完了したら試しに ↓ に接続  
windows10 pro mac : http://localhost  
windows10 home : http://192.168.99.100:80

![welcometonginx](pic\nginx.png)  
上のような画面が出れば ok

# Laravel 編

作成した php と nginx の環境で laravel を使用できるようにします。  
まずは docker のコンテナに入ります。

```
docker-compose exec php bash
```

その後

```
composer create-project --prefer-dist laravel/laravel=8.1 src
```

を実行

`src`に laravel がインストール後、`nginx/default.conf`と`docker-compose.yml`に追記する

**default.conf**

```
server {
    listen 80;

        location / {
        root   /var/www/html/src/public;
        index  index.php index.html index.htm;
        try_files $uri $uri/ /index.php$is_args$args;
    }

        location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        root           /var/www/html/src/public;
        fastcgi_pass   php:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }
}
```

**docker-compose.yml**

```
version: "3"

services:
    php:
        build: ./docker/php
        volumes:
            - .:/var/www/html
    nginx:
        image: nginx:1.19.3
        ports:
            - 80:80
        volumes:
            - .:/var/www/html
            - ./docker/nginx/default.conf:/etc/nginx/conf.d/default.conf #この行を追記
```

その後下記を再ビルドする

```
# コンテナから出る
exit

# 再ビルド
docker-compose up -d --build
```

その後、先程の`welcome to nginx`の画面をリロードして laravel の初期画面が表示されたら成功。
![laravelインストール成功](pic\laravel.png)
