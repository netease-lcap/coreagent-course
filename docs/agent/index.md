## CoreAgent操作指南

### 智能体

![image](https://github.com/user-attachments/assets/383da058-eb1a-40d0-8b8e-5c221ada00af)

### 如何创建智能体？

1. 创建空白智能体

创建一个全新的空应用

<img width="581" alt="截屏2025-05-14 14 20 30" src="https://github.com/user-attachments/assets/9c35c689-8aa8-431f-98ba-75d38bdf2d71" />


2. 从模版创建智能体

平台内置一些智能体模版，可以直接使用

<img width="1014" alt="截屏2025-05-14 14 21 20" src="https://github.com/user-attachments/assets/177109b4-228f-47c3-a55a-2d09853cc4b3" />


3. 导入DSL创建智能体

可从CoreAgent导出DSL文件进行智能体创建

<img width="573" alt="截屏2025-05-14 14 21 38" src="https://github.com/user-attachments/assets/5e60bd5a-864b-413a-8348-bf994da41848" />


### 给智能体添加标签

便于查找归类，一个应用可以拥有多个标签

<img width="299" alt="截屏2025-05-14 14 19 06" src="https://github.com/user-attachments/assets/f1960217-1311-40ee-ba8e-ee6370d4b50b" />

### 编排智能体有哪些组件节点？

#### 注释

对每个节点进行说明或对整个工作流进行解释

<img width="388" alt="image" src="https://github.com/user-attachments/assets/baf5d855-935a-478f-9b71-05a0e4840828" />


#### 开始节点

“开始” 节点是每个对话流/工作流必备的预设节点，不可移除，为后续工作流节点以及应用的正常流转提供必要的初始信息，例如应用使用者所输入的内容、以及上传的文件等。在开始节点的设置页，你可以看到两部分设置：允许开发者自行添加的输入字段、系统预设的系统变量。

<img width="428" alt="image" src="https://github.com/user-attachments/assets/1f9a0ccc-3997-47df-8260-215a2063a926" />


#### LLM

调用大语言模型的能力，处理前置节点中输入的信息（通常是由开始节点输入的自然语言、上传的文件或图片），给出有效的回应信息。在应用编辑页中，点击鼠标右键或轻点上一节点末尾的 + 号，添加节点并选择 LLM。

<img width="429" alt="image" src="https://github.com/user-attachments/assets/1a6bc7d2-b771-4de9-8018-3fbfa4a5ff0e" />


#### 知识检索

从知识库中检索与用户问题相关的文本内容，可作为下游 LLM 节点的上下文来使用。

<img width="430" alt="image" src="https://github.com/user-attachments/assets/bf9368b5-8848-489f-9a4f-59990680dadd" />


#### 问题分类

通过定义分类描述，问题分类器能够根据用户输入，使用 LLM 推理与之相匹配的分类并输出分类结果，向下游节点提供更加精确的信息。

![image](https://github.com/user-attachments/assets/f7a62cb9-575d-4ba3-ad8b-27cf94f8d738)


#### 条件分支

根据 If/else/elif 条件将 Chatflow / Workflow 流程拆分成多个分支。

<img width="435" alt="image" src="https://github.com/user-attachments/assets/e8615d40-e853-4b62-8af8-f8706460482f" />


#### 代码执行

代码节点支持运行 Python / NodeJS 代码以在工作流程中执行数据转换。它可以简化你的工作流程，适用于Arithmetic、JSON transform、文本处理等情景。该节点极大地增强了开发人员的灵活性，使他们能够在工作流程中嵌入自定义的 Python 或 Javascript 脚本，并以预设节点无法达到的方式操作变量。通过配置选项，你可以指明所需的输入和输出变量，并撰写相应的执行代码：

<img width="428" alt="image" src="https://github.com/user-attachments/assets/f7d2ef83-be81-4d13-af80-58d313b44e9c" />


#### 模板转换

模板转换节点允许你借助 Jinja2 这一强大的 Python 模板语言，在工作流内实现轻量、灵活的数据转换，适用于文本处理、JSON 转换等情景。例如灵活地格式化并合并来自前面步骤的变量，创建出单一的文本输出。这非常适合于将多个数据源的信息汇总成一个特定格式，满足后续步骤的需求。

Jinja官方文档：https://docs.jinkan.org/docs/jinja2/

<img width="428" alt="image" src="https://github.com/user-attachments/assets/a50542b2-d1f9-4bd7-a255-db4b6e213e3d" />


#### 文档提取器

LLM 自身无法直接读取或解释文档的内容。因此需要将用户上传的文档，通过文档提取器节点解析并读取文档文件中的信息，转化文本之后再将内容传给 LLM 以实现对于文件内容的处理。

<img width="429" alt="image" src="https://github.com/user-attachments/assets/45bf2c5d-5b62-4d50-a063-d963a62bd1a9" />


#### 列表操作

列表操作节点仅接受以下数据结构变量：

Array[string]
Array[number]
Array[file]

相当于CodeWave中列表内置函数

文件列表变量支持同时上传文档文件、图片、音频与视频文件等多种文件。应用使用者在上传文件时，所有文件都存储在同一个Array[File]数组类型变量内，不利于后续单独处理文件。列表操作节点可以在数组变量内提取单独的元素，便于后续节点处理。

Array数据类型意味着该变量的实际值可能为 [1.mp3, 2.png, 3.doc]，大语言模型（LLM）仅支持读取图片文件或文本内容等单一值作为输入变量，无法直接读取数组变量，通常需要配合列表操作节点一起使用。

<img width="428" alt="image" src="https://github.com/user-attachments/assets/d7fd2e17-cb20-4e75-95c2-571a14cc30ac" />


#### 变量聚合

将多路分支的变量聚合为一个变量，以实现下游节点统一配置。

变量聚合节点（原变量赋值节点）是工作流程中的一个关键节点，它负责整合不同分支的输出结果，确保无论哪个分支被执行，其结果都能通过一个统一的变量来引用和访问。这在多分支的情况下非常有用，可将不同分支下相同作用的变量映射为一个输出变量，避免下游节点重复定义。

<img width="434" alt="image" src="https://github.com/user-attachments/assets/46004fcd-5c6d-400d-9576-a7041886b09c" />


#### 变量赋值

变量赋值节点用于向可写入变量进行变量赋值，已支持以下可写入变量：会话变量、循环变量

用法：通过变量赋值节点，你可以将工作流内的变量赋值到会话变量中用于临时存储，并可以在后续对话中持续引用。

使用场景：将对话过程中的上下文、上传至对话框的文件、用户所输入的偏好信息等变量，通过变量赋值节点写入至会话变量内，用作后续对话的参考信息。

<img width="432" alt="image" src="https://github.com/user-attachments/assets/7dc7b62a-c9c2-45b5-9bc1-c2206595e4a9" />


#### 迭代

对数组中的元素依次执行相同的操作步骤，直至输出所有结果，可以理解为任务批处理器。迭代节点通常配合数组变量使用。

例如在长文翻译迭代节点内，如果将所有内容输入至 LLM 节点，有可能会达到单次对话限制。上游节点可以先将长文拆分为了多个片段，配合迭代节点对各个片段执行批量翻译，以避免达到 LLM 单次对话的消息限制。

使用迭代的条件是确保输入值已格式化为列表对象；迭代节点将依次处理迭代开始节点数组变量内的所有元素，每个元素遵循相同的处理步骤，每轮处理被称为一个迭代，最终输出处理结果。迭代节点的结构通常包含输入变量、迭代工作流、输出变量三个功能单元。

+ 输入变量：仅接受 Array 数组变量类型数据。如果你不了解什么是数组变量，请阅读扩展阅读：数组。
+ 迭代工作流：你可以在迭代节点中使用多个工作流节点，编排不同的任务步骤。
+ 输出变量：仅支持输出数组变量Array[List]。如果你想要输出其它变量格式，请阅读扩展阅读：如何将数组转换为文本。

<img width="1009" alt="image" src="https://github.com/user-attachments/assets/216fcd0c-8fbf-43e7-973f-b7fe927be14c" />

#### 循环

循环（Loop）节点用于执行依赖前一轮结果的重复任务，直到满足退出条件或达到最大循环次数。

<img width="1007" alt="image" src="https://github.com/user-attachments/assets/0fe0e875-1896-4e1a-9ed5-f8d6bdb26cdb" />


| 类型              | 特点                                                         | 适用场景                                       |
| ----------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| 循环（Loop）      | 轮次之间存在依赖关系的优化型任务。即任务的每一轮执行都依赖上一轮的结果。 | 需要前一轮的计算结果，适用于递归、优化问题等。 |
| 迭代（Iteration） | 轮次之间无依赖关系的批处理任务。即每一轮任务可以独立运行，无需依赖前一轮。 | 每轮独立执行，可用于数据批量处理等。           |


#### 参数提取

利用 LLM 从自然语言推理并提取结构化参数，用于后置的工具调用或 HTTP 请求。

CoreAgent 工作流内提供了丰富的工具选择，其中大多数工具的输入为结构化参数，参数提取器可以将用户的自然语言转换为工具可识别的参数，方便工具调用。

工作流内的部分节点有特定的数据格式传入要求，如迭代节点的输入要求为数组格式，参数提取器可以方便的实现结构化参数的转换。

<img width="235" alt="image" src="https://github.com/user-attachments/assets/0bc5902f-3c70-4123-a246-5fc030ab488e" />


#### HTTP 请求

允许通过 HTTP 协议发送服务器请求，适用于获取外部数据、webhook、生成图片、下载文件等情景。它让你能够向指定的网络地址发送定制化的 HTTP 请求，实现与各种外部服务的互联互通。

该节点支持常见的 HTTP 请求方法：

+ GET，用于请求服务器发送某个资源。
+ POST，用于向服务器提交数据，通常用于提交表单或上传文件。
+ HEAD，类似于 GET 请求，但服务器不返回请求的资源主体，只返回响应头。
+ PATCH，用于在请求-响应链上的每个节点获取传输路径。
+ PUT，用于向服务器上传资源，通常用于更新已存在的资源或创建新的资源。
+ DELETE，用于请求服务器删除指定的资源。

可以通过配置 HTTP 请求的包括 URL、请求头、查询参数、请求体内容以及认证信息等。

<img width="429" alt="image" src="https://github.com/user-attachments/assets/d7e2318e-4f39-4e36-ab8c-9d23c549183c" />


#### Agent

Agent 节点是 CoreAgent 对话流/工作流 中用于实现自主工具调用的组件。它通过集成不同的 Agent 推理策略，使大语言模型能够在运行时动态选择并执行工具，从而实现多步推理。

<img width="436" alt="image" src="https://github.com/user-attachments/assets/afc35c49-ccc6-4e70-bb21-4ec57dd9e49f" />


#### 工具

+ 插件
+ 自定义工具
+ 工作流

<img width="357" alt="image" src="https://github.com/user-attachments/assets/240fa5b5-a1e4-4a03-9880-550e97345703" />


#### 结束

定义一个工作流程结束的最终输出内容。每一个工作流在完整执行后都需要至少一个结束节点，用于输出完整执行的最终结果。

结束节点为流程终止节点，后面无法再添加其他节点，工作流应用中只有运行到结束节点才会输出执行结果。若流程中出现条件分叉，则需要定义多个结束节点。

结束节点需要声明一个或多个输出变量，声明时可以引用任意上游节点的输出变量。

<img width="429" alt="image" src="https://github.com/user-attachments/assets/16dc31ad-09e0-4b61-b79e-08ebe26c06a9" />


#### 直接回复

定义一个对话流中的回复内容。

与工作流结束的区别：还可以继续后置节点。

你可以在文本编辑器中自由定义回复格式，包括自定义一段固定的文本内容、使用前置步骤中的输出变量作为回复内容、或者将自定义文本与变量组合后回复。

可随时加入节点将内容流式输出至对话回复，支持所见即所得配置模式并支持图文混排，如：

+ 输出 LLM 节点回复内容
+ 输出生成图片
+ 输出纯文本

<img width="426" alt="image" src="https://github.com/user-attachments/assets/9a5075a3-8d1b-40fc-ab93-98249a1ffc26" />


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

