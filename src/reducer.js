export const initialState = {
    user: null,
};

//push this action to the data layer
export const actionTypes = {
    SET_USER: "SET_USER",
};

const reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case actionTypes.SET_USER:                         /* if dispatching a set user action */
            return {
                ...state,                                     /* keep state and change user */
                user: action.user,
            };

            default:
                return state;
    }
};

export default reducer;