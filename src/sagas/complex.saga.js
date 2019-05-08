import actionCreator from '../utils';


const asyncFunction = (delay, params) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(params);
        },delay)
    });
}

const callRelatedFunctions = () => {
    return [
        asyncFunction(3000,{data:'firstCall'}),
        asyncFunction(5000,{data:'secondCall'})
    ];
}

function* complexSaga(action){
    try{
        yield put(actionCreator("COMPLEX_SAGA_PENDING")());
        const [data1, data2] = yield all(callRelatedFunctions());
        const data3 = yield asyncFunction(1000,[data1, data2]);
        yield put(actionCreator("COMPLEX_SAGA_SUCCESS")(data3));
    }catch(error){
        console.log('Exception occured while executin the complexSaga ',error);
        yield put(actionCreator('COMPLEX_SAGA_ERROR')(error));
    }
}

function* complexFunctionsSaga(){
   yield takeEvery("COMPlEX_SAGA",complexSaga); 
}

export default complexFunctionsSaga;