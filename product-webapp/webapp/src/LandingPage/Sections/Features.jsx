import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../styles/Layout1'
import ChartStats from '../components/ChartStats'
import chart from '../assets/img/chart.svg'

const Features = () => {
   return (

      <ChartStyled id='features'>
         <InnerLayout>
            <div className="chart-con">
               <div className="chart-left">
                  <div className="stats">
                     <div className="stats-money">
                        <ChartStats name={'Completed Interviews'} amount={'650'} />
                        <ChartStats name={'Scheduled Interviews'} amount={'1000'} />
                     </div>
                     <img src={chart} alt="" />
                  </div>
               </div>
               <div className="chart-right">
                  <h1 data-aos='fade-right' className="secondary-heading">
                     Features of BookMySlot
                  </h1>
                  <h4>Fast <b>Booking and Cancellation</b> of interview slots.</h4>
                  <h4>Availability of <b>Slots</b> for Interviwer to inform his/her available team.</h4>
                  <h4>Best use of <b>Resources.</b></h4>
                  <h4>Less <b>Paper Work.</b></h4>
                  <h4>Reduces <b>Turnaround Time</b> to schedule and update the interviews.</h4>
                  <h4>Send timely <b>Reminders</b> to upcoming/cancelled interview to interviewer and TAG team.</h4>

               </div>
            </div>

            <br/>
            <br/>
            <br/>
         </InnerLayout>
      </ChartStyled >
   )
}
const ChartStyled = styled.section`
   .chart-con{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      @media screen and (max-width: 1347px){
            grid-template-columns: repeat(1, 1fr);
      }
      .chart-left{
         width: 80%;
         @media screen and (max-width: 1347px){
            width: 100%;
         }

         .stats{
            img{
               box-shadow: 0px 25px 50px rgba(22, 25, 79, 0.05);
               border-radius: 62px;
               width: 100%;
            }
            .stats-money{
               display: flex;
               padding-bottom: 1.3rem;
               justify-content: space-between;
            }
         }
      }
      .chart-right{
         padding-left: 2rem;
         p{
            // padding: 1.3rem 0;
         }
      }
   }
`

export default Features
