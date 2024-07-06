"use client";
import React, {MouseEventHandler} from 'react';
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
interface IconButtonProps{
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    icon: React.ReactElement,
    className?: string
}
const IconButton: React.FC<IconButtonProps> = ({
    onClick,
    icon,
    className
}) => {
    return (
        <Button
         onClick={onClick}
         className={cn('rounded-full  flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition',className)}
        >
            {icon}
        </Button>
    );
};

export default IconButton;
