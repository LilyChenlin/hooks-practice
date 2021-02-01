import {useState, useEffect} from 'react';

export const useRequest = (fn, dependencies, defaultValue = []) => {
    const [data, setData] = useState(defaultValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = () => {
        // 定义cancel标志位
        let cancel = false;
        // 开始请求
        setLoading(true); // 展示loading...
        fn().then(res => {
            if(!cancel) {
                setData(res)
            } else {
                const {tab} = res;
                console.log(`request with ${tab} canceled`)
            }
        }).catch((error) => {
            if(!cancel) {
                setError(error)
            }
        }).finally(() => {
            if (!cancel) {
                setLoading(false)
            }
        })


        return () => {
            cancel = true;
        }
    }

    // 每次dependencies发生变化的时候 执行这个effect
    // 在useEffect传入的函数，返回一个取消请求的函数
    // 这样在下一次调用这个useEffect时，会先取消掉上一次的请求。解决频繁切换tab产生的脏数据
    useEffect(() => {
        const cancelRequest = request();
        return () => {
            cancelRequest()
        }
    }, dependencies)

    return { data, setData, loading, error, request };
}

export const useWithLoading = (fn) => {
    const [loading, setLoading] = useState(false);
    const func = (...args) => {
        setLoading(true);
        return fn(...args).finally(() => {
            setLoading(false);
        });
    }
    return {loading, func}
}