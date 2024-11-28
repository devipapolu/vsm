import React, { useState } from 'react';
import Header from '../components/Header';
import { Form, Button, ButtonToolbar, Schema, Panel } from 'rsuite';
import { Divider } from 'antd';

// Define validation schema for both forms
const { StringType } = Schema.Types;
const profileModel = Schema.Model({
  name: StringType().isRequired('Username is required'),
  email: StringType().isEmail('Please enter a valid email address').isRequired('Email is required'),
});

const passwordModel = Schema.Model({
  oldPassword: StringType().isRequired('Old password is required'),
  newPassword: StringType().isRequired('New password is required'),
});

function TextField(props) {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-3`}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
}

function Profilepage() {
  // State for both forms
  const [profileFormValue, setProfileFormValue] = useState({});
  const [passwordFormValue, setPasswordFormValue] = useState({});

  // Handle Profile Form submission
  const handleProfileSubmit = (value) => {
    console.log("Profile Form Submitted: ", value); // Log the profile form values
  };

  // Handle Password Form submission
  const handlePasswordSubmit = (value) => {
    console.log("Password Form Submitted: ", value); // Log the password form values
  };

  return (
    <>
      <div className="">
        <Header />
      </div>
      <div className="pt-40">
        <div
          className="main_container flex justify-center items-center"
          style={{ height: '100vh', width: '100%' }}
        >
          <div className="card px-2 w-96">
            <h5 className="mt-2">My Profile</h5>
            <div className="card-body">
              {/* Profile Form */}
              <Form
                model={profileModel}
                formValue={profileFormValue}
                onChange={setProfileFormValue}
                onSubmit={handleProfileSubmit}
              >
                <TextField name="name" label="Username" />
                <TextField name="email" label="Email" />
                <ButtonToolbar>
                  <Button appearance="primary" type="submit">
                    Update Profile
                  </Button>
                </ButtonToolbar>
              </Form>

              <Divider
                style={{
                  borderColor: '#7cb305',
                }}
              />

              <div className="px-2 card-body">
                <div>
                  <p>Change Password</p>

                  {/* Password Form */}
                  <Form
                    model={passwordModel}
                    formValue={passwordFormValue}
                    onChange={setPasswordFormValue}
                    onSubmit={handlePasswordSubmit}
                  >
                    <TextField name="oldPassword" label="Old Password" />
                    <TextField name="newPassword" label="New Password" />
                    <ButtonToolbar>
                      <Button appearance="primary" type="submit">
                        Update Password
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
  );
}

export default Profilepage;
