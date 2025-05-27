---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "CoreAgent培训课程"
#   text: "A VitePress Site"
  tagline: 系统性掌握智能体落地的核心能力
#   image:
#     src: /logo.png
#     alt: VitePress
  actions:
    - theme: brand
      text: 开始学习
      link: /introduction
    - theme: alt
      text: GitHub
      link: https://github.com/netease-lcap/codewave-architect-course
   
features:
  - icon: 🧑‍💻
    title: 大模型概念
    details: AI、深度学习、大模型、智能体
    link: /llm/agent
  - icon: 🛠️
    title: 提示词工程
    details: 提示词分类、提示词设计、提示词测试
    link: /prompt
  - icon: 📝
    title: 智能体开发
    details: 智能体开发、智能体部署、智能体测试
    link: /agent
  - icon: 🏗️
    title: 知识库搭建
    details: 向量数据库、知识图谱、语义检索
    link: /knowledge
  
---
<style module>
:root {
  --vp-home-hero-name-color: transparent;
  /* --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff); */
  --vp-home-hero-name-background: -webkit-linear-gradient(135deg, #29e0c9, #6463f4);
  /* --vp-home-hero-name-background: -webkit-linear-gradient(90deg, #a88beb, #f2a6c8); */
  /* --vp-home-hero-name-background: -webkit-linear-gradient(210deg, #ff5e3a, #ffd43b); */
}
</style>