import { createStore } from 'redux';
import reducers from '../reducers';
import middlewares,{sagaMiddleware} from '../middlewares';
import * as sagas from '../sagas';

export default createStore(reducers, middlewares);

sagaMiddleware.run(sagas.complexSaga);
sagaMiddleware.run(sagas.employeeSaga);