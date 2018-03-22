import { add } from '../src/add' ;

describe('add:',()=>{
    it('3+2 should be equal 5',()=>{
        expect(add(3,2)).toEqual(5) ;
    }) ;

    // it('0.1+0.2 shold be equal 0.3',()=>{
    //     expect(add(0.1,0.2)).toEqual(0.3) ;
    // }) ;
})
