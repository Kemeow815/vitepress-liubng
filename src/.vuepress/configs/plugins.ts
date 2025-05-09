import type { PluginConfig } from 'vuepress'
import type { PluginsOptions } from 'vuepress-theme-hope'
import { containerPlugin } from '@vuepress/plugin-container'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { renderProjects } from '../containers'
import { naiveDiscretePlugin, themeColorPlugin } from '../plugins'
import { Repo } from '../utils'

// VuePress插件配置
export const configPlugins: PluginConfig = [
  // 谷歌统计插件
  googleAnalyticsPlugin({
    id: 'G-GBZBT89WGJ',
  }),
  themeColorPlugin(),
  naiveDiscretePlugin(),
  // 自定义容器插件
  containerPlugin({
    type: 'projects',
    render: (tokens, idx) => {
      return renderProjects(tokens, idx)
    },
  }),
]

// 主题内置插件配置
export const themePlugins: PluginsOptions = {
  icon: {
    assets: 'iconify',
  },
  // 博客插件配置
  blog: {
    hotReload: true, // 启用热更新
    timeline: '/archives/', // 时间轴访问路径修改成archives
    // 过滤列表页面
    filter: ({ filePathRelative, frontmatter }) => {
      // 舍弃那些不是从 Markdown 文件生成的页面
      if (!filePathRelative)
        return false
      // 舍弃notes文件夹的页面
      if (filePathRelative.startsWith('notes/'))
        return false
      // 舍弃nav文件夹的页面
      if (filePathRelative.startsWith('nav/'))
        return false
      // 舍弃about文件夹的页面
      if (filePathRelative.startsWith('about/'))
        return false
      // 舍弃tools文件夹的页面
      if (filePathRelative.startsWith('tools/'))
        return false
      // 舍弃所有的README.md页面
      if (filePathRelative.endsWith('README.md'))
        return false
      // 舍弃那些没有使用默认布局的页面
      const excludeLayouts = ['ArticleLayout']
      if (
        frontmatter.home
        || (frontmatter.layout && !excludeLayouts.includes(frontmatter.layout))
      ) {
        return false
      }
      return true
    },
  },
  // 复制代码插件配置
  copyCode: {
    showInMobile: true, // 手机端显示代码复制
  },
  // 版权信息是否显示
  copyright: false,
  // If you don’t need comment feature, you can remove following option
  // The following config is for demo ONLY, if you need comment feature, please generate and use your own config, see comment plugin documentation for details.
  // To avoid disturbing the theme developer and consuming his resources, please DO NOT use the following config directly in your production environment!!!!!
  // 评论插件配置
  comment: {
    // provider: 'Artalk',
    // server: 'https://artalk.liubing.me',
    // versionCheck: false
    provider: 'Giscus',
    repo: Repo,
    repoId: 'R_kgDOIq_bDg',
    category: 'Comments',
    categoryId: 'DIC_kwDOIq_bDs4CfSC6',
  },
  // 自动目录配置
  catalog: {
    exclude: [
      '/article/', // 排除/article/目录，防止和博客article有冲突Overriding existing page警告
    ],
  },
  // 搜素配置
  slimsearch: {
    indexContent: true,
    suggestion: false,
  },
  // PWA插件配置
  // pwa: false // 暂时关闭PWA功能
  pwa: {
    favicon: '/favicon.ico',
    cacheHTML: true,
    appendBase: true,
    themeColor: '#009b5e',
    update: 'available',
    apple: {
      icon: '/assets/icon/apple-icon-152.png',
      statusBarColor: 'black',
    },
    manifest: {
      icons: [
        {
          src: '/assets/icon/chrome-mask-512.png',
          sizes: '512x512',
          purpose: 'maskable',
          type: 'image/png',
        },
        {
          src: '/assets/icon/chrome-mask-192.png',
          sizes: '192x192',
          purpose: 'maskable',
          type: 'image/png',
        },
        {
          src: '/assets/icon/chrome-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/assets/icon/chrome-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
    },
  },
}
