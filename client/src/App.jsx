import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const API_URL = 'http://localhost:4000';

  const [shouldFetch, setShouldFetch] = useState(false);
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

    useEffect(()=>{
        if(shouldFetch){
            const fetchItems = async ()=> {
                try{
                    const response = await fetch(`${API_URL}/itemsTest`); 
                    const data = await response.json();
                    console.log(data);
                    setItems(data);
                } catch(err) {
                    console.warn(err);
                } finally {
                    setShouldFetch(false);
                }
            }
            fetchItems();
        };

    },[shouldFetch])

    const handleButtonFetchClick = () => {
        setShouldFetch(true); // Set shouldFetch to true to trigger the useEffect
    };

  return (
    <>
      {items.map(item=>(
          <li className='item' key={item.id}>
            <h2>The item id is {item.id}</h2>
            <label htmlFor="">The item name is {item.item}</label>
            <div>The item checked is {item.checked ? 'true' : 'false'}</div>
          </li>
      ))}

      <button onClick={handleButtonFetchClick}>Click to fetch data for usersTest</button>

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
