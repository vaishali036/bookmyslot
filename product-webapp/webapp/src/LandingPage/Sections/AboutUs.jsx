import React from 'react'
import styled, { keyframes } from 'styled-components'
import { InnerLayout } from '../styles/Layout1'
import img1 from '../assets/img/rec1.jpg'
import { fadeInLeft } from 'react-animations'

const AboutUs = () => {
   return (
      <CardSectionStyled id='about'>
         <InnerLayout >
            <div className="card-container">
               <div  className="card-left">
                  <h1 data-aos='fade-right' data-aos-duration='3000' className="secondary-heading" >
                     About Us
                </h1>
                  <h4>
                    We are a team of passionate designers and developers who have built BookMySlot to ease the interview slot booking and provide a digital solution.
                  </h4>
                  <br/>
                  <h4>
                     We have built a product to make interview slot booking process easier and in future we intend to add more features like integrating with Google Calendar, SMS reminder, etc.
                  </h4>
               </div>
               <div className="card-right">
                  <img src={img1} alt="" />
               </div>
            </div>
         </InnerLayout>
      </CardSectionStyled>
   )
}
// const FadeInLeft = styled.h1`
//    animation: 2s ${keyframes`${fadeInLeft}`};
// `

const CardSectionStyled = styled.section`
   .card-container{
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      @media screen and (max-width: 845px){
         grid-template-columns: repeat(1, 1fr);
      }

      .card-right{
         display: flex;
         justify-content: flex-end;
      }
      .card-left{

         p{
            padding: 1rem 0;
         }
      }
   }
`

export default AboutUs
