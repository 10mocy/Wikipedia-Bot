const Twitter = require('../twitter');
const chai = require('chai');

describe('twitter module', () => {
  it('extract method', () => {
    const validExtracted = Twitter.extract('Wikipedia #とは');
    chai.assert.equal(validExtracted, 'Wikipedia');

    const invalidExtracted = Twitter.extract('関係ないツイート');
    chai.assert.equal(invalidExtracted, null);
  });
});
