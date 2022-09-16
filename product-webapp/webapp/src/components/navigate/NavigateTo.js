import React from 'react';
import { Navigate } from 'react-router-dom';
const NavigateTo = props => {
  return (
    <Navigate to={props.route} />
  )
}

export default NavigateTo;