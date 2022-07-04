import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInputValue } from '../redux'

const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

const ERROR_MSG = {
    required: '필수 정보입니다.',
    invalidId:
        '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
    invalidPw: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
    invalidConfirmPw: '비밀번호가 일치하지 않습니다.',
}

export const Input = ({ id, label, inputProps, errorData, setErrorData }) => {
    const inputRef = useRef(null)
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)

    const checkRex = (inputId) => {
        let result
        const value = selector[inputId]

        if (value.length === 0) {
            result = 'required'
        } else {
            switch (inputId) {
                case 'id':
                    result = ID_REGEX.test(value) ? true : 'invalidId'
                    break
                case 'pw':
                    result = PW_REGEX.test(value) ? true : 'invalidPw'
                    checkRex('confirmPw')
                    break
                case 'confirmPw':
                    result =
                        value === selector['pw'] ? true : 'invalidConfirmPw'
                    break
                default:
                    return
            }
        }
        setErrorData((prev) => ({ ...prev, [inputId]: result }))
    }

    useEffect(() => {
        if (id === 'id') {
            inputRef.current.focus()
        }
    }, [id])

    return (
        <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                id={id}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                    errorData[id].length === 0
                        ? ''
                        : errorData[id] === true
                        ? ''
                        : 'border-red-600'
                }`}
                value={selector[id]}
                ref={inputRef}
                onChange={(e) => dispatch(setInputValue(id, e.target.value))}
                {...inputProps}
                onBlur={() => checkRex(id)}
            />
            <div id="id-msg" className="mt-1 mb-3 text-xs text-red-500">
                {errorData !== true ? ERROR_MSG[errorData[id]] : ''}
            </div>
        </div>
    )
}
