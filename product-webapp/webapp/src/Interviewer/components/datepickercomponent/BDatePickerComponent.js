import React from 'react'
import Form from 'react-bootstrap/Form';
import './BDatePickerComponent.css';

function BDatePickerComponent({onSelectDate}){
    const defaulDate = new Date().toISOString().split('T')[0];
    

    const selectDate = (e)=>{
         let date = e.target.value
        let updateDate = date.split('-').join(":");
        console.log(updateDate,'ud')
        onSelectDate(updateDate);
    }
 
        return(
            <div>
                 
                        <Form.Group controlId="dob" className='d-flex align-items-center'>
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Select date" defaultValue={defaulDate} onChange={($event)=>selectDate($event)} />
                        </Form.Group>
                    </div>
                 
        )
     
}

export default BDatePickerComponent;