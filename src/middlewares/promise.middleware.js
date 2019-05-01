export default store => next => action => {
    if(action.payload && action.payload instanceof Promise) {
        const myAction = {};
        myAction.type = action.type + "_PENDING";
        next(myAction);
        action.payload.then(data=>{
            next({type:action.type + "_SUCCESS",payload:data});
        }, error => {
            next({type:action.type+"_ERROR",payload:error});
        })
    }
    else {
        return next(action);
    }
}