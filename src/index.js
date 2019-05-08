import '@babel/polyfill';

import store from './store';
import actionCreator from './utils';

store.subscribe(()=>{
    console.log('The store value has been modified to ',store.getState());
})
//sagaMiddleware.run(employeeSaga);

store.dispatch(actionCreator("ADD_EMPLOYEE")({name:'Arun',age:20}));
//store.dispatch(actionCreator("ADD_EMPLOYEE",{error:true}));
//store.dispatch(actionCreator("ADD_EMPLOYEE",{name:'Raghu'}));
store.dispatch(actionCreator("COMPLEX_SAGA")());