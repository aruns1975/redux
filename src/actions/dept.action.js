import createAction from './action.utils';
import _ from 'lodash';

const deptActionsTypes ={
    ADD:'ADD_DEPT',
    REMOVE:'REMOVE_DEPT'
};

const deptActions = _.mapValues(deptActionsTypes, value=>{
    return createAction(value);
});

export default deptActions;
export {deptActionsTypes};