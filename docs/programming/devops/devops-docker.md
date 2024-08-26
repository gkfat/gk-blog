---
layout: doc

title: DevOps 學習筆記 - 用 Docker 建立本地開發環境

description: 工作上使用 Docker 開發也有些時日了，不知不覺就熟悉了 DockerFile、 Docker Compose，這篇就來整理一下用法。
---

# {{ $frontmatter.title }}

:::info Intro
{{ $frontmatter.description }}
:::

## 問題

在程式開發的路上，不論你是前端、後端，還是全端，勢必都會碰到需要在本地安裝資料庫或啟動服務的情境。

一開始還能夠直接在本機安裝 DB 來使用。

但是，試想以下兩種情境：

- 情境一

> A 與 B 兩個服務，都需要用到 `mysql` 資料庫而且都用預設 port 3306，好巧不巧兩個服務的資料庫名稱都叫 `my_db`，此時怎麼辦？難道要啟動 A 服務的時候清一次資料庫，啟動 B 服務的時候再輕一次資料庫嗎？

- 情境二

> 有好幾個不同的服務，一個要用 `node@16`，一個要用 `node@18`，有些要用 `mysql@5.7`，有些用 `mysql@8`，多個版本到底怎麼管理？

為解決這些問題而衍伸出的服務正是 `Docker`。

## 什麼是 Docker？

> [AWS - 什麼是 Docker？](https://aws.amazon.com/tw/docker/)
>
> Docker 是一種軟體平台，將軟體封裝到名為 `容器` 的標準化單位，其中包含獨立的環境、系統、程式庫、程式碼等執行軟體所需的所有項目，能快速建立、測試和部署應用程式。

### 基本概念

Docker 包括三個基本概念：

- 映像檔（Image）
- 容器（Container）
- 倉庫（Repository）

#### 映像檔（Image）

一個 `Image` 包含一整個完整的作業系統環境，軟體的配置與實作會直接打包進 `image` 中，作為一個軟體的封裝交付。

#### 容器（Container）

容器實際上就是軟體的執行，是 `image` 的執行實例，可以被啟動、停止、刪除，每個容器都是互相隔離的，可以視為是完全不同的環境。

#### 倉庫（Repository）

倉庫是存放 `image` 的場所，每個 `image` 透過不同的標籤（tag）來區分識別。

公開倉庫的例子：

- [Docker Hub](https://hub.docker.com/)

### 實踐

有了基本的概念後，接著就要來實作了。

#### 在本地安裝 Docker Engine

直接參考官方的安裝教學

- [Install Docker Engine](https://docs.docker.com/engine/install)

安裝完後，呼叫看看：

```bash:line-numbers
$ docker -v

# 跑出以下結果
Docker version 24.0.2, build cb74dfc
```

能夠正確呼叫，就是安裝成功了。

#### 試著拉取一個映像檔

首先輸入以下指令，列出映像檔清單：

```bash:line-numbers
$ docker image list

# 跑出以下結果
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
```

你會發現是空的，因為還沒有拉過任何 image，這很正常。那麼，我們來拉一個 `mysql` 吧。

```bash:line-numbers
$ docker pull mysql
```

Docker 會吐出一行 `Using default tag: latest`，意思是你沒有指定 `tag`，於是它會拉這個 `image` 的預設標籤（latest）。

在拉取的過程中，docker 會印出映像檔的每一層的訊息。

拉完之後，再檢查一次：

```bash:line-numbers
$ docker image list

# 跑出以下結果
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
mysql        latest    d1a6bffb6c99   4 weeks ago    586MB
```

恭喜你，成功拉取了 `image` 了。

#### 使用映像檔建立容器

再來要試著用這個映像檔來跑一個容器起來。

```bash:line-numbers
# $ docker run --name <自定義服務名稱> <image>

$ docker run --name test_mysql mysql

# 跑出一些訊息

$ docker container list -a # 列出所有 container
CONTAINER ID   IMAGE         COMMAND                   CREATED          STATUS                      PORTS                                NAMES
f10a093627d0   mysql         "docker-entrypoint.s…"   28 seconds ago   Exited (1) 27 seconds ago                                        test_mysql
```

`mysql` 沒有跑起來是因為沒有定義初始化的密碼，那就是另一件事了，需要的話可以參考跑出來的錯誤訊息調整，這邊就不多贅述。

#### 建立映像檔

那麼，回到應用層面，我們在開發專案的過程中，時常會需要把專案打包成 `image`，不論前後端都需要做這件事。

通常會先寫一份 `Dockerfile`，舉例來說：

```dockerfile:line-numbers
# 使用 node 16 作為執行環境
FROM node:16-alpine as builder

# 指定工作路徑
WORKDIR /app

# 將目前路徑的檔案打包進 /app 路徑
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx

# 將上方 builder 打包出來的 dist 路徑內檔案複製到 nginx/html 路徑
COPY --from-builder /app/dist /usr/share/nginx/html

# 指定開放 port
EXPOSE 80
```

然後在同路徑下，輸入指令就會建構出一個 `image` 了。

```bash:line-numbers
# build 完 image 後順勢推上倉庫
$ docker build . -t <目標 image 名稱> --push .
```

### 更進階一點，使用 Docker Compose

再來進到比較進階的部分了。

假設今天你是前端，你在串接的後端服務包了 `image` 給你，但同時這個服務依賴著 `mysql` `redis` `ftp` 還有其他雜七雜八的服務才能運行，難道你每一個都要手動 `docker run` 嗎？

為了方便管理整包環境的建置，我們直接來一份 docker compose。

```yaml:line-numbers
# docker-compose.yml

version: '3.8'

services:
    # 定義一個服務叫 happy-db
    happy-db:
        image: mysql
        # 指定 container name 為 happy-db, 不一定要跟服務名稱一樣
        container_name: happy-db
        # 環境變數配置
        environment:
            MYSQL_DATABASE: happy_db_name
            MYSQL_ROOT_PASSWORD: 123456
            TZ: Asia/Taipei
        # 開放端口
        ports:
            - "3306:3306"
        # 位在哪個網路群組之下
        networks:
            - hello-world-network

    # 定義一個服務叫 happy-api
    happy-api:
        image: <api_image>
        container_name: happy-api
        environment:
            DB_HOST: happy-db
            DB_PORT: 3306
        ports:
            - "3000:3000"
        # 依賴某個服務, 該服務需要確保啟動, 才會啟動本服務
        depends_on:
            - happy-db
        networks:
            - hello-world-network

    # 定義一個網路群組
    networks:
        hello-world-network:
            driver: bridge
```

接著就是令人開心的時刻啦。

輸入：

```bash:line-numbers
$ docker compose -f <file_name> -p <project_name> up -d
```

整包服務就會啟動在一個叫做 `hello-world-network` 的群組之下了。透過這樣的方式，可以在本地建立多個群組，用以區分不同專案開發時所需要的環境。

就整理到這邊！

---

## 參考資料

- [Docker--從入門到實踐](https://philipzheng.gitbook.io/docker_practice)
- [[Docker 筆記]如何撰寫 Dockerfile?Dockerfile 指令說明](https://medium.com/@ylflyfly/how-to-create-and-build-dockerfile-9e68ed16d290)
- [深入淺出 Dockerfile 與 Docker Compose](https://old-oomusou.goodjack.tw/docker/dockerfile-dockercompose/)
