import { GCResponse } from './../../src/gc-common/common/common.d';
import { Mock as Moq, It, Times } from 'moq.ts'
import { expect, should, assert } from 'chai'
import * as Mock from 'mockjs'
import { DIEx } from '../../src/gc-common';
import { TYPES } from '../../src/di/types';
import { ToDoBll } from '../../src/bll/todo/todo';
import "../../src/di/bind";

should()
describe('ToDoBll', () => {
  let bll: IToDoBll

  beforeEach(() => {
    // bll=container.get<IToDoBll>(TYPES.IToDoBll)
  })

  it('inversify chains',() => {
    bll = DIEx.container.get<IToDoBll>(TYPES.IToDoBll)
    let ret = bll.deleteToDo({});
    expect(false).is.true;
  })

  it('Moq for IToDoRepos',async () => {
    const moq = new Moq<IToDoDal>()
      .setup(ins => ins.getToDo).returns(() => Mock.mock({}))
      .setup(ins => ins.deleteToDo).returns(() => true);
    const obj = moq.object()
    let ret: GCResponse = await obj.deleteToDo({});
    // expect(ret).is.true;
    ret.should.be.true;
    // assert.isTrue(ret);
  })

  it('Moq for IToDoBll', () => {
    const moq = new Moq<IToDoDal>()
      .setup(ins => ins.getToDo).returns(() => Mock.mock({}))
      .setup(ins => ins.deleteToDo).returns(() => true);
    const obj = moq.object();
    let bll = new ToDoBll(obj);
    expect(bll.deleteToDoByReposCtor({})).is.true;
  })

  it('filterToDoList', () => {
    let oldlist = Mock.mock({
      "array|10": [
        "new1",
        "notnew"
      ]
    }).array;
    let newlist = new ToDoBll().filterToDoList(oldlist);
    expect(newlist).length.be.lessThan(oldlist.length)

  })

})
