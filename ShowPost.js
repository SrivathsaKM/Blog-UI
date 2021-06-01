import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const ShowPost = (props) => {
  const { id } = props.match.params;

  const [userName, setUserName] = useState({});
  const [singlePost, setSinglePost] = useState({});
  const [singlePostCommants, setSinglePostCommants] = useState([]);
  const [loading, setLoading] = useState(true);

  const requestOne = axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  //const requestTwo = axios.get(`https://jsonplaceholder.typicode.com/users/${singlePost.userId}`);
  const requestThree = axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);

  useEffect(() => {
    axios
      .all([requestOne, requestThree])
      .then(
        axios.spread((...response) => {
          const resultOne = response[0].data;
          const resultTwo = response[1].data;
          setSinglePost(resultOne);
          setSinglePostCommants(resultTwo);
          setLoading(false);
        })
      )
      .catch((errors) => {
        console.log(errors.message);
        setLoading(true);
      });
  }, [id]);

  //For Single Post
  //   useEffect(() => {
  //     axios
  //       .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
  //       .then((response) => {
  //         const result = response.data;
  //         setSinglePost(result);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   }, [id]);

  //For userName (here singlePost array dependency is imp)
  useEffect(() => {
    if (singlePost.userId > 0) {
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${singlePost.userId}`)
        .then((response) => {
          const result = response.data;
          setUserName(result);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [singlePost]);

  // For Comments
  //   useEffect(() => {
  //     axios
  //       .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
  //       .then((response) => {
  //         const result = response.data;
  //         setSinglePostCommands(result);
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
          <h1>USER NAME : {userName.name}</h1>
          <h2>TITLE : {singlePost.title}</h2>
          <h3>BODY : {singlePost.body}</h3>
          <hr />
          <h2>COMMENTS</h2>
          <ul>
            {singlePostCommants.map((commants) => {
              const { id, body } = commants;
              return <li key={id}>{body}</li>;
            })}
          </ul>
          <hr />
          <Link to={`/users/${singlePost.userId}`}>More posts of author : {userName.name}</Link>
          <br />
          <br />
          <Link to={'/posts'}>
            <button>Back to Posts</button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default ShowPost;
