const actionCreator = (type)=>(params)=>{
    if(params)
        return {type:type, payload:params};
    return {type:type};
};

export default actionCreator;