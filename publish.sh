#!/usr/bin/env bash
set -e
# 修改npm源地址
npm config get registry
npm config set registry=https://registry.npmjs.org/
# 登陆输入自己的npm账号和密码，还有邮箱
echo '登录'
npm login #--otp=85574746
echo "发布中..."
npm publish
# 改回npm源地址,很多时候我们用的是淘宝镜像源
npm config set registry=https://registry.npm.taobao.org
echo -e "\n发布成功\n"
exit

npm adduser --registry=https://registry.npmjs.org/ --scope=odinorg