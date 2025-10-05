## Getting Started Locally

Clone the repository

Create a .env file at the root with following:

```bash
DATABASE_URL="file:./dev.db"
ADMIN_USERNAME=pradeep

HASHED_ADMIN_PASSWORD="Your hashed admin password"

RESEND_API_KEY="your resend API key"
SENDER_EMAIL=onboarding@resend.dev

STRIPE_WEBHOOK_SECRET="Replace it with your stripe webhook secret that you get after login to stripe"
STRIPE_SECRET_KEY="Your stripe secret key"
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="Your stripe public key"
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

Open a terminal and run the following:

```bash
npm i
npx prisma generate
npm run dev
```

Then run the development server:

```bash
npm run dev
```

Then open another terminal and run the email server:

```bash
npm run email
```

Then open another terminal and login to stripe and allow webhooks to listen to stripe actions:

```bash
stripe login
open the link and authorize in the browser
stripe listen --forward-to localhost:3000/webhooks/stripe (after running this you'll get a webhook secret key which you need to put in your .env file)
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

