
const getSelectFieldsParam = <T>(list: T[]): string => list.reduce((a: string, f: T) =>  a + `selectFields=${f}&`, '')

const getNotNullFieldsParam = <T>(list: T[]): string => list.reduce((a: string, f: T) =>  a + `notNullFields=${f}&`, '')


const debounce = (cb: (...args: any[]) => void, delay: number) => {
    let timerId: undefined | number = undefined;
    return (...args: any[]) => {
        clearTimeout(timerId)
        timerId =setTimeout(() => {
            cb(...args)
        }, delay) 
    }
}

const getRatingParamValue = (list: number[]): string => list.map(r => r / 10).join('-')

export {getSelectFieldsParam, getNotNullFieldsParam, debounce, getRatingParamValue }