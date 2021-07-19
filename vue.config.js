module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.(html)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                }
            ]
        }
    },

    pluginOptions: {
        prerenderSpa: {
            registry: undefined,
            renderRoutes: [
                '/',
                '/recommend',
                '/singer',
                '/rank',
                '/search',
                '/account',
                '/detail'
            ],
            useRenderEvent: true,
            headless: true,
            onlyProduction: true,
            postProcess: route => {
                // 预渲染内容写入之前的额外操作
                let reg = /<meta name="viewport".*user-scalable=no">/gi
                let res = route.html.match(reg)
                route.html = route.html.replace(res[1], '')
                return route
            }
        }
    }
}
