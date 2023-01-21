// if (split_data[1].includes('㎍')) {
//   const parse_data = split_data[1];
//   const first_index = parse_data.indexOf('(');
//   const second_index = parse_data.indexOf('㎍');
//   let find_data = parse_data.slice(first_index + 1, second_index).trim();

//   if (!find_data) {
//     const parse_data = split_data[1];
//     const second_index = parse_data.indexOf('㎍');
//     find_data = parse_data.slice(0, second_index).trim();
//     if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();
//     }
//     if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//     }
//   } else if (find_data.includes('표시량')) {
//     find_data = find_data
//       .slice(find_data.indexOf('량') + 1, find_data.length)
//       .trim();

//     if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();
//     }

//     if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//     }
//   } else if (
//     find_data.includes('(') ||
//     find_data.includes('[') ||
//     find_data.includes('｛') ||
//     find_data.includes('{') ||
//     find_data.includes('-')
//   ) {
//     find_data = find_data.substr(1).trim();
//     if (find_data.includes('(')) {
//       find_data = find_data
//         .slice(find_data.indexOf('(') + 1, find_data.length)
//         .trim();
//     }

//     if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//     } else {
//     }
//   } else {
//   }

//   const complete_data = {
//     엽산: `${find_data}ug`,
//   };
// } else if (split_data[1].includes('µg')) {
//   const parse_data = split_data[1];
//   const first_index = parse_data.indexOf('(');
//   const second_index = parse_data.indexOf('µg');
//   let find_data = parse_data.slice(first_index + 1, second_index).trim();

//   if (!find_data) {
//     const parse_data = split_data[1];
//     const second_index = parse_data.indexOf('µg');
//     find_data = parse_data.slice(0, second_index).trim();
//     if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();
//     }
//     if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//     }
//   } else if (find_data.includes('표시량')) {
//     find_data = find_data
//       .slice(find_data.indexOf('량') + 1, find_data.length)
//       .trim();

//     if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();
//     }

//     if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//     }
//   } else if (
//     find_data.includes('(') ||
//     find_data.includes('[') ||
//     find_data.includes('｛') ||
//     find_data.includes('{') ||
//     find_data.includes('-')
//   ) {
//     find_data = find_data.substr(1).trim();
//     if (find_data.includes('(')) {
//       find_data = find_data
//         .slice(find_data.indexOf('(') + 1, find_data.length)
//         .trim();
//     }

//     if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//     } else {
//     }
//   } else {
//   }

//   const complete_data = {
//     엽산: `${find_data}ug`,
//   };
// } else if (split_data[1].includes('μg')) {
//   const parse_data = split_data[1];
//   const first_index = parse_data.indexOf('(');
//   const second_index = parse_data.indexOf('μg');
//   let find_data = parse_data.slice(first_index + 1, second_index).trim();

//   if (!find_data) {
//     const parse_data = split_data[1];
//     const second_index = parse_data.indexOf('μg');
//     find_data = parse_data.slice(0, second_index).trim();
//     if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();
//     }
//     if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//     }
//   } else if (find_data.includes('표시량')) {
//     find_data = find_data
//       .slice(find_data.indexOf('량') + 1, find_data.length)
//       .trim();

//     if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();
//     }

//     if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//     }
//   } else if (
//     find_data.includes('(') ||
//     find_data.includes('[') ||
//     find_data.includes('｛') ||
//     find_data.includes('{') ||
//     find_data.includes('-')
//   ) {
//     find_data = find_data.substr(1).trim();
//     if (find_data.includes('(')) {
//       find_data = find_data
//         .slice(find_data.indexOf('(') + 1, find_data.length)
//         .trim();
//     }

//     if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//     } else {
//     }
//   } else {
//   }

//   const complete_data = {
//     엽산: `${find_data}ug`,
//   };
// } else if (split_data[1].includes('ug')) {
//   const parse_data = split_data[1];
//   const first_index = parse_data.indexOf('(');
//   const second_index = parse_data.indexOf('ug');
//   let find_data = parse_data.slice(first_index + 1, second_index).trim();

//   if (!find_data) {
//     const parse_data = split_data[1];
//     const second_index = parse_data.indexOf('ug');
//     find_data = parse_data.slice(0, second_index).trim();
//     if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();
//     }
//     if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//     }
//   } else if (find_data.includes('표시량')) {
//     find_data = find_data
//       .slice(find_data.indexOf('량') + 1, find_data.length)
//       .trim();

//     if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();
//     }

//     if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//     }
//   } else if (
//     find_data.includes('(') ||
//     find_data.includes('[') ||
//     find_data.includes('｛') ||
//     find_data.includes('{') ||
//     find_data.includes('-')
//   ) {
//     find_data = find_data.substr(1).trim();
//     if (find_data.includes('(')) {
//       find_data = find_data
//         .slice(find_data.indexOf('(') + 1, find_data.length)
//         .trim();
//     }

//     if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//     } else {
//     }
//   } else {
//   }
//   const complete_data = {
//     엽산: `${find_data}ug`,
//   };
// } else if (split_data[1].includes('mcg')) {
//   const parse_data = split_data[1];
//   const first_index = parse_data.indexOf('(');
//   const second_index = parse_data.indexOf('mcg');
//   let find_data = parse_data.slice(first_index + 1, second_index).trim();

//   if (!find_data) {
//     const parse_data = split_data[1];
//     const second_index = parse_data.indexOf('mcg');
//     find_data = parse_data.slice(0, second_index).trim();
//     if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();
//     }
//     if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//     }
//   } else if (find_data.includes('표시량')) {
//     find_data = find_data
//       .slice(find_data.indexOf('량') + 1, find_data.length)
//       .trim();

//     if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();
//     }

//     if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//     }
//   } else if (find_data.includes('(')) {
//     find_data = find_data
//       .slice(find_data.indexOf('(') + 1, find_data.length)
//       .trim();
//   }
//   if (find_data) {
//     const complete_data = {
//       엽산: `${find_data}mcg`,
//     };
//   }
// } else if (split_data[1].includes('mg')) {
//   const parse_data = split_data[1];
//   const first_index = parse_data.indexOf('(');
//   const second_index = parse_data.indexOf('g');
//   let find_data = parse_data.slice(first_index + 1, second_index).trim();

//   if (!find_data) {
//     const parse_data = split_data[1];
//     const second_index = parse_data.indexOf('g');
//     find_data = parse_data.slice(0, second_index).trim();
//     if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();
//     }
//     if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//     }
//   } else if (find_data.includes('표시량')) {
//     find_data = find_data
//       .slice(find_data.indexOf('량') + 1, find_data.length)
//       .trim();

//     if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();
//     }

//     if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-') ||
//       find_data.includes('：')
//     ) {
//       find_data = find_data.substr(1).trim();
//     }
//   } else if (find_data.includes('(')) {
//     find_data = find_data
//       .slice(find_data.indexOf('(') + 1, find_data.length)
//       .trim();
//   }

//   if (find_data) {
//     const complete_data = {
//       엽산: `${find_data}g`,
//     };
//   }
// } else if (split_data[1].includes('(')) {
//   const parse_data = split_data[1];
//   const first_index = parse_data.indexOf('(');
//   const second_index = parse_data.indexOf(')');
//   const find_data = parse_data.slice(first_index + 1, second_index).trim();

//   const complete_data = {
//     엽산: `${find_data}ug`,
//   };
// } else {
//   const parse_data = split_data[0];
//   const first_index = parse_data.indexOf('(');
//   const second_index = parse_data.indexOf('g');
//   let find_data = parse_data.slice(first_index + 1, second_index).trim();
//   if (
//     find_data.includes('u') ||
//     find_data.includes('μ') ||
//     find_data.includes('u') ||
//     find_data.includes('u')
//   ) {
//     find_data = `${find_data.substr(0, find_data.length - 1).trim()}u`;
//   }

//   if (find_data.includes('표시량')) {
//     find_data = find_data
//       .slice(find_data.indexOf('량') + 1, find_data.length)
//       .trim();
//   }

//   if (find_data.length > 1) {
//     const complete_data = {
//       엽산: `${find_data}g`,
//     };
//   }
// }
