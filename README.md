# 简介
这是一个使用 JS 编写的 DFA 算法实现包，使用方法如下：

```js
// 安装dfafilter包
npm install dfa-filter

// 使用
import dfaFilter from 'dfa-filter'


dfaFilter("the text for test", "*", flase)
```



# DFA 算法
DFA敏感词检测算法是一种高效的字符串匹配算法，可以快速地在一段文本中检测是否包含敏感词。

DFA（Deterministic Finite Automaton）敏感词检测算法是一种基于有限状态自动机的高效字符串匹配算法，通过将敏感词构建成一棵状态转移图，将文本逐个字符进行匹配，并根据状态转移图的规则进行状态的转移来检测是否包含敏感词，具有快速、高效的特点，在实际应用中被广泛使用。

# 参考资料
https://github.com/obaby/dfa-python-filter