


const getLoggedInData=()=>{
    let userData =  localStorage.getItem('bookmyslot') || null;
    return userData ? JSON.parse(userData) : ''
}

export {getLoggedInData}