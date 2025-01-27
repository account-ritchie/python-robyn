import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Robyn 罗宾",
  description: "高性能的 Python Web 框架",
  lang: 'zh-CN',
  themeConfig: {
    siteTitle: 'Robyn 罗宾',
    logo: 'images/robyn_logo.webp',
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

    outlineTitle: '页面导航'
  },
  mpa: true,
  sitemap: {
    hostname: 'https://python-robyn.pages.dev/'
  },
  provider: 'algolia',
  options: {
    appId: 'GMMTOYG32P',
    apiKey: '12a1a5ba532100db45cc21be7813015a',
    indexName: '...'
  },
  markdown: {
    //中文配置
    container:{
      tipLabel: "提示",
      warningLabel: "警告",
      // noteLabel: "注意",
      dangerLabel: "危险",
      detailsLabel: "详情",
      infoLabel: "信息",
    }
  },
  // favicon.ico
  head: [['link', { rel: 'icon', href: 'images/logo.png' }]]
})
