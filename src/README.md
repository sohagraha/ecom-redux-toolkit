**_*First Ceate a store.ts on src/redux/store.ts*_**

```
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // here we will be adding reducers first it will be empty
  },
});

export default store;

```

**_For Typescript we need to add type for store_**

```
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // here we will be adding reducers first it will be empty
  },
});

// this 2 lines are for typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;

```

**_Now we need to add this store to our main.tsx / app.tsx_**

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.tsx';

import { Provider } from 'react-redux'; // it's a provoder from react-redux
import store from './redux/store.ts'; // it's a store from redux

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}> // here we are adding store to our app
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);


```

**_ Create Redux hooks in src/redux/hooks.ts_**

```
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


```

**_Now create a feature folder in src/redux/features_**

**_Create a folder for each feature like src/redux/features/cartSlice.tsx_**

```
import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '@/types/globalTypes';

interface ICart {
  products: IProduct[];
}

const initialState: ICart = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  },
});

export default cartSlice.reducer; // export reducer

```

**_Now we need to add this reducer to our store.ts_**

```

import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './features/cartSlice.tsx'; // import reducer

const store = configureStore({
  reducer: {
    cart: cartReducer, // add reducer to store whuch we imported as default from src/redux/feature/cartSlice.tsx
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

```

**If all is ok we can see our store in redux devtools from browser**

**_Now we need to add some reducers to our cartSlice.tsx_**

```
import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '@/types/globalTypes';

interface ICart {
  products: IProduct[];
}

const initialState: ICart = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addTocart(state, action:PayloadAction<IProduct>) {
      state.products.push(action.payload);
    },
  },
});

export const { addTocart } = cartSlice.actions; // export actions for dispatch

export default cartSlice.reducer; // use in store.ts

```

**_Now we can use this reducer in our components_**

```
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addTocart } from '@/redux/features/cartSlice';

const Product = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.cart.products);

  const handleAddProduct = (product) => {
    dispatch(addTocart(product));
  };

  return (
    <div>
      <ul>
        {products.map((product) => (
          <>
            <li key={product.id}>{product.name}</li>
            <button onClick={() => handleAddProduct(product)}>Add to cart</button>
          </>
        ))}
      </ul>
    </div>
  );
};

```
