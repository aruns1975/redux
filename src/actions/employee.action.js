import createAction from './action.utils';
import _ from 'lodash';
const employeeActionsTypes = {
    ADD:'ADD',
    ADD_PENDING:'ADD_PENDING',
    ADD_SUCCESS:'ADD_SUCCESS',
    ADD_ERROR:'ADD_ERROR',
    REMOVE:'REMOVE'
};

const employeeActions = _.mapValues(employeeActionsTypes, value=>{
    return createAction(value);
});

employeeActions.ADD = (params) => {
    return dispatch => {
        let myPromise = new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve(params)
            },1000);
            // setTimeout(()=>{
            //     reject(new Error('Unable to connect to server'));
            // },5000);
        })
        dispatch({type:'ADD',payload:myPromise});   
    }
}
export default employeeActions;
export {employeeActionsTypes};