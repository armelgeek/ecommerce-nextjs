"use client";
import qs from 'query-string';
import {Color, Size} from "@prisma/client";
import {useRouter, useSearchParams} from "next/navigation";
import {Button} from "@headlessui/react";
import {cn} from "@/lib/utils";

interface FilterProps {
    data: (Size | Color) [],
    name: string,
    valueKey: string
}
function Filter({
    data,
    name,
    valueKey
}: FilterProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        console.log('id: ' + id);
        const current = qs.parse(searchParams.toString());
        const query = {
            ...current,
            [valueKey]: id
        }
        if(current[valueKey] == id) {
            query[valueKey] = null;
        }
        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        },{ skipNull: true});
        router.push(url);
    }
    return (
        <div className="mb-8">
            <div className="text-lg font-semibold">
                {name}
            </div>
            <hr className="my-4"/>
            <div className="flex flex-wrap gap-2">
                {data.map((filter) => (
                    <div key={filter.id} className={"flex items-center"}>
                        <Button
                            className={cn(
                                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                                selectedValue == filter.id && "bg-black"
                            )}
                            onClick={()=> onClick(filter.id)}

                        >
                            {filter.name}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Filter;
