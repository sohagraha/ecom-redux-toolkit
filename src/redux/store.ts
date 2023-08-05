import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {},
});

// this 2 line for typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
