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
async function estrai(){
    let estrazioni : { [city : string] : number[]} = {};
    cities.forEach(city => {
        estrazioni[city] = generateNNumbersFromTo(5, 1,100);
    });
    return estrazioni;
}

//estrai();
//console.log(JSON.stringify(estrazioni, null, 2));

function createNumbersDiv(numbers: number[]) : Element{
    const div = document.createElement('div');
    numbers.forEach(number => {
        const numberDiv = document.createElement('div');
        numberDiv.className = 'circle';
        const el = document.createElement('p')
        el.innerText = number.toString();
        numberDiv.appendChild(el);
        div.appendChild(numberDiv);
    });
    return div;
}

function crea_ruota(){
    estrai().then((estrazioni) => {
        console.log(JSON.stringify(estrazioni, null, 2));
        if(container){
            container.innerHTML = ''
            //container.innerHTML = JSON.stringify(estrazioni, null, 2);
            cities.forEach(city => {
                const cityDiv = document.createElement('div');
                cityDiv.className = 'city_div';
                const name = document.createElement('h2');
                name.innerText = city;
                const numbersDiv = createNumbersDiv(estrazioni[city]);
                cityDiv.appendChild(name);
                cityDiv.appendChild(numbersDiv);
                container.appendChild(cityDiv);
            });
        }
    });
    
}

const container = document.getElementById('estrazioni');
const btn_estrai = document.getElementById('btn_estrai');

if(btn_estrai){
    btn_estrai.onclick = () => crea_ruota();
}