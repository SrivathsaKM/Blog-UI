import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Loading from './Loading';

const ShowUser = (props) => {
  const { id } = props.match.params;

  const [loading, setLoading] = useState(true);
  const [singleUser, setSingleUser] = useState({});
  const [singleUserPosts, setSingleUsersPosts] = useState([]);

  const requestFirstId = axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  const requestSecondId = axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);

  useEffect(() => {
    axios
      .all([requestFirstId, requestSecondId])
      .then(
        axios.spread((...response) => {
          const resultOne = response[0].data;
          const resultSecond = response[1].data;
          //console.log(resultOne);
          setSingleUser(resultOne);
          setSingleUsersPosts(resultSecond);
          setLoading(false);
        })
      )
      .catch((errors) => {
        console.log(errors.message);
        setLoading(true);
      });
  }, [id]);

  //   useEffect(() => {
  //     axios
  //       .get(`https://jsonplaceholder.typicode.com/users/${id}`)
  //       .then((response) => {
  //         const result = response.data;
  //         setSingleUser(result);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   }, [id]);

  //   useEffect(() => {
  //     axios
  //       .get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
  //       .then((response) => {
  //         const result = response.data;
  //         setSingleUsersPosts(result);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   }, [id]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>USER NAME : {singleUser.name}</h1>
          <h2>POST WRITTEN BY USER</h2>
          <ul>
            {singleUserPosts.map((posts) => {
              const { id, title } = posts;
              return (
                <li key={id}>
                  <Link to={`/posts/${id}`}>{title}</Link>
                </li>
              );
            })}
          </ul>
          <Link to={'/users'}>
            <button>Back to Users</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShowUser;
