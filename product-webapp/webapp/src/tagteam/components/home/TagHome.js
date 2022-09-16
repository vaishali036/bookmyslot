 import InterviewerCard from '../interviwercard/InterviewerCard';
import React, { useState, useEffect,useCallback } from 'react';
import './../../../Interviewer/components/available-slots/availableslot.css'
import BDatePickerComponent from '../../../Interviewer/components/datepickercomponent/BDatePickerComponent';
 // import Pagination from '../../../Shared/pagination/Pagination';
import Paginations from '../../../Shared/pagination/Paginations';
import { useSearchParams } from 'react-router-dom';
import { getSlotByTechTracks } from '../../../services/api';
import axios from 'axios';
import { getLoggedInData } from '../../../services/auth';

  //create context for share tag home slot data in popup

function TagHome() {
  const [interviewerSlots,setInterviewerSlots] = useState([])
  const [date,setDate] = useState(new Date().toISOString().split('T')[0]);
  const [numOfRecords,setNumOfRecords] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [refresh,setRefresh]= useState(0)

  var currentData=[]
  let LIMIT = 3;


  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const getTagHomeCardData= async()=>{
    let techtrack = searchParams.get('techtrack')
    let response = await getSlotByTechTracks(techtrack);
      // axios.get('http://localhost:3000/interviewerSlots').then(response=>{
      
      let result = response.data;
      if(date){
        //  result = result.filter(item=> item.date===date)
        let dt1 = new Date(date.replaceAll(":","-")).setHours(0,0,0,0);
        result = result.filter(item=> {
         let dt2 = new Date(item.date.replaceAll(":","-")).setHours(0,0,0,0);
        return dt1 == dt2
        })  
         }
        setNumOfRecords(result.length);
        currentData =result.slice(
        (currentPage - 1) * LIMIT,
        (currentPage - 1) * LIMIT + LIMIT 
      );
      setInterviewerSlots(currentData)
  // } )
}

  

  useEffect(()=>{
     getTagHomeCardData();
    },[currentPage,numOfRecords,date,refresh])  
 
 
  const onSelectedDate = (sdate)=>{
    setCurrentPage(1)
     setDate(sdate);
  }

  //set title of page tech track
  const techTitle=()=>{
    switch(searchParams.get('techtrack')){
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

   
  return (
   
    <>
    <div style={{padding:'2rem'}}>
     <div className='d-flex justify-content-between'>
     <div><h2 style={{paddingBottom:'1rem',fontWeight:'700'}}>Welcome back {getLoggedInData().userName || ''} !</h2></div>
     <div><BDatePickerComponent onSelectDate={(sdate)=>onSelectedDate(sdate)}/></div>
     </div>
     
      <div className='home-cont'>
        <h3 className='text-center' >Interviewer Availablity Details</h3>
       <div className=" d-flex justify-content-between m-0" >
         <div><h1 className="p-0">{techTitle()} </h1></div>  
         <div> 
                 <Paginations
            totalRecords={numOfRecords}
            pageLimit={LIMIT}
            pageNeighbours={2}
            onPageChanged={onPageChanged}
            currentPage={currentPage}
          />
            </div>
         
       </div> 


       <div className='row my-3'>
        <div className='col-6 d-flex justify-content-end'>
       
       </div>
       </div>

       {/* Start Available card slot of interviewer */}
       <div className='row gy-4'>
        {interviewerSlots.map((data,index)=>{
          return ( 
              <div key={index}  className="col-12 col-sm-6 col-md-4">
              <InterviewerCard refresh={()=>setRefresh(key=>key+1)} interviewerInfo={data}/>
              </div>  
            )
        })}
        </div>
        {/* End Available card slot of interviewer */}


       </div>
    </div>
    </>
  )
      }

export default TagHome;