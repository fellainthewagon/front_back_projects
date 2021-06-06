/* ----------------------------------QUICK sort */

// const arr = [
//   23, 4, 6, 95, 3, 5, 67, 34, 12, 21, 7, 9, 11, 2, 32, 4, 56, 5, 87, 98, 5, 2,
//   56, 64, 34, 18, 3, 5,
// ];

// function quickSort(arr) {
//   if (arr.length <= 1) return arr;

//   let pivotIndex = Math.floor(arr.length / 2);
//   let pivot = arr[pivotIndex];
//   const smaller = [];
//   const bigger = [];

//   for (let i = 0; i < arr.length; i++) {
//     if (pivot === arr[i]) continue;
//     pivot > arr[i] ? smaller.push(arr[i]) : bigger.push(arr[i]);
//   }

//   return [...quickSort(smaller), pivot, ...quickSort(bigger)];
// }

// console.log(quickSort(arr));

/* ---------------------------------MERGE sort */

// const merge = (arrFirst, arrSecond) => {
//   const arrSort = [];
//   let i = (j = 0);

//   while (i < arrFirst.length && j < arrSecond.length) {
//     arrSort.push(arrFirst[i] < arrSecond[j] ? arrFirst[i++] : arrSecond[j++]);
//   }

//   return [...arrSort, ...arrFirst.slice(i), ...arrSecond.slice(j)];
// };

// const mergeSort = (arr) => {
//   if (arr.length <= 1) {
//     return arr;
//   }

//   const mid = Math.floor(arr.length / 2);
//   const arrL = arr.slice(0, mid);
//   const arrR = arr.slice(mid);

//   return merge(mergeSort(arrL), mergeSort(arrR));
// };

// console.log(mergeSort([35, 67, 2, 5, 90, 45, 14, 67, 345, 6, 36, 8, 23, 93]));

/* ------------------------------------BUBBLE sort */

// function bubbleSort(arr) {
//   for (let i = 0; i < arr.length - 1; i++) {
//     for (let j = 0; j < arr.length - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         let swap = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = swap;
//       }
//     }
//   }
//   return arr;
// }

// console.log(bubbleSort([35, 67, 2, 5, 90, 45, 14, 67, 345, 6, 36, 8, 23, 93]));

/* -------------------------------------BINARY search */

// function binary(arr, search) {
//   let left = 0,
//     right = arr.length - 1;

//   while (left < right) {
//     const mid = Math.floor((left + right) / 2);

//     if (search <= arr[mid]) {
//       right = mid;
//     } else {
//       left = mid + 1;
//     }
//   }
//   return arr[right] === search ? right : -1;
// }

// console.log(binary([2, 5, 6, 8, 9, 12, 45, 79, 234], 12));

/* -------------------------return longer word of the string */

// const string = "Fella, in the wagon";

// console.log(
//   string
//     .split(" ")
//     .reduce(
//       (max, word) => (word.length > max ? (max = word.length) : 0, max),
//       0
//     )
// );

/* || use .map to create arr with length of each word, then use Math.max()*/

/* ---------------------------------fibonacci */

// const fib = (num) => (num < 2 ? num : fib(num - 1) + fib(num - 2));

// console.log(fib(10));

/* ----------------------------------fizzbuzz */

/* const arr = [9, 67, 2, 5, 90, 9, 14, 15, 60, 345, 6, 36, 8, 23, 93];

arr.map((num) =>
  num % 3 === 0 && num % 5 === 0
    ? console.log("fizzbuzz")
    : num % 5 === 0
    ? console.log("buzz")
    : num % 3 === 0
    ? console.log("fizz")
    : console.log(num)
); */

// const gen = (n, w) => (num) => num % n === 0 ? w : "";
// const fizz = gen(3, "fizz");
// const buzz = gen(5, "buzz");

// arr.forEach((num) => console.log(fizz(num) + buzz(num) || num));

/* ------------one-string solution: сумма квадратных корней четных чисел  */

// const arr = [4, 43, 47, 23, 100, 36];

// console.log(
//   arr.reduce((sum, num) => (num % 2 === 0 ? (sum += Math.sqrt(num)) : sum), 0)
// );

/* -------------------------------single matrix */

// function matrix(n) {
//   let result = [];

//   for (let i = 0; i < n; i++) {
//     let arr = [];
//     result.push(arr);
//     for (let j = 0; j < n; j++) {
//       i === j ? arr.push(1) : arr.push(0);
//     }
//   }
//   return result;
// }

// console.log(matrix(4));

/* ------------------------------find no-repeat nums */

// let arr = [1, 2, 3, 2, 6, 4, 7, 1, 6, 10, 3, 7];

// function arrayNoRepeat(arr) {
//   let result = [];
//   let lib = {};

//   arr.forEach((num) => {
//     lib[num] ? (lib[num] += 1) : (lib[num] = 1);
//   });

//   for (let key in lib) {
//     if (lib[key] === 1) {
//       result.push(+key);
//     }
//   }
//   return result;
// }
// console.log(arrayNoRepeat(arr));

/* ---------------------------sum node of tree */

// const tree = [
//   {
//     v: 5,
//     c: [
//       {
//         v: 5,
//         c: [{ v: 5 }, { v: 5 }],
//       },
//     ],
//   },
//   {
//     v: 6,
//     c: [{ v: 5 }, { v: 5 }, { v: 5 }],
//   },
//   {
//     v: 1,
//     c: [{ v: 5 }, { v: 5 }],
//   },
//   {
//     v: 8,
//     c: [{ v: 5, c: [{ v: 5 }] }],
//   },
// ];

// function treeSun(tree) {
//   if (!tree.length) return 0;

//   let sum = 0;
//   const arr = [];

//   tree.forEach((node) => arr.push(node));

//   while (arr.length) {
//     let t = arr.pop();
//     sum += t.v;

//     if (t.c) {
//       t.c.forEach((n) => arr.push(n));
//     }
//   }
//   return sum;
// }
// console.log(treeSun(tree));
