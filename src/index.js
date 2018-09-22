import {createStore} from 'redux';
import Immutable from 'seamless-immutable';


//1) Create all the Reducers
const reducer = (prevState = Immutable({}), action) => {
    console.log('[REDUCER]','received an action',action);
    console.log('[REDUCER]','my previouse state is ',prevState);
    if(action.type === 'MY_FIRST_ACTION')
        return prevState.merge({message: 'First Action is fired'});
    if(action.type === 'MY_SECOND_ACTION')
        return prevState.merge({message: 'Second action is fired'}); 
    if(action.type === 'ADD') {
        const tempResult = prevState.merge({result: action.payload.a + action.payload.b});   
        return tempResult.without('message')
    }
    return prevState;
}
console.log('[REDUX]', 'Reducer created successfully');

//2) Create Store by registering all the reducers into the store
const store = createStore(reducer);
console.log('[REDUX]','Store created successfully');
//3) Store contains the dispatcher and subscription
//console.log('[Dispatcher function]', store.dispatch);
//console.log('[Subscription function]', store.subscribe);
//4) Component subscribes to the store
store.subscribe(() => {
    console.log('[Subcription 1]', '[Current State]', store.getState());
});
store.subscribe(() => {
    console.log('[Subcription 2]', '[Current State]', store.getState());
});
console.log('[REDUX]','Component subcribed to the store');
//5) Component creates its own action and uses the stores dispatcher to dispatch the action
store.dispatch({type:'MY_FIRST_ACTION'});
store.dispatch({type:'MY_SECOND_ACTION'});
store.dispatch({type:'MY_FIRST_ACTION'});
store.dispatch({type:'ADD',payload: {a:10,b:20}});