import React from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import { InnerLayout } from '../styles/Layout1'
import check from '../assets/img/check.svg';


const Responsibilities = () => {
   return (
      <PaymentStyled id='pricing'>
         <InnerLayout>
            <div data-aos='fade-down-right'>
               <h1 className="small-heading">
                  <span>Responsibilities of the End Users</span>
               </h1>
            </div>
            <div className='card-con'>
               <Card
                  account={'Interviewer'}
                  check={check}
                  text1={'Login'}
                  text2={'There should be two roles- Interviewer, TAG team member'}
                  text3={'Interviewer can track the available slots.'}
                  text4={'Interviewer can select the track and provide the available time slots for the upcoming days.'}
                  text5={'Interviewer can able to cancel, edit, reschedule the interview slot.'}
                  text6={'Interviewer should get a mail with canceled, rescheduled interviews.'}
                  text7={'Interviewer can track the upcoming and past interview slots.'}
               />

               <Card
                  account={'TAG Team'}
                  check={check}
                  text1={'TAG team can able to book an interview slot.'}
                  text2={'TAG team can select the track and see all the available tracks provided by different teams.'}
                  text3={'TAG team can cancel the interview and send the email to the interviewer with cancellation interview details.'}
                  text4={'TAG team can reschedule the interview and send the email to the interviewer with rescheduled interview details.'}
                  text5={'TAG team booked time slot will not be available for the other TAG team members.'}
                  text6={'TAG team can track the upcoming and past interview slots.'}
                  text7={'TAG team can able to track the number of (booked, canceled, rescheduled) time slots.'}
               />
            </div>
         </InnerLayout>
      </PaymentStyled>
   )
}

const PaymentStyled = styled.section`
 .card-con{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 3rem;
        
        @media screen and (max-width: 689px){
          grid-template-columns: repeat(1, 1fr);
        }
    }
   p{
      text-align: center;
   }
   .small-heading{
      text-align: center;
   }
`

export default Responsibilities
