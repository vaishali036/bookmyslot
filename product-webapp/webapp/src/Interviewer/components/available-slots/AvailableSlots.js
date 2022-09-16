import React from 'react'
import './availableslot.css';
 
function AvailableSlots({slots}) {
  
 slots.availableSlots.map((item,index)=>{
  return <div key={index} className='available-slots-cont border'>{item.slotFrom} :  {item.slotTo}</div>
})
   
 
}

export default AvailableSlots