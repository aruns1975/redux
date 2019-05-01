import {employeeActions, deptActions} from './actions';
import store from './store';


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// SUBSCRIPTIONS
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
store.subscribe(()=>{
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(store.getState());
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// ACTIONS
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const createEmployee = (employeeObject) => {
    store.dispatch(employeeActions.ADD(employeeObject));
}

createEmployee({empId:1, empName:'Arun', age:43});
createEmployee({empId:2, empName:'Kumar', age:43});

function numberGenerator(upperLimit, skipValue=1) {
    const genetrator = function* () {
        for(let i=1;i<=upperLimit;i = i+skipValue){
            yield i;
        }
    }
    return genetrator();
}

const generatorTest = numberGenerator(10)
while(true){
    const val=generatorTest.next();
    console.log(val);
    if(val.done)
        break;
    
}

const values = [...numberGenerator(100,10)];
console.info(values);



// createEmployee();
// createEmployee({empId:2, empName:'Ram', age:36});
// createDept({ deptId: 1, deptName: 'ACCOUNTS' });
// createEmployee({empId:3, empName:'Raghu', age:25});
// createEmployee({empId:4, empName:'Ravi', age:41});
// createDept({ deptId: 2, deptName: 'HR' });
// createEmployee({empId:5, empName:'Pallavi', age:34});
// removeEmployee('Arun');


