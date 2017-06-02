'use strict';

let {
    getLangText
} = require('..');

let assert = require('assert');

describe('index', () => {
    it('base', () => {
        assert.equal(getLangText('abc'), 'abc');
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

});
