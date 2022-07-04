const initialFormData = {
    id: '',
    pw: '',
    confirmPw: '',
}

export const setInputValue = (id, value) => {
    return {
        type: id,
        payload: value,
    }
}

export const reducer = (state = initialFormData, action) => {
    switch (action.type) {
        case 'id':
            return { ...state, id: action.payload }
        case 'pw':
            return { ...state, pw: action.payload }
        case 'confirmPw':
            return { ...state, confirmPw: action.payload }
        default:
            return state
    }
}
