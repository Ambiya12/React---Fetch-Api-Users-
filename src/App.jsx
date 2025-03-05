import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const myName = "Galyst";
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      setUsers(response.data);
    } catch (err) {
      setError("Error while loading data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/users", {
        firstName,
        lastName,
        telephone,
        address,
        hobbies,
      });
      setSuccessMessage("User added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
    catch (err) {
      console.error(err);
    }
    finally {
      fetchAPI();
    }
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <h1 className="myH1">Welcome</h1>
      <p>Hello my name is {myName}</p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {users &&
        users.map((user) => {
          return (
            <div
              key={user.id}
              style={{
                border: "1px solid black",
                margin: "10px",
                padding: "10px",
                display: "inline-block",
              }}
            >
              <p>id : {user.id}</p>
              <p>First Name : {user.firstName}</p>
              <p>Last Name : {user.lastName}</p>
              <p>Telephone : {user.telephone}</p>
              <p>Address : {user.address}</p>
              <p>Hobbies : {user.hobbies}</p>
            </div>
          );
        })}
        <form onSubmit={handleSubmit} action="POST">
          <input type="text" placeholder="First Name" required onChange={e => setFirstName(e.target.value)} />
          <input type="text" placeholder="Last Name" required onChange={e => setLastName(e.target.value)} />
          <input type="text" placeholder="Telephone"required onChange={e => setTelephone(e.target.value)}/>
          <input type="text" placeholder="Address"required onChange={e => setAddress(e.target.value)}/>
          <input type="text" placeholder="Hobbies"required onChange={e => setHobbies(e.target.value)}/>
          <input type="submit"/>
        </form>
    </>
  );
};

export default App;
