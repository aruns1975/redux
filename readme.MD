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
The below saga is used to add and delete employee by callin async function simulating the service call.
The saga can be invoked by dispatching the following actions
 1) ADD_EMPLOYEE
 2) DELETE_EMPLOYEE
```
const actionCreator = (type)=>(params)=>{
    if(params)
        return {type:type, payload:params};
    return {type:type};
};

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

Creating complex sagas
======================
The below saga describes calling multiple services in parallel and after the execution of multiple service the response is used for callin another service and the result of the final service is stored in the redux store.

It explains the calling of multiple service in parallel and processin the response

This saga can be called by dispatching the followin service
 * COMPlEX_SAGA
```
const asyncFunction = (delay, params) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(params);
        },delay)
    });
}

const callRelatedFunctions = () => {
    return [
        asyncFunction(3000,{data:'firstCall'}),
        asyncFunction(5000,{data:'secondCall'})
    ];
}

function* complexSaga(action){
    try{
        yield put(actionCreator("COMPLEX_SAGA_PENDING")());
        const [data1, data2] = yield all(callRelatedFunctions());
        const data3 = yield asyncFunction(1000,[data1, data2]);
        yield put(actionCreator("COMPLEX_SAGA_SUCCESS")(data3));
    }catch(error){
        console.log('Exception occured while executin the complexSaga ',error);
        yield put(actionCreator('COMPLEX_SAGA_ERROR')(error));
    }
}

function* complexFunctionsSaga(){
   yield takeEvery("COMPlEX_SAGA",complexSaga); 
}

sagaMiddleware.run(sagas.complexSaga);
```