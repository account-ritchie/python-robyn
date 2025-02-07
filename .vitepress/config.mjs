import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

function chineseSearchOptimize(input) {
  const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' })
  const result = []
  for (const it of segmenter.segment(input)) {
    if (it.isWordLike) {
      result.push(it.segment)
    }
  }
  return result.join(' ')
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [
      pagefindPlugin({
        btnPlaceholder: '搜索',
        placeholder: '搜索文档',
        emptyText: '空空如也',
        heading: '共: {{searchResult}} 条结果',
        customSearchQuery: chineseSearchOptimize,
        // toSelect: '',
        // toNavigate: '',
        // toClose: '',
        // searchBy: '',
      })],
  },
  title: "Robyn 罗宾",
  description: "高性能的 Python Web 框架",
  // favicon.ico
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    // Google AdSense
    [
      "script",
      {
        async: true,
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1180517688121570',
        crossorigin: 'anonymous',
      },
    ],
  ],
  lang: 'zh-CN',
  themeConfig: {
    siteTitle: 'Robyn 罗宾',
    logo: '/images/logo.png',
    nav: [
      { text: '文档', link: '/example-application' },
      { text: '插件', link: '/plugins' },
      { text: '社区资源', link: 'https://www.sanskar.me/posts/hello-robyn' }
    ],
    sidebar: [
      {
        text: '示例应用',
        items: [
          { text: '快速开始', link: '/example-application/getting-started' },
          { text: '路由建模', link: '/example-application/modeling-routes' },
          { text: '身份验证和授权', link: '/example-application/authentication-authorization' },
          { text: '中间件', link: '/example-application/middlewares' },
          { text: '实时通知', link: '/example-application/real-time-notifications' },
          { text: '监控和日志记录', link: '/example-application/monitoring-logging' },
          { text: '部署', link: '/example-application/deployment' },
          { text: 'OpenAPI 文档', link: '/example-application/openapi-docs' },
          { text: '模板', link: '/example-application/templates' },
          { text: '子路由器', link: '/example-application/sub-routers' },
        ]
      },
      {
        text: 'API 参考',
        collapsed: false,
        items: [
          { text: '安装', link: '/api-reference/installation' },
          { text: '入门', link: '/api-reference/getting-started' },
          { text: '请求对象', link: '/api-reference/the-request-object' },
          { text: 'Robyn 环境文件', link: '/api-reference/robyn-env' },
          { text: '中间件', link: '/api-reference/middlewares' },
          { text: '身份验证', link: '/api-reference/authentication' },
          { text: 'Const 请求和扩展', link: '/api-reference/const-requests' },
          { text: 'CORS', link: '/api-reference/cors' },
          { text: '模板', link: '/api-reference/templating' },
          { text: '重定向', link: '/api-reference/redirection' },
          { text: '文件上传', link: '/api-reference/file-uploads' },
          { text: '表单数据', link: '/api-reference/form-data' },
          { text: 'WebSockets', link: '/api-reference/web-sockets' },
          // { text: '视图和子路由器', link: '/api-reference/views-subrouters' },
          { text: '依赖注入', link: '/api-reference/dependency-injection' },
          { text: '异常', link: '/api-reference/exceptions' },
          { text: '扩展', link: '/api-reference/scaling' },
          { text: '高级功能', link: '/api-reference/advanced-features' },
          { text: 'OpenAPI 文档', link: '/api-reference/openapi-documentation' },
          { text: '多进程执行', link: '/api-reference/multiprocess-execution' },
          { text: '直接使用 Rust', link: '/api-reference/using-rust-directly' },
          { text: 'GraphQl 支持', link: '/api-reference/graphql-support' }

        ]
      },
      {
        text: '架构',
        items: [
          { text: '架构', link: '/architecture' }
        ]
      },
      {
        text: '框架比较',
        items: [
          { text: '性能比较', link: '/performance-comparison' }
        ]
      },
      {
        text: '托管',
        items: [
          { text: 'Railway', link: '/hosting/railway' },
          { text: '暴露端口', link: '/hosting/exposing-ports' }
        ]
      },
      {
        text: '未来路线图',
        items: [
          { text: '即将推出的功能', link: '/upcoming-features' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/account-ritchie/python-robyn' }
    ],

    outlineTitle: '页面导航',
    // algolia search
    // search: {
    //   provider: 'algolia',
    //   options: {
    //     appId: 'GMMTOYG32P',
    //     apiKey: '12a1a5ba532100db45cc21be7813015a',
    //     indexName: 'python_robyn_pages_dev_gmmtoyg32p_pages',
    //     locales: {
    //       zh: {
    //         placeholder: '搜索文档',
    //         translations: {
    //           button: {
    //             buttonText: '搜索文档',
    //             buttonAriaLabel: '搜索文档'
    //           },
    //           modal: {
    //             searchBox: {
    //               resetButtonTitle: '清除查询条件',
    //               resetButtonAriaLabel: '清除查询条件',
    //               cancelButtonText: '取消',
    //               cancelButtonAriaLabel: '取消'
    //             },
    //             startScreen: {
    //               recentSearchesTitle: '搜索历史',
    //               noRecentSearchesText: '没有搜索历史',
    //               saveRecentSearchButtonTitle: '保存至搜索历史',
    //               removeRecentSearchButtonTitle: '从搜索历史中移除',
    //               favoriteSearchesTitle: '收藏',
    //               removeFavoriteSearchButtonTitle: '从收藏中移除'
    //             },
    //             errorScreen: {
    //               titleText: '无法获取结果',
    //               helpText: '你可能需要检查你的网络连接'
    //             },
    //             footer: {
    //               selectText: '选择',
    //               navigateText: '切换',
    //               closeText: '关闭',
    //               searchByText: '搜索提供者'
    //             },
    //             noResultsScreen: {
    //               noResultsText: '无法找到相关结果',
    //               suggestedQueryText: '你可以尝试查询',
    //               reportMissingResultsText: '你认为该查询应该有结果？',
    //               reportMissingResultsLinkText: '点击反馈'
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
    // local search
    // search: {
    //   provider: 'local'
    // },
    // carbon ads
    // carbonAds: {
    //   code: 'your-carbon-code',
    //   placement: 'your-carbon-placement'
    // },
    // 自定义广告
    // ads: {
    //   docAfter: [ // sidebar aside doc 的前后可插入广告
    //     {
    //       title: '关注微信公众号',
    //       img: 'https://xxx.png'
    //     }
    //   ]
    // },
    // Google AdSense
    // adsense: {
    //   client: 'pub-1180517688121570',
    //   asideOutlineAfter: '<slot>'
    // },
    // ads: {
    //   asideOutlineAfter: [
    //     [
    //       {
    //         title: 'Spotify - 每月低于 10 元',
    //         img: 'https://minio.zhichao.org/assets/spotify.png',
    //         link: 'https://nf.video/tST8B/?gid=4'
    //       },
    //     ]
    //   ],
    // },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2025-${new Date().getFullYear()} Ritchie`
    },

  },

  mpa: true,
  sitemap: {
    hostname: 'https://python-robyn.pages.dev/'
  },
  markdown: {
    //中文配置
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      // noteLabel: "注意",
      dangerLabel: "危险",
      detailsLabel: "详情",
      infoLabel: "信息",
    }
  },


})

