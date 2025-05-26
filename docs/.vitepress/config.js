const { link } = require("fs");

module.exports = {
    title: 'CoreAgent培训课程',
    description: '',
    themeConfig: {

        outline: [2, 4], // 显示 h2 和 h3 标题
        nav: [
            { text: '大语言模型', link: '/llm' },
            { text: '智能体开发', link: '/agent' },
            { text: '知识库', link: '/architecture' },
            { text: '平台设置', link: '/platform' }
        ],
        sidebar:
            [
                {
                    text: '提示词工程',
                    link: '/llm',
                    items: [

                        { text: '提示词', link: '/llm/prompt/prompt' },
                        { text: '提示词模板', link: '/llm/prompt/template' },
                        { text: '提示词示例', link: '/llm/prompt/example' },

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
                        { text: '什么是知识库', link: '/agent/index' },
                        { text: '知识库使用', link: '/agent/chat' },
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
                    // items: [
                    //     { text: '管控面定制', link: '/platform' },
                    //     { text: 'IDE定制', link: '/platform' }
                    // ]
                },
            ]
    }
}
