import text from './keywords.json'
class DFAFilter {
  constructor() {
    this.keyword_chains = {};
    this.delimit = "\x00";
  }

  add(keyword) {
    if (typeof keyword !== "string") {
      keyword = new TextDecoder().decode(keyword);
    }
    keyword = keyword.toLowerCase();
    const chars = keyword.trim();
    if (!chars) {
      return;
    }
    let level = this.keyword_chains;
    for (let i = 0; i < chars.length; i++) {
      if (chars[i] in level) {
        level = level[chars[i]];
      } else {
        if (!(level instanceof Object)) {
          break;
        }
        for (let j = i; j < chars.length; j++) {
          level[chars[j]] = {};
          var [last_level, last_char] = [level, chars[j]];
          level = level[chars[j]];
        }
        last_level[last_char] = { [this.delimit]: 0 };
        break;
      }
      if (i === chars.length - 1) {
        level[this.delimit] = 0;
      }
    }
  }

  parse() {
    text.data.forEach((keyword) => this.add(keyword));
  }

  filter(message, repl = "*") {
    if (typeof message !== "string") {
      message = new TextDecoder().decode(message);
    }
    message = message.toLowerCase();
    const ret = [];
    let start = 0;
    let count = 0;
    while (start < message.length) {
      let level = this.keyword_chains;
      let step_ins = 0;
      for (let i = start; i < message.length; i++) {
        const char = message[i];
        if (char in level) {
          step_ins++;
          if (!(this.delimit in level[char])) {
            level = level[char];
          } else {
            ret.push(repl.repeat(step_ins));
            start += step_ins - 1;
            count++;
            break;
          }
        } else {
          ret.push(message[start]);
          break;
        }
      }
      if (step_ins === 0) {
        ret.push(message[start]);
      }
      start++;
    }
    return [ret.join(""), count];
  }
}

const gfw = new DFAFilter();
gfw.parse();

/**
//大括号写类型
@param{string}text 待检测的字符串
@param{string}tag 用于替换敏感词的字符。默认“*”
@param{Boolean}countMode true为使用过滤替换模式，false是使用计数模式。默认“false”
@returns 返回过滤后的文本或者敏感词计数
*/
const dfaFilter = (text, tag = "*", countMode = false) => {
  const [resultTxt, count] = gfw.filter(text, tag);
  if (!countMode) {
    return resultTxt;
  }
  return count;
};

export default dfaFilter;
