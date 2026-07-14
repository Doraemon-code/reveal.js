#!/usr/bin/env bash
# 在仓库根目录运行：./scripts/serve-presentations.sh
# 作用：载入 nvm 后用 vite --host 启动开发服务器，监听所有网卡，
#       解决 WSL2 下 Windows 浏览器用 localhost 打不开 reveal.js 演示文稿的问题。
#
# 启动后访问（挑一个）：
#   http://localhost:8000/                              # WSL 内部
#   http://<WSL真实IP>:8000/presentations/ai-commons/   # Windows 浏览器，最稳
# 脚本会打印 vite 给出的 Network 地址。

set -e

# 载入 nvm（本机 node 不在缺省 PATH，必须先 source）
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
else
  echo "未找到 nvm（$NVM_DIR/nvm.sh），请先安装 nvm。"
  exit 1
fi

# 必须在仓库根目录执行（依赖 vite / dist）
if [ ! -f package.json ] || [ ! -d dist ]; then
  echo "请在 reveal.js 仓库根目录运行此脚本。"
  exit 1
fi

echo "启动 vite 开发服务器（--host，监听所有网卡）..."
echo "演示文稿目录：presentations/<主题>/index.html"
echo "------------------------------------------------"
npx vite --host