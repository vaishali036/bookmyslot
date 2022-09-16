export const cloneObjectDeeply = obj => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch(e) {
    console.error('falied to clone object');
    return obj;
  }
}
export const isPastDate = function (firstDate) {
  firstDate = new Date(firstDate.split(':').join('-'));
  const secondDate = new Date();
  if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
    return true;
  }
  return false;
};


//set title of page tech track
export const techTitle=(techTrack)=>{
  switch(techTrack){
    case 'frontend':
      return 'Frontend developer';
    case 'backend':
      return 'Backend developer';
    case 'fullstack':
      return 'Full stack developer'
    case 'mobile_dev':
      return 'Mobile developer';
    case 'data_science':
      return 'Data sceince';
    case 'devops':
      return 'Devops developer';
    case 'testing':
      return 'Software testing';
    case 'support':
      return 'Support L/L2 developer';
    case 'software_architect':
      return 'Software architecture';
    default:
      return 'Developer'
  }
}

export const converDateFormat = (date)=>{
  // console.log(date)
  let parts = date.replaceAll(":","-");
  let updateFormat = new Date(parts);
//  console.log( updateFormat.toLocaleString('default', { month: 'short' }))
  return updateFormat;
  // var mydate = new Date(parts[0], parts[1] - 1, parts[2]).setHours('6'); 
}

export const getMonth = (date)=>{
  let parts = date.replaceAll(":","-");
  let updateFormat = new Date(parts);
  let monthName = updateFormat.toLocaleString('default', { month: 'short' })
  return monthName;
}

export const getDate = (date)=>{
  let dd =  date.split(':').reverse().join('-');
  return dd;
}



 