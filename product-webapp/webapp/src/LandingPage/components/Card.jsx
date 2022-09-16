import React from 'react';
import styled from 'styled-components';

function Card({
   account, check, text1, text2, text3, text4, text5, text6, text7
}) {
   return (
      <CardStyled >
         <h4 className="card-title">
            {account}
         </h4>
         <div className="list-con">
            <h4 className="text-check">
               <img src={check} alt="" />
               {text1}
            </h4>
            <h4 className="text-check">
               <img src={check} alt="" />
               {text2}
            </h4>
            <h4 className="text-check">
               <img src={check} alt="" />
               {text3}
            </h4>
            <h4 className="text-check">
               <img src={check} alt="" />
               {text4}
            </h4>
            <h4 className="text-check">
               <img src={check} alt="" />
               {text5}
            </h4>
            <h4 className="text-check">
               <img src={check} alt="" />
               {text6}
            </h4>
            <h4 className="text-check">
               <img src={check} alt="" />
               {text7}
            </h4>
         </div>
      </CardStyled >
   )
}

const CardStyled = styled.div`
    background-color: #b3ccfd;
    padding: 3rem 2rem;
    border-radius: 50px;
    box-shadow: 0px 25px 50px rgba(22, 25, 79, 0.05);
    .card-title{
        font-size: 1.7rem;
        color: #000;
        text-align: center;
        padding: 1.5rem 0;
        span{
            font-size: 1.1rem;
        }
    }
    .button-con{
        text-align: center;
        padding: 1.4rem 0;
        button{
            border: 2px solid #16194F;
            padding: .6rem 1.5rem;
            outline: none;
            cursor: pointer;
            background: transparent;
            border-radius: 20px;
            font-size: inherit;
            color: #16194F;
        }
    }
    .card-image-con{
        display: flex;
        justify-content: center;
        img{
            width: 70%;
        }
    }
    .plan-con{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.4rem 0;
        img{
            padding: 0 .2rem;
        }
    }
    .text-check{
        display: flex;
        align-items: center;
        padding: .3rem 0;
        font-size: 1.1rem;
        img{
            padding-right: .3rem;
            width: 24px;
        }        
    }
`;
export default Card;