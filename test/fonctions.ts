import { i } from "vitest/dist/reporters-yx5ZTtEV.js";

export function functiontest(tab: Array<number>) {
    var changed;
    do {
        changed = false;
        for (var i = 0; i < tab.length - 1; i++) {
            if (tab[i] > tab[i + 1]) {
                var tmp = tab[i];
                tab[i] = tab[i + 1];
                tab[i + 1] = tmp;
                changed = true;
            }
        }
    } while (changed);
    return tab;
}

export function testcase(a) {
    var a;
    return (`la valeur est ${a}`)
}

export function sumArray(arr: number[]) {
    let valueTab = 0;
    for (var i = 0; i < arr.length; i++) {
        valueTab += arr[i]
    } return valueTab
}

export function returnPair(arr: number[]) {
    let elementPair: number[] = [];
    let elementImpair: number[] = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            elementPair.push(arr[i]);
        } else {
            elementImpair.push(arr[i]);
        }
    } return { elementPair, elementImpair }
}

export function functiontesta(arr: number) {
    let fiboarray: number[] = [];
    for (var i = 0; i < arr; i++) {

        fiboarray.push(i);

    } return fiboarray
}
// export function tritableau(arr1: number[]) {
//     let tableautri: number[] = [];
//     var maxvalue = arr1[0];
//     var minvalue = arr1[0];

//     for (var i = 0; i < arr1.length; i++) {
//             if (arr1[i] >= maxvalue) {
//                 maxvalue = arr1[i]
//             } else if (arr1[i] <= minvalue){
//                 minvalue = arr1[i]
//         } else for (var j=minvalue; j <=maxvalue; j++){
//             tableautri[j] =`${j}`
//         }
//         for(var i = 1; i < arr1.length; i++) {
//             j=arr1[i]
//             tableautri[j].push([arr1[i]])
//         }
//     return tableau

// }}
export function tritableau(arr1: number[]) {
    let isSorted = false;
    let i = 0;
    do {
        i = 0;
        isSorted = true;
        while (i < arr1.length - 1) {
            if (arr1[i] > arr1[i + 1]) {
                let temp = arr1[i];
                arr1[i] = arr1[i + 1];
                arr1[i + 1] = temp;
                isSorted = false;
            }
            i++;
        }
    } while (!isSorted)
    return arr1;

    // let maxvalue = arr1[0];
    // let minvalue = arr1[0];

    // for (let i = 0; i < arr1.length; i++) {
    //     if (arr1[i] > maxvalue) {
    //         maxvalue = arr1[i];
    //     }
    //     if (arr1[i] < minvalue) {
    //         minvalue = arr1[i];
    //     }
    // }

    // let tableautri: any[] = new Array(maxvalue - minvalue + 1).fill(null);
    // for (let k = 0; k < arr1.length; k++) {
    //     let value: number = arr1[k]
    //     tableautri[arr1[k] - minvalue] = value;
    // }
    // [-2, , , , 2, , 4]
    // tableautri = tableautri.filter(subarray => subarray != null);

    // return tableautri;
}
export function dichotomie(num: number, list: number[]) {
    let finded = false;
    let imin = 0;
    let imax = list.length - 1;

    while (imin <= imax && !finded) {
        let middle = Math.floor((imin + imax) / 2);

        if (num > list[middle]) {
            imin = middle + 1;
        } else if (num < list[middle]) {
            imax = middle - 1;
        } else {
            finded = true;
            return middle;
        }
    }

    return finded ? null : null;
}




export function analyse(num: number) {
    let entier: number;
    let decim: number;
    let blocks: Array<{ centaines: number | string, dizaines: number | string, unites: number | string }> = [];

    entier = Math.floor(num);
    decim = num - entier;

    while (entier > 0) {
        let block = entier % 1000;
        blocks.unshift(decompose(block));
        entier = Math.floor(entier / 1000);
    }

    return {
        entierBlocks: blocks,
        decim: decim
    };
}

export function decompose(num: number) {
    let centaines: number | string = 0;
    let dizaines: number | string = 0;
    let unites: number | string = 0;

    if (num > 99) {
        centaines = Math.floor(num / 100);
        num = num % 100;
    }
    if (num > 9) {
        dizaines = Math.floor(num / 10);
        unites = num % 10;
    } else {
        unites = num;
    }

    return { centaines, dizaines, unites };
}

export function compilate(centaines: number | string, dizaines: number | string, unites: number | string) {
    switch (centaines) {
        case 0:
            centaines = '';
            break;
        case 1:
            centaines = 'cent';
            break;
        case 2:
            centaines = 'deux cent';
            break;
        case 3:
            centaines = 'trois-cent';
            break;
        case 4:
            centaines = 'quatre-cent';
            break;
        case 5:
            centaines = 'cinq-cent';
            break;
        case 6:
            centaines = 'six-cent';
            break;
        case 7:
            centaines = 'sept-cent';
            break;
        case 8:
            centaines = 'huit-cent';
            break;
        case 9:
            centaines = 'neuf-cent';
            break;
        default:
            centaines = '';
            break;
    }
    switch (dizaines) {
        case 0:
            dizaines = '';
            break;
        case 1:
            dizaines = 'dix';
            break;
        case 2:
            dizaines = 'vingt';
            break;
        case 3:
            dizaines = 'trente';
            break;
        case 4:
            dizaines = 'quarante';
            break;
        case 5:
            dizaines = 'cinquante';
            break;
        case 6:
            dizaines = 'soixante';
            break;
        case 7:
            dizaines = 'soixante-dix';
            break;
        case 8:
            dizaines = 'quatre-vingts';
            break;
        case 9:
            dizaines = 'quatre-vingt-dix';
            break;
        default:
            dizaines = '';
            break;
    }
    switch (unites) {
        case 0:
            unites = '';
            break;
        case 1:
            unites = 'un';
            break;
        case 2:
            unites = 'deux';
            break;
        case 3:
            unites = 'trois';
            break;
        case 4:
            unites = 'quatre';
            break;
        case 5:
            unites = 'cinq';
            break;
        case 6:
            unites = 'six';
            break;
        case 7:
            unites = 'sept';
            break;
        case 8:
            unites = 'huit';
            break;
        case 9:
            unites = 'neuf';
            break;
        default:
            unites = '';
            break;
    }
    //  if ((!centaines=='')&&(!centaines=='cent')){
    let plurielcent: string = 's';

    if (centaines == '' || centaines == 'cent') {
        if (!dizaines || !unites) {
            plurielcent = ''
            centaines = centaines + plurielcent
        }
    }


    //  }
    return (`${centaines}${plurielcent} ${dizaines} ${unites}`).trim();
}

export function numberToWords(num: number) {
    let { entierBlocks, decim } = analyse(num);
    let units = ["", "mille", "million", "milliard"];

    let words = entierBlocks.map((block, index, array) => {
        let word = compilate(block.centaines, block.dizaines, block.unites);
        let unit = units[array.length - 1 - index];
        return word ? `${word} ${unit}`.trim() : '';
    }).filter(word => word !== '').join(' ');


    let decimal = (parseFloat(decim.toFixed(2)));
    while (!Number.isInteger(decimal)) {
        decimal = decimal * 10;
    }
    analyse(decimal)
    let decimalee = decompose(decimal)
    let virgule = ' '
    if ((compilate(decimalee.centaines, decimalee.dizaines, decimalee.unites))) {
        virgule = ' virgule ';
    }





    return (words.trim() + virgule + (compilate(decimalee.centaines, decimalee.dizaines, decimalee.unites)));
}

let number = 2222;
if (number && !isNaN(number)) {
    if ((number) >= 1000000000000) {
        console.log('nombre supperieur a la limite')
    } else {
        console.log(numberToWords((number)))
    }
    
}
else {
        
    console.log('veuillez rentrer un nombre')
};
