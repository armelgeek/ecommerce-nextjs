"use client";
import React, {useState} from 'react';
import {Billboard, Store} from "@prisma/client";
import {Heading} from "@/components/ui/Heading";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {SeparatorHorizontal, Trash} from "lucide-react";
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import axios from "axios";
import {useParams, useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {AlertModal} from "@/components/modals/alert-modal";
import {ApiAlert} from "@/components/ui/api-alert";
import {useOrigin} from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";
interface BillboardFormProps {
    initialData: Billboard | null;
}
const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
});
type BillboardFormPropsValues = z.infer<typeof formSchema>;

const BillboardForm: React.FC<BillboardFormProps> =({initialData})=> {
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const title = initialData ? "Edit billboard" : "Create Billboard";
    const description = initialData ? "Edit a billboard" : "Create a new Billboard";
    const toastMessage = initialData ? "Billboard updated" : "Billboard created";
    const action = initialData ? "Save changes" : "Create";
    const form = useForm<BillboardFormPropsValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl:  ''
        }
    })
    const onSubmit = async (data: BillboardFormPropsValues) => {
        try {
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`,data);
            }else{
                await axios.post(`/api/${params.storeId}/billboards`,data);
            }
            toast.success('Billboard updated successfully');
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
        }catch (err) {
            toast.error('Make sure you removed all categories using this billboard first');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try{
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`,)
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
            toast.success('Billboard deleted successfully');
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
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) =>(
                            <FormItem>
                                <FormLabel>Background Image:</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value]: []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) =>(
                                <FormItem>
                                    <FormLabel>Name:</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder={"Billboard name"}
                                            {...field}
                                        />
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

export default BillboardForm;
