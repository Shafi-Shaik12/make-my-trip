// import "./Book.css";
// import React, {useState, useEffect, useContext} from 'react';
// import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';
// import {DataAppContext} from '../DataApp';


// function Book() {

//   const navigate = useNavigate();
//     const localContext = useContext(DataAppContext);
//     const {appState, setAppState}=localContext;
//     const {loginStatus, username}= appState;

  
//     useEffect(() => {
//       if(!loginStatus) {
//         console.log('not logged in')
//         navigate('/login');
//       }
//       else {
//         console.log('logged in')
//       }
//     })

 

//   return (
//     <div className='payment-container'>
//       <div className='main'>
//         <div className='right-payment-info'>
//           <div className='payment-method'>
//             <h2>Payment Method</h2>
//             <div className='radio-container'>
//               <input
//                 id='card'
//                 name='payment-type'
//                 type='radio'
//                 defaultChecked
//                 required
//               />
//               <label htmlFor='card'>Card</label>
//               <input id='paypal' name='payment-type' type='radio' required />
//               <label htmlFor='paypal'>PayPal</label>
//             </div>
//           </div>
//           <form id='payment-form'>
//             <div className='card-info-container'>
//               <div className='card-info'>
//                 <label>
//                   Card Number
//                   <input
//                     className='full-width'
//                     id='card-num'
//                     type='text'
//                     placeholder='1234 5678 9012 3456'
//                     required
//                   />
//                 </label>
//                 <label>
//                   Name on Card
//                   <input
//                     className='full-width'
//                     id='name'
//                     type='text'
//                     placeholder='Steve Rogers'
//                     required
//                   />
//                 </label>
//                 <div className='expire-ccv'>
//                   <label>
//                     Expires
//                     <span className='expire-date'>
//                       <input
//                         id='month'
//                         type='text'
//                         size={2}
//                         maxLength={2}
//                         placeholder='MM'
//                         required
//                       />
//                       <span>/</span>
//                       <input
//                         id='year'
//                         type='text'
//                         size={2}
//                         maxLength={2}
//                         placeholder='YY'
//                         required
//                       />
//                     </span>
//                   </label>
//                   <label>
//                     CCV
//                     <input
//                       id='ccv'
//                       type='text'
//                       size={3}
//                       maxLength={3}
//                       placeholder={123}
//                       required
//                     />
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <label className='save-card-info'>
//               <input type='checkbox' required />
//               Save card for faster checkout
//             </label>
//           </form>
//           <button type="submit" className='button' onClick={() => alert("Order Placed")}>
//             Place Your Order
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Book
import "./Book.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataAppContext } from "../DataApp";

function Book() {
  const navigate = useNavigate();
  const localContext = useContext(DataAppContext);
  const { appState } = localContext;
  const { loginStatus } = appState;

  const [formData, setFormData] = useState({
    cardNumber: "",
    name: "",
    month: "",
    year: "",
    ccv: "",
  });

  const [errors, setErrors] = useState({
    cardNumber: "",
    name: "",
    month: "",
    year: "",
    ccv: "",
  });

  useEffect(() => {
    if (!loginStatus) {
      console.log("not logged in");
      navigate("/login");
    } else {
      console.log("logged in");
    }
  }, [loginStatus, navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    validateField(id, value);
  };

  const validateField = (id, value) => {
    let error = "";

    switch (id) {
      case "cardNumber":
        if (!/^\d{9}$/.test(value)) {
          error = "Card number must be 15 digits.";
        }
        break;
      case "name":
        if (!/^[A-Z][a-zA-Z ]{0,11}$/.test(value)) {
          error = "Name must start with a capital letter and be up to 12 characters.";
        }
        break;
      case "month":
        if (!/^(0[1-9]|1[0-2])$/.test(value)) {
          error = "Enter a valid month (MM).";
        }
        break;
      case "year":
        if (!/^\d{2}$/.test(value)) {
          error = "Enter a valid year (YY).";
        }
        break;
      case "ccv":
        if (!/^\d{3}$/.test(value)) {
          error = "CCV must be 3 digits.";
        }
        break;
      default:
        break;
    }

    setErrors({ ...errors, [id]: error });
  };

  const validateForm = () => {
    const validationErrors = {};

    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (errors[key]) {
        validationErrors[key] = errors[key];
      }
    });

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Order Placed");
    } else {
      alert("Please correct the errors before submitting.");
    }
  };

  return (
    <div className="payment-container">
      <div className="main">
        <div className="right-payment-info">
          <div className="payment-method">
            <h2>Payment Method</h2>
            <div className="radio-container">
              <input id="card" name="payment-type" type="radio" defaultChecked required />
              <label htmlFor="card">Card</label>
              <input id="paypal" name="payment-type" type="radio" required />
              <label htmlFor="paypal">PayPal</label>
            </div>
          </div>
          <form id="payment-form" onSubmit={handleSubmit}>
            <div className="card-info-container">
              <div className="card-info">
                <label>
                  Card Number
                  <input
                    className="full-width"
                    id="cardNumber"
                    type="text"
                    placeholder="123456789012345"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
                </label>
                <label>
                  Name on Card
                  <input
                    className="full-width"
                    id="name"
                    type="text"
                    placeholder="Steve Rogers"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.name && <p className="error">{errors.name}</p>}
                </label>
                <div className="expire-ccv">
                  <label>
                    Expires
                    <span className="expire-date">
                      <input
                        id="month"
                        type="text"
                        size={2}
                        maxLength={2}
                        placeholder="MM"
                        value={formData.month}
                        onChange={handleInputChange}
                        required
                      />
                      <span>/</span>
                      <input
                        id="year"
                        type="text"
                        size={2}
                        maxLength={2}
                        placeholder="YY"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                      />
                    </span>
                    {(errors.month || errors.year) && (
                      <p className="error">
                        {errors.month || errors.year}
                      </p>
                    )}
                  </label>
                  <label>
                    CCV
                    <input
                      id="ccv"
                      type="text"
                      size={3}
                      maxLength={3}
                      placeholder="123"
                      value={formData.ccv}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.ccv && <p className="error">{errors.ccv}</p>}
                  </label>
                </div>
              </div>
            </div>
            <label className="save-card-info">
              <input type="checkbox" required />
              Save card for faster checkout
            </label>
            <button type="submit" className="button">
              Place Your Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Book;
