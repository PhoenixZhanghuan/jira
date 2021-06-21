import {useEffect, useRef, useState} from 'react';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const isVoid = (value: unknown) => value === undefined || value === null || value === '';

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: {[key: string]: unknown}) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key];
        if(isVoid(value)) {
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

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
    const oldTitle = useRef(document.title).current;
    
    useEffect(() => {
        document.title = title;
    }, [title])

    useEffect(() => {
        return () => {
            if(!keepOnUnmount) {
                document.title = oldTitle;
            }
        }
    }, [keepOnUnmount, oldTitle])
} 