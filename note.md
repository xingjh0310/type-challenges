Ts 学习

编译环境搭建

--force 如果之前安装过,可以执行这个命令强制替换

npm install typescript -g --force

tsc --init  生成 tsconfig.json 文件,介绍 https://www.cnblogs.com/wuqilang/p/15395105.html


文档编译的几种方式

1. 通过tsc 命令进行编译文件,会生成对应的 .js 文件

tsc ==> 编译  tsc -w ==> 实时观测自动编译

2. 通过vscode 插件编译文件, 需要在vscode中查找 coder runner 插件,只会执行代码检测, 不会生成. Js文件
runner code ==> npm install ts—node -g —force

3. 初始化package.json文件,配置rollup 打包工具编译文件

npm init -y 生成 package.json 文件

修改 package.json 文件 中启动命令 ==> "script":{"dev":"rollup -cw"}

npm install rollup typescript rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-serve -D

编译过程中可能会出现 common.js 之类的报错,可以修改 tsconfig.json 文件 中的 "module" 属性, 修改为 "ESNEXT"

新建 rollup.config.ts 文件

配置看文件代码

访问路径  `http://localhost:${port}${openPage}`
