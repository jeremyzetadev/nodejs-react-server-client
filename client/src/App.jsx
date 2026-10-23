import { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const API_URL = 'http://localhost:4000';

  const [shouldFetchItems, setShouldFetchItems] = useState(false);
  const [shouldFetchDataActivityWithMsg, setShouldFetchDataActivityWithMsg] = useState(false);
  const [items, setItems] = useState([
      {
          id: 1,
          checked: false,
          item: "milk",
      },
      {
          id: 2,
          checked: true,
          item: "sugar",
      },
  ]);
  const [dataActivityWithMsg, setDataActivityWithMsg] = useState([
  ]);

    useEffect(()=>{
        if(shouldFetchItems){
            const fetchItems = async ()=> {
                try{
                    const response = await fetch(`${API_URL}/itemsTest`); 
                    const data = await response.json();
                    console.log(data);
                    setItems(data);
                } catch(err) {
                    console.warn(err);
                } finally {
                    setShouldFetchItems(false);
                }
            }
            fetchItems();
        }else if(shouldFetchDataActivityWithMsg){
            const fetchItems = async ()=> {
                try{
                    const response = await fetch(`${API_URL}/dataWithMsg`); 
                    const dataActivityWithMsg = await response.json();
                    console.log(dataActivityWithMsg);
                    setDataActivityWithMsg(dataActivityWithMsg);
                } catch(err) {
                    console.warn(err);
                } finally {
                    shouldFetchDataActivityWithMsg(false);
                }
            }
            fetchItems();
        };

    },[shouldFetchItems, shouldFetchDataActivityWithMsg])

    const handleButtonFetchItemClick = () => {
        setShouldFetchItems(true); // Set shouldFetch to true to trigger the useEffect
    };
    const handleButtonFetchDataWithMessageClick = () => {
        setShouldFetchDataActivityWithMsg(true); // Set shouldFetch to true to trigger the useEffect
    };

  return (
    <>
      <nav>
          <div class="nav" style={{ display: "flex", gap: "20px" }}>
              <Link to="/">Home</Link>
              <Link to="/pageError404">ErrorPage</Link>
          </div>
      </nav>

      {items.map(item=>(
          <li className='item' key={item.id}>
            <h2>The item id is {item.id}</h2>
            <label htmlFor="">The item name is {item.item}</label>
            <div>The item checked is {item.checked ? 'true' : 'false'}</div>
          </li>
      ))}

      <button onClick={handleButtonFetchItemClick}>Click to fetch data for itemsTests</button><br/>
      <button onClick={handleButtonFetchDataWithMessageClick}>Click to fetch data for dataWithMessage</button>
      <h1>{dataActivityWithMsg.message}</h1>
      {/* dataActivityWithMsg?.data ensures .map() only runs when data exists */}
        {dataActivityWithMsg?.data?.map((activity, index) => (
          <li key={index}>
            <strong>{activity.name}</strong> — {activity.calories} calories
          </li>
        ))}

      {/*
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      */}

      <h2>Hello World</h2>

    </>
  )
}

export default App
