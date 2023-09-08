import {createStore, combineReducers} from 'redux';
import rootReducer from '../reducers/rootReducer';

// Configure the store with reducers
const configureStore = () => {
  const store = createStore(rootReducer);

  return store;
};

export default configureStore;
