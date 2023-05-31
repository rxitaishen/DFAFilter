# 简介
这是一个使用 JS 编写的 DFA 算法实现包，兼容 Node 环境与 Browser 环境，使用方法如下：

```js
// 安装dfafilter包
npm install dfa-filter

// browser 环境使用
import dfaFilter from 'dfa-filter'

// node 环境使用
require(dfaFilter)

/**
//大括号写类型
@param{string}text 待检测的字符串
@param{string}tag 用于替换敏感词的字符。默认“*”
@param{Boolean}countMode true为使用过滤替换模式，false是使用计数模式。默认“false”
@returns 返回过滤后的文本或者敏感词计数
*/
dfaFilter("the text for test", "*", flase)
```



# DFA 算法
DFA敏感词检测算法是一种高效的字符串匹配算法，可以快速地在一段文本中检测是否包含敏感词。

DFA（Deterministic Finite Automaton）敏感词检测算法是一种基于有限状态自动机的高效字符串匹配算法，通过将敏感词构建成一棵状态转移图，将文本逐个字符进行匹配，并根据状态转移图的规则进行状态的转移来检测是否包含敏感词，具有快速、高效的特点，在实际应用中被广泛使用。

# 参考资料
https://github.com/obaby/dfa-python-filter