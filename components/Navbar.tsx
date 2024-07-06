"use client";
import React from 'react';
import Link from "next/link";
import StoreBar from "@/components/StoreBar";
import {db} from "@/lib/db";
const Navbar = async () => {
    // @ts-ignore
    const categories = await db.category.findMany({
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="border-b">
            <div className="container">
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                    <Link href={"/"} className="ml-4 flex lg:ml-0 gap-x-2">
                        <p className="font-bold text-xl">Store</p>
                    </Link>
                    <StoreBar data={categories}/>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
