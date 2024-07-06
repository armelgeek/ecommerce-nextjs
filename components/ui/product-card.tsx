"use client";
import React from 'react';
import {Category, Product} from "@prisma/client";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import {Expand, ShoppingCart} from "lucide-react";
import Currency from "@/components/ui/currency";
interface ProductProps {
    item: Product & {
        images: any
    } & {
        category: Category
    };
}
const ProductCard = ({item}: ProductProps) => {
    // @ts-ignore
    return (
        <div key={item.id} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    className="aspect-square rounded-md object-cover"
                    src={item?.images?.[0]?.url} alt={"Image"} fill
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={() => {
                            }}
                            icon={<Expand size={20} className="text-gray-600"/>}/>

                        <IconButton
                            onClick={() => {
                            }}
                            icon={<ShoppingCart size={20} className="text-gray-600"/>}/>

                    </div>
                </div>

            </div>
            <div>
                <p className="font-semibold text-lg">
                    {item.name}
                </p>
                <div className="text-sm text-gray-500">
                    {item.category?.name}
                </div>
            </div>
            <div className="flex items-center justify-between">
                <Currency value={item?.price}/>
            </div>
        </div>
    );
};

export default ProductCard;
