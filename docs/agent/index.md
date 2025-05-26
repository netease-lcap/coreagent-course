### 智能体是什么？

![image](https://github.com/user-attachments/assets/383da058-eb1a-40d0-8b8e-5c221ada00af)

#### 如何创建智能体？

1. 创建空白智能体

创建一个全新的空应用

<img width="581" alt="截屏2025-05-14 14 20 30" src="https://github.com/user-attachments/assets/9c35c689-8aa8-431f-98ba-75d38bdf2d71" />


2. 从模版创建智能体

平台内置一些智能体模版，可以直接使用

<img width="1014" alt="截屏2025-05-14 14 21 20" src="https://github.com/user-attachments/assets/177109b4-228f-47c3-a55a-2d09853cc4b3" />


3. 导入DSL创建智能体

可从CoreAgent导出DSL文件进行智能体创建

<img width="573" alt="截屏2025-05-14 14 21 38" src="https://github.com/user-attachments/assets/5e60bd5a-864b-413a-8348-bf994da41848" />


#### 给智能体添加标签

便于查找归类，一个应用可以拥有多个标签

<img width="299" alt="截屏2025-05-14 14 19 06" src="https://github.com/user-attachments/assets/f1960217-1311-40ee-ba8e-ee6370d4b50b" />



## 智能体应用有哪些类型？

### 聊天助手

> 你问一句他回答一句。

能够与用户进行对话交互的应用程序。你可以把它想象成一个智能的聊天伙伴，能理解你说的话并给出相应的回答。

案例：CodeWave客服助手

```txt
CodeWave客服助手

要求读取官网文档进行回答用户问题，要求回答准确


```

<img width="581" alt="截屏2025-05-14 14 28 47" src="https://github.com/user-attachments/assets/d7678bcf-6015-4e3a-ad62-6cc79fded110" />

![image](https://github.com/user-attachments/assets/6e3c6235-053a-43e8-b5f7-e66c3e37fadf)


### 对话流

> 引导用户去做一件事情，以对话形式的工作流。

面向对话类情景的工作流编排模式，用于构建需要多轮对话交互的应用，如客户服务、语义搜索等。它就像是一个精心设计的对话流程框架，从用户输入问题开始，到生成回答，再到用户对回答进行追问或修改要求等多轮交互，都有明确的流程和节点来处理。

案例：低代码咨询

```txt
低代码咨询

1、根据用户询问的问题进行分支
2、用户询问低代码选型或者前景等问题，根据白皮书知识库（CodeWave介绍资料）进行回答
3、用户询问CodeWave平台使用问题。根据官网文档知识库进行回答
4、若问其他问题则引导用户提问上面两类问题

使用到的组件节点
1、开始
2、问题分类器
3、知识检索
4、LLM
5、直接回复

```

![image](https://github.com/user-attachments/assets/5458614c-283c-4f1f-b1ee-4918da0c15bd)


### 工作流

> 全自动完成一个系统的业务流程。

主要面向自动化和批处理情景，适用于高质量翻译、数据分析、内容生成、电子邮件自动化等应用。它更侧重于一次性地处理任务并生成结果，将复杂的任务分解成多个较小的步骤（节点），通过连接不同功能的节点来执行一系列操作，就像一条生产流水线，从输入指令开始，经过各个处理环节，最后输出结果，通常不需要像对话流那样进行多轮的用户交互。

案例：妙笔生花工作流-将英文文档润色翻译

```txt
妙笔生花工作流

要求用户输入英文文章url链接，进行翻译润色
1、从url抓取页面
2、初步翻译页面
3、三个LLM分别从语言流畅性与地道性、内容准确性与逻辑性、风格一致性与读者适配性三个维度对初稿进行评审，并提出具体的修改建议。
4、根据三位专家的分析进行综合改进
5、对改进后的中文文章进行润色

使用到的组件节点
1、开始
2、工具-firecrawl-单页面抓取
3、LLM
4、结束

```

![image](https://github.com/user-attachments/assets/bdc7a6ef-24d5-4bbe-a2c6-ee9389f2a12d)

![image](https://github.com/user-attachments/assets/82403509-02fd-41d0-bf19-d8cfbb4e1192)

![image](https://github.com/user-attachments/assets/b00f4089-bfd1-4efe-97ae-6ee3abcaa7af)

![image](https://github.com/user-attachments/assets/aa3bd85d-6aac-4c83-bd68-811b5977da21)



## 测试题

### 测试1  ---聊天助手

岗位职责生成助手

```txt
案例实践：岗位职责生成助手需求分析
询问一个岗位，聊天助手回答以下内容
岗位名称
所属行业
任职资格
职业发展
岗位职责
知识基础：掌握人力资源专业知识，并具备对岗位职能的理解能力。

```

![image](https://github.com/user-attachments/assets/9607a138-e519-42d2-81d4-f8be632aa803)


### 测试2  ---对话流

```txt
案例实践：问诊小助手
询问病情：
如果没说年龄和岁数，就提示要说年龄和岁数
如果说了年龄岁数，但是没说具体病情，提示说病情
如果都说了开始分析病情并给出建议


使用到的组件节点：
1、开始
2、LLM
3、参数提取器
4、条件分支
5、直接回复

```

![image](https://github.com/user-attachments/assets/80b2f4d1-8880-46b1-b697-52e419727441)

### 测试3  ---工作流

```txt
案例实践：短篇小说作家

1、根据用户输入，AI生成创意点子
2、根据创意点子搜索互联网并创作小说大纲
3、根据大纲生成小说的概要
4、根据小说大纲和概要分别生成小说的开场、发展、冲突、高潮、结局
5、统一后结束返回

使用到的组件节点
1、开始
2、LLM
3、参数提取器
4、工具-Google搜索
5、代码执行
6、结束

```

> 做案例时Google搜索无法使用

![image](https://github.com/user-attachments/assets/4df9703b-d246-4649-8a0f-8a11e034b343)
![image](https://github.com/user-attachments/assets/8d42ebb6-0479-4480-b9b3-378b64f97d77)
![image](https://github.com/user-attachments/assets/53434fd8-5440-4aa4-a132-8ab980f7fdfe)

### 测试4 ---工作流

```txt
案例实践：低代码试题生成

1、根据用户输入知识点、生成题目类型、生成数量进行题目生成
2、读取知识库官网文档进行出题
3、选择题使用迭代组件给每个题目标题加上括号（训练一下迭代组件）
4、最后输出有选项和答案

使用到的组件节点
1、开始
2、知识检索
3、条件分支
4、LLM
5、参数提取器
6、迭代
7、代码执行
8、结束

```

![image](https://github.com/user-attachments/assets/2b0aa7bc-fc1b-4262-b875-78d565225501)

### 测试5 ---工作流

```txt
案例实践：多个Url进行页面分析总结

用户要求分析多个url链接，最后返回总结后的文字数组

使用到的组件节点
1、开始
2、参数提取器
3、迭代
4、工具-firecrawl-单页面抓取
5、LLM
6、结束

```

![image](https://github.com/user-attachments/assets/af884376-1446-4514-923c-8d6828b55d2b)

