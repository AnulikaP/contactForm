


const Validation = (form) => {

    const errors = {};


  const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;

  if(form.name === '') {
    errors.name = 'Name is Required';
  }
  if(form.email === '') {
     errors.email = 'Email is Required';
  }
  else if(!email_pattern.test(form.email)) {
    errors.email = 'Email is Invalid'
  };
  if(form.message === '') {
    errors.message = 'Message is Required';
  }

  return errors;
};

export default Validation