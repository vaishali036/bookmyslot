import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
// import AvailableSlots from '../available-slots/AvailableSlots';
import BDatePickerComponent from "../datepickercomponent/BDatePickerComponent";
import "../available-slots/availableslot.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Bookslot from "../Book-slotPopup/bookslot";
import Updateslot from "../Update-slotPopup/updateslot";
import Paginations from "../../../Shared/pagination/Paginations";
import { getLoggedInData } from "../../../services/auth";
import instance from "../../../services/axios";
import { interviewerService } from "../../../services/api";
 //  import instance from "../../../services.js/axios";

function Home() {
  const [avilableSlots, setAvailableSlots] = useState([]);
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);
  const [updateshow, setupdateshow] = useState(false);
   const [numOfRecords,setNumOfRecords] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [slotData, setslotData] = useState({});
  const [slotsArray, setslotsArray] = useState();
  const [slotId,setSlotId] = useState(0)
  
  var currentData=[]
  let LIMIT = 3;
  // interview/slot/${interviewerEmailId}

  const setSlotData = (slot,slotsData) => {
    setslotData(slot)
    setslotsArray(slotsData)
    setupdateshow(true)
  }

  //send available slot to add slot modal
  const setBookSlotData = ()=>{
    setShow(true);
    setslotsArray(avilableSlots)
  }

 const updateDataFormat = (data)=>{
    // this gives an object with dates as keys
const groups = data.reduce((groups, item) => {
  const date = item.date;
  if (!groups[date]) {
    groups[date] = [];
  }
  groups[date].push(item);
  return groups;
}, {});

 // Edit: to add it in the array format instead
const groupArrays = Object.keys(groups).map((date) => {
  return {
    date,
    slots: groups[date]
  };
});
return groupArrays
  }
  
  useEffect(()=>{
    // axios.get(`http://localhost:3000/slots`).then(res=>{
     instance.get(`${interviewerService}slot/${getLoggedInData().userEmailId}`).then(res=>{
      let result = updateDataFormat(res.data) || [];
      setNumOfRecords(result.length);
      if(date){
         let dt1 = new Date(date.replaceAll(":","-")).setHours(0,0,0,0);
         console.log("Dt1",dt1)
         result = result.filter(item=> {
          let dt2 = new Date(item.date.replaceAll(":","-")).setHours(0,0,0,0);
         return dt1 == dt2
         })  
         setNumOfRecords(result.length);
         }
        currentData =result.slice(
        (currentPage - 1) * LIMIT,
        (currentPage - 1) * LIMIT + LIMIT 
      );
      setAvailableSlots(currentData);
    })
},[currentPage,numOfRecords,date,show,updateshow,slotId])

useEffect(()=>{
  setNumOfRecords(numOfRecords);
},[numOfRecords])


//format date
const setFormateDate=(date)=>{
  let parts = date.split(":");
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
    const formateDate = new Date(mydate).toLocaleDateString();
    return formateDate;
}
const onPageChanged = useCallback(
  (event, page) => {
    event.preventDefault();
    setCurrentPage(page);
  },
  [setCurrentPage]
);

   const closeModal = ()=>{
    setShow(false);
   }

  const onSelectedDate = (sdate) => {
    setCurrentPage(1)
    setDate(sdate);
  };


  return (
    <>
      <div style={{ padding: "2rem" }}>
        <h2 style={{ paddingBottom: "1rem", fontWeight: "700" }}>
          Welcome back Interviewer !
        </h2>
        <div className="home-cont">
          <div className=" d-flex justify-content-between m-0">
            <div>
              <h1 className="title-box p-0">Availability Details </h1>
            </div>
            <div>
              <button className="btn btn-primary" onClick={() => setBookSlotData()}>
                Add Slot <span className="h4 align-middle">+</span>{" "}
              </button>
              <Bookslot
                title="Add Slot"
                onClose={() => closeModal()}
                show={show}
                slotsArray = {slotsArray}
              ></Bookslot>
            </div>
          </div>

          <div className="my-3 d-flex">
            <div className="col-3">
              <BDatePickerComponent
                onSelectDate={(sdate) => onSelectedDate(sdate)}
              />
            </div>
           
            <div className="col-9 d-flex justify-content-end">
            <Paginations
            totalRecords={numOfRecords}
            pageLimit={LIMIT}
            pageNeighbours={2}
            onPageChanged={onPageChanged}
            currentPage={currentPage}
          />
            </div>
          </div>

       
          {avilableSlots.length ? (
            avilableSlots.map((item, index) => {
              return (
                <div key={index} className="py-2 interviewers-slot-cont">
                  <span style={{ fontWeight: "500" }}> {setFormateDate(item.date)}</span>
                  <div className="row my-3 gy-2">
                    {item.slots.map((slot)=>{
                   return (
                        <div key={slot.slotId} className="col-6 col-md-3">
                        <div className="available-slots-cont border position-relative">
                          {slot.startTime} : {slot.endTime}
                          <div className="position-absolute slot-edit-icon">
                            <FontAwesomeIcon
                              icon={faPencil}
                              onClick={() => setSlotData(slot,item) }
                            />
                            <Updateslot
                              slotData = {slotData}
                              slotsArray = {slotsArray}
                              title="Update Slot"
                              onClose={() => setupdateshow(false)}
                              refresh = {()=>setSlotId(key=>key+1)}
                              show={updateshow}
                            ></Updateslot>
                          </div>
                          <div></div>
                        </div>
                      </div>
                      )
                    })
                  }
                       
                        </div>
                </div>
              );
            })
          ) : (
            <h4 className="text-center">No data found</h4>
          )}
            </div>
       
      </div>
    </>
  );
}

export default Home;
