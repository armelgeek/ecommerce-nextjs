"use client";
import React, {useState} from 'react';
import {Heading} from "@/components/ui/Heading";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import { Trash} from "lucide-react";
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import axios from "axios";
import {useParams, useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {AlertModal} from "@/components/modals/alert-modal";
import {useOrigin} from "@/hooks/use-origin";
interface ColorFormProps {
    initialData: any | null;
}
const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
});
type ColorFormPropsValues = z.infer<typeof formSchema>;

const ColorForm: React.FC<ColorFormProps> =({initialData})=> {
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const title = initialData ? "Edit Color" : "Create Color";
    const description = initialData ? "Edit a color" : "Create a new Color";
    const toastMessage = initialData ? "Color updated" : "Color created";
    const action = initialData ? "Save changes" : "Create";
    const form = useForm<ColorFormPropsValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: '',
        }
    })
    const onSubmit = async (data: ColorFormPropsValues) => {
        try {
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`,data);
            }else{
                await axios.post(`/api/${params.storeId}/colors`,data);
            }
            toast.success('Color updated successfully');
            router.refresh();
            router.push(`/${params.storeId}/colors`);
        }catch (err) {
            toast.error('Make sure you removed all categories using this color first');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try{
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`,)
            router.refresh();
            router.push(`/${params.storeId}/colors`);
            toast.success('Color deleted successfully');
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
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={() =>  setIsOpen(true)}
                >
                    <Trash className="h-4 w-4"/>
                </Button>
            </div>
            <Separator/>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) =>(
                                <FormItem>
                                    <FormLabel>Name:</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder={"Color name"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) =>(
                                <FormItem>
                                    <FormLabel>Value:</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                disabled={loading}
                                                placeholder={"Color Value"}
                                                {...field}
                                            />
                                            <div className="h-6 w-6 rounded-full border"
                                                 style={{
                                                     backgroundColor: field.value
                                                 }}>
                                            </div>
                                        </div>

                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className={"mt-3"} type={"submit"}>
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
}

export default ColorForm;
