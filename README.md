# 源码项目地图：从文件树读懂功能

科协之窗“项目阅读专题”展示页面。页面面向第一次阅读陌生源码仓库的同学，介绍目录结构、文件后缀、入口与配置如何共同形成项目功能。

## 页面内容

- 文件结构与后缀的协作关系
- 12 组常见文件类型说明
- 静态网站、React、Flask、Spring、C/C++、机器学习和全栈项目等 7 类案例
- 目录树、运行路径与阅读检查点
- 8 道带解析的交互题
- 五步源码阅读法与 14 条官方参考资料

## 本地运行

需要 Node.js 22 或更新版本，以及 pnpm。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

浏览器打开 `http://localhost:5173`。

## 检查与构建

```bash
pnpm lint
pnpm build
```

当前版本已经通过上述两项检查。

## 目录结构

```text
src/
├─ main.tsx                 # 本地预览外壳
├─ BackButton.tsx           # 模拟主站返回按钮
└─ issue/
   ├─ index.tsx             # 页面内容与交互
   └─ Issue.module.css      # 页面模块化样式
```

页面按科协之窗模板要求实现。管理员合入主站时，只需使用 `src/issue/` 目录；详细交付信息见 [DELIVERY.md](./DELIVERY.md)。

## 依赖

页面没有新增第三方依赖，仅使用模板已有的 React、Ant Design 和 `@ant-design/icons`。

