import React from 'react';
import TechtrackCard from './TechtrackCard';
import "../techtrack/TechtrackCard1.css"

function TechtrackHome() {

  //   useEffect(()=>{
  //     axios.get('http://localhost:3000/slot').then(res=>{
  //       let result = res.data ;
  //       if(date){
  //         const newArray = result.filter(item=> item.date===date)
  //         setAvailableSlots(newArray)
  //       }
  //       else{import "./TechtrackCard.module.css"
  //         setAvailableSlots(result);
  //       }
  //     })
  //   },[date])

  //   const onSelectedDate = (sdate)=>{
  //      setDate(sdate)
  //   }

  return (
    <>
      <div className='techtrackName' style={{ padding: '2rem' }}>
        <div className='d-flex justify-content-between'>
          <div><h2 style={{ paddingBottom: '1rem', fontWeight: '700' }}>Welcome back Interviewer !</h2></div>
        </div>
        <div className='home-cont'>
          <div className=" d-flex justify-content-between m-0" >
            <div><h1 className="title-box">Select a Tech Track</h1></div>
          </div>
          <div className='row my-3'>
            {/* <div className="col-6"><BDatePickerComponent onSelectDate={(sdate)=>onSelectedDate(sdate)}/></div> */}
            <div className='col-6 d-flex justify-content-end'></div>
          </div>
          {/* Start Available Tech Track card */}
          <TechtrackCard 
          />
          {/* End Available tech track card slots */}
        </div>
      </div>
    </>
  )
}

export default TechtrackHome;