const button = document.getElementById('button-kalkulator');
const input = document.getElementById('input');
const select = document.getElementById('select');
const warning = document.getElementById('warning');
const label = document.querySelectorAll('#value-area label');
const value = document.querySelectorAll('#value-area p');
const copy = document.querySelectorAll('.copy');
const copyPopUp = document.querySelectorAll('.copy-popup');

function warningOn(warningText){
    warning.innerHTML = warningText;
    button.disabled = true;
    button.classList.add('blur');
}

function warningOff(){
    warning.innerHTML = '';
    button.disabled = false;
    button.classList.remove('blur');
}

input.addEventListener('input',function(){
    let inp = document.getElementById('input').value;
    let warningText = '';
    let comma = 0;
    if (inp.length>0){
        for (let i=0; i<inp.length;i++){
            if (!(['0','1','2','3','4','5','6','7','8','9',','].includes(inp[i]))){
                warningOn('Hanya boleh diisi angka');
                break;
            }
            else if (inp[i]==','){
                comma++;
                if (comma==2){
                    warningOn('Tidak boleh ada dua tanda koma');
                    break;
                }
            }
            else {
                warningOff();
            }
        }
    }
    else {
        warningOff();
    }

})

copy.forEach(function(copy){
    copy.addEventListener('click',function(a){
        navigator.clipboard.writeText(copy.parentElement.previousElementSibling.textContent);
        copy.nextElementSibling.innerHTML = 'Disalin';
        copy.nextElementSibling.classList.add('fade-in');
        copy.nextElementSibling.style.visibility = 'visible';
        setTimeout(() => {
            copy.nextElementSibling.classList.remove('fade-in');
            copy.nextElementSibling.style.visibility = 'hidden';
        }, 3000);
        a.preventDefault();
    })
})

select.addEventListener('change',function(){
    const selectValue = select.value
    labelArray = ['Celcius','Reamur','Fahrenheit','Kelvin'];
    input.value='';
    warning.innerHTML = '';
    button.disabled = true;
    value.forEach(function(value){
        value.innerHTML = '...'
    })
    copy.forEach(function(copy){
        copy.disabled = true;
    })
    for (let i=0; i<label.length; i++){
        if (labelArray[i]==selectValue){
            label[i].innerHTML = labelArray[i+1];
            labelArray.splice(i,1);
        }
        else {
            label[i].innerHTML = labelArray[i];
        }
    }
    button.classList.remove('blur');
})

function convPoint(input){
    const val = [];
    for (let i=0; i<input.length; i++){
        if (input[i]=='.'){
            val.push(',');
        }
        else {
            val.push(input[i]);
        }
    }
    return val.join('');
}

function convComma(input){
    const val = []
    for (let i=0; i<input.length; i++){
        if (input[i]==','){
            val.push('.');
        }
        else{
            val.push(input[i]);
        }
    }
    return val.join('');
}

function celToRea(input){
    return convPoint(((4/5)*parseFloat(input)).toString());
}

function celToFah(input){
    return convPoint(((9/5)*parseFloat(input)+32).toString());
}

function celToKel(input){
    return convPoint((273.15+parseFloat(input)).toString());
}

function reaToCel(input){
    return convPoint(((5/4)*parseFloat(input)).toString());
}

function fahToCel(input){
    return convPoint(((5/9)*(parseFloat(input)-32)).toString());
}

function kelToCel(input){
    return convPoint((parseFloat(input)-273.15).toString());
}

button.addEventListener('click',function(a){
    copy.forEach(function(copy){
        copy.disabled = false;
    })
    let selectValue = select.value;
    let input = convComma(document.getElementById('input').value);
    // Pilihan Desimal
    if (selectValue=='Celcius'){
        value[0].innerHTML = celToRea(input);
        value[1].innerHTML = celToFah(input);
        value[2].innerHTML = celToKel(input);
    }
    // Pilihan Reamur
    else if (selectValue=='Reamur') {
        const inputCel = reaToCel(input);
        value[0].innerHTML = inputCel;
        value[1].innerHTML = celToFah(inputCel);
        value[2].innerHTML = celToKel(inputCel);
    }
    // Pilihan Fahrenheit
    else if (selectValue=='Fahrenheit'){
        const inputCel = fahToCel(input);
        value[0].innerHTML = inputCel;
        value[1].innerHTML = celToRea(inputCel);
        value[2].innerHTML = celToKel(inputCel);
    }
    // Pilihan Kelvin
    else{
        const inputCel = kelToCel(input);
        value[0].innerHTML = inputCel;
        value[1].innerHTML = celToRea(inputCel);
        value[2].innerHTML = celToFah(inputCel);
    }
    a.preventDefault();
})
const toggle = document.querySelector('.toggle input');
const nav = document.querySelector('nav ul');
toggle.addEventListener('click',function(){
    nav.classList.toggle('slide');
});

// Hubungi
document.getElementById('button-hubungi').addEventListener('click',function(){
    let name = document.forms['form']['nama'].value;
    let email = document.forms['form']['email'].value;
    let nomor = document.forms['form']['nomor'].value;
    let pesan = document.forms['form']['pesan'].value;

    if (name!="" && email!="" && nomor!="" && pesan!=""){
        alert("Data sudah diterima, silahkan tunggu informasi selanjutnya. Terima kasih.");
    }
})