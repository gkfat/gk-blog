import { DefaultTheme } from 'vitepress';

export const programmingItems: DefaultTheme.SidebarItem[] = [
  {
    text: 'System Design',
    base: '/programming/system-design/',
    collapsed: true,
    items: [
      {
        text: '系統設計學習筆記 - 什麼是物件導向程式設計(OOP)？跟前端開發有什麼關係？',
        link: 'oop-basic',
      },
      {
        text: '系統設計學習筆記 - 領域驅動設計 Domain-Driven Design(DDD)',
        link: 'ddd-basic',
      },
      {
        text: '系統設計學習筆記 - 搞懂 OAuth（開放授權） 與 SSO（單點登錄） ',
        link: 'oauth-vs-sso',
      },
      {
        text: '系統設計學習筆記 - 身分認證與存取權限策略 OAuth 2.0',
        link: 'oauth-2',
      },
      {
        text: '系統設計學習筆記 - OAuth 2.0 增強授權碼安全性機制 PKCE',
        link: 'oauth-pkce',
      },
    ],
  },
  {
    text: 'Web',
    base: '/programming/web/',
    collapsed: true,
    items: [
      { text: 'Web 學習筆記 - HTML vs HTML5', link: 'web-html5' },
      {
        text: 'Web 學習筆記 - localStorage / sessionStorage / cookie / session 比較',
        link: 'web-cookie-session-local-storage',
      },
      { text: 'Web 學習筆記 - HTTP', link: 'web-http' },
    ],
  },
  {
    text: 'Git',
    base: '/programming/git/',
    collapsed: true,
    items: [
      { text: 'Git 學習筆記 - 如何使用 Git 做版本控制', link: 'git-basic' },
      { text: 'Git 學習筆記 - 掌控你的 Git flow', link: 'git-flow' },
    ],
  },
  {
    text: 'Framework',
    base: '/programming/framework/',
    collapsed: true,
    items: [
      { text: 'Vue 學習筆記 - 什麼是 Vue？', link: 'vue-basic' },
      { text: 'Angular 學習筆記 - 從頭認識一個框架', link: 'angular-basic' },
      { text: 'Angular 學習筆記 - 生命週期', link: 'angular-lifecycle' },
      { text: 'Angular 學習筆記 - RxJS', link: 'angular-rxjs' },
      { text: 'Nginx 學習筆記 - 使用 Nginx', link: 'nginx-basic' },
    ],
  },
  {
    text: 'JavaScript',
    base: '/programming/javascript/',
    collapsed: true,
    items: [
      {
        text: 'JavaScript 學習筆記 - XMLHttpRequest',
        link: 'js-xmlhttprequest',
      },
      {
        text: 'JavaScript 學習筆記 - ES5 vs ES6',
        link: 'js-es5-es6',
      },
      {
        text: 'JavaScript 學習筆記 - 陣列操作',
        link: 'js-array-methods',
      },
      {
        text: 'JavaScript 學習筆記 - Hoisting',
        link: 'js-hoisting',
      },
      {
        text: 'JavaScript 學習筆記 - Closure',
        link: 'js-closure',
      },
      {
        text: 'JavaScript 學習筆記 - Prototype 與 Class',
        link: 'js-prototype-class',
      },
      {
        text: 'JavaScript 學習筆記 - Ajax',
        link: 'js-ajax',
      },
      {
        text: 'JavaScript 學習筆記 - Promise',
        link: 'js-promise',
      },
    ],
  },
  {
    text: 'TypeScript',
    base: '/programming/typescript/',
    collapsed: true,
    items: [
      {
        text: 'TypeScript 學習筆記 - 初探',
        link: 'ts-basic',
      },
    ],
  },
  {
    text: 'Node.js',
    base: '/programming/nodejs/',
    collapsed: true,
    items: [
      { text: 'Node.js 學習筆記 - 初次接觸 Node.js', link: 'nodejs-basic' },
    ],
  },
  {
    text: 'Linux',
    base: '/programming/linux/',
    collapsed: true,
    items: [
      { text: 'Linux 學習筆記 - Systemctl', link: 'linux-systemctl' },
      { text: 'Linux 學習筆記 - Journalctl', link: 'linux-journalctl' },
    ],
  },
  {
    text: 'Project',
    base: '/programming/project/',
    collapsed: true,
    items: [
      {
        text: '專案筆記 - 前後端＆資料庫系統建置心得',
        link: 'project-system-deploying-basic',
      },
      {
        text: '專案筆記 - 來寫一個串接 NAS 的檔案管理服務吧！',
        link: 'project-file-upload-service',
      },
      {
        text: '專案筆記 - 打造一個基於 VitePress 的技術筆記',
        link: 'project-build-blog-based-on-vitepress',
      },
    ],
  },
  {
    text: 'DevOps',
    base: '/programming/devops/',
    collapsed: true,
    items: [
      {
        text: 'DevOps 學習筆記 - AzurePipelines、Docker、GCP',
        link: 'devops-azurepipelines-gcp',
      },
      {
        text: 'DevOps 學習筆記 - 用 Docker 建立本地開發環境',
        link: 'devops-docker',
      },
    ],
  },
];
