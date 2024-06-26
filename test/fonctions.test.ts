import {functiontest, testcase, sumArray, returnPair, functiontesta, tritableau, dichotomie, decompose, compilate} from './fonctions'
import {expect, describe, test} from 'vitest'

    // test('validité', ()=>{
    //     const tab = [1 ,2 ,8]
    //     expect(functiontest(tab)).toStrictEqual([1,2,8])
    //     })
    // test('',()=>{
    //     const a = 0
    //     const result = testcase(a);
    //     expect (result.valueOf()).toBe('la valeur est 0')
    // })
    // test('',()=>{
    //     const arr = [1,2,3,4];
    //     const resultarray = sumArray(arr);
    //     expect (resultarray).toBe(10)
    // })


    
    // test('',()=>{
    //     const arr=[1,2,3,4];
    //     const resultpair = returnPair(arr);
    //     expect (resultpair).toEqual({
    //         elementPair:[2,4],
    //         elementImpair:[1,3]
    //     })
    // })
    // test('',()=>{
    //     const arr= 9
    //     const result = functiontesta(arr)
    //     expect (result).toEqual([0,1,2,3,4,5,6,7,8])

    // })
    // test('',()=>{
    //     const arr1=[1,1,2,6,5]
        
    //     const result = tritableau(arr1, );
    //     expect (result).toEqual([1,1,2,5,6])
    // })
    // test('',()=>{
    //     const num= 7;
    //     const list=[1,2,3,7];

    //     const result=dichotomie(num, list)
    //     expect (result).toBe(3)
    // })

    
    describe('', () => {
        test('', () => {
            const num = 453;
            const result = decompose(num);
            expect(result).toEqual({centaines: 4, dizaines: 5, unites: 3});
        });
    
        test('', () => {
            const num = 453;
            const { centaines, dizaines, unites } = decompose(num);
            const result = compilate(centaines, dizaines, unites);
            expect(result.valueOf()).toBe('quatre-cents cinquante trois');
        });
    });

    