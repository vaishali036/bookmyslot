import React from 'react';
import s from './InterviewCard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert';
import { emailOnSlotCancel, updateSlotStatusbyInterviewer, updateSlotStatusByTagTeam } from '../../../services/api';
 import notify from '../../../Shared/notify';
import { converDateFormat, getDate, getMonth, isPastDate, techTitle } from '../../../utils/helperMethods';

export const InterviewCard = ({ data,refresh, update, userType }) => {
    //    const data={
    //         position:'Front-end Developer',

    //     }
    // console.log("data",data)
    // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    const submitCancel = (data) => {
        console.log(data)
        confirmAlert({
            title: 'Are you sure you want to cancel?',
            // message: 'Are you sure you want to delete this interview slot?',
            buttons: [
                {
                    label: 'No',
                    onClick: () => { }
                },
                {
                    label: 'Yes',
                    // onClick: () => update(data)
                    onClick: () => updateSlotStatuss(data.bookedSlotId)

                    // onClick: () => props.onClose()

                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,

        });
    };

    //update slot status 
    const updateSlotStatuss = async (bookedSlotId) => {
        let response = await updateSlotStatusByTagTeam(bookedSlotId, 'CANCELED');
        if (response.data) {
            updateSlotStatusbyInterviewer(data.slotId,'CANCELED')
            // update('');
            refresh();
            notify('Slot is canceled successfully', 'success')
            const emailData = {
                subject:"Slot cancellation confirmation",
                statusCode:"CANCELED",
                interviewerEmailId : data.interviewerEmailId,
                tagEmailId:data.bookedTagEmailId,
                messageText:"Your slot is booked successfully",
                startTime : data.startTime,
                endTime : data.endTime,
                date: data.interviewerAvailDate
               }
             emailOnSlotCancel(emailData);
        }
    }

    // console.log(data, "data");
    return (
        <div className="card">
            <div className="card-header">
                <div className="card-header-title">
                    {data.interviewTopic}
                </div>
                {
                    data.bookedStatus === "BOOKED" &&
                    !isPastDate(data.interviewerAvailDate) &&
                    <div className="card-header-actions">
                        {userType.toUpperCase() === 'TAG' ?
                            <div className="card-action-icon">
                                {/* <FontAwesomeIcon icon={faPencil} /> */}
                            </div>
                            : ''
                        }
                        <div className="card-action-icon"  onClick={(()=>submitCancel(data))}>
                            <FontAwesomeIcon icon={faClose} />
                        </div>
                    </div>
                }
            </div>
            <div className="card-body">
                <div className={`${s.interview_card} justify_space_between`}>
                    <div className={s.interview_details}>
                        <div className={s.profile_details}>
                            <div className={s.designation}>{techTitle(data.teckTrack)}</div>
                            {/* <div className="designation"> {data.Interviewer}</div> */}
                            {/* <div className="teckTrack">{`${data.teckTrack}`}</div> */}
                            {userType.toUpperCase() === 'TAG' ?
                                <div className="designation">{`Interviewer : ${data.interviewerName}`}</div> :
                                <div className="designation">{`Tag team : ${data.bookedTagName}`}</div>
                            }
                        </div>
                        <div className={s.slot_details}>
                            {/* <div className=""> {data.date}</div> */}
                            <div className=""> {`Date - ${getDate(data.interviewerAvailDate)}`}</div>
                            <div className=""> {`Slot- ${data.startTime}-${data.endTime}`}</div>
                            {/* <div className=""> {data.slotTo}</div> */}
                            {/* <div className=""> {data.status}</div> */}
                            <div className=""> {`Status-${data.bookedStatus}`}</div>
                            <div className=""> {`booking date-${getDate(data.bookingDate)}`}</div>
                        </div>
                    </div>
                    <div className={s.interview_details}>
                        <div className={s.interview_date}>
                            <div className={s.interview_date_prefix}>
                                {/* <div className={s.interview_date_prefix_date}>{`${data.bookingDate.substring(0, 2)}`}</div> */}
                                <div className={s.interview_date_prefix_date}>{converDateFormat(data.interviewerAvailDate).getDate()}</div>
                                <div className={s.interview_date_prefix_prefix}>
                                    <div>th</div>
                                    {/* <div >April</div> */}
                                    {/* <div >{months[Number(data.bookingDate.substring(3, 5)) - 1]}</div> */}
                                    <div >{getMonth(data.interviewerAvailDate)}</div>
                                </div>
                            </div>
                            <div className={s.interview_date_prefix_time}>
                                {` ${data.startTime}-${data.endTime}`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}