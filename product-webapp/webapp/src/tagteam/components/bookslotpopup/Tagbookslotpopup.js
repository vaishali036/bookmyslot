import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Tagbookslotpopup.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Row, Button } from "react-bootstrap";
 import { bookSlotByTagTeam, emailOnSlotBooking, updateSlotStatusbyInterviewer } from "../../../services/api";
import notify from "../../../Shared/notify";
import { getLoggedInData } from "../../../services/auth";


const Tagbookslotpopup = props => {

    const [interviewTopic,setInterviewTopic] = useState('')
    // console.log(props.slots,props.interviewerInfo)
    const closeOnEscapeKeyDown = e => {
        if ((e.charCode || e.keyCode) === 27) {
            props.onClose();
        }
    };

    useEffect(() => {
        document.body.addEventListener("keydown", closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, []);

    const [date, setDate] = useState('')
    const onSelectedDate = (sdate) => {
        setDate(sdate)
    }

    const selectDate = (e) => {
        let date = e.target.value
        let updateDate = date.split('-').reverse().join(":");
    }

    //submit form for book slot
    const submitBookSlot= async()=>{
        try{
        let splittedDate = props.interviewerInfo.date.split('/');
        const formatDate = splittedDate.reverse().join('-');
         const data = {
             slotId : props.slots.slotId,
             interviewerName : props.interviewerInfo.interviewerName,
             interviewerEmailId : props.interviewerInfo.interviewerEmailId,
             bookedTagEmailId : getLoggedInData().userEmailId,
             bookedTagName : getLoggedInData().userName,
             techTrack : props.interviewerInfo.techTrack,
             interviewerAvailDate : formatDate,
             startTime : props.slots.startTime,
             endTime : props.slots.endTime,
             description : props.slots.description,
             interviewTopic : interviewTopic
         }
          const response = await bookSlotByTagTeam(data);
            if(response.data){
               await updateSlotStatusbyInterviewer(data.slotId,'BOOKED')
               const emailData = {
                subject:"Slot Booking confirmation",
                statusCode:"BOOKED",
                interviewerEmailId : props.interviewerInfo.interviewerEmailId,
                tagEmailId:getLoggedInData().userEmailId,
                messageText:"Your slot is booked successfully",
                startTime : props.slots.startTime,
                endTime : props.slots.endTime,
                date: props.interviewerInfo.date
               }
               props.refresh();
               props.onClose();
               notify('Slot is booked successfully','success');
               emailOnSlotBooking(emailData);
              
            }
        }
        catch(err){
            console.log(err)
        }
     }

    
    return ReactDOM.createPortal(
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

                            <Form.Group as={Row} className="mb-3" controlId="slotid">
                                <Form.Label column sm={3}>Slot ID</Form.Label>
                                <Form.Control type="text" rows={1}  defaultValue={props.slots.slotId} readOnly /> 
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="interviewname">
                                <Form.Label column sm={3}>Interview Name</Form.Label>
                                <Form.Control type="text" rows={1} defaultValue={props.interviewerInfo.interviewerName} readOnly/>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Track</Form.Label>
                                <Form.Control type="text" rows={1}  defaultValue={props.interviewerInfo.techTrack} readOnly/>
                            </Form.Group>

                            {/* <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm={3}>Phone</Form.Label>
                                <Form.Control as="text" rows={1} readOnly>{props.slots.phoneNo} </Form.Control>
                            </Form.Group> */}

                            <Form.Group as={Row} className='d-flex align-items-center mb-3' controlId="date">
                                <Form.Label column sm={3}>Date</Form.Label>
                                {/* <Form.Control type="text" onChange={($event) => selectDate($event)} defaultValue={props.interviewerInfo.date} /> */}
                                <Form.Control type="text" defaultValue={props.interviewerInfo.date} readOnly />
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formGridState">
                                <Form.Label column sm={3}>Slot</Form.Label>
                                <Col sm={4}>
                                <Form.Select name="startTime" defaultValue={props.slots.startTime} disabled style={{border:'none',color:'#406699'}} >
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
                                <Col sm={4}>
                                <Form.Select name="endTime" defaultValue={props.slots.endTime} disabled style={{border:'none',color:'#406699'}}>
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
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} defaultValue={props.slots.description} />
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Interview topic</Form.Label>
                                <Form.Control type="text" rows={1} value={interviewTopic}
                                onChange={(e)=>setInterviewTopic(e.target.value)} placeholder="Input interview topic here" 
                                style={{backgroundColor:'white'}}/>
                            </Form.Group>

                        </Form>
                    </div>


                    <div className="modal-footer">
                        <Button type="submit" onClick={submitBookSlot} className="btn-primary">
                            Book
                        </Button>
                    </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById("root")
    );
};
export default Tagbookslotpopup;
