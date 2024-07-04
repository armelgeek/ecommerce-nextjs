"use client";
import {SizeColumn} from './columns';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Copy, Edit, MoreHorizontal, Trash} from "lucide-react";
import toast from "react-hot-toast";
import {useParams, useRouter} from "next/navigation";
import axios from "axios";
import React, {useState} from "react";
import {AlertModal} from "@/components/modals/alert-modal";
interface CellActionProps {
    data: SizeColumn
}
export const CellAction = ({
    data
}: CellActionProps) => {
    const router = useRouter();
    const params = useParams();
    const [loading,setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const onCopy = (id:string) => {
        navigator.clipboard.writeText(id);
        toast.success("Size Id copied to the clipboard");
    }
    const onDelete = async () => {
        try{
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/sizes/${data.id}`)
            router.refresh();
            toast.success('Sizes deleted successfully');
        }catch (err) {
            toast.error('Make sure  you removed all products and categories first.');
            setLoading(false);
        }finally {
            setLoading(false);
            setIsOpen(false);
        }
    }
    return (
        <>
            <AlertModal
                isOpen={isOpen}
                onClose={()=> setIsOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    Actions
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onCopy(data.id)}>
                    <Copy className="h-4 w-4 mr-2"/>
                    Copy Id
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/sizes/${data.id}`)}>
                    <Edit className="h-4 w-4 mr-2"/>
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsOpen(true)}>
                    <Trash className="h-4 w-4 mr-2"/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}
