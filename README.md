# 项目配置
- `create vite@latest my-vue-app --template vue`
- `npm install -D tailwindcss postcss autoprefixer -f`
- `npx tailwindcss init`
- `npx nuxi module add icon`
- `npm i -D @pinia-plugin-persistedstate/nuxt -f`
- `npm i pinia -f`
- 使用`npm run dev`启动项目

# 项目结构
- app.vue (启动文件，主要的应用程序入口)
- layouts/ (布局文件夹，用于存放不同页面布局)
    - MainLayout.vue (主页布局文件)
- pages/ (页面文件夹，用于存放各个页面)
    - Index.vue (首页，可能是项目的入口页面)
    - LoginRegister.vue (登录注册页面，包含登录和注册表单)
- plugins/ (插件文件夹，用于存放依赖或者第三方插件)
- stores/ (存储文件夹，用于持久化存储相关的数据或状态)
- components/ (组件文件夹，用于存放可复用的组件)
    - TopNav.vue (顶部导航栏组件)
    - SideNav.vue (侧边导航栏组件)
    - Footer.vue (页脚组件)
    - HomePage.vue (首页组件，如果需要进一步细分)
    - LoginForm.vue (登录表单组件)
    - RegisterForm.vue (注册表单组件)
- router
    - index.js (路由管理)