# tree shaking: 去除无用的代码
前提1: 必须使用es6模块
   2.开启production

在package.json中配置
sideEffects: false 所有的代码都能够treeshaking
问题： 可能会吧css/@babel/polify文件干掉
'sideeEffects': ["*.css"，"*less"]（无用文件）