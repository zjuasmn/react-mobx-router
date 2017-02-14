import {expect} from "chai";

import {resolve,matchPath} from "../Utils";


describe('resolve', () => {
  it('should work', () => {
    expect(resolve('','')).to.be.eql('/');
    expect(resolve('a','b')).to.be.eql('/a/b');
    expect(resolve('a','b','..')).to.be.eql('/a');
    expect(resolve('a','b','//////')).to.be.eql('/');
    expect(resolve('a','b','//////',':id',"/:x")).to.be.eql('/:x');
  });
});

describe('matchPath',()=>{
  it('should work',()=>{
    expect(matchPath('/a','a')).to.be.eql(null);
    expect(matchPath('/a','/a')).to.be.eql({path:'/a',url:'/a',params:{},"isExact": true});
  })
});
