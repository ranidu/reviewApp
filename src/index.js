import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reviewReducer from './reducers/reviewReducer';
import formReducer from './reducers/formReducer';

const rootReducer = combineReducers({
    formReducer,
    reviewReducer
  });

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
