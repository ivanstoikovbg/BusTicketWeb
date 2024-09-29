import { checkQRCode, getQRCode } from '../3rdParty/requests';

// export default async function findLongestValidSubstring(input: string) {
//     // let maxSubstring = '';
//     // let currentSubstring = '';
//     // let currentId = 0;
//     // let maxId = 0;
//     // let startIndex = 0;

//     // while (startIndex < input.length) {
//     //     currentSubstring = '';
//     //     currentId = 0;

//     //     for (let i = startIndex; i < input.length; i++) {
//     //         const char = input[i];
//     //         const charCode = char.charCodeAt(0);

//     //         if (charCode >= 65 && charCode <= 90) {
//     //             currentId += charCode - 64;
//     //         } else if (charCode >= 97 && charCode <= 122) {
//     //             currentId -= charCode - 96;
//     //         }

//     //         if (currentId > 20 || currentId < 0) {
//     //             break;
//     //         } else {
//     //             currentSubstring += char;
//     //         }
//     //         if (currentSubstring.length > maxSubstring.length) {
//     //             maxSubstring = currentSubstring;
//     //             maxId = currentId;
//     //         }
//     //     }

//     //     startIndex++;
//     // }

//     // console.log('Longest valid substring:', maxSubstring);
//     // console.log('Corresponding ID:', maxId);

//     // return { maxSubstring, maxId };

//     let maxSubstring = '';
//     let currentSubstring = '';
//     let currentId = 0;
//     let maxId = 0;
//     let startIndex = 0;

//     while (startIndex < input.length) {
//         currentSubstring = '';
//         currentId = 0;

//         for (let i = startIndex; i < input.length; i++) {
//             const char = input[i];
//             const charCode = char.charCodeAt(0);

//             if (charCode >= 65 && charCode <= 90) {
//                 currentId += charCode - 64;
//             } else if (charCode >= 97 && charCode <= 122) {
//                 currentId -= charCode - 96;
//             }

//             if (currentId > 20 || currentId < 0) {
//                 break;
//             } else {
//                 currentSubstring += char;
//             }
//             if (currentSubstring.length > maxSubstring.length) {
//                 maxSubstring = currentSubstring;
//                 maxId = currentId;
//             }
//         }

//         startIndex++;
//     }

//     console.log('Longest valid substring:', maxSubstring);
//     console.log('Corresponding ID:', maxId);

//     return { maxSubstring, maxId };
// }
export async function findLongestValidSubstring(input: string) {
    let maxSubstring = '';
    let currentSubstring = '';
    let currentId = 0;
    let maxId = 0;
    let startIndex = 0;

    while (startIndex < input.length) {
        currentSubstring = '';
        currentId = 0;

        for (let i = startIndex; i < input.length; i++) {
            const char = input[i];
            const charCode = char.charCodeAt(0);

            if (charCode >= 65 && charCode <= 90) {
                currentId += charCode - 64;
            } else if (charCode >= 97 && charCode <= 122) {
                currentId -= charCode - 96;
            }

            if (currentId > 4 || currentId < 0 ) {
                    break;
            } else {
                currentSubstring += char;
            }
            if (currentSubstring.length > maxSubstring.length) {
                maxSubstring = currentSubstring;
                maxId = currentId;
            }
        }

        startIndex++;
    }

    console.log('Longest valid substring:', maxSubstring);
    console.log('Corresponding ID:', maxId);

    return { maxSubstring, maxId };
}

// export async function findLongestValidSubstringTest(input: string) {
//     let maxSubstring = '';
//     let currentSubstring = '';
//     let currentId = 0;
//     let maxId = 0;
//     let startIndex = 0;

//     for (let i = 0; i < input.length; i++) {
//         const char = input[i];
//         const charCode = char.charCodeAt(0);

//         if (charCode >= 65 && charCode <= 90) {
//             currentId += charCode - 64;
//         } else if (charCode >= 97 && charCode <= 122) {
//             currentId -= charCode - 96;
//         }

//         if (currentId > 20 || currentId < 0) {
//             startIndex = i + 1;
//             currentSubstring = '';
//             currentId = 0;
//         } else {
//             currentSubstring += char;
//             if (currentSubstring.length > maxSubstring.length) {
//                 maxSubstring = currentSubstring;
//                 maxId = currentId;
//             }
//         }
//     }

//     console.log('Longest valid substring:', maxSubstring);
//     console.log('Corresponding ID:', maxId);

//     return { maxSubstring, maxId };
// }


export async function getValidQRCode() {
    const response = await getQRCode();
    const { qr_code } = response;
    console.log(qr_code);
    const { maxSubstring } = await findLongestValidSubstring(qr_code);
    
    const check = await checkQRCode(maxSubstring);
    console.log(check);
    return maxSubstring;
}


findLongestValidSubstring("AbbBawqe")