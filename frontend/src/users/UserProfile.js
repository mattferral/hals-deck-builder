import React, { useContext, useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import UserContext from "../common/UserContext";
import DeckBuilderApi from "../common/api";

const UserProfile = () => {
  const currentUser = useContext(UserContext);

  const INITIAL_STATE = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: '',
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

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
      await DeckBuilderApi.editUser(currentUser.username, formData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1>UserProfile for {currentUser.username}</h1>

      <Form
        onSubmit={handleSubmit}
        className="mx-auto w-50"
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
        <Button>Edit</Button>
      </Form>
    </>
  );
};

export default UserProfile;