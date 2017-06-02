'use strict';

/**
 * lang part dividing line
 * ${langType}:
 */
let getLangText = (text, langType) => {
    return filterTextByLang(text, langType).join('\n');
};

/**
 * lang part dividing line
 * ${langType}:
 */
let filterTextByLang = (text, langType = 'en') => {
    let rets = [],
        curLang = 'en';
    let lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let matchRet = matchLang(line);
        if (matchRet) {
            let {
                type, next
            } = matchRet;
            if (type === langType) {
                rets.push(next);
            }
            curLang = type;
        } else {
            if (curLang === langType) {
                rets.push(line);
            }
        }
    }

    return rets;
};

let matchLang = (line) => {
    let ret = /^\s*\[readme\-lang\:(.*)\](.*)$/.exec(line);
    if (!ret) return false;
    return {
        type: ret[1],
        next: ret[2]
    };
};

module.exports = {
    getLangText,
    filterTextByLang,
    matchLang
};
