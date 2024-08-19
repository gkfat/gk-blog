import { defineConfig } from 'vitepress';

import { mindItems } from '../mind/sidebar.mts';
import { programmingItems } from '../programming/sidebar.mts';

export default defineConfig({
  title: "Gk's Notebook",
  description: '基於 vitepress 的技術筆記',

  base: '/',

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
