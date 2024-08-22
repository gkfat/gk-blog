---
layout: doc

title: 專案筆記 - 打造一個基於 VitePress 的技術筆記

description: 自 2019 轉職工程師以來，就累積了一些技術筆記。原本是用 Hexo 框架，架在 github pages 上，但因為在 2024-03-21 時，VitePress 釋出了 `v1.0.0` 正式版，近幾年跟 Vue 比較熟的我就趕快研究了一下，想把部落格搬過來。

head:
  - - meta
    - property: og:title
      content: 專案筆記 - 打造一個基於 VitePress 的技術筆記
  - - meta
    - property: og:description
      content: 自 2019 轉職工程師以來，就累積了一些技術筆記。原本是用 Hexo 框架，架在 github pages 上，但因為在 2024-03-21 時，VitePress 釋出了 `v1.0.0` 正式版，近幾年跟 Vue 比較熟的我就趕快研究了一下，想把部落格搬過來。
---

# {{ $frontmatter.title }}

:::info Intro
{{ $frontmatter.description }}
:::

## 什麼是 VitePress

> 參考官網：[What is VitePress?](https://vitepress.dev/guide/what-is-vitepress)

`VitePress` 是一個 SSG(Static Site Generator) 靜態網站生成器，主要就是為了生成靜態站點而打造的工具，具有以下幾個特點：

- 簡潔的 site config
- 可自訂的主題（theme）
- Vite 引擎
- 內建支援 `markdown`
- 兼容在 `md` 檔內寫 `Vue`（這真的很酷！）
- 適合 blog / 個人網站 / api documentation

如果你也有技術筆記的需求，相當推薦使用 `VitePress`。

那麼，開始實作吧！

## Getting Started

### 安裝 `VitePress`

- 首先，確保你的 `node.js` 版本在 18 以上。

| 環境需求  | 版本  |
| --------- | ----- |
| `node.js` | >= 18 |

我們使用 command line 安裝。首先，將 `VitePress` 加入 package.json。

```bash:line-numbers
// 加入 package.json
$ pnpm add -D vitepress
```

接著，啟動 `VitePress`。

```bash:line-numbers
// VitePress，啟動！
$ pnpm vitepress init
```

`VitePress` 會問你一連串的問題：

1. Config 檔要放在哪個路徑底下？
   > 根據官方建議，如果你要完全建立一個只基於 `VitePress` 的站，可以直接選擇 ./ 當作根目錄
2. 網站的標題與描述
3. 主題（theme）設定
   1. 完全使用 Default Theme
   1. 使用 Default Theme + 部分自訂
   1. 完全自訂
4. 配置檔案是否要用 TypeScript？
5. 是否要在 package.json 加入 `VitePress` scripts？

```json:line-numbers
"scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview"
}
```

啟動完後，專案目錄會多一個 `.vitepress` 資料夾，外層還會多幾個範例 md 檔。

```json:line-numbers
<project_dir>
|-- .vitepress  // vitepress 配置檔案放在這底下
    |-- theme  // 主題設定放在這
        |-- index.ts
        |-- style.css
    |-- config.mts  // 基本配置
```

Boom！安裝完成！

> 要注意的是，官方提到 `VitePress` 是一個純 ESM 的包，必須確保你的 package.json 有設置 `"type": "module"`，或把配置檔的副檔名改為 `.mjs` 或 `.mts`。

### 跑起來試試

安裝好了，馬上啟動網站來看看。

```bash:line-numbers
$ pnpm run docs:dev
```

編譯好的網站會跑在預設 host `http://localhost:5173`。

## 下一步是什麼？

到這裡網站的基本架構已經有了，接著就是客製化成自己想要的樣子，並多寫幾篇筆記了。

在程式開發的路上學無止境，永遠會有新的工具出現，能夠每接觸到新的事物就記個筆記。

除了方便自己之後回頭看，也許能在無意間幫助到需要的人吧。

---

參考資料：

- [VitePress 官方文件](https://vitepress.dev)
