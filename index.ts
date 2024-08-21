function rnd(min :number, max :number){
    const randomNum :number = Math.trunc(Math.random() * (max - min) + min);
    return randomNum;
}

function rndDec(min :number, max :number, precision: number){
    if(precision < 0){
        throw new Error('The precision must be a positive number');
    }
    if(!Number.isInteger(precision)){
        throw new Error('The precision must be an integer number');
    }
    
    const multiplier :number = Math.pow(10, precision);
    return rnd(min * multiplier, max * multiplier) / multiplier;
}

function generateNNumbersFromTo(quantity: number = 5, from: number = 1, to: number = 100){
    let array :number[]  = [];
    if((to-from) < quantity){
        throw new Error(`The quantity of numbers between ${from} and ${to} is lower than the desired quantity (${quantity})`);
    }

    while(array.length < quantity){
        const n = rndDec(from, to, 0);
        if(array.includes(n)){
            continue;
        }else{
            array.push(n);
        }
    }
    return array.sort();
}

//console.log(generateNNumbersFromTo(5, 1, 100));
console.log(rndDec(5, 10, 0.5));

const cities :string[]  = [''];

let extractedNumbers :number[] = [];