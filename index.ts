function rnd(min :number, max :number) :number {
    const randomNum :number = Math.trunc(Math.random() * (max - min) + min);
    return randomNum;
}

function rndDec(min :number, max :number, precision: number) :number {
    if(precision < 0){
        throw new Error('The precision must be a positive number');
    }
    if(!Number.isInteger(precision)){
        throw new Error('The precision must be an integer number');
    }

    const multiplier :number = Math.pow(10, precision);
    return rnd(min * multiplier, max * multiplier) / multiplier;
}

function generateNNumbersFromTo(quantity: number = 5, from: number = 1, to: number = 100) :number[] {
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

//console.log(generateNNumbersFromTo(5, 0, 100));
//console.log(rndDec(5, 10, 0.5));

const cities :string[]  = [
    'Bari',
    'Cagliari',
    'Firenze',
    'Genova',
    'Milano',
    'Napoli',
    'Palermo',
    'Roma',
    'Torino',
    'Venezia',
    'Nazionale'
];
let estrazioni : { [city : string] : number[]} = {};
function estrai(){
    cities.forEach(city => {
        estrazioni[city] = generateNNumbersFromTo(5, 0,100);
    });
}

estrai();
console.log(JSON.stringify(estrazioni, null, 2));