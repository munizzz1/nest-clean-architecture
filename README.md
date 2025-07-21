Design of a question forum application, with the aim of using the concepts of DDD (Domain-Driven Design) and Clean code

### Technologies
- **NestJS** Framework NodeJS
- **PostgreSQL** Relational database
- **Prisma ORM** - Type-safe database operations
- **Redis** - Cache database
- **Zod** - Schema validation
- **Docker** - Database containerization
- **Vitest** - Test runner
- **R2 Cloudflare** - Bucket storage

### ⚙️ Setup and Configuration
### Prerequisites

- Node.js (Node.js version 16 or higher)
- Docker e Docker Compose

### 1. Clone the repository
```bash
git clone <repository-url>
cd nest-clean-architecture
```
### 2. Configure the databases
```bash
docker-compose up -d
```

### 3. Configure environment variables
Create a `.env` file in the project root.
Create a `.env.test` file in the project root to run e2e tests.

### 4. Install dependencies
```bash
npm install
```
### 5. Perform database migrations
```bash
npx prisma generate
npx prisma migrate dev
```
### 7. Run the project

**Development:**
```bash
npm run start:dev
```

**Production:**
```bash
npm start:prod
```

### Available Scripts
- `npm run stat:dev` - Start the development server
- `npm run build` - Generates production build
- `npm run start:prod` - Production Build Preview
- `npm run test` - Unit tests
- `test:e2e` - E2e tests
