import React from 'react';
import { Link, Route } from 'react-router-dom';

import './App.css';
import Home from './Home';
import Users from './Users';
import Posts from './Posts';
import ShowUser from './ShowUser';
import ShowPost from './ShowPost';

const App = (props) => {
  return (
    <div className='wrapper'>
      <ul className='ulTag'>
        <li>
          <Link to='/' className='liTag'>
            Home
          </Link>
        </li>
        |
        <li>
          <Link to='/users' className='liTag'>
            Users
          </Link>
        </li>
        |
        <li>
          <Link to='/posts' className='liTag'>
            Posts
          </Link>
        </li>
      </ul>
      <Route path='/' component={Home} exact={true} />
      <Route path='/posts' component={Posts} exact={true} />
      <Route path='/posts/:id' component={ShowPost} />
      <Route path='/users' component={Users} exact={true} />
      <Route path='/users/:id' component={ShowUser} />
    </div>
  );
};

export default App;
