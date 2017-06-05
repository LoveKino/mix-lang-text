'use strict';

let {
    getLangText, breakTextByLang
} = require('..');

let assert = require('assert');

describe('index', () => {
    it('base', () => {
        assert.equal(getLangText('abc'), 'abc');
    });

    it('false langType', () => {
        assert.equal(getLangText('abc', false), 'abc');
    });

    it('seperate', () => {
        let text = 'abc\n[readme-lang:zh]你好';
        assert.equal(getLangText(text), 'abc');
        assert.equal(getLangText(text, 'zh'), '你好');
    });

    it('seperate2', () => {
        let text = 'abc\n[readme-lang:zh]你好\nbcd\n[readme-lang:en]bcd';
        assert.equal(getLangText(text), 'abc\nbcd');
        assert.equal(getLangText(text, 'zh'), '你好\nbcd');
    });

    it('space at line head', () => {
        let text = 'abc\n   [readme-lang:zh]你好\nbcd\n [readme-lang:en]bcd';
        assert.equal(getLangText(text), 'abc\nbcd');
        assert.equal(getLangText(text, 'zh'), '你好\nbcd');
    });

    it('no letter at line head', () => {
        let text = 'abc\nx   [readme-lang:zh]你好\nbcd\n [readme-lang:en]bcd';
        assert.equal(getLangText(text), 'abc\nx   [readme-lang:zh]你好\nbcd\nbcd');
    });

    it('breakTextByLang', () => {
        assert.deepEqual(breakTextByLang('abc'), {
            en: ['abc']
        });

        assert.deepEqual(breakTextByLang('abc\ndef'), {
            en: ['abc', 'def']
        });

        assert.deepEqual(breakTextByLang('abc\n[readme-lang:zh]hh\nok'), {
            en: ['abc'],
            zh: ['hh', 'ok']
        });

        assert.deepEqual(breakTextByLang('abc\n[readme-lang:zh]hh\nok\n[readme-lang:en]dd\nee'), {
            en: ['abc', 'dd', 'ee'],
            zh: ['hh', 'ok']
        });
    });
});
