import { createStore } from 'redux';
// import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
