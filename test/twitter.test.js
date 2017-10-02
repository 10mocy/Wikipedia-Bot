'use strict';

const assert = require('assert');
const Twitter = require('../twitter');

describe('twitter module', () => {
	it('extract method', () => {
		const validExtracted = Twitter.extract('Wikipedia #とは');
		assert.equal(validExtracted, 'Wikipedia');

		const invalidExtracted = Twitter.extract('関係ないツイート');
		assert.equal(invalidExtracted, null);
	});
});