// import React from 'react';
// // export function getCurrentDate(separator = '') {

// //     let newDate = new Date()
// //     let date = newDate.getDate();
// //     let month = newDate.getMonth() + 1;
// //     let year = newDate.getFullYear();

// //     return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
// // }

// export const datetime = () => {
//     var displaytodaydate = showdate.getDate() + '/' + showdate.getMonth() + '/' + showdate.getFullYear();
//     return(
//         <div type="text" value="${displaytodaydate}" readonly="true">
//         </div>
//     )
// };

export function getCurrentDate(separator = '') {

    let myCurrentDate = new Date()
    let date = myCurrentDate.getDate();
    let month = myCurrentDate.getMonth() + 1;
    let year = myCurrentDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
}


// import React, { Component } from 'react';
// import { render } from 'react-dom';

// class Datetime extends Component {
//     constructor() {
//         this.state = {
//             currentDateTime: Date().toLocaleString()
//         }
//     }
//     render() {
//         return (
//             <div>
//                 <p>
//                     {this.state.currentDateTime}
//                 </p>
//             </div>
//         );
//     }
// }
