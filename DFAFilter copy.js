class DFAFilter {
    constructor() {
      this.keyword_chains = {};
      this.delimit = '\x00';
    }
  
    add(keyword) {
      if (typeof keyword !== 'string') {
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
          last_level[last_char] = {[this.delimit]: 0};
          break;
        }
        if (i === chars.length - 1) {
          level[this.delimit] = 0;
        }
      }
    }
 
    parse(path) {
    const text = fs.readFileSync(path, 'utf-8');
    text.trim().split(/\r?\n/).forEach((keyword) => this.add(keyword));
    }

  
    filter(message, repl = '*') {
      if (typeof message !== 'string') {
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
      return [ret.join(''), count];
    }
  }
    
  // if (typeof require !== 'undefined') {
    
    const gfw = new DFAFilter();
    gfw.parse("keywords");
    const fs = require('fs');    
    const t = Date.now();

    /* 这行代码是识别文件内的文本
        const text = fs.readFileSync('texst.txt', 'utf-8');
        console.log(gfw.filter(text, "*"));
    */

    /* 调用直接调用 gfw.filter(文本字符串, 将敏感词替换的字符串)，示例：
        gfw.filter("针孔摄像机 我操操操", "?")
    */

    // console.log(gfw.filter("针孔摄像机 我操操操", "?"));
    // console.log(gfw.filter("售假人民 我操操操", "*"));
    // console.log(gfw.filter("传世私服 我操操操", "*"));

    // 耗时的秒速（毫秒级）
    // console.log(Date.now() - t);

    const dfaFilter = (text, tag = '*', countMode = false) => {
      const [resultTxt, count] = gfw.filter(text, tag)
      if(!countMode) {
        return resultTxt
      }
      return count
    }
    export default dfaFilter;

  // }