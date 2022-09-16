import React from 'react'
import { Navigate } from 'react-router-dom'
import Link from 'react-scroll/modules/components/Link'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const SecondaryButton = ({ name, link }) => {

   const navigate = useNavigate();

   const onClickBtn = (link) => {
      console.log("link",link)
      navigate(link)
   }
    
   return (
      <SecondaryButtonStyled onClick={()=> 
         onClickBtn(link)
      }>
         <span>{name}</span>
        </SecondaryButtonStyled>
   )
}

const SecondaryButtonStyled = styled.button`
   padding: 0.9rem 2rem;
   background-color: #9edd9d;
   border: none;
   outline: none;
   border-radius: 18px;
   color: inherit;
   font-size: 1rem;
   font-family: inherit;
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: space-around;
   margin-left: 10px;
   
   span{
      margin-right: 10px;
   }

`
export default SecondaryButton
