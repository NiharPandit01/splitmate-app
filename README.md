# SplitMate

SplitMate is a full-stack expense management application that helps users manage shared expenses within groups. It provides secure authentication, group management, member management, expense tracking, and balance calculation through a clean and modular architecture.

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- User Profile

### Group Management

- Create Groups
- View Groups
- View Group Details
- Rename Groups

### Member Management

- Add Members
- View Members
- Remove Members (Admin Only)

### Expense Management

- Add Expenses
- View Expense History
- Automatic Expense Splitting

### Balance Tracking

- Calculate Group Balances
- View Who Owes Whom

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript

### Backend

- Node.js
- Next.js API Routes

### Database

- MongoDB
- Mongoose

### Authentication

- JWT
- bcryptjs

## Project Structure

```text
SplitMate
│
├── app
│   ├── api
│   ├── dashboard
│   ├── groups
│   ├── login
│   └── register
│
├── components
│   ├── Navbar.tsx
│   ├── PrimaryButton.tsx
│   ├── SummaryCard.tsx
│   ├── ExpenseCard.tsx
│   ├── BalanceCard.tsx
│   ├── MemberCard.tsx
│   └── GroupNavigation.tsx
│
├── lib
│
├── models
│
├── middleware.ts
│
└── package.json
```

## Installation

Clone the repository

```bash
git clone https://github.com/NiharPandit01/splitmate-app.git
```

Navigate into the project

```bash
cd splitmate-app
```

Install dependencies

```bash
npm install
```

Create a `.env.local` file

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the development server

```bash
npm run dev
```

Visit

```text
http://localhost:3000
```

## Modules

- Authentication
- Dashboard
- Group Management
- Member Management
- Expense Management
- Balance Tracking

## Future Enhancements

- Group Settings
- Leave Group
- Delete Group
- Settle Up Feature
- Real-Time Chat
- Notifications
- Dark Mode
- Responsive UI

## Learning Outcomes

- Next.js App Router
- React Components
- TypeScript
- REST APIs
- MongoDB
- Mongoose
- JWT Authentication
- CRUD Operations
- Dynamic Routing
- User Authorization

## Author

**Nihar Pandit**

GitHub: https://github.com/NiharPandit01