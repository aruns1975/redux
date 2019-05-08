import {applyMiddleware} from 'redux';
import myMiddleware from './first.middleware';
import mySecondMiddleware from './second.middleware';
import asyncMiddleware from './async.middleware';
import promiseMiddleware from './promise.middleware';
import createSagaMiddleware from 'redux-saga';


const sagaMiddleware = createSagaMiddleware();
export default applyMiddleware(asyncMiddleware, promiseMiddleware, myMiddleware, mySecondMiddleware, sagaMiddleware);
export {sagaMiddleware};
