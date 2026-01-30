
# plan.md — 食物营养计算与体重管理网站（Spring Boot + Vue）

> 约束：不做条码扫描；先不考虑部署（本地开发运行即可）。  
> 额外要求：前端 UI 必须“精美现代化、像产品”；后端采用 controller/service/map(dao) 分层 + RESTful。
> **技术栈确认**：Spring Boot + Vue 3 (Composition API)；**完全摒弃** WordPress/Elementor 方案。

---

## 1. 项目定位与目标

打造一个“像成熟产品”的营养记录网站：
- 快速记录每日饮食（按餐次）
- 自动计算热量、宏量营养（P/F/C/纤维）与基础微量（钠/糖等，可扩展）
- 结合体重趋势与目标，提供可解释的反馈与建议
- UI 体验要现代、精致、动效克制、信息层级清晰（避免“AI模板感”）

---

## 2. 功能范围与优先级

### 2.1 MVP（闭环优先）
**账号与资料**
- 注册/登录（JWT）
- 个人资料：性别、年龄/生日、身高、当前体重、活动水平
- 目标：减脂/维持/增肌；目标体重；可设置每日热量/宏量目标（自动计算后可手动调整）

**食物库**
- 食物搜索（关键词）
- 食物详情（每100g营养、默认份量）
- 用户自建食物（适合外卖/品牌食品）
- **基础数据预埋**：内置高频常见食物（如米饭、鸡蛋、鸡胸肉），降低冷启动门槛
- **外部数据接入**（规划中）：优先整合《中国食物成分表》标准数据，OpenFoodFacts 仅作补充

**日记**
- 今日视图：早餐/午餐/晚餐/加餐列表
- 添加条目：选择食物 + 份量
- 当日汇总：热量 + P/F/C + 纤维 + 钠/糖（基础）
- 最近/收藏/复制昨天

**身体数据管理**
- 核心指标：体重、**体脂率**、**腰围**
- 附加功能：支持上传**身材对比照**（私密保存）
- 趋势分析：多维趋势图（7/30天）+ 移动平均线

### 2.2 v1（增强）
- 自定义食谱（多食材组合，按份保存）
- 更多微量营养 + 目标范围（上限告警）
- 周/月趋势与达成评分（0–100）
- 周/月趋势与达成评分（0–100）
- CSV 导出
- **PWA 支持**：支持安装到手机桌面，离线访问
- **智能文本输入**（实验性）：自然语言解析（如“早餐吃了一个鸡蛋和一杯牛奶”）自动生成条目

---

## 3. 前端：高质感现代化 UI 设计方案（避免 AI 感）

### 3.1 视觉风格（建议规范）
- **布局**：12 栅格 + 大留白 + 卡片化内容（但避免“千篇一律模板卡”）
- **层级**：标题/副标题/数值强调（体重、热量、剩余值突出）
- **圆角与阴影**：2xl 圆角、柔和阴影；避免过强对比
- **配色策略**：中性底色 + 单一强调色（不花哨）；进度用同色系深浅
- **字体**：中文建议 `Inter + PingFang SC / Noto Sans SC`，数字用 `tabular-nums`
- **动效**：仅用于“进度变化/弹窗/切换日期”，持续 150–220ms，缓动 `cubic-bezier`
- **图表**：ECharts 做极简线条，减少网格与噪音，突出趋势

### 3.2 组件体系（统一质感的关键）
- 顶部导航：日期切换 + 今日摘要入口
- 统计卡：热量剩余、蛋白差距、宏量环形/条形进度
- 餐次卡：可折叠，内部条目列表支持滑入编辑（桌面端用 hover/右键菜单）
- 食物搜索弹窗：左侧列表 + 右侧详情（桌面）；移动端用上下结构
- Toast/Modal/Drawer：统一圆角与阴影，关闭动画一致

### 3.3 技术选型（更“产品化”）
- Vue 3 + Vite + TypeScript + element-plus + 阿里巴巴矢量库
- Pinia + Vue Router
- UI：**TailwindCSS + Headless UI / Radix Vue**（更容易做出“高级感”，推荐）
- PWA：`vite-plugin-pwa` (提供 App 级体验)
- 动画：`@vueuse/motion` 或 `motion`（小范围用）
- 图表：ECharts

---

## 4. 前端页面结构（精致信息架构）

### 4.1 页面列表
- `/auth/login` `/auth/register`
- `/app/today` 今日总览（核心页）
- `/app/diary/:date` 日记（可切换日期）
- `/app/foods` 食物搜索与管理
- `/app/foods/custom/new` 自建食物
- `/app/weight` 体重记录与趋势
- `/app/settings/profile` 个人资料
- `/app/settings/goal` 目标设置

### 4.2 今日页（关键页面布局建议）
- 顶部：日期 + 快捷操作（复制昨天/添加食物）
- 第一屏：热量剩余大数字 + 今日达成摘要（P/F/C）
- 第二屏：四个小卡（蛋白、纤维、钠、糖）显示“差距/警告”
- 餐次区：早餐/午餐/晚餐/加餐折叠卡
- 底部：简短建议（规则引擎输出）

---

## 5. 后端：分层架构 + 目录规范（controller/service/map(dao)）

### 5.1 后端技术栈
- Spring Boot 3.x
- Spring Web + Validation
- Spring Security + JWT
- MyBatis（或 MyBatis-Plus）+ PostgreSQL
- Flyway（迁移）
- Flyway（迁移）
- Springdoc OpenAPI（Swagger）
- **Cache**： Redis (用于高频食物搜索加速)

### 5.2 目录结构（清晰分类）
以包名 `com.example.nutrition` 为例：


### 5.3 分层职责
- **controller**：只做参数校验、鉴权上下文获取、调用 service、返回响应
- **service**：业务规则、计算逻辑、事务管理
- **map/dao**：纯数据访问（CRUD、查询）
- **dto**：请求/内部传输对象（输入）
- **vo**：返回对象（输出）
- **entity**（可选）：与数据库字段对应的实体
- **converter/assembler**（可选）：entity ↔ dto/vo 转换

---

## 6. RESTful 风格 API 规范（统一标准）

### 6.1 基本规范
- 资源名用复数：`/foods` `/diary-entries` `/weights`
- 使用 HTTP 动词表达动作：
  - `GET` 查询
  - `POST` 创建
  - `PUT/PATCH` 更新（PUT 全量，PATCH 部分）
  - `DELETE` 删除
- 分页：`?page=1&size=20`
- 排序：`?sort=date,desc`
- 统一响应结构（推荐）：
  - `code` `message` `data` `traceId`

### 6.2 核心 API 草案
Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET  /api/auth/me`

Profile & Goal
- `GET  /api/profile`
- `PUT  /api/profile`
- `GET  /api/goals`
- `PUT  /api/goals`

Foods
- `GET  /api/foods?q=鸡胸&page=1&size=20`
- `GET  /api/foods/{foodId}`
- `POST /api/foods`              # 创建自建食物
- `PUT  /api/foods/{foodId}`     # 更新自建食物
- `POST /api/foods/{foodId}/favorite`
- `DELETE /api/foods/{foodId}/favorite`

Diary
- `GET  /api/diaries/{date}`     # date=YYYY-MM-DD 作为路径更 REST
- `POST /api/diary-entries`
- `PUT  /api/diary-entries/{entryId}`
- `DELETE /api/diary-entries/{entryId}`
- `POST /api/diaries/{date}/copy-from/{fromDate}`

Weight
- `GET  /api/weights?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `POST /api/weights`
- `DELETE /api/weights/{id}`

Analytics
- `GET /api/analytics/daily/{date}`
- `GET /api/analytics/trend?metric=weight&range=30d`

---

## 7. 数据模型（MVP 必要字段）

### 7.1 用户与目标
- users(id, username/email, password_hash, created_at)
- user_profile(user_id, sex, birth_date, height_cm, activity_level)
- user_goal(user_id, goal_type, target_weight_kg, calorie_target_kcal,
           macro_mode, protein_g, fat_g, carb_g, updated_at)

### 7.2 食物
- food_item(id, name, brand, source, created_by_user_id,
           serving_size, serving_unit, nutrients_per_100g_json, created_at)

### 7.3 日记
- diary_day(id, user_id, date)
- diary_entry(id, diary_day_id, meal_type, food_item_id,
             quantity_value, quantity_unit, computed_nutrients_json, created_at)

### 7.4 身体数据
- weight_log(id, user_id, date, weight_kg, body_fat_rate, waist_circumference_cm, photos_json, note)

---

## 8. 核心计算逻辑（可测试、可复用）

### 8.1 目标热量
- BMR：Mifflin-St Jeor
- TDEE：BMR * 活动系数
- 目标：根据减脂/增肌策略给出默认值；允许用户手动覆盖

### 8.2 营养计算
- 统一以“克”为基准：将 serving → grams
- 单条营养 = per_100g * grams/100
- 每日汇总累加
- diary_entry 存“快照 computed_nutrients_json”，避免后续 food_item 更新影响历史数据

### 8.3 规则建议（MVP）
- 蛋白不足：提示补高蛋白
- 纤维不足：提示补蔬果全谷豆类
- 钠偏高：提示减少加工食品/酱料
- 热量超标：提示减少高脂/高糖零食与饮料

---


## 9. 里程碑（建议）

Milestone 1：MVP 体验像产品
- 认证 + 资料/目标
- 今日页（高质感UI）+ 录入 + 汇总
- 食物搜索 + 自建
- 体重趋势
- 最近/收藏/复制昨天

Milestone 2：v1
- 食谱/组合菜品
- 微量目标范围
- 周/月趋势 + 评分
- CSV 导出

---

## 10. 可执行的开发任务清单（可直接建 Issue）

### 后端
- [ ] 建立目录结构与基础组件：common/exception/response/config
- [ ] Auth 模块：JWT 登录注册 + Security 配置
- [ ] Food 模块：foods 查询、自建 foods CRUD、收藏
- [ ] Diary 模块：按日期查询、entry CRUD、复制昨天
- [ ] Weight 模块：记录与查询
- [ ] Analytics 模块：daily 汇总、trend 趋势
- [ ] Flyway：建表、索引、约束（user_id + date 唯一等）

### 前端（目标：精美现代化）
- [ ] UI 规范落地：颜色、字体、圆角、阴影、动效时长统一
- [ ] Today 页面：热量剩余大数字 + 宏量进度 + 餐次折叠卡
- [ ] 添加食物 Drawer：搜索列表 + 详情 + 份量输入实时计算
- [ ] 食物管理与自建页面：表单体验精致（即时校验、可预览营养）
- [ ] 体重页：趋势图 + 添加记录弹窗
- [ ] 全局体验：Skeleton、空状态、错误提示、Toast、加载状态
- [ ] 统一、精致、现代、不会一眼像 AI 模板。
