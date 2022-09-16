import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../styles/Layout1'
import logo from '../assets/img/bookmyslot_logo.png';

const Footer = () => {
   return (
      <FooterStyled>
         <InnerLayout>
            <div className="footer-con">
               <div className="logo-con">
                  <div className="logo-wrap">
                     <img src={logo} alt="" />
                  </div>
                  <div className='footer-content'>
                  <p>Copyright @2022 BookMySlot. All rights reserved. </p>
                  </div>
               </div>
            </div>
         </InnerLayout>
      </FooterStyled>
   )
}
const FooterStyled = styled.footer`
   padding: 0 5rem;
   background-color: #dce2f0;

   @media screen and (max-width: 1347px){
      padding: 5rem 14rem;
   }
   @media screen and (max-width: 1186px){
      padding: 5rem 8rem;
   }
   @media screen and (max-width: 990px){
      padding: 5rem 4rem;
   }

   .footer-con{
      display: grid;
      grid-template-columns: repeat(2 , 1fr);
      .logo-con{
         display: flex;
         align-items: center;
         img{
            width: 90px;
         }
      }
      .footer-content{
         text-align: center;
         padding-left: 30%;
      }

      @media screen and (max-width: 480px){
         grid-template-columns: repeat(1 , 1fr);
         .logo-wrap{
            margin: 0 auto;
            p{ display: none}
         }
      }
   }
   .bottom-nav{
      display: flex;
      justify-content: space-between;

      li{
         padding: 2rem 0;
         color: #16194f;
      }
   }
`

export default Footer
