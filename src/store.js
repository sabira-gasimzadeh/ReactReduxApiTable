import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // You can use other middleware for async actions

import dataReducer from './reducer';

const store = createStore(dataReducer, applyMiddleware(thunk));

export default store;