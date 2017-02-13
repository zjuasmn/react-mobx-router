import {expect} from "chai";

import {resolve} from "../Utils";


describe('resolve', () => {
  it('should work', () => {
    expect(resolve('a','b')).to.be.eql('/a/b');
    expect(resolve('a','b','..')).to.be.eql('/a');
    expect(resolve('a','b','//////')).to.be.eql('/');
    expect(resolve('a','b','//////',':id',"/:x")).to.be.eql('/:x');
  });
});
