First Ceate a store.ts on src/redux/store.ts

```
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // here we will be adding reducers first it will be empty
  },
});

export default store;

```

For Typescript we need to add type for store

```
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // here we will be adding reducers first it will be empty
  },
});

<span style="color:red">export type RootState = ReturnType<typeof store.getState>;</span>
<span style="color:red">export type AppDispatch = typeof store.dispatch;</span>


export default store;

```

Now we need to add this store to our app.tsx

```
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Redux Toolkit</h1>
      </div>
    </Provider>
  );
}

export default App;

```

Now we need to add reducer to our store.ts

```
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;

```

Now we need to add counterSlice.ts

```
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
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
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;

```

Now we need to add this reducer to our app.tsx

```
import { Provider } from 'react-redux';
import store from './redux/store';
import { increment, decrement, incrementByAmount } from './redux/counterSlice';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Redux Toolkit</h1>
        <button onClick={() => store.dispatch(increment())}>+</button>
        <button onClick={() => store.dispatch(decrement())}>-</button>
        <button onClick={() => store.dispatch(incrementByAmount(10))}>+10</button>
      </div>
    </Provider>
  );
}

export default App;

```

Now we need to add hooks in src\redux\hooks.ts

```
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

```

Now we need to add this hooks to our app.tsx

```

import { Provider } from 'react-redux';
import store from './redux/store';
import { increment, decrement, incrementByAmount } from './redux/counterSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';

function App() {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state.counter.value);

  return (
    <Provider store={store}>
      <div className="App">
        <h1>Redux Toolkit</h1>
        <h2>{counter}</h2>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(incrementByAmount(10))}>+10</button>
      </div>
    </Provider>
  );
}

export default App;

```

Now we need to add counterSlice.ts

```
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;

```

Now we need to add this reducer to our app.tsx
