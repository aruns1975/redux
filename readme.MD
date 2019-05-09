REDUX SAGA tutorial
===================

Installation of Redux saga
========================
```
npm install --save redux-saga
``` 

Creating the saga middleware
```
import createSagaMiddleware from 'redux-saga';
import { createStore } from 'redux';

const sagaMiddleware = createSagaMiddleware();
const middlewares =applyMiddleware(sagaMiddleware,other middlewares);
createStore(reducer,middlewares);
```