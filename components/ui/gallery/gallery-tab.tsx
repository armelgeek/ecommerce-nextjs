import React, {Fragment} from 'react';
import Image from "next/image";
import { Image as ImageType } from "@prisma/client";
import {cn} from "@/lib/utils";
import {Tab} from "@headlessui/react";
interface GalleryTabsProps{
    image: ImageType
}
const GalleryTab = ({
    image
}: GalleryTabsProps) => {
    return (
        <div className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white">
            <Tab as={Fragment}>
            {({ selected } ) => {
                return (
                    <div>
                        <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
                            <Image
                                fill
                                src={image.url}
                                alt="Image"
                                className="object-cover object-center"/>
                        </span>
                        <span className={cn("absolute inset-0 rounded-md ring-2 ring-offset-2", selected ? 'ring-black': 'ring-transparent')}></span>
                    </div>
                );
            }}
            </Tab>
        </div>
    );
};

export default GalleryTab;
