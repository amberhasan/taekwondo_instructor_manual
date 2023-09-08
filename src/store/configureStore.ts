import {createStore, combineReducers} from 'redux';
import rootReducer from '../reducers/rootReducer';
import Reactotron from '../../ReactotronConfig';

// Configure the store with reducers
const configureStore = () => {
  const store = createStore(rootReducer, Reactotron.createEnhancer());

  return store;
};

export default configureStore;
