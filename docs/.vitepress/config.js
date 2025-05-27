const { link } = require("fs");

module.exports = {
    title: 'CoreAgent培训课程',
    description: '',
    themeConfig: {

        outline: [2, 4], // 显示 h2 和 h3 标题
        nav: [
            { text: '大模型概论', link: '/llm/history' },
            { text: '提示词工程', link: '/prompt' },
            { text: '智能体开发', link: '/agent' },
            { text: '知识库搭建', link: '/architecture' }
        ],
        sidebar:
            [
                {
                    text: '大模型概论',
                    link: '/llm/agent',
                    items: [
                        { text: 'AI与大模型历史', link: '/llm/history' },
                        { text: 'Transformer与AIGC', link: '/llm/aigc' },
                        { text: '大模型应用架构', link: '/llm/agent' },
                    ]
                },
                {
                    text: '提示词工程',
                    link: '/prompt',
                    items: [
                        { text: '提示词分类', link: '/prompt/#_2-1-提示词的分类方法' },
                        { text: '结构化方法论', link: '/prompt/#_2-2-结构化提示词方法论' },
                    ]
                },
                {
                    text: '智能体开发',
                    link: '/agent',
                    items: [
                        { text: '什么是智能体', link: '/agent/index' },
                        {
                            text: '聊天助手', link: '/agent/chat'
                        },
                        { text: '工作流', link: '/agent/workflow' },
                        { text: '对话流', link: '/agent/dialogueFlow' },
                    ]
                },
                {
                    text: '知识库搭建',
                    link: '/knowledge',
                    items: [
                        { text: '什么是知识库', link: '/knowledge/#_1-1-1-什么是知识库' },
                        { text: '知识库作用', link: '/knowledge/#_1-1-3-知识库的作用' },
                        { text: '知识库搭建', link: '/knowledge/#_1-2-coreagent-知识库实操' },
                    ]

                },
                // {
                //     text: '平台设置',
                //     link: '/platform',
                //     // items: [
                //     //     { text: '管控面定制', link: '/platform' },
                //     //     { text: 'IDE定制', link: '/platform' }
                //     // ]
                // },

                {
                    text: '认证题库',
                    link: '/test',
                    items: [
                        { text: '1. 岗位职责生成助手', link: '/test/responsible_position' },
                        { text: '2. 问诊小助手', link: '/test/inquiry' },
                        { text: '3. 短篇小说作家', link: '/test/novel' },
                        { text: '4. 构建“小智”智能助手', link: '/test/knowledge' },
                        { text: '5. 低代码试题生成(选做)', link: '/test/generate_questions' },
                        { text: '6. 分析多个URL(选做)', link: '/test/analyse_url' },
                    ]
                },
            ]
    }
}
