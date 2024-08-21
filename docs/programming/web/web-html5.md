---
layout: doc

title: Web 學習筆記 - HTML vs HTML5

description: 剛開始接觸網頁前端的時候，因為有太多東西要學了，就一頭栽下去學，總之先熟悉再說。忘記從什麼時候開始，這個疑問就懸在心頭：HTML 等於 HTML5 嗎？

head:
  - - meta
    - property: og:title
      content: Web 學習筆記 - localStorage / sessionStorage / cookie / session 比較
  - - meta
    - property: og:description
      content: 剛開始接觸網頁前端的時候，因為有太多東西要學了，就一頭栽下去學，總之先熟悉再說。忘記從什麼時候開始，這個疑問就懸在心頭：HTML 等於 HTML5 嗎？
---

# {{ $frontmatter.title }}

:::info Intro
{{ $frontmatter.description }}
:::

一直到搞懂了網頁前端的架構之後，才終於有點餘力來研究這個問題。這篇文章將專注在 HTML 與 HTML5 之間的比較。

## HTML 與 HTML5 的定義

要了解一樣東西，首先查他的定義。

以下是 Google 到的 HTML 定義：

> HTML（HyperText Markup Language），是一種用於建立網頁的標準標記語言。瀏覽器能夠讀取 HTML 標籤，並渲染出來。

而 HTML5 則是：

> HTML5 是 HTML 最新的修訂版本，由 W3C 於 2014 年 10 月完成標準制定。目標是取代 1999 年制定的 HTML 4.01 和 XHTML 1.0 標準，以期能在網際網路應用迅速發展的時候，使網路標準達到符合當代的網路需求。

也就是說，HTML5 是 HTML 的修訂版，但現今提到 HTML5 的時候，大多是指符合當代技術潮流標準的 HTML / CSS / JavaScript 技術組合。

## HTML5 新增功能

為了能更符合 HTML5 標準地 coding，最好主動去學習一些 HTML5 新增的技術功能。

- video / audio
- canvas
- SVG
- header / section / article / nav / footer
- 提供更多樣化的 API

## XHTML 與 HTML

這邊很快地提一件之前曾經困擾我的問題，就是 XHTML 跟 HTML 又有哪裡不同？

根據 W3C 的說法，差異如下：

- XHTML 元素必須被正確地嶔套
- XHTML 元素必須有關閉標籤
- XHTML 標籤名必須使用小寫
- XHTML 文件必須擁有根元素

總結來說：XHTML 可說是 HTML 的嚴謹版本。

## 總結

總結來說：HTML5 是 HTML 的修訂版，內容包含更多語意化的標籤，目的是為了擴增 HTML 的泛用性與管理便利性，協助開發者打造更豐富的網路應用程式。

為了讓自己寫的 code 能跟上當代潮流，學習 HTML5 標準是必要的。
