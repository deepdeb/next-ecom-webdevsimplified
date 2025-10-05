import { Body, Container, Head, Heading, Hr, Html, Preview, Tailwind } from '@react-email/components'
import { OrderInformation } from './components/OrderInformation'
import React from 'react'

type OrderHistoryEmailProps = {
    orders: {
        id: string
        pricePaidInCents: number
        createdAt: Date
        downloadVerificationId: string
        product: {
            name: string
            imagePath: string
            description: string
        }
    }[]
}

OrderHistoryEmail.PreviewProps = {
    orders: [
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInCents: 10000,
            product: { name: "Product name", description: "Some description", imagePath: "/products/7bf442a0-1c17-421d-b173-a1a2dcfca3df-manchester_united_jersey.jpg" },
            downloadVerificationId: crypto.randomUUID()

        },
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInCents: 2000,
            product: { name: "Product name 2", description: "Some other description", imagePath: "/products/a2ee8283-6d30-4e01-96a5-4932935ed03c-iron maiden band tshirt.jpg" },
            downloadVerificationId: crypto.randomUUID()

        }
    ]
} satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
    return (
        <Html>
            <Preview>Order History & Downloads</Preview>
            <Tailwind>
                <Head />
                <Body className='font-sans bg-white'>
                    <Container className='max-w-xl'>
                        <Heading>Order History</Heading>
                        {orders.map((order, index) => (
                            <React.Fragment key={order.id}>
                                <OrderInformation order={order} product={order.product} downloadVerificationId={order.downloadVerificationId} />
                                {index < orders.length - 1 && <Hr />}
                            </React.Fragment>
                        ))}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}