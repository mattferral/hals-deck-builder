import React from "react";
import axios from "axios";
import SearchForm from "./SearchForm";

const Search = ({ deck }) => {

  const getSearch = async (formData) => {
    const url = buildSearchURL(formData);
    console.log(url);

    try {
      let cards = await axios.get(url);
      console.log(cards.data);
    } catch (e) {
      console.error(e);
    }
  };

  const buildSearchURL = (data) => {
    const searchURL = new URL('https://api.magicthegathering.io/v1/cards');
    
    if (deck) {
      searchURL.searchParams.append("gameFormat", deck.format)
    }

    for (let field of Object.keys(data)) {
      let value = data[field];
      
      if (field === 'color') {
        let params = [];
        for(let color of Object.keys(value)) {
          if (value[color])
            params.push(color[0]);
        }
        if (params.length)
          searchURL.searchParams.append("colors", params.toString());

      } else if (field === 'type') {
        let params = [];
        for(let type of Object.keys(value)) {
          if (value[type])
            params.push(type);
        }
        if (params.length)
          searchURL.searchParams.append("types", params.toString());

      } else {
        if (data[field])
          searchURL.searchParams.append(field, value);
      }
    }

    return searchURL.href;
  };

  return (
    <>
      <SearchForm getSearch={getSearch}/>
    </>
  );
};

export default Search;