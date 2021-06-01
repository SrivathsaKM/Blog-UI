import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const Users = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users/')
      .then((response) => {
        const result = response.data;
        setUsers(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>Listing Users - ({users.length})</h1>
          <ul>
            {users.map((user) => {
              const { id, name } = user;
              return (
                <li key={id}>
                  <Link to={`/users/${id}`}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Users;
