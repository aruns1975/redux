const myCreateAction = (actionType) => {
    return (params) => {
        return {type:actionType, payload:params};
    }
}

export default myCreateAction;