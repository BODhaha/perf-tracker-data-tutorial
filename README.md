# Egg.js 小实战

详细文档合集地址：[Egg.js 小实战 ~~ ❀❀ ~~](https://www.wolai.com/nY1sc5QHKe6A9dGVSn3uD8)


## 目录结构

```
.
├── README.md
├── app
│   ├── controller          controller 层主要用于处理一些业务逻辑
│   │   └── home.js         以 home.js 为例
│   └── router.js           路由配置
├── travis.yml              travis 的配置文件，travis 是一种可持续集成工具（不是重点，不用管）
├── appveyor.yml            一个用来做自动构建的脚本（不是我们的重点我们可以不用管它）
├── config  配置
│   ├── config.default.js   默认配置文件
│   └── plugin.js           插件配置
├── package-lock.json
├── package.json
└── test                    单元测试
    └── app
        └── controller
            └── home.test.js

6 directories, 9 files
```
