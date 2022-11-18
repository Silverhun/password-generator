
const passwordEl = document.getElementById("password");
const lengthEl = document.getElementById("length");
const upperletterEl = document.getElementById("upperletter");
const lowerletterEl = document.getElementById("lowerletter");
const numbersEl = document.getElementById("numbers");
const myRangeEl = document.getElementById("myRange");
const mediumEl = document.getElementById("medium");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const copiesEl = document.getElementById("copies");
 
lengthEl.innerHTML = myRangeEl.value;

myRangeEl.oninput = function() {

    lengthEl.innerHTML = this.value;
    
}

const randomFunc = {
    lower: getRandomlowerCases,
    upper: getRandomupperCases,
    number: getRandomnumbers,
    symbols: getRandomsymbols
};

copiesEl.addEventListener("click", () => {
    const textArea = document.createElement("textarea")
    const passwords = passwordEl.innerText

    if(!passwords){
        return;
    }

    textArea.value = passwords
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove
    alert("Password copied to clipboard")
})

generateEl.addEventListener("click", () => {
    const length = +lengthEl.innerHTML;
    const hasLowercase = lowerletterEl.checked;
    const hasUppercase = upperletterEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;
    
   
    passwordEl.innerText = generatePassword(
        length,
        hasLowercase, 
        hasUppercase, 
        hasNumbers, 
        hasSymbols,
        )
    
        if(passwordEl.innerHTML.length > 0){
            mediumEl.style.display = 'block';
        }
        else {
            mediumEl.style.display = 'none'
        };
        if(passwordEl.innerHTML.length <= 7 ) {
            mediumEl.innerHTML = 'weak'
            mediumEl.style.color = 'red'
        }
        else if(passwordEl.innerHTML.length > 7 && passwordEl.innerHTML.length <= 14) {
            mediumEl.innerHTML = 'medium'
            mediumEl.style.color = 'yellow'
        }
        else if(passwordEl.innerHTML.length > 14 && passwordEl.innerHTML.length <= 20) {
            mediumEl.innerHTML = 'strong'
            mediumEl.style.color = 'green'
        }
})
function generatePassword(length, lower, upper, number, symbols, ) {
    let passwordGenerated = "";
   
    
    const checkes = lower + upper + number + symbols;
    

    const typesArr = [{lower}, {upper}, {number}, {symbols}].filter(
        item => Object.values(item)[0]
    )
    console.log(typesArr)
    if(checkes === 0){
        return "";
    }

    for (let i = 0; i < length; i += checkes) {
        typesArr.forEach(types => {
            const funcName = Object.keys(types)[0];
            // console.log("funcName: ", funcName)

            passwordGenerated += randomFunc[funcName]();
        });
    }
    const mainPassword = passwordGenerated.slice(0, length);
    return mainPassword;   
}

    

 
 function getRandomlowerCases() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
 }
function getRandomupperCases() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomnumbers() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomsymbols() {
    let symbols = '!@#$%^&*()?><,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}



