import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import UserContext from "../common/UserContext";

const Login = () => {
  const INITIAL_STATE = {
    username: '',
    password: '',
  };

  const { getToken } = useContext(UserContext);

  const [formData, setFormData] = useState(INITIAL_STATE);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await getToken(formData);
      navigate("/");
    } catch (e) {
      console.error(e);
      setFormData(fData => ({
        username: fData.username,
        password: "",
      }));
      return;
    }
  };

  return (
    <>
      <h1 className="text-light">User login</h1>
      <Form
        onSubmit={handleSubmit}
        className="mx-auto w-50 text-light"
      >
        <FormGroup>
          <Label htmlFor="username">Username</Label>
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="password"
            type="password"
            onChange={handleChange}
            value={formData.password}
          />
        </FormGroup>
        <Button>Login</Button>
      </Form>
    </>
  );
};

export default Login;