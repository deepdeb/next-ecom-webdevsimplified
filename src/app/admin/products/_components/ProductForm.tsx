"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { useActionState, useState } from "react"
import { addProduct, updateProduct } from "../../_actions/products"
import { useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import Image from "next/image"

export function ProductForm({ product } : {product?: Product | null}) {
    const [error, action] = useActionState(product == null ? addProduct : updateProduct.bind(null, product.id), {})
    const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents)
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" onChange={e => setName(e.target.value)} required defaultValue={product?.name || ""}/>
                {error.name && <div className="text-destructive">{error.name}</div>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="priceInCents">Price</Label>
                <Input type="number" id="priceInCents" name="priceInCents"
                    value={priceInCents ?? ""}
                    onChange={e => {
                        const value = e.target.value
                        setPriceInCents(value === "" ? undefined : Number(value))
                    }} />

                <div className="text-muted-foreground">
                    {formatCurrency((priceInCents || 0) / 100)}
                </div>
                {error.priceInCents && <div className="text-destructive">{error.priceInCents}</div>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" onChange={e => setDescription(e.target.value)} required defaultValue={product?.description}/>
                {error.description && <div className="text-destructive">{error.description}</div>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input type="file" id="file" name="file" required={product == null} />
                {product != null && (
                    <div className="text-muted-foreground">Existing file: {product.filePath}</div>
                )}
                {error.file && <div className="text-destructive">{error.file}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" id="image" name="image" required={product == null} />
                {product != null && (
                    <Image src={product.imagePath} height={200} width={200} alt="Product Image" className="border border-gray-250 rounded"/>
                )}
                {error.image && <div className="text-destructive">{error.image}</div>}
            </div>

            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return <Button type="submit" disabled={pending}>{pending ? 'Saving...' : 'Save'}</Button>
}