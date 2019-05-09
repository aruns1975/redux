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
createStore(a=a,middlewares);
```

Creating sagas
===============

```
function* addEmployeeSaga(action){
    try {
        yield put(actionCreator('ADD_EMPLOYEE_PENDING')());
        const data = yield callAsync({delay:2000, data:action.payload});
        //console.log("The async call fetched the followin data "+data);
        yield put(actionCreator('ADD_EMPLOYEE_SUCCESS')(data));
    } catch(error) {
        yield put(actionCreator('ADD_EMPLOYEE_ERROR')(error));
    }
}

function* deleteEmployeSaga(action){
    yield put(actionCreator('DELETE_EMPLOYEE_PENDING')());
    const data = yield call(callAsync({delay:3000, data:action.payload}));
    yield put(actionCreator('DELETE_EMPLOYEE_SUCESS')(data));
}


function* employeeFunctionsSaga(){
   
    yield takeEvery("ADD_EMPLOYEE",addEmployeeSaga);
    
    yield takeEvery("DELETE_EMPLOYEE",deleteEmployeSaga);
}

sagaMiddleware.run(employeeFunctionsSaga);
```