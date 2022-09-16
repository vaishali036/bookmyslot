import React, { useState, useEffect } from "react";
 import { CSSTransition } from "react-transition-group";
import "./bookslot.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Row, Button } from "react-bootstrap";
 import notify from '../../../Shared/notify'
 import axios from "axios";
import { getLoggedInData } from "../../../services/auth";
import { getUserData, interviewerService } from "../../../services/api";
import instance from "../../../services/axios";
 
const Bookslot = props => {
    const closeOnEscapeKeyDown = e => {
        if ((e.charCode || e.keyCode) === 27) {
            props.onClose();
        }
    };

     var defaultDate = new Date().toISOString().split('T')[0]
     defaultDate =  defaultDate.split('-').join(":");
     var todayDate = new Date().toISOString().split('T')[0]


    const [inputField,setInputField] = useState({
        interviewerEmailId : getLoggedInData()?.userEmailId || '',
        interviewerName: getLoggedInData()?.userName || '',
        bookedStatus : 'AVAILABLE',
        startTime : "09:00",
        endTime : "09:30",
        date :  new Date().toISOString().split('T')[0], // yyyy-mm-dd,
        description:'',
        techTrack : '',
        phoneNo : ''
    })

    const [sameSlotError,setSameSlotError] = useState('')
    const [timeError,settimeError]=useState('')


    const setFormatDate = () => {
        let date = new Date();
       let y = date.getFullYear().toString();
       let m = (date.getMonth()+1).toString();
       let d = date.getDate().toString();
        let formatDate = y+':'+m+':'+d
        setInputField({...inputField,date : formatDate})
    }
    

  

    //get logged in user data
    const getLoggedUserData = async(userEmailId)=>{
        let response = await getUserData(userEmailId);
        let result = response.data ;
        setInputField({...inputField,techTrack :  result.department,phoneNo : result.phoneNo})
    }


    useEffect(() => {
        setFormatDate();
        const userEmailId = getLoggedInData().userEmailId;
        getLoggedUserData(userEmailId);
        document.body.addEventListener("keydown", closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
      
    }, []);

     

    
    const selectDate = (e) => {
    //    let date = new Date(e.target.value);
    //    let y = date.getFullYear().toString();
    //    let m = (date.getMonth()+1).toString();
    //    let d = date.getDate().toString();
    //     let formatDate = y+':'+m+':'+d
        let date = e.target.value
        let updateDate = date.split('-').join(":");
        setInputField({...inputField,date : updateDate})
    }
       

    

     useEffect(()=>{
     if(props && props.slotsArray && props.slotsArray.length){
        let availability = checkAvailability(inputField.date);
        availability ? setSameSlotError('This slot time is already booked') : setSameSlotError('') //set errors
     }
     },[inputField])
//  handle on change of input value
  const handleChange = (e)=>{
      setInputField({...inputField,[e.target.name]:e.target.value})
  }
 

   //check slots time is available or not
   const checkAvailability =(date)=>{
     let st1= Number(inputField.startTime.replace(":","."));
    let st2 =  Number(inputField.endTime.replace(":","."));
    let availablilty = false;
    let str1 = date.replaceAll(":","-");
    let index = props.slotsArray.findIndex(item=>{
        let str2 = item.date.replaceAll(":","-")   //update time format 2022:04:02 to 2022-04-02
       return new Date(str2).toDateString()==new Date(str1).toDateString()     //compare date
    })
    if(index >-1){  
       return availablilty = props.slotsArray[index].slots.some(timing=>{
            let at1 = Number(timing.startTime.replace(":","."))
            let at2 = Number(timing.endTime.replace(":","."))
            // console.log("tttt",st1,st2,at1,at2);
            return ((st1 >= at1) && (st1 < at2 )) || ((st2 > at1) && (st2 < at2));
        })  
    }
    if(st1 >= st2) {                                  //compare starttime and end time
        settimeError('End time should be greater than start time.')
      }
      else{
        settimeError()
     }
    return availablilty;
    
 }

//   handle form on submit form
 const handleSubmit = async()=>{
     let response = 
     instance.post(`${interviewerService}slot`,inputField).then(response=>{
         if(response.data){
            notify('Slot is added successfully')
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
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} className='d-flex align-items-center mb-3' controlId="date">
                                <Form.Label column sm={3}>Select Date</Form.Label>
                                <Form.Control type="date" name="date" placeholder="Select date" min={todayDate} defaultValue={defaultDate}
                                 onChange={($event) => selectDate($event)} />
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm={3}>Slot</Form.Label>
                                <Col sm={3}>
                                    <Form.Select defaultValue={inputField.startTime} name="startTime" value={inputField.startTime}  onChange={($event) => handleChange($event)}>
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
                                </Col> 
                                <Col sm={3}>
                                    <Form.Select defaultValue={inputField.endTime} name="endTime" onChange={($event) => handleChange($event)}>
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
                                <Col sm={9} style={{marginLeft:'121px'}}> <div className="error">{sameSlotError}</div></Col>
                                <Col sm={9} style={{marginLeft:'121px'}}> <div className="error">{timeError}</div></Col>
                               
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="bookedStatus">
                                <Form.Label column sm={3}>Status</Form.Label>
                                <Col sm={6}>
                                    <Form.Select className="form-select1" name="bookedStatus" onChange={($event) => handleChange($event)} defaultValue="AVAILABLE">
                                        <option value='AVAILABLE'>AVAILABLE</option>
                                        <option value='UNAVAILABLE'>UNAVAILABLE</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="description" >
                                <Form.Label column sm={3}>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} name="description" onChange={($event) => handleChange($event)} />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <Button type="submit" onClick={handleSubmit} className="btn-primary" disabled={sameSlotError || timeError}>
                            Add Slot
                        </Button>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
    
};
export default Bookslot;