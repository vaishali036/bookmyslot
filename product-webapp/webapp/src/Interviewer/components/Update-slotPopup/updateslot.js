import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import '../Book-slotPopup/bookslot.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Row, Button } from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert'; 
import './confirmationbox.css'; 
import '../Book-slotPopup/bookslot.module.css';
import axios from "axios";
import { getLoggedInData } from "../../../services/auth";
import notify from "../../../Shared/notify";
import instance from "../../../services/axios";
import { interviewerService } from "../../../services/api";


const Updateslot = props => {
    const closeOnEscapeKeyDown = e => {
        if ((e.charCode || e.keyCode) === 27) {
            props.onClose();
        }
    };

    const [inputField,setInputField] = useState({
        slotId : '',
        interviewerEmailId : '',
        interviewerName: '',
        bookedStatus : '',
        startTime : '',
        endTime :'',
        date : '' ,// yyyy-mm-dd,
        description: ''
    })
    const [sameSlotError,setSameSlotError] = useState('')
    const [timeError,settimeError]=useState('')
    
    var todayDate =new Date().toISOString().split('T')[0]
    var defaultDate = new Date(props.slotData.date).toLocaleDateString().split('T')[0];
    let data = props.slotData ;
    

   
      
            // console.log(props.slotData)
        if(props && Object.keys(props.slotData).length>0){
            let parts = props.slotData.date.split(":");
            var mydate = new Date(parts[0], parts[1] - 1, parts[2]).setHours('6'); 
            // console.log(new Date(mydate).toISOString())
            defaultDate = new Date(mydate).toISOString().split('T')[0];
            }

   


    const handleChange = (e)=>{
        setInputField({...inputField,[e.target.name]:e.target.value});
    }
   

//     useEffect(()=>{
//         setInputField(inputField,props.slotData)
//    },[data])

useEffect(()=>{
    if(inputField.startTime){
        checkValidation();
    }
    },[inputField])

    useEffect(()=>{
        setInputField({
        slotId : props.slotData.slotId,
        interviewerEmailId : getLoggedInData()?.userEmailId || '',
        interviewerName: getLoggedInData()?.userName || '',
        bookedStatus : props.slotData.bookedStatus,
        startTime : props.slotData.startTime,
        endTime : props.slotData.endTime,
        date :  props.slotData.date, // yyyy-mm-dd,
        description: props.slotData.description
        })
       if(inputField.startTime){
        checkValidation();
        settimeError('')
       }
    },[data,todayDate])

  

    

   
    useEffect(() => {
        document.body.addEventListener("keydown", closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
        
    }, []);
 

    //Update date format
    const selectDate = (e) => {
       let date = new Date(e.target.value);
       let y = date.getFullYear().toString();
       let m = (date.getMonth()+1).toString();
       let d = date.getDate().toString();
       let formatDate = y+':'+m+':'+d
       setInputField({...inputField,date : formatDate})
    
     }

     
    
 
    // confirmation box
    const confirmationBox = () => {
        props.onClose();
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this interview slot?',
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => {deleteSlot()}  //api call on confirm
                },
                {
                    label: 'No',
                    onClick: () => props.onClose()   //close the modal
                }
            ]
        });
    };

    //slot delete 
    const deleteSlot = ()=>{
        instance.delete(`${interviewerService}interview/slot/${props.slotData.slotId}`).then(response=>{
            if(response.data){
               notify('Slot is deleted successfully','success')
              props.refresh();
            }
        }).catch(err=>{
            console.log(err)
        })
    }

 const checkValidation=()=>{
    let st1= Number(inputField.startTime.replace(":","."));
    let st2 =  Number(inputField.endTime.replace(":","."));
    if(st1 >= st2) {                                 //compare starttime and end time
        settimeError('End time should be greater than start time.')
      }
    // else{
    //     console.log("smaller")
    //     settimeError('')
    // }
     
 }

    
//check slots time is available or not
const checkAvailability =(data)=>{
    let st1= Number(data.startTime.replace(":","."));
   let st2 =  Number(data.endTime.replace(":","."));
   let availablilty = false;
   let str1 = data.date.replaceAll(":","-");
   let str2 = props.slotsArray.date.replaceAll(":","-")
   if(new Date(str2).toDateString()==new Date(str1).toDateString() ){  
      return availablilty = props.slotsArray.slots.some(timing=>{
           let at1 = Number(timing.startTime.replace(":","."))
           let at2 = Number(timing.endTime.replace(":","."))
           return ((st1 >= at1) && (st1 < at2 )) || ((st2 > at1) && (st2 < at2));
       })  
   }
   if(st1 >= st2) {                                  //compare starttime and end time
       settimeError('End time should be greater than start time.')
     }
 
   return availablilty;
   
}


   //   handle form on submit form
 const handleSubmit = ()=>{
    //  console.log(inputField)
    instance.put(`${interviewerService}slot/${props.slotData.slotId}`,inputField).then(response=>{
        if(response.data){
           notify('Slot is updated successfully','success')
           props.onClose()
        }
    }).catch(err=>{
        console.log(err)
    })
}

 


    return (
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
             
            <div className="modal" onClick={props.onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h4 className="modal-title">{props.title}</h4>
                        <div className="p-3">
                            <button type="button" className="btn-close" aria-label="Close" onClick={props.onClose}></button>
                        </div>
                    </div>

                    <div className="modal-body">
                        <Form>

                            <Form.Group as={Row} className="mb-3" controlId="slotId">
                                <Form.Label column sm={3}>Slot ID </Form.Label>
                                <Form.Control type="text" rows={1} name="slotId" defaultValue={props.slotData.slotId} readOnly ></Form.Control>
                             </Form.Group>

                            <Form.Group as={Row} className='d-flex align-items-center mb-3' controlId="date">
                                <Form.Label column sm={3}>Select Date</Form.Label>
                                <Form.Control type="date" name="date" defaultValue={defaultDate} min={todayDate} 
                                onChange={($event) => selectDate($event)}></Form.Control>
                            </Form.Group>
 

                            <Form.Group as={Row} className="mb-3" controlId="formGridState">
                                <Form.Label column sm={3}>Slot</Form.Label>
                                <Col sm={3}>
                                    <Form.Select name="startTime" defaultValue={props.slotData.startTime} value={inputField.startTime} onChange={($event) => handleChange($event)}>
                                    <option value="09:00">09:00</option>
                                        <option value="09:30">09:30</option>
                                        <option value="10:00">10:00</option>
                                        <option value="10:30">10:30</option>
                                        <option value="11:00">11:00</option>
                                        <option value="11:30">11:30</option>
                                        <option value="12:00">12:00</option>
                                        <option value="12:30">12:30</option>
                                        <option value="13:00">13:00</option>
                                        <option value="13:30">13:30</option>
                                        <option value="14:00">14:00</option>
                                        <option value="14:30">14:30</option>
                                        <option value="15:00">15:00</option>
                                        <option value="15:30">15:30</option>
                                        <option value="16:00">16:00</option>
                                        <option value="16:30">16:30</option>
                                        <option value="17:00">17:00</option>
                                        <option value="17:30">17:30</option>
                                        <option value="18:00">18:00</option>
                                    </Form.Select>
                                </Col> -
                                <Col sm={3}>
                                    <Form.Select name="endTime" defaultValue={props.slotData.endTime} onChange={($event) => handleChange($event)} >
                                    <option value="09:30">09:30</option>
                                        <option value="10:00">10:00</option>
                                        <option value="10:30">10:30</option>
                                        <option value="11:00">11:00</option>
                                        <option value="11:30">11:30</option>
                                        <option value="12:00">12:00</option>
                                        <option value="12:30">12:30</option>
                                        <option value="13:00">13:00</option>
                                        <option value="13:30">13:30</option>
                                        <option value="14:00">14:00</option>
                                        <option value="14:30">14:30</option>
                                        <option value="15:00">15:00</option>
                                        <option value="15:30">15:30</option>
                                        <option value="16:00">16:00</option>
                                        <option value="16:30">16:30</option>
                                        <option value="17:00">17:00</option>
                                        <option value="17:30">17:30</option>
                                        <option value="18:00">18:00</option>
                                    </Form.Select>
                                </Col>
                                <Col sm={9} style={{marginLeft:'68px'}}> <div className="error">{timeError}</div></Col>
                                {/* <Col sm={9} style={{marginLeft:'16px'}}> <div className="error">{sameSlotError}</div></Col> */}
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formGridState">
                                <Form.Label column sm={3}>Status</Form.Label>
                                <Col sm={6}>
                                    <Form.Select name="bookedStatus" className="form-select1" defaultValue={props.slotData.bookedStatus}>
                                        <option value="AVAILABLE">Available</option>
                                        <option value="UPCOMING">Upcoming</option>
                                        <option value="UNAVAILABLE">Unavailable</option>
                                    </Form.Select>
                                </Col>
                                {/* <Col sm={9} style={{marginLeft:'121px'}}> <div className="error">{error.startTime}</div></Col> */}
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label column sm={3}>Description</Form.Label>
                                <Form.Control as="textarea" name="description" rows={3} defaultValue={props.slotData.description} value={inputField.description} onChange={($event) => handleChange($event)}/>
                            </Form.Group>

                        </Form>
                    </div>


                    <div className="modal-footer">
                        <Button type="submit" onClick={handleSubmit} className="btn-primary" disabled={timeError || sameSlotError}>
                            Update
                        </Button>
                        <Button type="button" onClick={confirmationBox} className="btn-primary">
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
};

export default Updateslot;
