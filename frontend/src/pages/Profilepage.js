import React, { useState } from 'react'
import Header from '../components/Header'
import { Form, Button, ButtonToolbar, Schema, Panel } from 'rsuite';
import RemindOutlineIcon from '@rsuite/icons/RemindOutline';
import { Divider } from 'antd';

const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired(  "This filed is REquired"),
    password:StringType("New password is Required")
});

function TextField(props) {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-3`}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
}

function Profilepage() {

const [formValue,setform]=useState({})



function handlesubmit(event){
  setform(event)
}

function handlechange(value) {
  console.log(value)
  
}
  return (
   <>
   <div className=''>
  <Header/>
   </div>
  <div className=' pt-40'>
  <div className='main_container  flex justify-center items-center' style={{height:"100vh", width:"100%"}}>
<div className='card px-2   w-96 '>
<h5 className='mt-2'>My profile</h5>
<div className='card-body  '>
<Form model={model} onSubmit={handlesubmit} formValue={formValue}>
      <TextField name="name"  label="Username"/>
      <TextField name="email" label="Email" />
      <ButtonToolbar>
        <Button appearance="primary" type="submit" >
          Update profile
        </Button>
      </ButtonToolbar>
    </Form>
    <Divider
      style={{
        borderColor: '#7cb305',
      }}
    >
    </Divider>
    <div className='px-2 card-body '>
<div className=''>
  <p>Change Password</p>

  <Form model={model} onChange={handlechange} onSubmit={handlesubmit} formValue={formValue}>
      <TextField name="name" label="old Password" />
      <TextField name="email" label="Change password" />
      <ButtonToolbar>
        <Button appearance="primary" type="submit" >
          Update password
        </Button>
      </ButtonToolbar>
    </Form>
</div>
</div>
</div>



</div>
   </div> 
  </div>
   </>
  )
}

export default Profilepage
