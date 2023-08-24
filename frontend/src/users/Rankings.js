import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import DeckBuilderApi from "../common/api";


const Rankings = () => {

  const [users, setUsers] = useState(undefined);

  useEffect(() => {
    const getRanks = async () => {
      try {
        setUsers(await DeckBuilderApi.getRankings());
      } catch (e) {
        console.error("Could not get ranks");
      }
    };
    getRanks();
   
  }, []);

  console.log(users);

  return (
    <>
      <h1>Ranks</h1>
      <ListGroup>
      {users && 
        users.map(user => (
            <ListGroupItem>
              <p>{user.username}</p>
              <p>{user.rank}</p>
              <p>{user.wins}</p>
            </ListGroupItem>
      ))}
      </ListGroup>
      
    </>
  );
};

export default Rankings;