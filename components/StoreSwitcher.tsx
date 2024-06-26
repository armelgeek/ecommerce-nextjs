"use client";
import {useStoreModal} from "@/hooks/use-store-modal";
import React, {useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Store} from "@prisma/client";
import {useParams,useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown, PlusCircle, StoreIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";
type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>
interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}
export default function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps) {
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();
    const formatedItems = items.map(item => ({
        label: item.name,
        value: item.id
    }))

    const currentStore = formatedItems.find((item) => item.value == params.storeId)
    const [isOpen, setIsOpen] = useState(false);
    const onStoreSelect = (store: { value: string, label: string }) => {
        setIsOpen(false);
        router.push(`/${store.value}`)
    }
    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size={"sm"}
                    role={"combobox"}
                    aria-expanded={isOpen}
                    aria-label={'Select a store'}
                    className={cn('w-[200px] justify-between',className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4"/>
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store ..."/>
                        <CommandEmpty>No store found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formatedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onStoreSelect(store)}
                                    className="text-sm"
                                >
                                    <StoreIcon className="mr-2 h-4 w-4"/>
                                    {store.label}
                                    <Check
                                        className={cn(
                                            'ml-auto h-4 w-4',
                                            currentStore?.value === store.value ?
                                                'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    >

                                    </Check>
                                </CommandItem>
                                )
                            )}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator/>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setIsOpen(false);
                                    storeModal.onOpen()
                                }}
                            >
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

