import axios from "axios";


// const instance = axios.create({
//   baseURL: `http://localhost:8097/api/v1/`
//    baseURL: `${process.env.REACT_APP_API_BASEURL}`
  
// });

  const instance = axios.create({
    
    // baseURL: `${process.env.REACT_APP_LOCAL_URL}`
    baseURL: `${process.env.REACT_APP_API_BASEURL}`
  });


export default instance;


