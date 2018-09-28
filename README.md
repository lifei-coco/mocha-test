# mocha-test
mocha前端自动化测试

自动化测试另外一个重要特点就是快速反馈，反馈越迅速意味着开发效率越高。拿UI组件为例，开发过程都是打开浏览器刷新页面点点点才能确定UI组件工作情况是否符合自己预期。接入自动化测试以后，通过脚本代替这些手动点击，接入代码watch后每次保存文件都能快速得知自己的的改动是否影响功能，节省了很多时间，毕竟机器干事情比人总是要快得多。

有了自动化测试，开发者会更加信任自己的代码。开发者再也不会惧怕将代码交给别人维护，不用担心别的开发者在代码里搞“破坏”。后人接手一段有测试用例的代码，修改起来也会更加从容。测试用例里非常清楚的阐释了开发者和使用者对于这端代码的期望和要求，也非常有利于代码的传承。

下面用一个简单的例子来实现下前端自动化测试,目录结构如下：
```
.
├── coverage                 # 覆盖率生成报告文件
├── src                      # 源目录
│   ├── add.js               # add函数文件
│   ├── reduce.js            # reduce函数文件
├── test                     # 测试目录
│   ├── add.test.js          # add测试文件
│   └── reduce.test.js       # reduce测试文件
└
```


## 实例：

一个加法模块`src/add.js`的代码：

```
function add(x, y){
    var x = !!(+x)?(+x):0,
        y = !!(+y)?(+y):0;
    return x+y;
}
```

上面代码对应的测试代码`test/add.test.js`

```
describe('加法函数的测试', function() {
    it('1 加 1 应该等于 2', function() {
        add(1, 1).should.be.eql(2);
    });

    it('任何数加0等于自身', function() {
        add(1, 0).should.be.eql(1);
        add(0, 0).should.be.eql(0);
    });

    it('任何数加数字字符串等于数字相加', function() {
        add(1, '1').should.be.eql(2);
    });

    it('数字字符串加数字等于数字相加', function() {
        add('1', 1).should.be.eql(2);
    });

    it('任何数加普通字符串等于任何数加0', function() {
        add(1, 'a').should.be.eql(1);
    });

    it('普通字符串加数字等于0加任何数', function() {
        add('a', 1).should.be.eql(1);
    });
});
```

首先安装 `karma` ，然后使用 `karma init` 命令生成配置文件。生成文件的过程是交互式的，很友好，注意选择测试框架是 mocha。选错了也没关系，配置文件之后可以手动编辑，大概长这样：

```
// Karma configuration
module.exports = function(config) {
    config.set({
        /***
         * 基础路径，用在files，exclude属性上
         */
        basePath: "",

        /**
        * 测试框架
        */
        frameworks: ['mocha'],

        /**
         * 测试页面需要加载的资源
         */
        files: [
            './node_modules/should/should.js',
            'src/**/*.js',
            'test/**/*.js'
        ],

        /**
         * 排除的文件列表
         */
        exclude: [],

        /**
         * 在浏览器使用之前处理匹配的文件
         */
        preprocessors: {
            'src/**/*.js': ['coverage']
        },

        /**
         * 安装的插件列表
         */
        plugins: [
            'karma-mocha',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-coverage',
            'karma-spec-reporter'
        ],

        /**
         * 测试启动的浏览器
         */
        browsers: ['PhantomJS', 'Firefox', 'Chrome'],

        /**
         * 需要生成哪些代码报告
         * 使用测试结果报告者
         * 可能的值: "dots", "progress"
         */
        reporters: ['spec', 'coverage','progress','dots'],

        /**
         * 覆盖率报告要如何生成
         * 包括覆盖率页面、lcov.info、coverage.json、以及命令行里的提示
         * 使用reporters为"coverage"时报告输出的类型和那目录
         */
        coverageReporter: {
            dir: 'coverage',
            reporters: [{
                type: 'json',
                subdir: '.',
                file: 'coverage.json',
            }, {
                type: 'lcov',
                subdir: '.'
            }, {
                type: 'text-summary'
            }]
        },

        /**
         * 服务端口号
         */
        port: 9876,

        /**
         * 启用或禁用输出报告或者日志中的颜色
         */
        colors: true,

        /**
         * 日志等级
         * 可能的值：
         * config.LOG_DISABLE //不输出信息
         * config.LOG_ERROR    //只输出错误信息
         * config.LOG_WARN //只输出警告信息
         * config.LOG_INFO //输出全部信息
         * config.LOG_DEBUG //输出调试信息
         */
        logLevel: config.LOG_ERROR,

        /**
         * 启用或禁用自动检测文件变化进行测试
         */
        autoWatch: true,

        /**
         * 开启或禁用持续集成模式
         * 设置为true, Karma将打开浏览器，执行测试并最后退出
         */
        singleRun: true,

        /**
         * 并发级别（启动的浏览器数）
         */
        concurrency: Infinity
    });
}
```

## 运行karma:

```
$ karma start
```