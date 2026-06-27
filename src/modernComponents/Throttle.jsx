import { useEffect, useState,useRef } from "react";


export function Usethrottle({value, limit = 300}){
 const [throttleValue,setThrottleValue]=useState(value);

 const lastRun = useRef(Date.now());

 useEffect(() => {
    const lastRunTime = Date.now() - lastRun.current;

    if(lastRunTime >= limit){
        setThrottleValue(value);
        lastRun.current = Date.now();
    }else{
        const timer = setTimeout(() => {
            setThrottleValue(value);
            lastRun.current = Date.now();
        }, limit - lastRunTime);

        return ()=> clearTimeout(timer);
    }
 }, [value, limit]);

 return throttleValue;
}