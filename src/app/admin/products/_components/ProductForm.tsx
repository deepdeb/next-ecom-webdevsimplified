"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { useActionState, useState } from "react"
import { addProduct } from "../../_actions/products"
import { useFormStatus } from "react-dom"
import { Product } from "@prisma/client"

export function ProductForm({ product } : {product?: Product | null}) {
    const [error, action] = useActionState(addProduct, {})
    const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents)
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
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
                <Textarea id="description" name="description" value={description} onChange={e => setDescription(e.target.value)} />
                {error.description && <div className="text-destructive">{error.description}</div>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input type="file" id="file" name="file" />
                {error.file && <div className="text-destructive">{error.file}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" id="image" name="image" />
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