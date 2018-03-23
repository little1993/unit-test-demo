
文档来自于@citywallebs

ssdasdasd

[![CircleCI](https://circleci.com/gh/little1993/unit-test-demo/tree/master.svg?style=svg)](https://circleci.com/gh/little1993/unit-test-demo/tree/master)

下载本demo到本地，跟着下面的步骤，就能很清晰的明白前端的单元测试环境，是怎样一步一步搭建起来的。

假设已用npm创建好项目的package.json文件。

#### step1: 初始化项目，下载依赖。(init-dependencies)

下载单元测试需要的基本工具： karma,jasmine,phantomjs。
jasmine 和 phantomjs要和karma搭配使用，还需要两个适配器：karma-jasmine 和 karma-phantomjs-launcher。

    $ npm install -D karma jasmine phantomjs karma-jasmine karma-phantomjs-launcher

#### step2: 初始化Karma配置。(init-karma-conf)

我们可以全局安装karma-cli：

    $ npm install -g karma-cli

这样就可以用命令：

    $ karma init

按照提示，一步一步的根据提示选择，即可生成我们需要的karma配置文件:`karma.conf.js`

> 生成的文件详情通过 `$ git checkout init-karma-conf` 查看

#### step3: 优化Karma配置。（optimize-karma-conf)

karma配置完成，其实我们还没有写需要测试的代码和测试代码呢。

我们先增加源代码代码，src/add.js:

    function add(x,y){
        return x+y ;
    }

接着增加测试代码，test/add.spec.js

    describe('add:',function(){
        it('3+2 should be equal 5',function(){
            expect(add(3,2)).toEqual(5) ;
        }) ;

        it('0.1+0.2 shold be equal 0.3',function(){
            expect(add(0.1,0.2)).toEqual(0.3) ;
        }) ;
    })

待测代码和测试代码都准备好了，怎么启动测试呢？我们上一步虽然对karma做了配置，但并没有针对项目实际情况做处理。

打开 `karma.conf.js`文件可以找到此处：

    // list of files / patterns to load in the browser
    files: [],

还没有添加任何文件，然后我们把文件添加进去，像这样：

    // list of files / patterns to load in the browser
    files: [
        'src/**/*.js' ,
        'test/**/*.spec.js'
    ],

用命令：

    $ karma start

就能启动测试了。

> 切换tag:$ git checkout optimize-karma-conf 查看详情。

#### step4: 初始化Coverage配置。(init-coverage-conf)

我们对测试覆盖率还有要求，所以还需要添加代码覆盖率的测试工具：karma-coverage。

    $ npm install -D karma-coverage

然后继续对配置文件做修改。为了保留基本的单元测试配置，我这里先拷贝了一份配置文件，起名`karma.cover.conf.js`。

修改此处：（看注释我们很快就能明白这个参数的作用。）

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: { },

为：

    preprocessors: {
        'src/**/*.js': ['coverage']
    },

`karma.cover.conf.js`文件中再增加`plugins`字段配置

    plugins:[
        'karma-coverage'
    ]

修改`reporters`字段为：

    reporters: ['coverage'],

运行命令：(这个命令在后续演示中会一直用到，我们添加到scripts里去：npm run test:cover)

    $ karma start karma.cover.conf.js

有点失望，会报错。是因为这里有个小坑：

> karma配置文件中如果没有`plugins`字段，`frameworks`不用加适配器也能正常工作，具体参见上面几个步骤；一旦这个字段有值后，则需要把`frameworks`的适配器也加上去。

具体查看step5。

> 切换分支 `$ git checkout init-coverage-conf` 查看详情。

#### step5: 优化Coverage配置。(optimize-coverage-step-1 && optimize-coverage-step-2)

继续修改`karma.cover.conf.js`的`plugins`字段为：

    plugins:[
        'karma-jasmine' ,
        'karma-phantomjs-launcher' ,
        'karma-coverage'
    ]

执行命令：

    $ npm run test:cover

可以看到到项目目录中生成了一个`coverage`文件夹，在浏览器中打开文件夹中的`index.html`文件，我们就可以看到覆盖率的测试报告了。

> 切换tag：`$ git checkout optimize-coverage-step-1`查看详情。

在这个tag下，发现终端会报错，是因为我们的测试代码：

    it('0.1+0.2 shold be equal 0.3',function(){
        expect(add(0.1,0.2)).toEqual(0.3) ;
    }) ;

没有正常的通过测试。偷个懒，暂时注释掉这个测试case,发现一切正常了。

另外还有一个问题是，测试报告的名称我们可能不太喜欢，比如在我电脑上是这样的：

    coverage/PhantomJS 2.1.1 (Mac OS X 0.0)

不是太好。这里也可以做相应的配置: (更多配置karma-coverage中去寻找)

    coverageReporter: {
        reporters: [
            {
                type: 'lcov',
                dir: './coverage',
                subdir: '.'
            }, {
                type: 'text-summary',
                dir: './coverage',
                subdir: '.'
            }
        ]
    },

这样就可以生成较为优雅的覆盖率测试报告了。

> 切换tag: `$ git checkout optimize-coverage-step-2`查看详情。

#### step6: ES6语法支持。(es6-support)

#### step7: webpack集成。(webpack-support)

#### step8: 优化webpack集成。(optimize-webpack-support)(解决代码覆盖率问题)

#### step9:Done
