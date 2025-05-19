const { link } = require("fs");

module.exports = {
    title: 'CodeWave架构师课程',
    description: '',
    themeConfig: {

        outline: [2, 4], // 显示 h2 和 h3 标题
        // nav: [
        //     { text: '应用开发', link: '/development' },
        //     { text: '部署集成', link: '/deployment' },
        //     { text: '应用架构', link: '/architecture' },
        //     { text: '平台定制', link: '/platform' }
        // ],
        sidebar:
            [
                {
                    text: '大语言模型',
                    link: '/llm',
                    // items: [
                    //     { text: '源码导出', link: '/development/index' },
                    //     { text: '翻译器定制', link: '/development/index' },
                    //     { text: '日志监控', link: '/development/index' },
                    // ]
                },
                {
                    text: '智能体开发',
                    link: '/agent',
                    // items: [
                    //     { text: '源码导出', link: '/development/index' },
                    //     { text: '翻译器定制', link: '/development/index' },
                    //     { text: '日志监控', link: '/development/index' },
                    // ]
                },
                {
                    text: '知识库',
                    link: '/knowledge',
                },
                {
                    text: '平台设置',
                    link: '/platform',
                    // items: [
                    //     { text: '管控面定制', link: '/platform' },
                    //     { text: 'IDE定制', link: '/platform' }
                    // ]
                },
            ]
    }
}
