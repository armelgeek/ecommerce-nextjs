"use client";
import React, {useEffect, useState} from 'react';
import {StoreModal} from "@/components/models/store-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=> {
        setIsMounted(true);
    },[])
    if(!isMounted) {
        return null
    }
    return (
        <div>
            <StoreModal/>
        </div>
    );
};

export default ModalProvider;
