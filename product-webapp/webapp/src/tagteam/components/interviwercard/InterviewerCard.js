import React from 'react';
import './interviewercard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar , faPhone , faEnvelope} from '@fortawesome/free-solid-svg-icons';
import InterViewerSlots from './InterViewerSlots';


function InterviewerCard({interviewerInfo,refresh}) {

 
  const setFormateDate=(date)=>{
   if(date){
    let parts = date.split(":");
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
    const formateDate = new Date(mydate).toDateString();
    return formateDate;
   }
  }

  return (
     
             <div className="card m-auto p-4">
             <div className="row">
                <div className="col-6"><h2>{interviewerInfo.interviewerName} </h2></div>
                <div className="col-6 text-right">
                <FontAwesomeIcon icon={faCalendar} className="ml-2" /> {setFormateDate(interviewerInfo.date)}</div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div>
                    <p className='p-0 m-0'>{interviewerInfo.interviewerEmailId} <FontAwesomeIcon icon={faEnvelope} className="ml-2" /></p>
                    <p className='p-0 m-0'>{interviewerInfo.phoneNo}  <FontAwesomeIcon icon={faPhone} className="ml-2" /></p>
                   </div> 
                </div>
                <div className="col-6">
                  {/* <h3 className='text-right'>{interviewerInfo.status}</h3> */}
                  <h3 className='text-right'>AVAILABLE</h3>
                </div>
              </div>
              <div className="row gy-2 mt-3">
                  
                  {interviewerInfo.slots.map(item=>{
                      return ( 
                      <InterViewerSlots key={item.slotId} refresh={refresh} slots= {item} interviewerInfo = {interviewerInfo} />
                      )
                  })}
              </div>
             </div>
         
  )
}

export default InterviewerCard