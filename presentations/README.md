# 演示文稿（按主题分文件夹）

本目录存放所有演示文稿，**约定：每个主题一个单独的文件夹**。

## 目录结构

```
presentations/
├── README.md          # 本文件（约定说明）
├── index.html         # 导航首页（三阶入口 + 密码门，同风格）
├── nav.css            # 导航首页皮肤
└── ai-commons/        # 主题：AI 常识
    └── index.html     # 该主题的演示文稿
```

以后新增主题时，在 `presentations/` 下新建一个文件夹即可，例如：

- `presentations/git-basics/`
- `presentations/data-analysis/`
- `presentations/css-cube/`

### 导航首页（统一入口）

`presentations/index.html` 是所有演示文稿的统一入口，复用 ai-commons 的深黑 / 蓝紫渐变皮肤，一张三卡网格，分别跳转 `ai-commons/`、`ai-primary/`、`ai-advanced/`。这样所有演示文稿可以一次性部署到 Vercel（把静态根指到 `presentations/`），无需为每个主题单独配部署。

进入首页需要密码（纯前端校验，仅作轻量门槛，不是真正安全）。密码值写在 `index.html` 顶部 `ACCESS_PASSWORD` 常量里，改密码改它即可；同一浏览器会话内通过一次后不再重复输入。

> 如果给 Vercel 部署，把输出目录 / `root` 设为 `presentations/`，访问 `https://<your-domain>/` 即进导航页。

## 怎么用

### 1. 启动开发服务器（推荐）

```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"   # 本机 node 不在缺省 PATH，需先载入 nvm
npm run dev      # 在仓库根目录执行，访问 http://localhost:8000/
```

随后用浏览器打开：

- `http://localhost:8000/presentations/ai-commons/`

各文件夹里的 HTML 用相对路径 `../../dist/reveal.js` 引用框架，保存即热重载。

### 2. 直接打开（无服务器）

也能工作，因为引用的是本地 `dist/` 产物：

```bash
xdg-open presentations/ai-commons/index.html      # WSL 下视环境而定
```

> 热重载需 dev 服务器；直接打开只能看、改完手动刷新。

## 约定要点

- **一个主题 = 一个文件夹**，文件夹名用 kebab-case 英文（如 `ai-commons`）。
- 每个文件夹里至少有一个 `index.html` 作为主文稿；若内容多，可在文件夹内再拆 `xx.html`。
- 引用框架统一用相对路径 `../../dist/reveal.js` / `../../css/reveal.css`（dist 是上游构建产物，无需自己构建）。
- 换主题：改 `<head>` 里的 `<link rel="stylesheet" href="../../dist/theme/xxx.css" />`。
- 可用主题见 `dist/theme/`：black、beige、dracula、league、moon、night、serif、simple、blood、black-contrast。