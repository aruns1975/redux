import addressReducer from './address.reducer';
import deptReducer from './dept.reducer';
import employeeReducer from './employee.reducers';
import {combineReducers} from 'redux';


const myCombinedReducers = combineReducers({
    emps:employeeReducer,
    depts:deptReducer,
    suppliers:combineReducers({
        address:addressReducer
    })
});

export default myCombinedReducers;