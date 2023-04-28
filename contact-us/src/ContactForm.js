import React, { useState } from 'react';
import logo from './graph.png';
import { nanoid } from 'nanoid'
import Validation from './Validation';




const ContactForm = () => {

//Adding loading indicator for when form is submitted
const INITIAL_STATE = {id: nanoid(), name: '', email: '',subject: '', message: '' }

const [form, setForm] = React.useState(INITIAL_STATE);
const [isPending, setIsPending] = useState(false);
const [errors, setErrors] = useState({});

    const handlelChange = (event) => {
        setForm({...form,
            [event.target.name]: event.target.value,
      
        })}
            

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsPending(true);

        setTimeout(() => {
         setIsPending(false)
        }, 3000)

        setErrors(Validation(form));

        if(form.name === '') {
          alert('INVALID, submission failed') 
        }else  {
            alert('Submission Received')
        } 


     //Reset
        setForm(INITIAL_STATE);
        console.log(form)
       
    

   // Setting API where the user's data is sent to

        fetch('https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries', {
            method: 'POST',
            headers: { 'content-Type': 'application/json'},
            body: JSON.stringify(INITIAL_STATE)
        }) 
        .then(() => {
            console.log('new contact added')
            setIsPending(false);

        })
    
    } 


  return (
    <div className='wrapper'>
        <img src={logo} alt='designer' />

    <form onSubmit={handleSubmit} className='container'>
        <div className='intro'>
            <h1>Contact Us</h1>
            <p>For Your Graphic Designs and Product Branding Services</p>
            </div>

           <div className='inputDiv'>
           <label htmlFor='name'>Name:</label>
           <input type='text'
           id='name'
           name='name'
           value={form.name}
           onChange={handlelChange}/>
           {errors.name && <p style={{color: 'red'}}>{errors.name}</p> }
        </div>

           <div  className='inputDiv'>
            <label htmlFor='email'>Email:</label>
            <input type='email'
            name='email'
            id='email'
            value={form.email}
            onChange={handlelChange}/>
            {errors.email && <p style={{color: 'red'}}>{errors.email}</p> }
        
           </div>
           <div  className='inputDiv'>
            <label htmlFor='subject'>Subject: </label>
                <input type='text'
                name='subject'
                value={form.subject}
                onChange={handlelChange}
                />
           
           </div>
           <div  className='inputDiv'>
            <label htmlFor='message'>Message:</label>
            <textarea 
            name='message'
            placeholder='Tell Us More'
            value={form.message}
            onChange={handlelChange} >
            </textarea>
            {errors.message && <p style={{color: 'red'}}>{errors.message}</p> }
           </div>
           <div className='submit'> 
          {!isPending &&  <button type='submit'>Submit</button>}
          {isPending && <button disabled>Loading...</button>}
         
           </div>
    </form>
    </div>
  )
}

export default ContactForm