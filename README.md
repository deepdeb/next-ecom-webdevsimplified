## Getting Started Locally

Clone the repository

Create a .env file at the root with following:

Run the following:

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
open the link and authorize login in the browser
stripe listen --forward-to localhost:3000/webhooks/stripe
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

