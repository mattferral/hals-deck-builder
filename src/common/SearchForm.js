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

const SearchForm = ({ getSearch }) => {
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
  };

  const [showfilters, setShowfilters] = useState(false);
  const toggle = () => setShowfilters(!showfilters);

  return (
    <Form className="d-flex flex-row justify-content-center align-items-center">
      <FormGroup
        className="w-50"
        onSubmit={handleSubmit}
      >
        <InputGroup>
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
      </FormGroup>

      <Button
        color="secondary"
        onClick={toggle}
        style={{ marginBottom: '1rem' }}
      >
        Filters
      </Button>

      <Collapse isOpen={showfilters}>
        <Card>
          <CardBody>
            <FormGroup size="sm">
              <Label for="rarity">Rarity</Label>
              <Input
                id="rarity"
                name="rarity"
                type="select"
                value={formData.rarity}
                onChange={handleChange}
              >
                <option defaultValue></option>
                <option value="mythic rare">Mythic Rare</option>
                <option value="rare">Rare</option>
                <option value="uncommon">Uncommon</option>
                <option value="common">Common</option>
              </Input>
              
              <Label for="color">Color</Label>
              <InputGroup name="color">
                {Object.keys(initialState.color).map(color => (
                  <>
                    <Label
                      for={color}
                      key={`color-${color}`}
                    >
                      {color}
                    </Label>
                    <Input
                      type="checkbox"
                      id="color"
                      name={color}
                      onChange={handleChange}
                      checked={formData.color[color]}
                      key={color}
                    />
                  </>
                ))}
              </InputGroup>

              <Label for="subtype">Subtype</Label>
              <Input
                type="text"
                id="subtype"
                name="subtype"
                placeholder="e.g. eldrazi, aura, vehicle "
              />
              
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

              <Label for="type">Type</Label>
              <InputGroup>
                {Object.keys(initialState.type).map(type => (
                  <>
                    <Label
                      for={type}
                      key={`type-${type}`}
                    >
                      {type}
                    </Label>
                    <Input
                      type="checkbox"
                      id="type"
                      name={type}
                      onChange={handleChange}
                      checked={formData.type[type]}
                      key={type}
                    />
                  </>
                ))}
              </InputGroup>
            </FormGroup>
          </CardBody>
        </Card>
      </Collapse> 
    </Form>
  );
};

export default SearchForm;