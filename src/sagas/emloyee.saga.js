import {takeEvery, call,  put, all} from 'redux-saga/effects';
import actionCreator from '../utils';

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

export default employeeFunctionsSaga