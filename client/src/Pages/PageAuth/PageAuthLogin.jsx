import { useState, useEffect, useRef } from 'react'
import api from '../../Api/Base.jsx'

function PageAuthLogin() {

  const [shouldAuthLogin, setShouldAuthLogin] = useState(false);

    useEffect(()=>{
        if(shouldAuthLogin){
            const authLogin = async () => {
                try {
                    const response = await api.post('/Auth', data);
                    // >200 httpresponse will catch the err by axios
                    setShouldAuthLogin(response.data);
                } catch (err) {
                    if(err.response){
                        // Not in the 200 response range
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else {
                        console.log(`Error: ${err.message}`);
                    }
                }
            }

            authLogin();
        }
    },[])

    const handleButtonAuthLogin= () => {
        setShouldAuthLogin(true); // Set shouldFetch to true to trigger the useEffect
    };

    return(
        <>
          <h2>This is page PageAuthLogin</h2>
            <div class="login-page">
                <form action="">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username"/>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password"/>
                      <button onClick={handleButtonAuthLogin}>Login</button><br/>
                </form>
            </div>
        </>
    )

}

export default PageAuthLogin
