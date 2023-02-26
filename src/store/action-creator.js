export const createAction = (action, value) => (
    {
        type: action,
        payload: value
    }
)