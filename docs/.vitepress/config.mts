import {
    defineConfig,
    HeadConfig,
} from 'vitepress';

import { mindItems } from '../mind/sidebar.mts';
import { programmingItems } from '../programming/sidebar.mts';

export default defineConfig({
  title: "GK's 技術筆記",
  transformHead: ({ pageData }) => {
    console.log({ pageData });
    const head: HeadConfig[] = [
      ['link', { rel: 'icon', href: '/favicon.ico' }],
      ['meta', { property: 'og:title', content: pageData.title }],
      [
        'meta',
        {
          property: 'og:description',
          content: pageData.description,
        },
      ],

      // Apple touch icon
      [
        'link',
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
      ],

      // Android Chrome icon
      [
        'link',
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/android-chrome-192x192.png',
        },
      ],
      [
        'link',
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '512x512',
          href: '/android-chrome-512x512.png',
        },
      ],

      // Web 應用清單文件
      ['link', { rel: 'manifest', href: '/site.webmanifest' }],

      ['meta', { property: 'og:type', content: 'website' }],
      [
        'meta',
        {
          property: 'og:image',
          content: 'https://gk-blog.pages.dev/ogimage.png',
        },
      ],
      ['meta', { property: 'og:url', content: 'https://gk-blog.pages.dev' }],
      // Google Analytics
      [
        'script',
        {
          async: 'true',
          src: 'https://www.googletagmanager.com/gtag/js?id=G-N57JYNE2HQ',
        },
      ],
      [
        'script',
        {},
        `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-N57JYNE2HQ');`,
      ],
      // Google Adsense
      [
        'script',
        {
          async: 'true',
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1090214244318718"',
          crossorigin: 'anonymous',
        },
      ],
    ];

    return head;
  },

  lastUpdated: true,

  themeConfig: {
    nav: [
      {
        text: 'Portfolio',
        link: 'https://portfolio-cbf.pages.dev/home',
      },
    ],

    outline: [2, 4],

    sidebar: [
      {
        text: '心法',
        base: '/mind/',
        collapsed: false,
        items: mindItems,
      },
      {
        text: '軟體開發',
        base: '/programming/',
        collapsed: false,
        items: programmingItems,
      },
    ],

    search: {
      provider: 'local',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    lastUpdated: {
      text: '最後更新於',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    langMenuLabel: '多語言',
    returnToTopLabel: '回到最上方',
    sidebarMenuLabel: '選單',
    darkModeSwitchLabel: '主題',
    lightModeSwitchTitle: '淺色模式',
    darkModeSwitchTitle: '深色模式',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/gkfat' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/gkgkwang' },
    ],
  },
});
