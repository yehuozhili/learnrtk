/*
 * @Author: yehuozhili
 * @Date: 2021-08-14 15:18:10
 * @LastEditors: yehuozhili
 * @LastEditTime: 2021-08-14 19:52:11
 * @FilePath: \learnrtk\src\store.ts
 */

import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface CounterState {
    value: number;
    status: 'idle' | 'loading' | 'failed';
  }
  const initialState: CounterState = {
    value: 0,
    status: 'idle',
  };
  
  function fetchCount(amount = 1) {
    return new Promise<{ data: number }>((resolve) =>
      setTimeout(() => resolve({ data: amount }), 500)
    );
  }
  
  export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount?: number) => {
      const response = await fetchCount(amount);
      return response.data;
    }
  );

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      increment: (state) => {
        state.value += 1;
      },
      decrement: (state) => {
        state.value -= 1;
      },
      incrementByAmount: (state, action) => {
        state.value += action.payload;
      },
    },
    extraReducers:(builder)=>{
        builder.addCase(incrementAsync.pending,(state) => {
            state.status = 'loading';
          })
          builder.addCase(incrementAsync.fulfilled,(state,action) => {
            state.status = 'idle';
            state.value += action.payload;
          })
    }
});

//useSelector获取值
export const selectCount = (state: RootState) => state.counter.value;
export const selectCountStatus = (state: RootState) => state.counter.status;
//actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

const counterReducer = counterSlice.reducer

export const store = configureStore({
    reducer: {
      counter: counterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;