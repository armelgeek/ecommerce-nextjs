"use client";
import React, {useState} from 'react';
import {Billboard, Category, Store} from "@prisma/client";
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
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
interface CategoryFormProps {
    initialData: Category | null;
    billboards: Billboard[];
}
const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1),
});
type CategoryFormPropsValues = z.infer<typeof formSchema>;

const CategoryForm: React.FC<CategoryFormProps> =({initialData,billboards})=> {
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const title = initialData ? "Edit category" : "Create Category";
    const description = initialData ? "Edit a category" : "Create a new Category";
    const toastMessage = initialData ? "Category updated" : "Category created";
    const action = initialData ? "Save changes" : "Create";
    const form = useForm<CategoryFormPropsValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            billboardId:  ''
        }
    })
    const onSubmit = async (data: CategoryFormPropsValues) => {
        try {
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`,data);
            }else{
                await axios.post(`/api/${params.storeId}/categories`,data);
            }
            toast.success('Category updated successfully');
            router.refresh();
            router.push(`/${params.storeId}/categories`);
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
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`,)
            router.refresh();
            router.push(`/${params.storeId}/categories`);
            toast.success('Category deleted successfully');
        }catch (err) {
            toast.error('Make sure  you removed all products using this category first.');
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
                                            placeholder={"Category name"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) =>(
                                <FormItem>
                                    <FormLabel>Billboard:</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a billboard"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                {billboards.map((billboard) => (
                                                    <SelectItem
                                                        key={billboard.id}
                                                        value={billboard.id}
                                                    >
                                                        {billboard.label}
                                                    </SelectItem>
                                                ))}
                                                </SelectGroup>
                                            </SelectContent>

                                    </Select>
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

export default CategoryForm;
