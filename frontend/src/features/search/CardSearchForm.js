import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Button,
  InputGroup,
  Label,
  Collapse,
  CardBody,
  Card,
} from "reactstrap";

const CardSearchForm = ({ getSearch, showColors }) => {
  const initialState = {
    name: "",
    rarity: "",
    set: "",
    subtype: "",
    color: {
      "red": false,
      "green": false,
      "blue": false,
      "white": false, 
      "black": false,
    },
    type: {
      "creature": false,
      "artifact": false,
      "enchantment": false,
      "sorcery": false,
      "instant": false,
      "planeswalker": false,
      "land" : false,
    }
  };

  const [formData, setFormData] = useState(initialState);
  const sets = [];

  const handleChange = (e) => {
    const { name, value, id, checked } = e.target;
    if (name === id) {
      setFormData(data => ({
        ...data,
        [name]: value,
      }));
    } else {
      setFormData(data => ({
        ...data,
        [id]: {
          ...data[id],
          [name]: checked,
        },
      }))
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getSearch(formData);
    setShowfilters(false);
  };

  const [showfilters, setShowfilters] = useState(false);
  const toggle = () => setShowfilters(!showfilters);

  return (
    <Form className="container justify-content-md-center">
      <FormGroup
        className="d-flex justify-content-center"
        onSubmit={handleSubmit}
      >
        <InputGroup
          className="w-50 m-2"
        >
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Button 
            color="primary"
            onClick={handleSubmit}
          >
            Search
          </Button>
        </InputGroup>

        <Button
            className="m-2"
            color="secondary"
            onClick={toggle}
          >
            {showfilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </FormGroup>
      
      <FormGroup className="d-flex justify-content-center">
        <Collapse isOpen={showfilters} className="w-50">
          <Card>
            <CardBody className="container">
              <div className="row">
                <FormGroup className="col">
                  <Label for="rarity">Rarity</Label>
                  <Input
                    id="rarity"
                    name="rarity"
                    type="select"
                    value={formData.rarity}
                    onChange={handleChange}
                  >
                    <option defaultValue></option>
                    <option value="mythic">Mythic Rare</option>
                    <option value="rare">Rare</option>
                    <option value="uncommon">Uncommon</option>
                    <option value="common">Common</option>
                  </Input>
                </FormGroup>

                <FormGroup className="col">
                  <Label>Set</Label>
                  <Input
                    type="text"
                    list="sets"
                    id="set"
                    name="set"
                    value={formData.set}
                    onChange={handleChange}
                  />
                  <datalist id="sets">
                    {sets.map(set => (
                      <option
                        value={set.name}
                        key={set.name}
                      >
                        {set.name}
                      </option>
                    ))}
                  </datalist>
                </FormGroup>
              </div>

              <div className="row">
                <Label for="subtype">Subtype</Label>
                <Input
                  type="text"
                  id="subtype"
                  name="subtype"
                  placeholder="e.g. eldrazi, aura, vehicle"
                />
              </div>
              
              {showColors &&
                <div className="row">
                  <Label for="color">Color</Label>
                  <FormGroup name="color" className="row">
                    {Object.keys(initialState.color).map(color => (
                      <FormGroup className="col" key={color}>
                        <Label for={color}>{color}</Label>
                        <Input
                          type="checkbox"
                          id="color"
                          name={color}
                          onChange={handleChange}
                          checked={formData.color[color]}
                          className="m-1"
                        />
                      </FormGroup>
                    ))}
                  </FormGroup>
                </div>
              }

              <div className="row">
                <Label for="type">Type</Label>
                <FormGroup className="row">
                  {Object.keys(initialState.type).map(type => (
                    <FormGroup className="col" key={type}>
                      <Label
                        for={type}
                      >
                        {type}
                      </Label>
                      <Input
                        type="checkbox"
                        id="type"
                        name={type}
                        onChange={handleChange}
                        checked={formData.type[type]}
                        className="m-1"
                      />
                    </FormGroup>
                  ))}
                </FormGroup>
              </div>

            </CardBody>
          </Card>
        </Collapse>
      </FormGroup>
    </Form>
  );
};

export default CardSearchForm;