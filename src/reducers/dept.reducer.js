import {deptActionsTypes} from '../actions/dept.action';

const deptReducer =(state=[], action) => {
    switch(action.type){
        case deptActionsTypes.ADD:
            return state.concat(action.payload);
        case deptActionsTypes.REMOVE: {
            const depts = [...state];
            const index = depts.findIndex(dept => {
                return dept.deptName==action.payload.deptName;
            });
            depts.splice(index,1);
            return depts;
        }
    }
    return state;
}

export default deptReducer;