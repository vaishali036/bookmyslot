import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-scroll'
import PrimaryButton from './PrimaryButton'
// import logo from '../assets/img/logo.svg'
import logo from '../assets/img/bookmyslot_logo.png';

const Navigation = () => {



   return (
      <NavigationStyled>
         <div className="logo">
            <img src={logo} alt="" />
         </div>
         <ul>
            <li>
               <Link to="header" spy={true} smooth={true}>Home </Link>
            </li>
            <li>
               <Link to="about" spy={true} smooth={true}>About </Link>
            </li>
            <li>
               <Link to="features" spy={true} smooth={true}>Features </Link>
            </li>
            <li>
               <Link to="pricing" spy={true} smooth={true}>Responsibilities </Link>
            </li>
         </ul>
      </NavigationStyled>
   )
}

const NavigationStyled = styled.nav`
   display: flex;
   {background-color: rgba(102, 51, 153, 0.4);}
   justify-content: space-between;
   align-items: center;
   padding-left: 20px;
   padding-right: 75px;


   ul{
      list-style-type: none;
      color: white;
      display: flex;
      justify-content: space-between;
      width: 60%;
      li{
         cursor: pointer;
      }
   }
`

export default Navigation
