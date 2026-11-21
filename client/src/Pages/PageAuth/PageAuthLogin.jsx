import { useState, useEffect, useRef } from 'react'
import api from '../../Api/Base.jsx'

function PageAuthLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('itemAuthData')));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const setAndSaveAuth = (itemAuthData) => {
    setAuthData(itemAuthData);
    localStorage.setItem('itemAuthData',JSON.stringify(itemAuthData));
    console.log(itemAuthData);
  } 

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent full page reload on form submit
    setError('');
    setLoading(true);

    try {
      const data = { username, password };
      alert(`username:${username}, password:${password}`);
      const response = await api.post('/AuthLogin', data);
      alert(`DATA: ${response.data}`);
      setAndSaveAuth(response.data);
      // setAuthData(response.data);
    } catch (err) {
      if (err.response) {
        // Non-2xx response from server
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        setError(err.response.data?.message || `Login failed (${err.response.status})`);
      } else {
        console.log(`Error: ${err.message}`);
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>This is page PageAuthLogin</h2>
      <div className="login-page">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {error && <p>{error}</p>}
        {authData && <pre>{JSON.stringify(authData, null, 2)}</pre>}
      </div>
    </>
  );
}

export default PageAuthLogin;





// function PageAuthLogin() {
//
//   const [shouldAuthLogin, setShouldAuthLogin] = useState(false);
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//
//     useEffect(()=>{
//         if(shouldAuthLogin){
//             const authLogin = async () => {
//                 try {
//                     const data = {name: name, datetime, body: postBody};
//                     const response = await api.post('/Auth', data);
//                     // >200 httpresponse will catch the err by axios
//                     setShouldAuthLogin(response.data);
//                 } catch (err) {
//                     if(err.response){
//                         // Not in the 200 response range
//                         console.log(err.response.data);
//                         console.log(err.response.status);
//                         console.log(err.response.headers);
//                     } else {
//                         console.log(`Error: ${err.message}`);
//                     }
//                 }
//             }
//
//             authLogin();
//         }
//     },[])
//
//     const handleButtonAuthLogin= () => {
//         setShouldAuthLogin(true); // Set shouldFetch to true to trigger the useEffect
//     };
//
//     return(
//         <>
//           <h2>This is page PageAuthLogin</h2>
//             <div class="login-page">
//                 <form action="">
//                     <label for="username">Username:</label>
//                     <input type="text" id="username" name="username"/>
//                     <label for="password">Password:</label>
//                     <input type="password" id="password" name="password"/>
//                       <button onClick={handleButtonAuthLogin}>Login</button><br/>
//                 </form>
//             </div>
//         </>
//     )
//
// }
//
// export default PageAuthLogin
