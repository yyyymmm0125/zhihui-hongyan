# 智绘红岩：静态数字展馆

一个可离线演示的红岩精神传播网页作品，采用 HTML/CSS/JavaScript 构建，聚焦“数字展馆 + AI交互 + 互动体验”。

## 运行方式

1. 使用 Chrome 打开 `index.html`。
2. 若浏览器限制本地 `fetch`，可在项目根目录启动本地静态服务再访问：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 功能模块

- 首页展馆入口（主题视觉 + 锚点导航）
- 红岩精神概览（简介、时间轴、核心价值卡片）
- 人物与故事展区（人物卡片 + 详情弹窗）
- 红色旧址数字导览（地点切换联动介绍）
- AI 智能讲解（主题与风格切换、打字机输出）
- AI 问答互动（示例问题 + 关键词匹配回答）
- 精神互动体验（5题答题闯关、自动计分与评价）
- 项目说明 / 关于我们（理念、技术栈、创新点、资源说明）

## 技术栈

- HTML5
- CSS3
- JavaScript（ES6+）
- 本地 JSON 数据驱动

## 项目结构

```text
zhihui-hongyan/
├── index.html
├── README.md
└── assets
    ├── css/main.css
    ├── js/main.js
    └── data
        ├── overview.json
        ├── figures.json
        ├── sites.json
        ├── guide.json
        ├── qa.json
        └── quiz.json
```

## 素材与引用来源

- 当前版本关键页面均使用真实、合法可引用图片素材，已下载到 `assets/images/` 以保障离线演示稳定。

### 插图素材与许可

- `chongqing-art-museum.jpg`
  - 来源：<https://commons.wikimedia.org/wiki/File:Chongqing_Art_Museum.jpg>
  - 许可：CC BY-SA 4.0
  - 使用位置：首页主视觉、人物与旧址模块插图
- `jiefangbei-2022.jpg`
  - 来源：<https://commons.wikimedia.org/wiki/File:%E9%87%8D%E5%BA%86%E8%A7%A3%E6%94%BE%E7%A2%912022.jpg>
  - 许可：CC BY-SA 4.0
  - 使用位置：人物与旧址模块插图
- `chongqing-map.svg`
  - 来源：<https://commons.wikimedia.org/wiki/File:Map_of_China_Chongqing.svg>
  - 许可：CC BY-SA 3.0
  - 使用位置：项目资料图（备用）
- `chongqing-map.png`
  - 来源：<https://commons.wikimedia.org/wiki/File:Chongqing-map.png>
  - 许可：CC BY-SA 3.0
  - 使用位置：概览页历史背景图、旧址模块插图
- `zhazidong-exhibit.jpg`
  - 来源：<https://commons.wikimedia.org/wiki/File:%E6%B8%A3%E6%BB%93%E6%B4%9E%E5%B1%95%E5%87%BA%E7%9A%84%E5%BD%93%E5%B9%B4%E5%88%91%E5%85%B7.jpg>
  - 许可：CC BY-SA 4.0
  - 使用位置：渣滓洞旧址导览图片

### 史实参考来源

- 《红岩精神的丰富内涵与时代价值》：<https://www.dswxyjy.org.cn/n1/2022/0330/c427167-32387785.html>
- 红岩革命纪念馆（红岩联线）公开介绍页：<https://jjc.cq.gov.cn/html/col616462.htm>

以上来源用于校对“精神内涵、历史阶段、人物与旧址描述”等基础文案。若用于正式比赛提交，建议再结合指导教师要求补充纸质或权威出版物参考信息。

## 扩展建议

- 将 `assets/js/main.js` 中问答与讲解逻辑替换为真实大模型 API。
- 增加语音播放、暗色/浅色切换、更多导览场景与图文素材。

## 评委访问方式

- 建议浏览器：Chrome 最新版。
- 在线访问（GitHub Pages）：<https://yyyymmm0125.github.io/zhihui-hongyan/>
- 本地访问：
  - 在项目目录运行 `python3 -m http.server 8000`
  - 打开 `http://localhost:8000`

## Chrome 测试环境与加载说明

- 测试环境：macOS + Chrome 最新稳定版。
- 建议开启网络访问以便加载在线部署资源；离线演示请使用本地静态服务方式运行。
- 页面包含图片、JSON 数据和前端交互脚本，首次加载后再次访问会更流畅（浏览器缓存生效）。
