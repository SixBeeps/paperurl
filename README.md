# paperurl
Simple, accountless URL shortening

## Setup
Run the following commands to setup the project:
```bash
npm install # Install dependencies
npx prisma migrate dev --name init # Create database
```

Then run the following command to start the server:
```bash
npm run dev
```

## Live Version
There is a "live" version of the project available at [paperurl.vercel.app](https://paperurl.vercel.app). It does not have a database, so the functionality itself is not available. This might eventually change if I decide it's worth it.