import '@babel/polyfill';
import createSagaMiddleware from 'redux-saga';
import {takeEvery, call,  put, all} from 'redux-saga/effects'
import { createStore, applyMiddleware } from 'redux';
import * as actions from './actions';

const sagaMiddleware = createSagaMiddleware();



const myLogerMiddleware = store=>next=>action=>{
    console.log('[REDUCER]','[myReducer]','[action]',action);
    next(action);
}

const reducer = (state={},action) => {
    console.log('The payload is ',action.type);
    switch(action.type) {
        case 'ADD_EMPLOYEE_PENDING':
            return {loading:true};
        case 'ADD_EMPLOYEE_SUCCESS':
            return {loading:false,employee:{data:action.payload}};
        case 'ADD_EMPLOYEE_ERROR':
            return {loading:false,employee:{error:action.payload}};
        case 'COMPLEX_SAGA_PENDING':
            return {loading:true};
        case 'COMPLEX_SAGA_SUCCESS':
            return {loading:false,complexsaga:{data:action.payload}};
        case 'COMPLEX_SAGA_ERROR':
            return {loading:false,complexsaga:{error:action.payload}};
    }
    return state;
}

const store = createStore(reducer,applyMiddleware(sagaMiddleware));

const callAsync = (params) => {
    //console.log(params);
    const promise = new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(params.data.error)
                reject("Unable to fetch the employe details");
            else
                resolve(params.data)
        },params.delay);
    });
    return promise;
}
const callRelatedFunctions = () => {
    return [ 
            callAsync({delay:2000, data:{name:'Arun'}}),
            callAsync({delay:4000, data:{name:'Kumar'}})
    ];
}

async function handlePromise(promise){
    const data = await promise
    console.log(data);
    return data;
}

const actionCreator = (type)=>(params)=>{
    if(params)
        return {type:type, payload:params};
    return {type:type};
};
const actionsCreator = obj=>{
    return Object.values(obj).map(value => {return {
        [value]:actionCreator(value)
    }}).reduce((accumulator,currentObj) => {
        return Object.assign(accumulator, currentObj);
    },{})
}
const actionTypes = actionsCreator(actions);
console.log(actionTypes);

console.log(actionTypes.ADD_EMPLOYEE({name:'Arun'}));

const ADD_EMPLOYEE_ACTION_CREATOR = actionCreator('ADD_EMPLOYEE');
const REMOVE_EMPLOYEE_ACTION_CREATOR = actionCreator('DELETE_EMPLOYEE');
console.log(ADD_EMPLOYEE_ACTION_CREATOR({id:1, name:'Arun', age:23}));

function* complexSaga(action){
    try{
        yield put(actionCreator("COMPLEX_SAGA_PENDING")());
        const [data1, data2] = yield all(callRelatedFunctions());
        const data3 = yield callAsync({delay:1000,data:[data1, data2]});
        yield put(actionCreator("COMPLEX_SAGA_SUCCESS")(data3));
    }catch(error){
        console.log('Exception occured while executin the complexSaga ',error);
        yield put(actionCreator('COMPLEX_SAGA_ERROR')(error));
    }
}

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
    yield put(actionCreator('DelETE_EMPLOYEE_SUCESS')(data));
}

function* employeeFunctions(){
   
    yield takeEvery("ADD_EMPLOYEE",addEmployeeSaga);
    
    yield takeEvery("DELETE_EMPLOYEE",deleteEmployeSaga);
    yield takeEvery("COMPLEX_SAGA",complexSaga);
}

// const numberGenerator = myGenerator();
// const promise = numberGenerator.next();
// promise.value.then(data => {
//     console.log(data);
// })
store.subscribe(()=>{
    console.log('The store value has been modified to ',store.getState());
})
sagaMiddleware.run(employeeFunctions);

//store.dispatch(actionCreator("ADD_EMPLOYEE",{name:'Arun',age:20}));
//store.dispatch(actionCreator("ADD_EMPLOYEE",{error:true}));
//store.dispatch(actionCreator("ADD_EMPLOYEE",{name:'Raghu'}));
//store.dispatch(actionCreator("COMPLEX_SAGA"));