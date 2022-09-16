import React, { useState } from "react";
import './interviewercard.css';
import Tagbookslotpopup from '../bookslotpopup/Tagbookslotpopup';
import '../interviwercard/interviewerSlots.css'



function InterViewerSlots({ slots,interviewerInfo,refresh }) {
  const [show, setShow] = useState(false);
  const [slotData,setSlotData] = useState('');

  const closeModal = () => {
    setShow(false);
  }

  const openTagBookSlotPopup = (data)=>{
    setSlotData(data);
    setShow(true)
  }


  return (
    <>
    <div className="col-4" >
      <a onClick={() => openTagBookSlotPopup(slots)}>
        <div className={"av-slots cpointer " + (slots.bookedStatus === 'BOOKED' ? 'booked' : '')}>{slots.startTime} : {slots.endTime}</div>
      </a>
      <div>
        <Tagbookslotpopup slots = {slotData} refresh={refresh} interviewerInfo={interviewerInfo} title="Book Slot" onClose={() => closeModal()} show={show}></Tagbookslotpopup>
      </div>
      </div>
    </>
  )
}

export default InterViewerSlots