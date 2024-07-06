"use client";
import React from 'react';
import {Color, Product, Size} from "@prisma/client";
import Currency from "@/components/ui/currency";
import {Button} from "@/components/ui/button";
import {ShoppingCart} from "lucide-react";
interface InfoProps{
    data: Product & {
        size: Size
    } & {
        color: Color
    }
}
const Info: React.FC<InfoProps> = ({
    data
}) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">
                {data.name}
            </h1>
            <p className="text-3xl text-gray-900">
                <Currency value={data?.price}/>
            </p>
            <div className="my-4"/>
            <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-4">
                    <div className="font-semibold text-black">Size:</div>
                    <div>
                        {data?.size?.name}
                    </div>
                </div>
                <div className="flex items-center gap-x-4">
                    <div className="font-semibold text-black">Color:</div>
                    <div className="h-6 w-6 rounded-full border"
                         style={{backgroundColor: data.color.value}}
                    />
                </div>
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <Button className="rounded-full flex items-center gap-x-2">
                  Add to cart
                  <ShoppingCart/>
                </Button>
            </div>
        </div>
    )
};

export default Info;
