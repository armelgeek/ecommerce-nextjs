import React, {useEffect, useState} from 'react';
import {formatter} from "@/lib/utils";

const Currency = ({
    value
}:{
    value: string | number
}) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [isMounted]);
    return (
        <div className="font-semibod">
            {formatter.format(Number(value))}
        </div>
    );
};

export default Currency;
