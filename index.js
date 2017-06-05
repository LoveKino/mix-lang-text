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
let filterTextByLang = (text, langType, defaultType='en') => {
    langType = langType || defaultType;
    let map = breakTextByLang(text);
    if (map.hasOwnProperty(langType)) {
        return map[langType];
    } else {
        return map[defaultType];
    }
};

let breakTextByLang = (text) => {
    let map = {};
    let curLang = 'en';
    let lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let matchRet = matchLang(line);
        if (matchRet) {
            let {
                type, next
            } = matchRet;
            map[type] = map[type] || [];
            map[type].push(next);
            curLang = type;
        } else {
            map[curLang] = map[curLang] || [];
            map[curLang].push(line);
        }
    }

    return map;
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
    matchLang,
    breakTextByLang
};
