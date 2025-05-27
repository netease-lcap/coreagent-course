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
                        { text: '提示词分类', link: '/prompt' },
                        { text: '结构化方法论', link: '/prompt' },
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
                        { text: '什么是知识库', link: '/knowledge' },
                        { text: '调试知识库', link: '/knowledge' },
                        { text: '知识库的作用', link: '/knowledge' },
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
                    text: '测试题库',
                    link: '/test',
                    items: [
                        { text: '岗位职责生成助手', link: '/test/responsible_position' },
                        { text: '问诊小助手', link: '/test/inquiry' },
                        { text: '短篇小说作家', link: '/test/novel' },
                        { text: '低代码试题生成', link: '/test/generate_questions' },
                        { text: '分析多个URL', link: '/test/analyse_url' },

                    ]
                },
            ]
    }
}
