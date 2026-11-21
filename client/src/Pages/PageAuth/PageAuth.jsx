import api from '../../Api/Base.jsx';
import { useState, useEffect, useRef } from 'react';

function PageAuth() {
    const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('itemAuthData')));
  // const [authData, setAuthData] = useState(() => {
  //   try {
  //     return JSON.parse(localStorage.getItem('itemAuthData'));
  //   } catch {
  //     return null;
  //   }
  // });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const didRunOnMount = useRef(false);

  const setAndSaveAuth = () => {
    const itemAuthData = JSON.parse(localStorage.getItem('itemAuthData'));
    setAuthData(itemAuthData);
    console.log(itemAuthData);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault(); // Safe when called without a form event
    setError('');
    setLoading(true);

    try {
      setAndSaveAuth();
      alert(`DATA: ${authData}`);
      const token = authData?.accessToken;
      //React "pageAuth" is the weblink but at Node it is "userAuth" (can be the same, but usually the api too is obfuscated)
      const response = await api.get('/userAuth', 
          {headers: {Authorization: token}
      });
      // authData here should be use for post and setup for post
      // const response = await api.post('/userAuth', authData,
      //     {headers: {Authorization: token}
      // });
      alert(`DATA: ${JSON.stringify(response.data)}`);
    } catch (err) {
      if (err.response) {
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

  useEffect(() => {
    if (didRunOnMount.current) return;
    didRunOnMount.current = true;
    handleSubmit();
  }, []);

  return (
    <>
      <h2>This is page PageAuth need to be logined</h2>
      {loading && <p>Logging in...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && <p style={{ color: 'blue' }}>verified to by jwt to access this page</p>}
    </>
  );
}

export default PageAuth;



// import api from '../../Api/Base.jsx'
// import { useState, useEffect, useRef } from 'react'
//
//
// function PageAuth() {
//     const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('itemAuthData')));
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//
//     const setAndSaveAuth = (itemAuthData) => {
//         setAuthData(itemAuthData);
//         localStorage.setItem('itemAuthData',JSON.stringify(itemAuthData));
//         console.log(itemAuthData);
//     } 
//
//     const handleSubmit = async (e) => {
//         e.preventDefault(); // prevent full page reload on form submit
//         setError('');
//         setLoading(true);
//
//         try {
//           // const data = { username, password };
//           // alert(`username:${username}, password:${password}`);
//           setAndSaveAuth(response.data);
//           const response = await api.post('/AuthLogin', authData);
//           alert(`DATA: ${response.data}`);
//           // setAuthData(response.data);
//         } catch (err) {
//           if (err.response) {
//             // Non-2xx response from server
//             console.log(err.response.data);
//             console.log(err.response.status);
//             console.log(err.response.headers);
//             setError(err.response.data?.message || `Login failed (${err.response.status})`);
//           } else {
//             console.log(`Error: ${err.message}`);
//             setError(err.message);
//           }
//         } finally {
//           setLoading(false);
//         }
//     };
//
//     return(
//         <>
//           <h2>This is page PageAuth need to be logined</h2>
//         </>
//     )
// }
//
// export default PageAuth
