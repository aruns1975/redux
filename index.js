import { createStore } from 'redux'

//Reducer
function myReducer(state=0, action) {
    switch(action.type) {
        case 'add':
            return state+1;
        case 'subtract':
            return state-1
    }
    return state;
}

let store = createStore(myReducer);