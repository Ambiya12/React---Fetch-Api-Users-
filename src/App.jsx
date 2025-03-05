import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

const App = () => {

  const myName = 'Galyst';
  const [users, setUsers] = useState(null);

  const fetchAPI = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users');
      setUsers(response.data);
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <h1 className='myH1'>Welcome</h1>
      <p>Hello my name is {myName}</p>
   
      {users && users.map(user => {
        return (
          <div key={user.id} style={{border: '1px solid black', margin: '10px', padding: '10px', display: 'inline-block'}}>
            <p>id : {user.id}</p>
            <p>First Name : {user.firstName}</p>
            <p>Last Name : {user.lastName}</p>
            <p>Telephone : {user.telephone}</p>
            <p>Address : {user.address}</p>
            <p>Hobbies : {user.hobbies}</p>
          </div>
        )
      })}
    </>      
  );
}

export default App;