// if (split_data[1].includes('mg')) {
//     const parse_data = split_data[1];
//     const first_index = parse_data.indexOf('(');
//     const second_index = parse_data.indexOf('g');
//     let find_data = parse_data
//       .slice(first_index + 1, second_index)
//       .trim();

//     if (!find_data) {
//       const parse_data = split_data[1];
//       const second_index = parse_data.indexOf('g');
//       find_data = parse_data.slice(0, second_index).trim();
//       if (find_data.includes('표시량')) {
//         find_data = find_data
//           .slice(find_data.indexOf('량') + 1, find_data.length)
//           .trim();
//       }
//       if (
//         find_data.includes('(') ||
//         find_data.includes('[') ||
//         find_data.includes('｛') ||
//         find_data.includes('{') ||
//         find_data.includes('-')
//       ) {
//         find_data = find_data.substr(1).trim();
//       }
//     } else if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();

//       if (find_data.includes('표시량')) {
//         find_data = find_data
//           .slice(find_data.indexOf('량') + 1, find_data.length)
//           .trim();
//       }

//       if (
//         find_data.includes('(') ||
//         find_data.includes('[') ||
//         find_data.includes('｛') ||
//         find_data.includes('{') ||
//         find_data.includes('-')
//       ) {
//         find_data = find_data.substr(1).trim();
//       }
//     } else if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//       if (find_data.includes('(')) {
//         find_data = find_data
//           .slice(find_data.indexOf('(') + 1, find_data.length)
//           .trim();
//       }

//       if (
//         find_data.includes('(') ||
//         find_data.includes('[') ||
//         find_data.includes('｛') ||
//         find_data.includes('{') ||
//         find_data.includes('-')
//       ) {
//         find_data = find_data.substr(1).trim();
//       } else {
//       }
//     } else {
//     }

//     const complete_data = {
//       아연: `${find_data}g`,
//     };
//   } else if (split_data[1].includes('㎎')) {
//     const parse_data = split_data[1];
//     const first_index = parse_data.indexOf('(');
//     const second_index = parse_data.indexOf('㎎');
//     let find_data = parse_data
//       .slice(first_index + 1, second_index)
//       .trim();

//     if (!find_data) {
//       const parse_data = split_data[1];
//       const second_index = parse_data.indexOf('㎎');
//       find_data = parse_data.slice(0, second_index).trim();
//       if (find_data.includes('표시량')) {
//         find_data = find_data
//           .slice(find_data.indexOf('량') + 1, find_data.length)
//           .trim();
//       }
//       if (
//         find_data.includes('(') ||
//         find_data.includes('[') ||
//         find_data.includes('｛') ||
//         find_data.includes('{') ||
//         find_data.includes('-')
//       ) {
//         find_data = find_data.substr(1).trim();
//       }
//     } else if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();

//       if (find_data.includes('표시량')) {
//         find_data = find_data
//           .slice(find_data.indexOf('량') + 1, find_data.length)
//           .trim();
//       }

//       if (
//         find_data.includes('(') ||
//         find_data.includes('[') ||
//         find_data.includes('｛') ||
//         find_data.includes('{') ||
//         find_data.includes('-')
//       ) {
//         find_data = find_data.substr(1).trim();
//       }
//     } else if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//       if (find_data.includes('(')) {
//         find_data = find_data
//           .slice(find_data.indexOf('(') + 1, find_data.length)
//           .trim();
//       }

//       if (
//         find_data.includes('(') ||
//         find_data.includes('[') ||
//         find_data.includes('｛') ||
//         find_data.includes('{') ||
//         find_data.includes('-')
//       ) {
//         find_data = find_data.substr(1).trim();
//       } else {
//       }
//     } else {
//     }

//     const complete_data = {
//       아연: `${find_data}mg`,
//     };
//   } else if (split_data[1].includes('g')) {
//     const parse_data = split_data[1];
//     const first_index = parse_data.indexOf('(');
//     const second_index = parse_data.indexOf('g');
//     let find_data = parse_data
//       .slice(first_index + 1, second_index)
//       .trim();

//     if (!find_data) {
//       const parse_data = split_data[1];
//       const second_index = parse_data.indexOf('g');
//       find_data = parse_data.slice(0, second_index).trim();
//       if (find_data.includes('표시량')) {
//         find_data = find_data
//           .slice(find_data.indexOf('량') + 1, find_data.length)
//           .trim();
//       }
//       if (
//         find_data.includes('(') ||
//         find_data.includes('[') ||
//         find_data.includes('｛') ||
//         find_data.includes('{') ||
//         find_data.includes('-')
//       ) {
//         find_data = find_data.substr(1).trim();
//       }
//     } else if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();

//       if (find_data.includes('표시량')) {
//         find_data = find_data
//           .slice(find_data.indexOf('량') + 1, find_data.length)
//           .trim();
//       }

//       if (
//         find_data.includes('(') ||
//         find_data.includes('[') ||
//         find_data.includes('｛') ||
//         find_data.includes('{') ||
//         find_data.includes('-')
//       ) {
//         find_data = find_data.substr(1).trim();
//       }
//     } else if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//       if (find_data.includes('(')) {
//         find_data = find_data
//           .slice(find_data.indexOf('(') + 1, find_data.length)
//           .trim();
//       }

//       if (
//         find_data.includes('(') ||
//         find_data.includes('[') ||
//         find_data.includes('｛') ||
//         find_data.includes('{') ||
//         find_data.includes('-')
//       ) {
//         find_data = find_data.substr(1).trim();
//       } else {
//       }
//     } else {
//     }

//     const complete_data = {
//       아연: `${find_data}g`,
//     };
//   } else if (split_data[1].includes('(')) {
//     const parse_data = split_data[1];
//     const first_index = parse_data.indexOf('(');
//     const second_index = parse_data.indexOf(')');
//     let find_data = parse_data
//       .slice(first_index + 1, second_index)
//       .trim();

//     if (!find_data) {
//       const parse_data = split_data[1];
//       const second_index = parse_data.indexOf(')');
//       find_data = parse_data.slice(0, second_index).trim();
//       if (find_data.includes('표시량')) {
//         find_data = find_data
//           .slice(find_data.indexOf('량') + 1, find_data.length)
//           .trim();
//       }
//       if (
//         find_data.includes('(') ||
//         find_data.includes('[') ||
//         find_data.includes('｛') ||
//         find_data.includes('{') ||
//         find_data.includes('-')
//       ) {
//         find_data = find_data.substr(1).trim();
//       }
//     } else if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();

//       if (find_data.includes('표시량')) {
//         find_data = find_data
//           .slice(find_data.indexOf('량') + 1, find_data.length)
//           .trim();
//       }

//       if (
//         find_data.includes('(') ||
//         find_data.includes('[') ||
//         find_data.includes('｛') ||
//         find_data.includes('{') ||
//         find_data.includes('-')
//       ) {
//         find_data = find_data.substr(1).trim();
//       }
//     } else if (
//       find_data.includes('(') ||
//       find_data.includes('[') ||
//       find_data.includes('｛') ||
//       find_data.includes('{') ||
//       find_data.includes('-')
//     ) {
//       find_data = find_data.substr(1).trim();
//       if (find_data.includes('(')) {
//         find_data = find_data
//           .slice(find_data.indexOf('(') + 1, find_data.length)
//           .trim();
//       }

//       if (
//         find_data.includes('(') ||
//         find_data.includes('[') ||
//         find_data.includes('｛') ||
//         find_data.includes('{') ||
//         find_data.includes('-')
//       ) {
//         find_data = find_data.substr(1).trim();
//       } else {
//       }
//     } else {
//     }
//     const complete_data = {
//       아연: `${find_data}mg`,
//     };
//   } else if (split_data[0].includes('mg')) {
//     const parse_data = split_data[0];
//     const first_index = parse_data.indexOf('(');
//     const second_index = parse_data.indexOf('mg');
//     let find_data = parse_data
//       .slice(first_index + 1, second_index)
//       .trim();

//     if (!find_data) {
//     } else if (find_data.includes('표시량')) {
//       find_data = find_data
//         .slice(find_data.indexOf('량') + 1, find_data.length)
//         .trim();

//       if (find_data.includes('표시량')) {
//         find_data = find_data
//           .slice(find_data.indexOf('량') + 1, find_data.length)
//           .trim();
//       }

//       if (
//         find_data.includes('(') ||
//         find_data.includes('[') ||
//         find_data.includes('｛') ||
//         find_data.includes('{') ||
//         find_data.includes('-')
//       ) {
//         find_data = find_data.substr(1).trim();
//       }
//     } else if (find_data.includes('(')) {
//       find_data = find_data
//         .slice(find_data.indexOf('(') + 1, find_data.length)
//         .trim();
//     }
//     if (find_data) {
//       const complete_data = {
//         아연: `${find_data}mg`,
//       };
//     }
//   } else {
//   }
