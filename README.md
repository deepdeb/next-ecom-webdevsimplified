## Getting Started Locally

Clone the repository

Create .env file at the root with following:

```bash
DATABASE_URL="file:./dev.db"
ADMIN_USERNAME="Set a new admin username"
HASHED_ADMIN_PASSWORD="Your hashed admin password (set a new admin password and put the hashed version of it here)"
RESEND_API_KEY="your resend API key (get the resend API key for Test Video from keep API keys)"
SENDER_EMAIL=onboarding@resend.dev
STRIPE_WEBHOOK_SECRET="Replace it with your stripe webhook signing secret that you get after login to stripe"
STRIPE_SECRET_KEY="Get the stripe secret key for the New Business account from keep API Keys"
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="Get the stripe public key for the New Business account from keep API Keys"
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

Open a terminal and run the following:

```bash
npm i
npx prisma generate
npm run dev
```

Then open another terminal and run the email server:

```bash
npm run email
```

Then open another terminal and login to stripe and allow webhooks to listen to stripe actions:

```bash
stripe login (after running this, open the link and authorize in the browser)
stripe listen --forward-to localhost:3000/webhooks/stripe (after running this you'll get a webhook signing secret which you need to put in your .env file)
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

