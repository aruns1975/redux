import {createStore, combineReducers,applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {createAction,handleActions} from 'redux-actions';
import Immutable from 'seamless-immutable';


//1) Create all the Reducers
/*
const reducer = (prevState = Immutable({}), action) => {
    console.log('\t','[REDUCER]','received an action',action);
    console.log('\t','[REDUCER]','my previouse state is ',prevState);
    if(action.type === 'MY_FIRST_ACTION')
        return prevState.merge({message: 'First Action is fired'});
    if(action.type === 'MY_SECOND_ACTION')
        return prevState.merge({message: 'Second action is fired'}); 
    if(action.type === 'ADD') {
        let tempResult = prevState.merge({result: action.payload.a + action.payload.b}); 
        tempResult = tempResult.setIn(['message'],'anothermessage');
        console.log('\t','[REDUCER]','[tempResult]',tempResult);  
        return tempResult.without('message')
    }
    return prevState;
}
*/

const myFirstActionHandler = (prevState=Immutable({}), action) => {
    return prevState.merge({message: 'First Action is fired'});
};

const mySecondActionHandler = (prevState=Immutable({}),action) => {
    return prevState.merge({message: 'Second action is fired'});
};

const myAddActionHandler = (prevState=Immutable({}),action) => {
    let tempResult = prevState.merge({result: action.payload.a + action.payload.b}); 
    tempResult = tempResult.setIn(['message'],'anothermessage');
    console.log('\t','[REDUCER]','[tempResult]',tempResult);  
    return tempResult.without('message')
}

const reducer = handleActions({
    MY_FIRST_ACTION: myFirstActionHandler,
    MY_SECOND_ACTION: mySecondActionHandler,
    ADD: myAddActionHandler
}, Immutable({}));
const reducer2 = (prevState = Immutable({}), action) => {
    //console.log('\t','[REDUCER_2]','I am fired');
    if(action.type==='ASYNC_REQ')
        return {loading:true};
    if(action.type ==='ASYNC_COMPLETED')
        return {loading:false};
    return prevState;
}

const reducer3 = (prevState = Immutable({}), action) => {
    //console.log('\t','[REDUCER_3]','I am fired');
    console.log('[REDUXER3]','[action]',action);
    if(action.type === 'MY_ASYN_ACTION_PENDING')
        return {loading:true};
    if(action.type=== 'MY_ASYN_ACTION_FULFILLED')
        return {loading:false,data:action.payload};
    if(action.type==='MY_ASYN_ACTION_REJECTED')
        return {loading:false,error:true};
    return prevState;
}

const rootReducer = combineReducers({
    first: reducer,
    second: combineReducers( {test: reducer2, anotherTest: reducer3})
});

console.log('[REDUX]', 'Reducer created successfully');

//1a) Creation of middleware 
const middleware = (store) => {
    return (next) => {
        return (action) => {
            console.log('[MYMIDDLEWARE]','[B4 calling next]', action);
            next(action);
            next(action);
            next({type:'newaction'});
            console.log('[MYMIDDLEWARE]','[After calling next]', action);
        }
    }
}

const middleware2 = store => {
    return next => {
        return action => {
            console.log('[MYMIDDLEWARE_2]','[B4 calling next]', action);
            next(action);
            console.log('[MYMIDDLEWARE_2]','[After calling next]', action);
        }
    }
}
//2) Create Store by registering all the reducers into the store
const store = createStore(rootReducer,applyMiddleware(createLogger(), thunk,promise()));
console.log('[REDUX]','Store created successfully');
//3) Store contains the dispatcher and subscription
//console.log('[Dispatcher function]', store.dispatch);
//console.log('[Subscription function]', store.subscribe);
//4) Component subscribes to the store
store.subscribe(() => {
    console.log('\t','[Subcription 1]', '[Current State]', store.getState());
});
/*
store.subscribe(() => {
    console.log('[Subcription 2]', '[Current State]', store.getState());
});
*/
console.log('[REDUX]','Component subcribed to the store');
//5) Component creates its own action and uses the stores dispatcher to dispatch the action


store.dispatch(createAction('MY_FIRST_ACTION'));
store.dispatch(createAction('MY_SECOND_ACTION'));
store.dispatch(createAction('MY_FIRST_ACTION'));
store.dispatch(createAction('ADD')({a:10,b:20}));
//ASYNC Actions

const  myAsyncAction = (params) => {
    return (dispatch,state) =>{
        const promise = new Promise(
                (resolve,reject) => {
            setTimeout(()=>{
                reject(params);
            },10000);
        });
        dispatch(createAction('MY_ASYN_ACTION')(promise)); 
        //{type:'MY_ASYN_ACTION',payload: promise}
        //MY_ASYN_ACTION_PENDING
        //MY_ASYN_ACTION_FULFILLED
        //MY_ASYN_ACTION_REJECTED
    }
} 

store.dispatch(myAsyncAction({a:30,b:50}));
