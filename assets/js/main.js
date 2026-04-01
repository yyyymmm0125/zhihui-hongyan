const dataUrls = {
  overview: "./assets/data/overview.json",
  figures: "./assets/data/figures.json",
  sites: "./assets/data/sites.json",
  guide: "./assets/data/guide.json",
  qa: "./assets/data/qa.json",
  quiz: "./assets/data/quiz.json"
};

const state = {
  guideData: {},
  qaData: null,
  quizData: [],
  currentSiteIndex: 0
};

let guideTimer = null;
const guideBasicQuestions = [
  "红岩精神的核心内涵是什么？",
  "为什么红岩精神值得当代青年学习？",
  "白公馆旧址的历史意义是什么？",
  "渣滓洞旧址体现了什么精神？"
];

const fallbackData = {
  overview: {
    timeline: [{ period: "红岩精神", desc: "请在本地服务模式下加载完整数据。" }],
    values: [{ name: "坚定信念", desc: "请在本地服务模式下加载完整数据。" }]
  },
  figures: [
    {
      name: "江竹筠（江姐）",
      intro: "红岩英烈代表人物之一。",
      keywords: ["信仰", "坚贞", "奉献"],
      image: "./assets/images/jiefangbei-2022.jpg",
      storyParagraphs: ["请在本地服务模式下加载完整人物故事数据。"]
    }
  ],
  sites: [
    {
      name: "红岩革命纪念馆",
      summary: "系统展示中共中央南方局在重庆的革命实践。",
      detail: "请在本地服务模式下加载完整旧址数据。",
      image: "./assets/images/chongqing-art-museum.jpg",
      storyTitle: "旧址故事",
      storyParagraphs: ["请在本地服务模式下加载完整旧址故事数据。"]
    }
  ],
  guide: {
    "江竹筠（江姐）": {
      plain: "江竹筠在严酷考验中坚守信仰，体现了红岩精神。",
      youth: "江姐在最难时刻仍坚持忠诚与担当，这种选择今天依然有力量。",
      formal: "江竹筠长期从事党的地下工作，被捕后在残酷迫害下依然严守组织机密，体现了共产党人的崇高气节。"
    }
  },
  qa: {
    samples: ["红岩精神的核心内涵是什么？"],
    rules: [
      {
        keywords: ["核心", "内涵"],
        answer: "红岩精神的核心内涵包括理想信念、爱国情怀、斗争意志和浩然正气。"
      }
    ],
    fallback: "请尝试从信仰、担当、实践和团结四个维度来提问。"
  },
  quiz: [
    {
      question: "红岩精神的重要内涵之一是：",
      options: ["及时享乐", "坚定理想信念", "回避责任", "个人利益优先"],
      answerIndex: 1
    }
  ]
};

document.addEventListener("DOMContentLoaded", async () => {
  setupNav();
  setupReveal();
  setupModals();
  setupActions();
  await bootstrapData();
});

function setupNav() {
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  menuToggle.addEventListener("click", () => {
    const next = !nav.classList.contains("open");
    nav.classList.toggle("open", next);
    menuToggle.setAttribute("aria-expanded", String(next));
  });

  const links = Array.from(document.querySelectorAll(".main-nav a"));
  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.remove("active"));
        const targetLink = links.find((link) => link.getAttribute("href") === `#${entry.target.id}`);
        if (targetLink) targetLink.classList.add("active");
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
  );
  sections.forEach((section) => observer.observe(section));
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.16 }
  );
  items.forEach((el) => observer.observe(el));
}

function setupModals() {
  const figureModal = document.getElementById("figureModal");
  const closeFigure = document.getElementById("closeModal");
  const siteStoryModal = document.getElementById("siteStoryModal");
  const closeSiteStory = document.getElementById("closeSiteStory");

  closeFigure.addEventListener("click", closeFigureModal);
  figureModal.addEventListener("click", (event) => {
    if (event.target === figureModal) closeFigureModal();
  });

  closeSiteStory.addEventListener("click", closeSiteStoryModal);
  siteStoryModal.addEventListener("click", (event) => {
    if (event.target === siteStoryModal) closeSiteStoryModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeFigureModal();
    closeSiteStoryModal();
  });
}

function setupActions() {
  document.getElementById("askBtn").addEventListener("click", handleQuestionSubmit);
  document.getElementById("qaInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleQuestionSubmit();
    }
  });
  document.getElementById("generateGuide").addEventListener("click", renderGuide);
  document.getElementById("reGuide").addEventListener("click", renderGuide);
  document.getElementById("submitQuiz").addEventListener("click", submitQuiz);
  document.getElementById("resetQuiz").addEventListener("click", resetQuiz);
  document.getElementById("guideBasicQuestions").addEventListener("click", (event) => {
    const btn = event.target.closest(".guide-q-btn");
    if (!btn) return;
    renderGuideQuestionAnswer(btn.dataset.question || "");
  });
}

async function bootstrapData() {
  try {
    const [overview, figures, sites, guide, qa, quiz] = await Promise.all([
      fetchJson(dataUrls.overview),
      fetchJson(dataUrls.figures),
      fetchJson(dataUrls.sites),
      fetchJson(dataUrls.guide),
      fetchJson(dataUrls.qa),
      fetchJson(dataUrls.quiz)
    ]);
    initFromData({ overview, figures, sites, guide, qa, quiz });
  } catch (error) {
    console.error(error);
    initFromData(fallbackData);
    appendBubble("ai", "已切换到内置离线数据模式，你可以继续体验。");
  }
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load: ${url}`);
  return response.json();
}

function initFromData(payload) {
  state.guideData = payload.guide;
  state.qaData = payload.qa;
  state.quizData = payload.quiz;
  renderOverview(payload.overview);
  renderFigures(payload.figures);
  renderSites(payload.sites);
  renderGuideOptions(payload.guide);
  renderGuideBasicQuestions();
  renderGuide();
  renderSamples(payload.qa.samples);
  appendBubble("ai", "你好，我是红岩数字讲解助手。你可以点击示例问题或直接输入问题。");
  renderQuiz(payload.quiz);
}

function renderGuideBasicQuestions() {
  const box = document.getElementById("guideBasicQuestions");
  box.innerHTML = guideBasicQuestions
    .map((question) => `<button class="guide-q-btn" type="button" data-question="${question}">${question}</button>`)
    .join("");
}

function renderOverview(data) {
  const intro = document.getElementById("overviewIntro");
  intro.textContent = data.intro || "红岩精神是中国共产党人革命斗争实践中形成的宝贵精神财富。";

  const timeline = document.getElementById("timeline");
  timeline.innerHTML = data.timeline.map((item) => `<li><strong>${item.period}</strong>：${item.desc}</li>`).join("");

  const valueCards = document.getElementById("valueCards");
  valueCards.innerHTML = data.values
    .map(
      (value) => `
      <article class="card value-card reveal">
        <span class="tag">核心价值</span>
        <h3>${value.name}</h3>
        <p>${value.desc}</p>
      </article>
    `
    )
    .join("");

  const meaningTitle = document.getElementById("meaningTitle");
  const meaningPoints = document.getElementById("meaningPoints");
  if (data.meaning && Array.isArray(data.meaning.points)) {
    meaningTitle.textContent = data.meaning.title || "时代意义";
    meaningPoints.innerHTML = data.meaning.points.map((point) => `<li>${point}</li>`).join("");
  } else {
    meaningTitle.textContent = "时代意义";
    meaningPoints.innerHTML = "<li>在新时代持续传承红岩精神，有助于青年形成清晰的价值判断与责任意识。</li>";
  }
}

function renderFigures(figures) {
  const container = document.getElementById("figureCards");
  container.innerHTML = figures
    .map(
      (figure, idx) => `
      <article class="card">
        ${figure.image ? `<img class="site-image" src="${figure.image}" alt="${figure.name}相关插图">` : ""}
        <span class="tag">人物风采</span>
        <h3>${figure.name}</h3>
        <p>${figure.intro}</p>
        <p class="figure-preview">${figure.preview || briefText(figure.storyParagraphs && figure.storyParagraphs[0], 76)}</p>
        <p class="tagline">${figure.keywords.join(" · ")}</p>
        <div class="figure-actions">
          <button class="btn btn-ghost figure-more" data-index="${idx}">了解更多</button>
          <button class="btn btn-primary figure-ai" data-topic="${figure.name}">AI 听他/她讲</button>
        </div>
      </article>
    `
    )
    .join("");

  container.querySelectorAll(".figure-more").forEach((btn) => {
    btn.addEventListener("click", () => openFigureModal(figures[Number(btn.dataset.index)]));
  });

  container.querySelectorAll(".figure-ai").forEach((btn) => {
    btn.addEventListener("click", () => jumpToGuideTopic(btn.dataset.topic || ""));
  });
}

function openFigureModal(detail) {
  document.getElementById("figureModalTitle").textContent = detail.name;
  document.getElementById("figureModalKeywords").textContent = detail.keywords.join(" · ");
  document.getElementById("figureModalDesc").textContent = detail.intro;
  const storyWrap = document.getElementById("figureModalStory");
  const paragraphs = detail.storyParagraphs || [detail.story || "暂无故事内容。"];
  storyWrap.innerHTML = paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
  const modal = document.getElementById("figureModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeFigureModal() {
  const modal = document.getElementById("figureModal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function renderSites(sites) {
  const list = document.getElementById("siteList");
  list.innerHTML = sites
    .map(
      (site, index) => `
      <button class="site-item ${index === 0 ? "active" : ""}" data-index="${index}">
        ${site.name}
      </button>
    `
    )
    .join("");

  list.querySelectorAll(".site-item").forEach((item) => {
    item.addEventListener("click", () => {
      state.currentSiteIndex = Number(item.dataset.index);
      list.querySelectorAll(".site-item").forEach((x) => x.classList.remove("active"));
      item.classList.add("active");
      renderSiteDetail(sites[state.currentSiteIndex]);
    });
  });

  renderSiteDetail(sites[0]);
}

function renderSiteDetail(site) {
  const storyPreview = briefText(site.storyParagraphs && site.storyParagraphs[0], 96);
  const detail = document.getElementById("siteDetail");
  detail.innerHTML = `
    ${site.image ? `<img class="site-image" src="${site.image}" alt="${site.name}图片">` : `<div class="site-image" aria-hidden="true"></div>`}
    <h3>${site.name}</h3>
    <p><strong>展区概述：</strong>${site.summary}</p>
    <p><strong>历史意义：</strong>${site.detail}</p>
    <p><strong>故事切片：</strong>${storyPreview}</p>
    <div class="site-actions">
      <button class="btn btn-ghost" id="siteStoryBtn" type="button">点击地点查看故事</button>
      <button class="btn btn-primary" id="siteAiBtn" type="button">AI讲解这个地点</button>
    </div>
  `;

  document.getElementById("siteStoryBtn").addEventListener("click", () => openSiteStoryModal(site));
  document.getElementById("siteAiBtn").addEventListener("click", () => {
    jumpToGuideTopic(site.aiTopic || site.name);
  });
}

function openSiteStoryModal(site) {
  document.getElementById("siteStoryTitle").textContent = site.storyTitle || `${site.name}故事`;
  const body = document.getElementById("siteStoryBody");
  const paragraphs = site.storyParagraphs || ["暂无故事内容。"];
  body.innerHTML = paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
  const modal = document.getElementById("siteStoryModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeSiteStoryModal() {
  const modal = document.getElementById("siteStoryModal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function renderGuideOptions(guideData) {
  const topicSelect = document.getElementById("guideTopic");
  topicSelect.innerHTML = Object.keys(guideData).map((topic) => `<option value="${topic}">${topic}</option>`).join("");
}

function renderGuide() {
  const topic = document.getElementById("guideTopic").value;
  const style = document.getElementById("guideStyle").value;
  const output = document.getElementById("guideOutput");
  if (!topic || !state.guideData[topic]) {
    output.textContent = "请选择主题后开始讲解。";
    return;
  }

  output.textContent = "";
  if (guideTimer) window.clearInterval(guideTimer);
  const styleLabel = style === "plain" ? "简版讲解" : style === "youth" ? "青年版讲解" : "详版讲解";
  const text = `[${styleLabel}] ${state.guideData[topic][style] || "该讲解风格暂未配置。"}`;
  typeText(output, text, 18);
}

function renderGuideQuestionAnswer(question) {
  if (!question) return;
  const output = document.getElementById("guideOutput");
  const style = document.getElementById("guideStyle").value;
  const base = resolveAnswer(question, state.qaData.rules, state.qaData.fallback);
  const styled = formatGuideAnswerByStyle(style, base);
  if (guideTimer) window.clearInterval(guideTimer);
  output.textContent = "";
  typeText(output, styled, 14);
}

function formatGuideAnswerByStyle(style, answer) {
  if (style === "plain") {
    const short = answer.split("。")[0];
    return `[简版问答] ${short}。`;
  }
  if (style === "youth") {
    return `[青年版问答] ${answer} 这和我们在学习与实践中的责任担当直接相关。`;
  }
  return `[详版问答] ${answer} 从红岩精神谱系看，这一问题的关键在于把理想信念转化为持续行动，并在集体协作中体现社会责任。`;
}

function jumpToGuideTopic(topic) {
  if (!topic) return;
  const select = document.getElementById("guideTopic");
  const options = Array.from(select.options).map((option) => option.value);
  if (options.includes(topic)) {
    select.value = topic;
    renderGuide();
  }
  const guideSection = document.getElementById("guide");
  guideSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function briefText(text, length) {
  if (!text) return "暂无内容。";
  return text.length > length ? `${text.slice(0, length)}...` : text;
}

function typeText(target, text, speed) {
  let index = 0;
  guideTimer = setInterval(() => {
    target.textContent += text[index] || "";
    index += 1;
    if (index >= text.length) window.clearInterval(guideTimer);
  }, speed);
}

function renderSamples(samples) {
  const container = document.getElementById("sampleQuestions");
  container.innerHTML = samples.map((sample) => `<button class="sample-btn" type="button">${sample}</button>`).join("");
  container.querySelectorAll(".sample-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("qaInput").value = btn.textContent;
      handleQuestionSubmit();
    });
  });
}

function handleQuestionSubmit() {
  const input = document.getElementById("qaInput");
  const question = input.value.trim();
  if (!question) return;
  appendBubble("user", question);
  const answer = resolveAnswer(question, state.qaData.rules, state.qaData.fallback);
  window.setTimeout(() => appendBubble("ai", answer), 260);
  input.value = "";
}

function resolveAnswer(question, rules, fallback) {
  const q = question.toLowerCase();
  const matched = rules.find((rule) => rule.keywords.some((key) => q.includes(key.toLowerCase())));
  return matched ? matched.answer : fallback;
}

function appendBubble(role, text) {
  const win = document.getElementById("chatWindow");
  const node = document.createElement("div");
  node.className = `bubble ${role}`;
  node.textContent = text;
  win.appendChild(node);
  win.scrollTop = win.scrollHeight;
}

function renderQuiz(quizData) {
  const form = document.getElementById("quizForm");
  form.innerHTML = quizData
    .map((item, qIndex) => {
      const options = item.options
        .map(
          (option, oIndex) => `
          <label>
            <input type="radio" name="q${qIndex}" value="${oIndex}">
            ${option}
          </label>
        `
        )
        .join("");
      return `
        <fieldset class="quiz-item">
          <legend>${qIndex + 1}. ${item.question}</legend>
          ${options}
        </fieldset>
      `;
    })
    .join("");
}

function submitQuiz() {
  let score = 0;
  state.quizData.forEach((item, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && Number(selected.value) === item.answerIndex) score += 1;
  });
  const result = document.getElementById("quizResult");
  const comment = getQuizComment(score, state.quizData.length);
  result.innerHTML = `<h3>你的得分：${score} / ${state.quizData.length}</h3><p>${comment}</p>`;
}

function resetQuiz() {
  document.querySelectorAll("#quizForm input[type='radio']").forEach((input) => {
    input.checked = false;
  });
  document.getElementById("quizResult").textContent = "挑战已重置，欢迎再次作答。";
}

function getQuizComment(score, total) {
  if (score === total) return "满分！你对红岩精神有扎实理解，继续做积极传播者。";
  if (score >= total - 1) return "表现优秀！你已把握核心内涵，再结合实践会更深入。";
  if (score >= Math.ceil(total / 2)) return "不错的开始！建议回看人物与旧址内容，再次挑战。";
  return "继续加油！建议先浏览概览与讲解模块，再来冲击更高分。";
}
