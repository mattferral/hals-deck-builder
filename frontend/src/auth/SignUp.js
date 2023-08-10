import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const SignUp = ({ signup }) => {

  const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate.push("/");
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <>
      <h1 className="text-light">Create your account</h1>
      <Form
        onSubmit={handleSubmit}
        className="mx-auto w-50 text-light"
      >
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="first name"
            type="text"
            onChange={handleChange}
            value={formData.firstName}
          />
        </FormGroup>

        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="last name"
            type="text"
            onChange={handleChange}
            value={formData.lastName}
          />
        </FormGroup>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="email"
            type="text"
            onChange={handleChange}
            value={formData.email}
          />
        </FormGroup>

        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="username"
            type="text"
            onChange={handleChange}
            value={formData.username}
          />
        </FormGroup>
        
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="password"
            type="password"
            onChange={handleChange}
            value={formData.password}
          />
        </FormGroup>
        <Button>Sign Up</Button>
      </Form>
    </>
  );
};

export default SignUp;