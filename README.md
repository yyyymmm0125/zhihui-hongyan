# 智绘红岩：静态数字展馆

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-在线体验-b11226?logo=github)](https://yyyymmm0125.github.io/zhihui-hongyan/)

**智绘红岩** 是一套面向竞赛与教学展示的红岩精神**数字展馆**单页作品：在同一页面串联精神概览（含历史节点与核心内涵卡片）、人物故事、旧址数字导览、AI 讲解与问答、互动答题，突出「可看、可点、可问、可答、可参与」的参观与学习路径。

## 项目简介

- **技术形态**：纯静态（HTML / CSS / JavaScript + 本地 JSON），无后端依赖，可离线演示或通过 GitHub Pages 在线访问。
- **体验设计**：导览节点与 AI 讲解主题联动；问答区提供示例问题一键体验；答题含逐题解析、得分与寄语，并支持返回概览继续学习。
- **在线地址**：[https://yyyymmm0125.github.io/zhihui-hongyan/](https://yyyymmm0125.github.io/zhihui-hongyan/)

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
- 红岩精神概览（简介、三个历史节点、四项核心内涵卡片、时代意义）
- 人物与故事展区（人物卡片 + 详情弹窗）
- 红色旧址数字导览（地点切换联动介绍）
- 暗色/浅色显示切换（顶部一键切换并记忆用户选择）
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

- 本站图片素材存放于 `assets/images/`，均为可公开引用的授权资源，便于离线演示与评审核查。

### 插图素材与许可

- `hero-hongyan-memorial.jpg`
  - 来源：<https://commons.wikimedia.org/wiki/File:%E6%B8%9D%E4%B8%AD_%E7%BA%A2%E5%B2%A9%E7%BA%AA%E5%BF%B5%E9%A6%86%E5%A4%96%C3%97%E5%BB%BA%E5%85%9A100%E5%B9%B4_02.jpg>
  - 许可：CC BY-SA 4.0（站内为 1280px 衍生展示尺寸）
  - 使用位置：首页主视觉
- `chongqing-art-museum.jpg`
  - 来源：<https://commons.wikimedia.org/wiki/File:Chongqing_Art_Museum.jpg>
  - 许可：CC BY-SA 4.0
  - 使用位置：红岩革命纪念馆导览图
- `jiefangbei-2022.jpg`
  - 来源：<https://commons.wikimedia.org/wiki/File:%E9%87%8D%E5%BA%86%E8%A7%A3%E6%94%BE%E7%A2%912022.jpg>
  - 许可：CC BY-SA 4.0
  - 使用位置：桂园导览图
- `chongqing-map.svg`
  - 来源：<https://commons.wikimedia.org/wiki/File:Map_of_China_Chongqing.svg>
  - 许可：CC BY-SA 3.0
  - 使用位置：项目资料图（备用）
- `chongqing-map.png`
  - 来源：<https://commons.wikimedia.org/wiki/File:Chongqing-map.png>
  - 许可：CC BY-SA 3.0
  - 使用位置：概览页历史背景图、旧址模块插图
- `zhougongguan-panorama.jpg`
  - 来源：<https://commons.wikimedia.org/wiki/File:%E5%91%A8%E5%85%AC%E9%A4%A8%E5%85%A8%E6%99%AF.jpg>
  - 许可：CC BY-SA 4.0
  - 使用位置：周公馆旧址导览图
- `zhazidong-site.jpg`
  - 来源：<https://commons.wikimedia.org/wiki/File:ChongqingZhazidong.jpg>
  - 许可：CC BY-SA 4.0
  - 使用位置：渣滓洞旧址导览图
- `xinhua-daily-hq-site.jpg`
  - 来源：<https://commons.wikimedia.org/wiki/File:CQXinhuaNewspaper.jpg>
  - 许可：CC BY-SA 4.0
  - 使用位置：《新华日报》总馆旧址导览图
- `zengjiayan-50-site.jpg`
  - 来源：<https://commons.wikimedia.org/wiki/File:Chongqing_Zengjiayan_50_hao_2014.04.21_10-59-13.jpg>
  - 许可：CC BY-SA 4.0
  - 使用位置：曾家岩50号旧址导览图
- `jiangzhuyun-letter.jpg`
  - 来源：<https://commons.wikimedia.org/wiki/File:Jiang_Zhuyuns_letter.jpg>
  - 许可：CC BY-SA 4.0
  - 使用位置：江竹筠人物卡史料图
- `xuxiaoxuan-letter.jpg`
  - 来源：<https://commons.wikimedia.org/wiki/File:%E8%AE%B8%E6%99%93%E8%BD%A9%E7%8B%B1%E4%B8%AD%E5%AF%84%E7%BB%99%E7%88%B1%E4%BA%BA%E5%A7%9C%E7%BB%AE%E5%8D%8E%E7%9A%84%E4%BF%A1.jpg>
  - 许可：CC BY-SA 4.0
  - 使用位置：许晓轩人物卡史料图
- `hongyan-museum-5118.jpg`
  - 来源：<https://commons.wikimedia.org/wiki/File:%E7%BA%A2%E5%B2%A9%E9%AD%82%E5%8D%9A%E7%89%A9%E9%A6%86_5118.jpg>
  - 许可：CC BY-SA 4.0
  - 使用位置：陈然人物卡相关图
- `hongyan-museum-5123.jpg`
  - 来源：<https://commons.wikimedia.org/wiki/File:%E7%BA%A2%E5%B2%A9%E9%AD%82%E5%8D%9A%E7%89%A9%E9%A6%86_5123.jpg>
  - 许可：CC BY-SA 4.0
  - 使用位置：王朴人物卡相关图

### 史实参考来源

- 《红岩精神的丰富内涵与时代价值》：<https://www.dswxyjy.org.cn/n1/2022/0330/c427167-32387785.html>
- 红岩革命纪念馆（红岩联线）公开介绍页：<https://jjc.cq.gov.cn/html/col616462.htm>

以上来源用于校对“精神内涵、历史阶段、人物与旧址描述”等基础文案。若用于正式比赛提交，建议再结合指导教师要求补充纸质或权威出版物参考信息。

## 评委访问方式

- 建议浏览器：Chrome 最新版。
- 在线访问（GitHub Pages）：<https://yyyymmm0125.github.io/zhihui-hongyan/>
- 本地访问（简版）：在项目目录执行 `python3 -m http.server 8000` 后打开 `http://localhost:8000`。

## Chrome 测试环境与加载说明

- 测试环境：macOS + Chrome 最新稳定版。
- 建议开启网络访问以便加载在线部署资源；离线演示请使用本地静态服务方式运行。
- 页面包含图片、JSON 数据和前端交互脚本，首次加载后再次访问会更流畅（浏览器缓存生效）。
