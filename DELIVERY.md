# 科协之窗 · 项目阅读专题 01

这是一份交给主站开发/管理员的源码交付包。页面只使用模板已有的 React、Ant Design 和图标依赖，没有新增 npm 包、图片、字体或 COS 资源。

## 页面信息

- 标题：源码项目地图：从文件树读懂功能
- 摘要：下载了别人的项目，先从哪一个文件开始？看懂目录、后缀和入口之间的配合，就能把陌生仓库拆成一条条可追踪的功能路径。
- 内容：文件结构与后缀的关系、12 组常见文件类型、7 类项目结构案例、4 个阅读误区、8 道交互题、五步阅读法、14 条官方参考资料。
- 学年：待管理员填写
- 期数或番外短名：待管理员填写
- 发布日期：待管理员填写
- 封面图：无

## 合入主站

将本包内的 `src/issue/` 整个目录复制到主站对应的窗口期目录：

```text
apps/web/src/window-issues/<学年>/<期数>/
```

例如：

```text
apps/web/src/window-issues/2026-2027/1/
```

然后在主站的 `WINDOW_ISSUE_CATALOG` 中补充上面的页面信息，并按主站要求运行 lint 和 test。

本页面的默认导出组件是 `src/issue/index.tsx`，样式在同目录的 `Issue.module.css`。页面不依赖模板目录之外的文件。

## 本地复核

在模板仓库根目录执行：

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm build
```

本次交付结果：

- `pnpm lint`：通过
- `pnpm build`：通过
- 页面文件均小于模板规定的 200 KB 上限
- 未使用 `localStorage`、`sessionStorage`、cookie、`eval` 或 `new Function`

## 依赖变更

没有新增依赖。页面使用模板已提供的：

- `react` / `react-dom`
- `antd`
- `@ant-design/icons`

管理员不需要额外安装包，也不需要上传 `node_modules` 或 `dist`。

