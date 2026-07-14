# 演示文稿（按主题分文件夹）

本目录存放所有演示文稿，**约定：每个主题一个单独的文件夹**。

## 目录结构

```
presentations/
├── README.md          # 本文件（约定说明）
└── ai-commons/        # 主题：AI 常识
    └── index.html     # 该主题的演示文稿
```

以后新增主题时，在 `presentations/` 下新建一个文件夹即可，例如：

- `presentations/git-basics/`
- `presentations/data-analysis/`
- `presentations/css-cube/`

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