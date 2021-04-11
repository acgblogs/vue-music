# vue3-music - 网抑云音乐

## 项目说明
> * 前端采用Vue+element3+APlayer
> * 服务端调用开源项目https://github.com/Binaryify/NeteaseCloudMusicApi
> * 服务接口文档地址https://neteasecloudmusicapi.vercel.app
## Vue3知识点
> * setup 钩子函数，执行于beforeCreateed钩子函数之前，因此实例尚未创建，无法使用this
> * ref 定义基本数据类型，如果传入的数据类型为数组或者对象，会自动转换成reactive类型
> * reactive 定义对象数据类型

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
