# Kimi 财务对账平台

基于 Vite + React + Tailwind CSS 构建的财务对账平台后台管理系统。

## 技术栈

- **构建工具**: Vite 5.x
- **前端框架**: React 18.x
- **样式方案**: Tailwind CSS 3.x
- **语言**: JavaScript (ES6+)

## 本地开发

### 前置要求

- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

开发服务器将在 `http://localhost:5173` 启动，支持热模块替换（HMR）。

### 预览生产构建

```bash
npm run build
npm run preview
```

## 构建生产包

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

## 部署到 Vercel

### 方式一：通过 Vercel Dashboard（推荐）

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
3. 点击 "Add New Project"
4. 导入你的 Git 仓库
5. 配置项目设置：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install` (默认)
6. 点击 "Deploy"

### 方式二：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 在项目根目录执行部署
vercel

# 生产环境部署
vercel --prod
```

### Vercel 项目配置

如果使用 `vercel.json` 配置文件，项目会自动识别以下设置：

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

详细配置见 `vercel.json` 文件。

## 项目结构

```
src/
├── api/              # API 接口模块
│   ├── orders.js
│   ├── bills.js
│   ├── reconciliation.js
│   ├── revenue.js
│   └── overview.js
├── components/       # 通用组件
│   ├── StatCard.jsx
│   └── Field.jsx
├── constants/        # 常量定义
│   ├── menuItems.js
│   └── statusMap.js
├── data/             # Mock 数据
│   └── mockData.js
├── layout/           # 布局组件
│   ├── Layout.jsx
│   ├── Sidebar.jsx
│   └── Header.jsx
├── pages/            # 页面组件
│   ├── OverviewPage.jsx
│   ├── OrdersPage.jsx
│   ├── BillsPage.jsx
│   ├── ReconciliationPage.jsx
│   └── RevenuePage.jsx
├── App.jsx           # 主应用组件
├── main.jsx          # 入口文件
└── index.css         # 全局样式
```

## 开发说明

### API 模块

所有 API 接口定义在 `src/api/` 目录下，目前使用 Mock 数据模拟。替换真实 API 时：

1. 找到对应的 API 文件（如 `src/api/orders.js`）
2. 将 `Promise.resolve(mockData)` 替换为真实的 `fetch` 调用
3. 页面组件无需修改，会自动适配

### 类型注释

项目使用 JSDoc 类型注释，方便后续迁移到 TypeScript：

```javascript
/**
 * @typedef {Object} Order
 * @property {string} order_id - 订单号
 */
```

## 环境变量

如需配置环境变量，在项目根目录创建 `.env` 文件：

```env
VITE_API_BASE_URL=https://api.example.com
```

在代码中使用：`import.meta.env.VITE_API_BASE_URL`

## 常见问题

### 构建失败

- 确保 Node.js 版本 >= 18
- 删除 `node_modules` 和 `package-lock.json`，重新安装依赖

### Vercel 部署失败

- 检查 `vercel.json` 配置是否正确
- 确认 Build Command 和 Output Directory 设置
- 查看 Vercel 构建日志排查错误

## License

Private

