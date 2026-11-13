import {
  ArrowRightOutlined,
  BookOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  CodeOutlined,
  FileOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  LinkOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

import styles from './Issue.module.css';

type FileEntry = {
  path: string;
  kind: 'folder' | 'file';
  note: string;
};

type ProjectExample = {
  label: string;
  title: string;
  stack: string;
  description: string;
  entries: FileEntry[];
  flow: { title: string; detail: string }[];
  focus: string[];
  extensions: string[];
  caveat: string;
};

const roles = [
  {
    icon: <FolderOutlined aria-hidden />,
    title: '目录划分职责',
    detail: 'src、tests、assets、docs 等目录，把源码、验证、素材和说明分开放。',
    accent: 'map',
  },
  {
    icon: <FileOutlined aria-hidden />,
    title: '后缀标注类型',
    detail: '.py 是 Python 源码，.sql 是 SQL 脚本，.json 是结构化数据。',
    accent: 'fuel',
  },
  {
    icon: <LinkOutlined aria-hidden />,
    title: '入口连起流程',
    detail: '入口导入模块、读取配置，再把请求交给页面、服务或数据任务。',
    accent: 'slate',
  },
  {
    icon: <CodeOutlined aria-hidden />,
    title: '工具完成转换',
    detail: '编译器、打包器和运行时按配置处理源码，最终生成可运行的功能。',
    accent: 'warn',
  },
];

const extensions = [
  { name: '网页结构', suffix: '.html', detail: '定义标题、段落、表单等页面元素；同时声明要加载的样式和脚本。', group: '界面' },
  { name: '样式规则', suffix: '.css / .scss', detail: '控制布局、颜色、字体和屏幕适配；SCSS 等预处理器通常需要先编译。', group: '界面' },
  { name: '浏览器逻辑', suffix: '.js / .ts', detail: '处理事件与数据；TypeScript 会在构建阶段做类型检查，再转换成浏览器可运行的代码。', group: '界面' },
  { name: '组件页面', suffix: '.jsx / .tsx / .vue', detail: '将结构、交互或样式组织成可复用的组件，需对应框架的编译工具处理。', group: '界面' },
  { name: '服务端逻辑', suffix: '.py / .java / .go', detail: '接收请求、执行业务规则、读写数据；入口如何启动由框架或命令决定。', group: '程序' },
  { name: '配置与数据', suffix: '.json', detail: '保存依赖清单、工具选项或业务数据；它描述信息，本身不会自动执行。', group: '数据 / 配置' },
  { name: '配置与数据', suffix: '.yaml / .yml / .toml', detail: '常用于应用、CI、容器或 Python 项目配置；缩进和字段名都可能影响解析。', group: '数据 / 配置' },
  { name: '环境变量', suffix: '.env / .env.example', detail: '提供运行环境参数。真实 .env 往往含密钥，不应提交；示例文件只放占位值。', group: '数据 / 配置' },
  { name: '数据库脚本', suffix: '.sql', detail: '创建表、查询记录或变更数据库结构；migration 文件按版本顺序执行。', group: '数据 / 配置' },
  { name: '依赖与构建', suffix: 'package.json / pom.xml', detail: '声明 JavaScript 或 Java 项目的依赖、脚本与构建插件。', group: '工具链' },
  { name: '测试代码', suffix: '*.test.ts / test_*.py', detail: '验证函数、接口和页面是否符合预期；文件名和目录常被测试工具约定。', group: '工具链' },
  { name: '说明与素材', suffix: '.md / .svg / .csv', detail: 'Markdown 写文档，SVG 是矢量图，CSV 常用于表格数据；文件内容仍需结合调用处理解。', group: '其他' },
];

const examples: ProjectExample[] = [
  {
    label: '静态网站',
    title: '作品集与信息展示页',
    stack: 'HTML · CSS · JavaScript',
    description: '页面无需自己的服务器业务层，浏览器直接打开 HTML，再按引用关系加载样式、脚本和数据。适合个人主页、活动介绍和文档站。',
    entries: [
      { path: 'portfolio/', kind: 'folder', note: '项目根目录' },
      { path: 'README.md', kind: 'file', note: '用途、预览方式和维护说明' },
      { path: 'index.html', kind: 'file', note: '页面入口；引用 CSS、JS' },
      { path: 'styles/site.css', kind: 'file', note: '布局、颜色、响应式样式' },
      { path: 'scripts/main.js', kind: 'file', note: '交互逻辑；读取作品数据' },
      { path: 'data/projects.json', kind: 'file', note: '作品标题、摘要与跳转地址' },
      { path: 'assets/avatar.webp', kind: 'file', note: '压缩后的图片资源' },
    ],
    flow: [
      { title: '浏览器打开 index.html', detail: 'HTML 建立标题区、作品列表和页面容器。' },
      { title: '加载 site.css 与 main.js', detail: 'HTML 中的 link 和 script 标签声明两者的入口。' },
      { title: '脚本读取 projects.json', detail: 'JavaScript 将每条作品数据填入对应的页面节点。' },
      { title: '渲染文字与图片', detail: 'CSS 决定卡片如何排列，WebP 图片提供视觉素材。' },
    ],
    focus: ['从 index.html 看资源引用路径。', '搜索 fetch、querySelector 等数据与 DOM 操作。', '修改内容先找 JSON，改视觉再找 CSS。'],
    extensions: ['.html', '.css', '.js', '.json', '.webp'],
    caveat: '文件很多时，先确认路径是否相对项目根目录；图片 404 往往来自目录大小写或引用路径不一致。',
  },
  {
    label: 'React / Vite',
    title: '待办事项单页应用',
    stack: 'React · TypeScript · Vite',
    description: 'HTML 只提供挂载点，React 组件构建可交互界面；状态和事件通常沿组件树流动，Vite 负责开发服务器与生产打包。',
    entries: [
      { path: 'task-board/', kind: 'folder', note: '项目根目录' },
      { path: 'package.json', kind: 'file', note: '依赖版本范围与 dev、build 命令' },
      { path: 'pnpm-lock.yaml', kind: 'file', note: '锁定依赖解析结果' },
      { path: 'index.html', kind: 'file', note: '浏览器文档与根节点' },
      { path: 'src/main.tsx', kind: 'file', note: '创建 React 根并挂载 App' },
      { path: 'src/App.tsx', kind: 'file', note: '页面结构和主要状态' },
      { path: 'src/features/tasks/TaskList.tsx', kind: 'file', note: '任务列表与单项交互' },
      { path: 'src/api/tasks.ts', kind: 'file', note: '封装任务接口请求' },
      { path: 'src/styles.css', kind: 'file', note: '全局排版与布局样式' },
      { path: 'src/features/tasks/TaskList.test.tsx', kind: 'file', note: '组件行为测试' },
      { path: 'vite.config.ts', kind: 'file', note: 'Vite 插件和开发设置' },
      { path: 'tsconfig.json', kind: 'file', note: 'TypeScript 检查规则' },
    ],
    flow: [
      { title: 'package.json 提供命令', detail: 'pnpm dev 调用 Vite；pnpm build 生成发布文件。' },
      { title: 'index.html 加载 main.tsx', detail: '浏览器文档里的根节点等待 React 接管。' },
      { title: 'main.tsx 挂载 App.tsx', detail: 'App 组合任务列表、输入框和筛选工具。' },
      { title: '组件调用 API 并导入 CSS', detail: '数据请求、状态更新和样式一起形成实际页面功能。' },
    ],
    focus: ['先读 scripts，再运行 package.json 里的命令。', '沿 main.tsx 的 import 追到 App 和功能组件。', '从 test 文件确认用户操作的预期结果。'],
    extensions: ['.json', '.yaml', '.html', '.tsx', '.ts', '.css'],
    caveat: 'package.json 的版本范围不等于最终安装版本；lock 文件让团队在同一依赖树上工作，通常不要手工改。',
  },
  {
    label: 'Python / Flask',
    title: '学习记录与文章服务',
    stack: 'Python · Flask · Jinja',
    description: 'Flask 把 URL 路由到 Python 函数；函数组织数据并渲染模板，模板输出 HTML，静态目录中的 CSS 与 JavaScript 再由浏览器加载。',
    entries: [
      { path: 'study-log/', kind: 'folder', note: '项目根目录' },
      { path: 'pyproject.toml', kind: 'file', note: '项目元数据与依赖配置' },
      { path: 'app/__init__.py', kind: 'file', note: '创建 Flask app 并注册蓝图' },
      { path: 'app/routes.py', kind: 'file', note: 'URL 路由和请求入口' },
      { path: 'app/services/records.py', kind: 'file', note: '记录的查询与业务规则' },
      { path: 'templates/index.html', kind: 'file', note: 'Jinja 页面模板' },
      { path: 'static/css/site.css', kind: 'file', note: '浏览器端样式' },
      { path: 'static/js/filter.js', kind: 'file', note: '浏览器端筛选交互' },
      { path: 'tests/test_routes.py', kind: 'file', note: '路由响应与状态测试' },
      { path: '.env.example', kind: 'file', note: '环境变量名称示例' },
    ],
    flow: [
      { title: '启动 Flask 应用', detail: 'README 或 pyproject.toml 通常说明开发启动命令。' },
      { title: '请求进入 routes.py', detail: '路由根据 URL 和 HTTP 方法选择处理函数。' },
      { title: '服务函数准备数据', detail: 'Python 读取数据库或文件，再把变量交给模板。' },
      { title: '模板引用 static 资源', detail: '浏览器收到 HTML 后请求 CSS、JavaScript 和图片。' },
    ],
    focus: ['先找 app 创建位置和蓝图注册关系。', '看 routes 调用了哪些 service 或 model。', '核对 templates 里引用的静态资源路径。'],
    extensions: ['.py', '.toml', '.html', '.css', '.js', '.env'],
    caveat: '不要把 .env 中的密钥贴进 issue、日志或代码仓库；.env.example 应只保留变量名与虚构示例。',
  },
  {
    label: 'Java / Spring',
    title: '校园活动报名 API',
    stack: 'Java · Spring Boot · Maven',
    description: 'Spring Boot 项目常按 controller、service、repository 分层。Maven 组织依赖和构建，application.yml 配运行参数，SQL migration 管数据库演进。',
    entries: [
      { path: 'event-api/', kind: 'folder', note: '项目根目录' },
      { path: 'pom.xml', kind: 'file', note: 'Maven 依赖、插件和打包目标' },
      { path: 'src/main/java/.../EventApplication.java', kind: 'file', note: 'Spring Boot 启动类' },
      { path: 'src/main/java/.../EventController.java', kind: 'file', note: 'HTTP 路由与输入输出' },
      { path: 'src/main/java/.../EventService.java', kind: 'file', note: '报名名额和业务规则' },
      { path: 'src/main/java/.../EventRepository.java', kind: 'file', note: '数据库访问接口' },
      { path: 'src/main/resources/application.yml', kind: 'file', note: '端口、数据源等运行配置' },
      { path: 'src/main/resources/db/migration/V1__init.sql', kind: 'file', note: '初始表结构变更' },
      { path: 'src/test/java/.../EventServiceTest.java', kind: 'file', note: '服务逻辑测试' },
    ],
    flow: [
      { title: 'Maven 读取 pom.xml', detail: '解析 Java 版本、依赖和 Spring Boot 插件。' },
      { title: 'Application 类启动容器', detail: 'Spring 扫描组件并加载 application.yml。' },
      { title: 'Controller 到 Service', detail: '请求验证后进入名额、重复报名等业务逻辑。' },
      { title: 'Repository 访问数据库', detail: 'SQL migration 先建立或升级持久化结构。' },
    ],
    focus: ['先确认 pom.xml 的模块和 Spring Boot 版本。', '沿 Controller → Service → Repository 追一条请求。', 'application.yml 里的本地数据源与线上环境可能不同。'],
    extensions: ['.java', '.xml', '.yml', '.sql'],
    caveat: '目录名中的 ... 代表包名省略；真实 Java 文件通常位于与 package 声明对应的多层目录中。',
  },
  {
    label: 'C / C++',
    title: '命令行成绩分析器',
    stack: 'C++ · CMake · GoogleTest',
    description: '头文件公开类型和函数接口，源文件实现逻辑；CMakeLists.txt 描述怎样编译、链接与测试，构建工具再生成可执行程序。',
    entries: [
      { path: 'score-tool/', kind: 'folder', note: '项目根目录' },
      { path: 'CMakeLists.txt', kind: 'file', note: '目标、源码、依赖和编译规则' },
      { path: 'include/score/analyzer.hpp', kind: 'file', note: '对外声明的函数和类型' },
      { path: 'src/main.cpp', kind: 'file', note: '命令行入口、参数解析' },
      { path: 'src/analyzer.cpp', kind: 'file', note: '均值、分位数等实现' },
      { path: 'tests/analyzer_test.cpp', kind: 'file', note: '边界值和计算结果测试' },
      { path: 'assets/rules.json', kind: 'file', note: '运行时读取的分析规则' },
      { path: 'build/', kind: 'folder', note: '生成目录，通常不手动编辑' },
    ],
    flow: [
      { title: 'CMake 配置构建目标', detail: '把 main.cpp、analyzer.cpp 和头文件组织成程序。' },
      { title: '编译器检查并编译源码', detail: '头文件声明接口，.cpp 文件提供对应实现。' },
      { title: '链接依赖并生成可执行文件', detail: '编译产物进入 build 等生成目录。' },
      { title: '程序读取参数与规则', detail: 'main 调用分析函数，再输出计算结果。' },
    ],
    focus: ['从 CMakeLists.txt 找 executable、library 和 test 目标。', '核对头文件声明与 .cpp 定义是否一致。', 'build/ 是生成物；改源码后通过构建命令重新生成。'],
    extensions: ['.hpp / .h', '.cpp / .cc', '.txt', '.json'],
    caveat: '不要把编译生成文件当成源码改；清理 build 目录前，先确认它不包含开发者手工保存的产物。',
  },
  {
    label: '数据 / 机器学习',
    title: '图像分类训练流程',
    stack: 'Python · Jupyter · PyTorch',
    description: '数据清洗、训练、评估和推理通常是分开的脚本或 notebook。配置文件决定参数，模型权重与数据文件则可能很大，常不直接放进源码仓库。',
    entries: [
      { path: 'image-classifier/', kind: 'folder', note: '项目根目录' },
      { path: 'pyproject.toml', kind: 'file', note: 'Python 项目与依赖声明' },
      { path: 'notebooks/01_explore.ipynb', kind: 'file', note: '数据探索笔记与图表' },
      { path: 'configs/model.yaml', kind: 'file', note: '类别数、批次大小、训练轮数' },
      { path: 'src/data/prepare.py', kind: 'file', note: '清洗、切分和数据加载' },
      { path: 'src/train.py', kind: 'file', note: '训练循环与权重保存' },
      { path: 'src/evaluate.py', kind: 'file', note: '指标计算和验证集评估' },
      { path: 'tests/test_prepare.py', kind: 'file', note: '数据形状和标签映射测试' },
      { path: 'data/raw/README.md', kind: 'file', note: '原始数据来源说明' },
      { path: 'artifacts/model.pth', kind: 'file', note: '训练生成的模型权重' },
    ],
    flow: [
      { title: 'Notebook 探索数据', detail: '确认分布、异常值和可视化结论。' },
      { title: 'prepare.py 生成可训练数据', detail: '将原始文件整理为模型需要的张量和标签。' },
      { title: 'train.py 读取配置并训练', detail: 'YAML 参数影响训练过程，模型权重保存为二进制文件。' },
      { title: 'evaluate.py 评估效果', detail: '验证集指标和日志帮助判断模型是否可用。' },
    ],
    focus: ['先读数据来源、许可证和 README。', '从 train.py 查看训练入口和权重保存位置。', '检查 .pth、CSV、Parquet 等大文件是否由外部下载或脚本生成。'],
    extensions: ['.py', '.ipynb', '.yaml', '.csv', '.pth'],
    caveat: '.ipynb 既包含代码也包含输出结果；模型权重、数据集和缓存文件可能很大，应先查 .gitignore 与下载说明。',
  },
  {
    label: '前后端全栈',
    title: '校园二手交易平台',
    stack: 'React · FastAPI · PostgreSQL',
    description: '前端显示和收集输入，API 负责校验与业务处理，数据库保存记录；容器配置和环境变量把不同服务放到同一套开发环境中。',
    entries: [
      { path: 'campus-market/', kind: 'folder', note: '项目根目录' },
      { path: 'client/package.json', kind: 'file', note: '前端命令和依赖' },
      { path: 'client/src/main.tsx', kind: 'file', note: '前端 React 入口' },
      { path: 'client/src/api/items.ts', kind: 'file', note: '封装商品列表和发布请求' },
      { path: 'server/pyproject.toml', kind: 'file', note: '后端 Python 依赖与工具配置' },
      { path: 'server/app/main.py', kind: 'file', note: '创建 API 应用并挂载路由' },
      { path: 'server/app/api/items.py', kind: 'file', note: '商品接口和请求校验' },
      { path: 'server/app/services/items.py', kind: 'file', note: '商品业务规则' },
      { path: 'db/schema.sql', kind: 'file', note: '商品、用户和订单表结构' },
      { path: 'db/migrations/V1__init.sql', kind: 'file', note: '数据库版本变更' },
      { path: 'compose.yaml', kind: 'file', note: '本地 API 与数据库服务编排' },
      { path: '.env.example', kind: 'file', note: '数据库地址等变量示例' },
    ],
    flow: [
      { title: '前端触发 API 请求', detail: '商品页调用 api/items.ts 并处理加载和错误状态。' },
      { title: '后端路由验证输入', detail: 'FastAPI 将 URL 映射到 Python 处理函数。' },
      { title: '服务层执行业务规则', detail: '检查价格、库存或用户权限，再访问数据库。' },
      { title: '数据库返回持久化数据', detail: 'SQL 结构与 migration 共同决定字段和约束。' },
    ],
    focus: ['先分别找 client 和 server 的启动说明。', '沿请求路径从前端 API 文件追到后端路由。', '查看 compose.yaml 与 .env.example，确认本地服务依赖。'],
    extensions: ['.tsx', '.ts', '.py', '.sql', '.yaml', '.env'],
    caveat: '前端校验不能代替后端校验；本地开发密钥也不要直接复用生产环境的数据库密码。',
  },
];

const questions = [
  {
    category: '入口定位',
    prompt: '典型的 React + Vite 项目，浏览器启动链最可能是哪一条？',
    options: ['package.json → App.tsx → index.html', 'index.html → main.tsx → App.tsx', 'tsconfig.json → CSS → main.tsx'],
    answer: 1,
    explanation: 'index.html 引入入口脚本 main.tsx；入口再挂载 App 组件。package.json 提供命令和依赖，但不是浏览器的页面入口。',
  },
  {
    category: '配置辨析',
    prompt: 'package.json 与 pnpm-lock.yaml 最准确的分工是什么？',
    options: ['前者声明依赖和脚本，后者记录锁定后的解析结果', '前者存页面数据，后者存 CSS 样式', '两者都只是说明文档，可以随意删除'],
    answer: 0,
    explanation: 'package.json 定义项目意图和命令；lock 文件固定实际依赖树，方便团队与自动化环境安装一致版本。',
  },
  {
    category: '服务端流程',
    prompt: 'Flask 项目中，templates/index.html 通常怎样到达浏览器？',
    options: ['浏览器自行扫描整个 templates 目录', 'Python 路由调用模板渲染并返回 HTML', 'CSS 文件把模板编译成页面'],
    answer: 1,
    explanation: '路由函数通常调用 render_template，将模板与数据一起渲染；浏览器收到 HTML 后再请求 static 目录里的资源。',
  },
  {
    category: '数据文件',
    prompt: '哪个文件最可能定义数据库表、字段或索引？',
    options: ['README.md', 'schema.sql', 'vite.config.ts'],
    answer: 1,
    explanation: '.sql 文件可包含建表和迁移语句。README 介绍项目，Vite 配置前端开发和构建工具。',
  },
  {
    category: 'C / C++',
    prompt: 'C++ 项目里，头文件与 .cpp 文件通常怎样合作？',
    options: ['头文件声明接口，.cpp 文件实现逻辑', '.cpp 保存运行时图片，头文件保存页面样式', '头文件是编译生成物，.cpp 是依赖清单'],
    answer: 0,
    explanation: '头文件常声明函数、类和类型；源文件提供定义，CMake 再描述如何编译并链接这些文件。',
  },
  {
    category: '数据 / 模型',
    prompt: '.ipynb 和 .pth 在机器学习仓库中最常见的角色是什么？',
    options: ['分别是训练笔记本和模型权重文件', '分别是数据库脚本和网页模板', '两者都是必需的 Python 依赖清单'],
    answer: 0,
    explanation: '.ipynb 是可执行的 notebook 文档；.pth 常保存 PyTorch 权重，是二进制产物而不是源码。',
  },
  {
    category: '仓库卫生',
    prompt: '首次查看项目时，为什么通常先不改 dist/、build/ 或 node_modules/？',
    options: ['它们经常是构建或安装生成物，应回到源码和配置修改', '它们是唯一需要阅读的业务代码', '这些目录决定 Git 仓库名称'],
    answer: 0,
    explanation: '生成目录可能会被重新构建覆盖；通常应修改 src、配置和测试，再运行构建命令更新产物。',
  },
  {
    category: '安全习惯',
    prompt: '仓库有 .env.example，接下来最稳妥的做法是什么？',
    options: ['直接把真实密钥写进并提交示例文件', '复制为本地 .env 并填入自己的开发参数，确认 .env 被忽略', '把所有环境变量写到公开 README'],
    answer: 1,
    explanation: '示例文件用于说明所需变量；真实凭据留在本地或受保护的密钥系统中，并确认不会进入版本控制。',
  },
];

const readingSteps = [
  { title: '读 README 与目录树', detail: '先弄清项目要解决什么、入口在哪里、哪些目录是源码或生成物。' },
  { title: '看清依赖与启动命令', detail: '检查 package.json、pyproject.toml、pom.xml、CMakeLists.txt 等工具入口。' },
  { title: '从入口追到一个功能', detail: '沿 import、路由、接口请求或函数调用，追踪输入如何变成输出。' },
  { title: '对照配置、数据与测试', detail: '配置决定运行条件，数据决定输入，测试说明关键行为和边界。' },
  { title: '小步运行并验证', detail: '先跑已有测试或示例，再改一处、复测一次，避免同时改多个层次。' },
];

const referenceGroups = [
  {
    title: '网页基础',
    items: [
      { title: 'MDN：HTML 结构化内容', url: 'https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content', note: 'HTML 文档结构与语义' },
      { title: 'MDN：CSS 样式基础', url: 'https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics', note: '样式表如何影响页面呈现' },
      { title: 'MDN：JavaScript 脚本', url: 'https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting', note: '浏览器脚本和交互' },
      { title: 'MDN：JSON 对象', url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON', note: 'JSON 数据解析与序列化' },
      { title: 'Vite：开始使用', url: 'https://vite.dev/guide/', note: '入口、开发服务器与构建' },
      { title: 'React：快速入门', url: 'https://react.dev/learn', note: '组件、状态与事件' },
      { title: 'TypeScript：TSConfig 参考', url: 'https://www.typescriptlang.org/tsconfig/', note: '编译与类型检查选项' },
    ],
  },
  {
    title: '服务、构建与数据',
    items: [
      { title: 'npm：package.json', url: 'https://docs.npmjs.com/cli/v11/configuring-npm/package-json', note: '依赖和 scripts 字段' },
      { title: 'Flask：项目布局', url: 'https://flask.palletsprojects.com/en/stable/tutorial/layout/', note: '模板、静态文件和 Python 包' },
      { title: 'Python Packaging：pyproject.toml', url: 'https://packaging.python.org/en/latest/guides/writing-pyproject-toml/', note: 'Python 项目元数据与工具配置' },
      { title: 'Maven：标准目录布局', url: 'https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html', note: 'Java 源码、资源与测试目录' },
      { title: 'CMake：教程', url: 'https://cmake.org/cmake/help/latest/guide/tutorial/index.html', note: '构建目标和依赖关系' },
      { title: 'Jupyter：Notebook 格式', url: 'https://nbformat.readthedocs.io/en/latest/', note: 'ipynb 文档结构' },
      { title: 'PostgreSQL：SQL 命令', url: 'https://www.postgresql.org/docs/current/sql.html', note: '数据库语句和结构定义' },
    ],
  },
];

function SectionHeading({ number, eyebrow, title, description }: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <span className={styles.sectionNumber}>{number}</span>
      <div>
        <p className={styles.sectionEyebrow}>{eyebrow}</p>
        <h2>{title}</h2>
        <p className={styles.sectionDescription}>{description}</p>
      </div>
    </div>
  );
}

function FileTree({ entries }: { entries: FileEntry[] }) {
  return (
    <div className={styles.tree}>
      {entries.map((entry, index) => {
        const depth = Math.max(0, entry.path.split('/').length - (entry.path.endsWith('/') ? 2 : 1));
        const name = entry.path.split('/').filter(Boolean).at(-1) ?? entry.path;
        return (
          <div className={styles.treeRow} key={`${entry.path}-${index}`} style={{ paddingLeft: `${depth * 13}px` }}>
            <span className={styles.treeIcon} aria-hidden="true">
              {entry.kind === 'folder' ? <FolderOpenOutlined /> : <FileOutlined />}
            </span>
            <code className={entry.kind === 'folder' ? styles.folderName : styles.fileName}>
              {entry.kind === 'folder' ? name : entry.path}
            </code>
            <span className={styles.treeNote}>{entry.note}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Issue() {
  const [activeExample, setActiveExample] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const example = examples[activeExample];
  const score = answers.reduce<number>((total, answer, index) => total + (answer === questions[index].answer ? 1 : 0), 0);
  const allAnswered = answers.every((answer) => answer !== null);

  function chooseAnswer(questionIndex: number, optionIndex: number) {
    setAnswers((current) => current.map((answer, index) => index === questionIndex ? optionIndex : answer));
  }

  function resetQuiz() {
    setAnswers(questions.map(() => null));
    setSubmitted(false);
  }

  return (
    <div className={styles.page} id="top">
      <header className={styles.issueHeader}>
        <div className={styles.headerInner}>
          <p className={styles.eyebrow}><span className={styles.issueMark}>科协之窗</span><span>项目阅读专题 · 01</span></p>
          <h1 className={styles.title}>源码项目地图：<br />从文件树读懂功能</h1>
          <p className={styles.lead}>下载了别人的项目，先从哪一个文件开始？看懂目录、后缀和入口之间的配合，就能把陌生仓库拆成一条条可追踪的功能路径。</p>
          <div className={styles.headerMeta}>
            <span><BookOutlined aria-hidden /> 入门导读</span>
            <span><CodeOutlined aria-hidden /> 7 类项目结构</span>
            <span><CheckCircleFilled aria-hidden /> 8 道自测题</span>
          </div>
        </div>
      </header>

      <nav className={styles.contents} aria-label="本期目录">
        <a href="#map"><span>01</span>结构怎样协作</a>
        <a href="#extensions"><span>02</span>常见文件类型</a>
        <a href="#examples"><span>03</span>七类项目拆解</a>
        <a href="#pitfalls"><span>04</span>阅读检查点</a>
        <a href="#quiz"><span>05</span>小测</a>
        <a href="#summary"><span>06</span>总结</a>
        <a href="#references"><span>07</span>参考资料</a>
      </nav>

      <main className={styles.main}>
        <section className={styles.section} id="map">
          <SectionHeading
            number="01"
            eyebrow="STRUCTURE × EXTENSION"
            title="文件结构与后缀，怎样一起影响功能？"
            description="目录告诉我们文件处在哪个职责区域；后缀提示文件的格式与处理方式；入口、配置和工具则规定它们如何被连接、加载或编译。项目功能来自这些关系，而不是某一个文件单独决定。"
          />
          <div className={styles.roleGrid}>
            {roles.map((role) => (
              <article className={styles.roleCard} data-accent={role.accent} key={role.title}>
                <span className={styles.roleIcon}>{role.icon}</span>
                <h3>{role.title}</h3>
                <p>{role.detail}</p>
              </article>
            ))}
          </div>
          <div className={styles.pipelinePanel}>
            <div className={styles.panelHeading}>
              <div><p className={styles.miniEyebrow}>TRACE ONE FEATURE</p><h3>从仓库到功能：按这条线索往下读</h3></div>
              <span className={styles.panelTag}>通用阅读顺序</span>
            </div>
            <div className={styles.pipeline}>
              <div className={styles.pipelineStep}><span>01</span><strong>项目根目录</strong><p>README、清单文件和目录树</p></div>
              <ArrowRightOutlined className={styles.pipelineArrow} aria-hidden />
              <div className={styles.pipelineStep}><span>02</span><strong>运行入口</strong><p>main、app、路由或启动命令</p></div>
              <ArrowRightOutlined className={styles.pipelineArrow} aria-hidden />
              <div className={styles.pipelineStep}><span>03</span><strong>功能模块</strong><p>组件、服务、数据访问与资源</p></div>
              <ArrowRightOutlined className={styles.pipelineArrow} aria-hidden />
              <div className={styles.pipelineStep}><span>04</span><strong>验证与产物</strong><p>测试、构建配置和发布文件</p></div>
            </div>
          </div>
          <aside className={styles.noteBand}>
            <strong>重要提醒</strong>
            <p>后缀只能提供线索，不能单独证明文件用途。<code>config.json</code> 是否生效，要看谁读取它；<code>main.py</code> 是否是入口，要看启动命令和导入关系。</p>
          </aside>
        </section>

        <section className={styles.section} id="extensions">
          <SectionHeading
            number="02"
            eyebrow="FILE TYPE FIELD GUIDE"
            title="先认后缀，再回到上下文确认"
            description="同一类后缀可能参与不同框架；而像 package.json、CMakeLists.txt 这样的清单文件，作用往往比单看扩展名更具体。"
          />
          <div className={styles.extensionGrid}>
            {extensions.map((item) => (
              <article className={styles.extensionItem} key={`${item.suffix}-${item.group}`}>
                <div className={styles.extensionTop}><span className={styles.extensionGroup}>{item.group}</span><code>{item.suffix}</code></div>
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
          <div className={styles.pairingPanel}>
            <div className={styles.panelHeading}>
              <div><p className={styles.miniEyebrow}>FILE PAIRS</p><h3>常见“搭档”比单独记后缀更有用</h3></div>
            </div>
            <div className={styles.pairingGrid}>
              <p><code>index.html</code><ArrowRightOutlined aria-hidden /><code>main.tsx</code><span>HTML 引入脚本，脚本启动组件树</span></p>
              <p><code>app.py</code><ArrowRightOutlined aria-hidden /><code>templates/*.html</code><span>路由整理数据，再把数据交给模板</span></p>
              <p><code>pom.xml</code><ArrowRightOutlined aria-hidden /><code>src/main/java</code><span>Maven 依赖和构建 Java 源码</span></p>
              <p><code>schema.sql</code><ArrowRightOutlined aria-hidden /><code>migration/*.sql</code><span>初始结构与后续数据库变更</span></p>
            </div>
          </div>
        </section>

        <section className={styles.section} id="examples">
          <SectionHeading
            number="03"
            eyebrow="SEVEN PROJECT MAPS"
            title="看七类项目怎样把文件组织成可用功能"
            description="切换项目类型后，先扫目录树，再沿“运行路径”追一个功能。树形示意省略了与讲解无关的文件，真实仓库可能有不同命名。"
          />
          <div className={styles.exampleTabs} role="tablist" aria-label="选择项目案例">
            {examples.map((item, index) => (
              <button
                aria-controls="project-example-panel"
                aria-selected={activeExample === index}
                className={activeExample === index ? styles.activeTab : styles.tab}
                id={`example-tab-${index}`}
                key={item.label}
                onClick={() => setActiveExample(index)}
                role="tab"
                type="button"
              >
                <span>{String(index + 1).padStart(2, '0')}</span>{item.label}
              </button>
            ))}
          </div>
          <div className={styles.examplePanel} aria-labelledby={`example-tab-${activeExample}`} id="project-example-panel" role="tabpanel">
            <div className={styles.exampleIntro}>
              <span className={styles.exampleStack}>{example.stack}</span>
              <h3>{example.title}</h3>
              <p>{example.description}</p>
              <div className={styles.extensionTags} aria-label="涉及文件类型">
                {example.extensions.map((extension) => <code key={extension}>{extension}</code>)}
              </div>
            </div>
            <div className={styles.exampleGrid}>
              <div className={styles.treePanel}>
                <div className={styles.panelHeading}>
                  <div><p className={styles.miniEyebrow}>DIRECTORY TREE</p><h4><FolderOpenOutlined aria-hidden /> 目录速览</h4></div>
                  <span className={styles.panelTag}>示意结构</span>
                </div>
                <FileTree entries={example.entries} />
              </div>
              <div className={styles.analysisPanel}>
                <div className={styles.panelHeading}>
                  <div><p className={styles.miniEyebrow}>HOW FILES COOPERATE</p><h4><LinkOutlined aria-hidden /> 文件如何配合</h4></div>
                  <span className={styles.panelTag}>运行路径</span>
                </div>
                <ol className={styles.flowList}>
                  {example.flow.map((step, index) => (
                    <li key={step.title}><span>{index + 1}</span><div><strong>{step.title}</strong><p>{step.detail}</p></div></li>
                  ))}
                </ol>
                <div className={styles.focusList}>
                  <h5>打开仓库时，优先检查</h5>
                  <ul>{example.focus.map((tip) => <li key={tip}>{tip}</li>)}</ul>
                </div>
              </div>
            </div>
            <p className={styles.caseCaveat}><span>阅读提醒</span>{example.caveat}</p>
          </div>
          <p className={styles.caption}><BookOutlined aria-hidden /> 这些目录是常见约定而非硬性标准；以实际配置、导入关系、构建命令和文档为准。</p>
        </section>

        <section className={styles.section} id="pitfalls">
          <SectionHeading
            number="04"
            eyebrow="BEFORE YOU CHANGE CODE"
            title="阅读时常见的四个误区"
            description="模仿项目时，最容易误读的不是某一种语言，而是把约定当成规则、把生成结果当成源代码。"
          />
          <div className={styles.pitfallGrid}>
            <article className={styles.pitfall} data-accent="map"><span>01 / 入口</span><h3>目录名相同，不代表启动方式相同</h3><p>React 项目可能由 Vite、Next.js 或自定义脚本启动。先读 package.json 的 scripts 和 README，不要只猜命令。</p></article>
            <article className={styles.pitfall} data-accent="fuel"><span>02 / 配置</span><h3>配置文件存在，不代表所有选项都启用</h3><p>不同工具只读取自己认识的配置。搜索文件名、导入它的模块，以及 CI 实际运行的命令。</p></article>
            <article className={styles.pitfall} data-accent="warn"><span>03 / 产物</span><h3>build、dist 和 node_modules 多半不是业务源码</h3><p>这些目录通常由构建或安装生成。找到生成它们的脚本，再回到 src、配置和依赖声明中改动。</p></article>
            <article className={styles.pitfall} data-accent="slate"><span>04 / 密钥</span><h3>.env 可能包含不能公开的凭据</h3><p>先检查 .gitignore 和示例文件。不要把真实 token、密码或生产地址提交到仓库或截图中。</p></article>
          </div>
          <div className={styles.checkBand}>
            <div><strong>两分钟仓库检查</strong><p>README → 清单文件 → 入口 → 一个功能调用链 → 测试/构建脚本</p></div>
            <span>读懂再运行，改动前留一个可回退的基线。</span>
          </div>
        </section>

        <section className={styles.section} id="quiz">
          <SectionHeading
            number="05"
            eyebrow="CHECK YOUR READING"
            title="用 8 道题检查你是否读懂了结构"
            description="为每题选择一个最合理的答案。全部作答后提交，页面会给出得分和逐题解析；答错的题也会标出正确选项。"
          />
          <div className={styles.quizBar}>
            <div className={styles.progressText}><span>作答进度</span><span>{answers.filter((answer) => answer !== null).length} / {questions.length}</span></div>
            <div className={styles.quizScore} aria-live="polite"><strong>{submitted ? score : '--'}</strong><span>{submitted ? ` / ${questions.length} 正确` : '提交后查看得分'}</span></div>
          </div>
          <div className={styles.questionList}>
            {questions.map((question, questionIndex) => {
              const isCorrect = answers[questionIndex] === question.answer;
              return (
                <article className={styles.question} data-state={submitted ? (isCorrect ? 'right' : 'wrong') : 'open'} key={question.prompt}>
                  <div className={styles.questionHead}>
                    <span className={styles.questionNumber}>Q{String(questionIndex + 1).padStart(2, '0')}</span>
                    <span className={styles.questionKind}>{question.category}</span>
                  </div>
                  <p className={styles.prompt}>{question.prompt}</p>
                  <div className={styles.options}>
                    {question.options.map((option, optionIndex) => {
                      const selected = answers[questionIndex] === optionIndex;
                      const correctOption = submitted && question.answer === optionIndex;
                      const wrongOption = submitted && selected && !isCorrect;
                      return (
                        <button
                          aria-pressed={selected}
                          className={styles.option}
                          data-state={correctOption ? 'answer' : wrongOption ? 'chosen' : submitted ? 'other' : selected ? 'selected' : 'open'}
                          disabled={submitted}
                          key={option}
                          onClick={() => chooseAnswer(questionIndex, optionIndex)}
                          type="button"
                        >
                          <span className={styles.optionMark}>{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>
                          {correctOption && <CheckCircleFilled aria-label="正确答案" />}
                          {wrongOption && <CloseCircleFilled aria-label="所选答案错误" />}
                        </button>
                      );
                    })}
                  </div>
                  {submitted && <div className={styles.feedback} data-right={isCorrect}>
                    <strong>{isCorrect ? '回答正确' : '再看一下这个关系'}</strong>
                    <p>{question.explanation}</p>
                  </div>}
                </article>
              );
            })}
          </div>
          <div className={styles.quizActions}>
            {submitted ? (
              <button className={styles.resetButton} onClick={resetQuiz} type="button"><ReloadOutlined aria-hidden /> 重新作答</button>
            ) : (
              <button className={styles.submitButton} disabled={!allAnswered} onClick={() => setSubmitted(true)} type="button">提交答案 <ArrowRightOutlined aria-hidden /></button>
            )}
            {!submitted && !allAnswered && <span className={styles.quizHint}>完成全部题目后即可提交</span>}
          </div>
          {submitted && <div className={styles.quizSummary}>
            <p>本次得分：<strong>{score} / {questions.length}</strong>。遇到不确定的目录，再回到案例区沿调用关系复查。</p>
            <div className={styles.summaryGrid}>
              <article data-accent="map"><span>读入口</span><strong>命令 → 入口 → 模块</strong><p>先确认项目如何启动，再追踪一个具体功能。</p></article>
              <article data-accent="fuel"><span>读配置</span><strong>清单 → 依赖 → 环境</strong><p>区分声明文件、锁文件和本地运行变量。</p></article>
              <article data-accent="warn"><span>读产物</span><strong>源码 → 测试 → 构建</strong><p>从源文件验证改动，不把生成目录误当源码。</p></article>
            </div>
          </div>}
        </section>

        <section className={styles.section} id="summary">
          <SectionHeading
            number="06"
            eyebrow="TAKE IT WITH YOU"
            title="下载源码后的五步阅读法"
            description="用一条小而稳的路线，把目录阅读变成可以重复的习惯。"
          />
          <ol className={styles.readingList}>
            {readingSteps.map((step, index) => (
              <li key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.detail}</p></div></li>
            ))}
          </ol>
          <div className={styles.finalNote}><strong>记住这句话</strong><p>目录回答“它在哪里”，后缀回答“它是什么”，入口和配置回答“它怎样运行”；把三者串起来，才能判断改动会影响什么功能。</p></div>
        </section>

        <section className={`${styles.section} ${styles.referencesSection}`} id="references">
          <SectionHeading
            number="07"
            eyebrow="OFFICIAL DOCUMENTATION"
            title="延伸阅读与参考资料"
            description="优先查官方文档确认约定。项目实际结构可能不同，阅读时应以仓库自己的 README 和配置为最终依据。"
          />
          <div className={styles.referenceGroups}>
            {referenceGroups.map((group) => (
              <div className={styles.referenceGroup} key={group.title}>
                <h3>{group.title}</h3>
                <ol>
                  {group.items.map((item) => (
                    <li key={item.url}><a href={item.url} rel="noreferrer" target="_blank">{item.title}</a><span>{item.note}</span></li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <p className={styles.referenceFootnote}>页面访问日期：2026-11-13。文档版本可能更新，请以链接页面当前内容为准。</p>
        </section>
      </main>

      <footer className={styles.footer}>
        <span className={styles.footerMark}>科协之窗 · 项目阅读专题</span>
        <p>看懂文件之间的关系，先从仓库入口开始。</p>
        <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>回到顶部 <ArrowRightOutlined aria-hidden /></a>
      </footer>
    </div>
  );
}
