import React from 'react'
import styled from 'styled-components'
import SecondaryButton from './SecondaryButton'
import rec2 from '../assets/img/rec2.svg'
import ring1 from '../assets/img/ring_orange.svg';
import message1 from '../assets/img/message_pink.svg';
import message2 from '../assets/img/message_blue.svg';

const HeaderContent = () => {
   return (
      <HeaderContentStyled>
         <div className="left-content">
            <div className="left-text-container">
               <h1 data-aos='zoom-in-right'>Smart Interview Slot Booking</h1>
               <h4 className="white1">
                  Using the <b>BookMySLot</b>, we have streamlined the process of interview booking and recruitment. User or organisation will be able to view all available time slots, schedule the interview, and book the time slots depending upon the availability. 
               </h4> 
               <h4 className="white1">  
                  User can also cancel the scheduled interview slots depending upon the requirements.
               </h4>
               <br />
               <div style={{display:'flex'}}>
                  <SecondaryButton name='Sign Up' link="/signup" /> 
                  <SecondaryButton name='Sign In' link="/signin" />
               </div>

            </div>
         </div>
         <div className="right-content">
            <img src={rec2} alt="" className="rec2" />
            <img src={ring1} alt="" className="ring1" />
            <img src={message1} alt="" className="message1" />
            <img src={message2} alt="" className="message2" />
         </div>
      </HeaderContentStyled>
   )
}


// const Bounce=styled.h1`
//    animation: 3s ${keyframes`${bounce}`} infinite;
// `


const HeaderContentStyled = styled.div`
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   padding-top: 3rem;

   @media screen and (max-width: 700px){
        grid-template-columns: repeat(1, 1fr);
   }

   .img{
      width: 200px !important;
      padding: 10px;
   }

   .left-content{
      display: flex;
      align-items: center;
      padding-right: 3rem;
      @media screen and (max-width: 480px){
         width: 100%;
      }

      h1{
         color:white;
         font-size: 4rem;
         font-weight: 600;
         @media screen and (max-width: 700px){
            font-size: 3rem;
         }
      }
      .white1{
      color: white !important;
      line-height: 1.8rem;
      }
   }
   .right-content{
      position: relative;
      display: flex;
      justify-content: center;
      

      .rec2{
         width: 85%;
         height: 96%;
      }
      .ring1{
            position: absolute;
            bottom: 10%;
            right: 0;
            left: auto;
            animation: move2 20s infinite;
            transition: all .4s ease-in-out;
      }
      .message1{
         position: absolute;
         top: 0;
         right: 0;
         left: auto;
         animation: move 5s infinite;
         transition: all .4s ease-in-out;
      }
      .message2{
         position: absolute;
         bottom: 15%;
         left: 0;
         transition: all .4s ease-in-out;
         animation: move 8s infinite;
         animation-delay: .5s;
         transition: all .4s ease-in-out;
         
      }
   }

    //Header Animations
    .message1{
        @keyframes move{
            0%{
                transform: translateY(0) rotate(0) scale(1) translateX(0);
            }
            50%{
                transform: translateY(-10px) rotate(20deg) scale(1.1) translateX(10px);
            }
            100%{
                transform: translateY(0)  rotate(0deg) scale(1) translateX(0);
            }
        }
        @keyframes move2{
            0%{
                transform: translateY(0) rotate(0) scale(1) translateX(0);
            }
            50%{
                transform: translateY(-10px) rotate(60deg) scale(1.1) translateX(10px);
            }
            100%{
                transform: translateY(0)  rotate(0deg) scale(1) translateX(0);
            }
        }
    }
   
`

export default HeaderContent
