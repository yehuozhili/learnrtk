/*
 * @Author: yehuozhili
 * @Date: 2021-08-13 10:32:20
 * @LastEditors: yehuozhili
 * @LastEditTime: 2021-08-14 19:52:20
 * @FilePath: \learnrtk\src\App.tsx
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { decrement, increment, incrementAsync, selectCount, selectCountStatus } from './store';


function App() {
  const dispatch = useDispatch()
  const state = useSelector(selectCount)
  const st = useSelector(selectCountStatus)
  return (
    <div className="App">
      {
       st === 'loading'?'loading':  state
      }
      <button onClick={()=>{
        dispatch(increment())
      }}>+</button>
       <button onClick={()=>{
        dispatch(decrement())
      }}>-</button>
       <button onClick={()=>{
        dispatch(incrementAsync())
      }}>+</button>
    </div>
  );
}

export default App;
