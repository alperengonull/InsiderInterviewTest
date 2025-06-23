// const div = document.createElement('div')
// div.className = "container"
// document.body.appendChild(div)


// const selectElement = document.querySelector(".container")



// // Güncelleme
// const h1 = document.createElement('h1')
// h1.className = "Merhaba"
// h1.textContent = "Merhaba ben Alperen"
// document.body.appendChild(h1)


// h1.textContent = "Merhaba güncellendi"




// const button = document.createElement('button')
// button.className = "addButton"
// button.textContent = "Tıkla"
// document.body.appendChild(button)

// button.addEventListener("click", (e) => {
//     e.stopPropagation(); // Event bubbling'i durdur
//     console.log("Tıklandı");
// });




// const input = document.createElement('input')
// input.type = "text"
// input.id = "input1"
// input.placeholder = "adınızı girin"
// document.body.appendChild(input)


// function reverse(str) {
//     let reversed = ''

//     for (let char of str) {
//         reversed = char + reversed
//     }

//     return reversed
// }

// console.log(reverse("Alperen"))



// function palindrome(str) {

//     const reversed = str.split('').reverse().join('')


//     if (str === reversed) {
//         return true
//     } else {
//         return false
//     }
// }

// console.log(palindrome("ansdsdsa"))


// function reverse(str) {
//     const reversed = str.split('').reverse().join('');
//     return reversed
// }

// console.log(reverse("Alperen"))


// for (var i = 1; i < 101; i++) {
//     if (i % 15 == 0) console.log("FizzBuzz");
//     else if (i % 3 == 0) console.log("Fizz");
//     else if (i % 5 == 0) console.log("Buzz");
//     else console.log(i);
// }


// REVERSE ALGORITHM

// function reverse(str) {

//     // Ters çevrilen string'in tutulacağı boş bir string oluşturuluyor.
//     let reversed = ''

//     // str değişkenindeki her bir karakter sırayla char olarak alınır.
//     for (let char of str) {
//         // Karakter, ters string’in başına ekleniyor.
//         reversed = char + reversed
//     }


//     return reversed
// }

// console.log(reverse("15"))

// A -> A
// L -> LA
// P -> PLA
// E-> EPLA
// R -> REPLA 
// E -> EREPLA
// N -> NEREPLA


// function palindrome(str) {
//     const reversed = str.split('').reverse().join('')



//     if (str === reversed) {
//         return true
//     } else {
//         return false
//     }
// }

// console.log(palindrome("canac"))

// PALINDROME ALGORITHM

// function palindrome(str) {
//     const reversed = str.split('').reverse().join('')

//     if (str === reversed) {
//         return true
//     } else {
//         return false
//     }
// }

// console.log(palindrome('alperen'))




// FIND MAX CHAR AT STRING
// Given a string, return the character that is most 
// commonly used in the string
// maxChar("abccccccd") ==== "c"


// {
//     a: 1,
//         b: 1,
//             c: 7,
//                 d: 1
// }


// charMap objesi oluşturuyoruz daha sonra for ile verdiğim str içerisindeki karakterleri charMapde arıyoruz.

// function maxChar(str) {
//     const charMap = {};

//     for (let char of str) {
//         charMap[char] = (charMap[char] || 0) + 1;
//     }

//     let max = 0;
//     let maxChar = '';

//     for (let char in charMap) {
//         if (charMap[char] > max) {
//             max = charMap[char];
//             maxChar = char;
//         }
//     }

//     return maxChar;
// }

// console.log("En çok kullanılan karakter:", maxChar("abcccccd"));


// function maxChar(str) {
//     return [...str].sort((a, b) =>
//         str.split(b).length - str.split(a).length
//     )[0];
// }

// console.log(maxChar("abcccccccd"));




// ARRAY CHUNKING


