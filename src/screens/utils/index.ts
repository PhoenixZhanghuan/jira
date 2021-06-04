import {useEffect, useState} from 'react';

export const isFalsy = (value: number) => value === 0 ? false : !value

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        // @ts-ignore
        const value = result[key];
        if(isFalsy(value)) {
            // @ts-ignore
            delete result[key];
        }
    })  
    return result;
} 

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
    }, [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(timeout);
    }, [value, delay])

    return debounceValue;
}