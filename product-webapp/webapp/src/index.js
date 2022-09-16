import React from 'react';
 import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
 import { createRoot } from "react-dom/client";
import { ToastContainer } from 'react-toastify';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
    <>
    <App />
    <ToastContainer />
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
