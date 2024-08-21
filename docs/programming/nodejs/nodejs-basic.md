---
layout: doc

title: Node.js 學習筆記 - 初次接觸 Node.js

description: 由於公司有使用 Node.js 撰寫的專案，之後有維護需求，因此對 Node.js 一竅不通的我，只好趕快惡補。
---

# {{ $frontmatter.title }}

:::info Intro
{{ $frontmatter.description }}
:::

## Overview

### 為什麼要學 Node.js

Node.js 有許多優勢，但對我而言最直接的原因就是，因為我在前端使用的是 JavaScript，Node.js 是使用 JavaScript 的後端語言，因此對於理解上，就少了一層障礙。

- 使用 JavaScript 的後端語言
- 能夠自己寫 web server
- 非同步 IO，事件驅動的特性，降低等待時間與耗能
- 許多第三方套件（如 express、socket…等等）
- ~~入門簡單（我不相信）~~

### 基本認識 Node.js

> [Node.js - 維基百科](https://zh.wikipedia.org/wiki/Node.js)
>
> [Node.js 之深入理解特性](https://segmentfault.com/a/1190000008961775)

如上所述，Node.js 的特性有以下幾個：

- 事件驅動才調用 I/O 資源，減少耗能
- 使用 JavaScript 語言編寫

### 如何學習 Node.js

那麼要學習 Node.js，具體來說應該要理解哪些事呢？我列出幾個學習重點，也方便日後檢視是否真的學會了這些東西：

- JavaScript 基礎
- Unix / Linux 指令
- 理解伺服器端腳本
- 模組和套件管理
- 異步 I/O 與 Async 流程控制庫（Input / Output，網路、文件、資料庫、使用者輸入等等的進出）
- 事件處理機制
- Node.js 與 AJAX
- 跨平台與跨瀏覽器的相容
- TCP/UDP 網路程式設計
- HTTP/HTTPS 應用程式設計
- Node.js 與資料庫互動

### Node.js 可以做些什麼？

- 撰寫 REST APIs
- 即時服務（線上聊天室、連線遊戲）
- 串接資料庫、blog、社群平台

我認為伺服器最主要功能就是做資源的處理，而前端是接口與呈現。所以在初步學習了 Node.js 之後，應該就會朝撰寫 API、串 WebSocket、串資料庫等方向去進一步探索吧。畢竟學程式就是要做出想做的作品嘛。

## Node.js 基本概念

### 線程處理與事件循環

#### 線程處理

- 收到 request
- thread 應對
- request 處理完成，thread 釋放

所謂線程處理，當收到請求時就依照以上步驟處理，因此當同時湧入大量請求時，伺服器負荷就會提高。例如 Apache 6,7,8,9 等版本。

#### 事件循環

Node.js 的事件循環特性就能比較好地 handle 這問題，他的運作方式如下：

- 開一個事件等待循環（event loop）
- 收到 request
- 將 request 塞入處理隊列中，然後繼續監聽其他 request
- request 處理完成後，調用 I/O，結束 request

也就是說，Node.js 以一個監聽器來處理 request 的「請求」與「完成」，並不會從頭到尾監聽，而只在這兩種事件出現時才調用 I/O 資源。

### 阻塞處理／非阻塞處理

#### 阻塞處理

會發生阻塞處理的語言有：Java、Ruby、PHP、Asp.Net 等，因為他們會照以下方式處理程序：

1. 先執行的函式尚未處理完，不會執行下一個函式
1. 所有的函式都要等待前一個函式處理完
1. 塞車

#### 非阻塞處理

而 Node.js 就能有效解決這個問題，但相對地也會有弱勢。

1. 呼叫函式時，需傳入一個 callback，處理完畢後調用 callback
1. 一旦函式開始處理，不用等待結果，就繼續運行下一個函式
1. 整份檔案順暢跑完（但各函式不會同時處理完畢）！

#### Node_modules

Node.js 本身的 node_modules 就提供了相當多的套件可以使用，隨便舉幾個例子：

- `http`：Web http request 處理
- `fs`：文件處理
- `path`：路徑處理
- `url`：網址處理
- `eventEmitter`：request 事件監聽處理
- `uuid`：產生不重複 ID 的小工具

而在部署時，並不需要將這些套件一起打包，只要在 config.json 的 dependencies 註明清楚，就可以透過 npm install 來安裝所有需要的套件包了。

## 開始 Node.js！

### “Hello World”

是的，學習一個新語言，當然都是從最基本的跟世界打個招呼來開始。首先知道如何運行它，然後才能一步步深入。

- 檢查 Node.js 版本

```bash:line-numbers
$ node -v // v10.16.0 // 看得到版本代表有成功安裝 Node.js
$ npm -v // 6.9.0 // 同時檢查 Node Package Manager 版本
$ node // 並跳轉至大於符號代表成功進入 Node 環境
>
```

- 在 Node.js 環境下，呼叫 console 輸出 Hello World

```bash:line-numbers
> console.log("Hello World"); // Node 環境下可以撰寫 JavaScript
Hello World // 這是 Node 吐出來的，成功使用 Node 了！
undefined // 看到這個不要緊張，這是返回 console.log 這函數的值
```

- 其他操作

```bash:line-numbers
$ .help // 查看 Node 幫助
$ .exit // 離開 Node
```

### 進一步的 Hello World

當然，我們不希望每次都在 Node.js 裡面打一堆程式碼，最好是能呼叫執行檔案。那麼具體的操作方法是怎麼樣呢？

1. 建立一個 helloworld.js 檔
2. 檔案內容為：

```js:line-numbers
var str = 'Hello Node.js!';
console.log(str);
```

3. 然後，在控制台使用 Node 運行這個檔案

```bash:line-numbers
$ node helloworld.js // 或 node helloworld

Hello Node.js!
```

4. 成功使用 Node.js 呼叫檔案了！

## 結語

關於 Node.js 的入門學習，就到這邊告一段落了。接下來我會繼續學習如何使用 express 框架來開發 Node.js app，接著就要逐漸嘗試實作出即時聊天室或小遊戲啦！
