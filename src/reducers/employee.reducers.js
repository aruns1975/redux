import {employeeActionsTypes} from '../actions/employee.action';
const intialState= {
    loading:false,
    error:false,
    obj:[]
}
const empReducer =(state=intialState, action) => {
    switch(action.type){
        case employeeActionsTypes.ADD_PENDING:{
            let {loading,error, obj}=state;
            loading=true;
            const newObj=[...obj];
            return {loading,error, obj:newObj};           
        }
        case employeeActionsTypes.ADD_SUCCESS:{
            let {loading,error,obj}=state;
            loading=false;
            const retrunObj = obj.concat(action.payload);
            return  {loading,error, obj:retrunObj};      
        }
        case employeeActionsTypes.ADD_ERROR:{
            let {loading,error,obj}=state;
            loading=false;
            error=true;
            return  {loading,error, obj};      
        }
        case employeeActionsTypes.REMOVE: {
            const emps = [...state];
            const index = emps.findIndex(emp => {
                return emp.empName==action.payload.empName;
            });
            emps.splice(index,1);
            return emps;
        }
    }
    return state;
}

export default empReducer;