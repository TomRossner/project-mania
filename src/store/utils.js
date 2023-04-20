// Action creator
export const createAction = (action, value=null) => (
    {
        type: action,
        payload: value
    }
)