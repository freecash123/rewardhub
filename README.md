# RewardHub

Premium Crypto Rewards Platform — Earn real cryptocurrency (BTC, ETH, LTC, DOGE, USDT) for completing offers, surveys, and inviting friends.

## 🙟 Features Checklist

| # | Feature | Status |
|---|-----------|-------|
| 1 | **Hosting Config** | ℡ Vercel (frontend) + Railway (backend) |
| 2 | **Database** | ✅ MongoDB with Mongoose models |
| 3 | **User Accounts** | ℡ Register, login, email verify, JWT, 2FA, password reset |
| 4 | **Payment System** | ✅ Deposit/withdraw, QR codes, TXID verification, 5 coins |
| 5 | **Admin Dashboard** | ✅ Users, deposits, withdrawals, tickets, announcements, revenue |
| 6 | **Security** | ℡ Helmet, CORS, rate limiting, bcrypt, mongo sanitize, hpp |
| 7 | **Email System** | ✅ SendGrid/Resend/SES/SMTP (configurable) |
| 8 | **Legal Pages** | ✅ Privacy, Terms, Cookies |
| 9 | **Analytics** | ℡ Revenue aggregation, user stats, active users |
| 10 | **SEO** | ℡ Sitemap, robots.txt, meta tags, Open Graph |
| 11 | **Support** | ✅ Ticket system with messaging |
| 12 | **Auto Blockchain Verify** | ℡ BTC/ETH/LTC/DOGE/USDT_TRC20 verification |
| 13 | **Branding** | ℡ Custom dark theme, gradient design, logo placeholders |

## 🚞 Project Structure

```
rewardhub/
├── backend/
.│   ├── src/
│   │   ├── config/          // DB, crypto configs
│   │   ├── controllers/     // Auth, payments, user, admin, blog, support
│   │   ├── middleware/       // Auth, rate limiter, upload, validation, audit
│   │   ├── models/          // User, Transaction, PaymentRequest, Referral,
│   │   │                  // SupportTicket, BlogPost, Notification, etc.
│   │   ├── routes/          // REST API routes
│   │   ├── services/        // Blockchain verification (BTC/ETH/LTC/DOGE/USDT)
│   │   ├── utils/           // Email, tokens, errors
│   │   └── server.js        // Express app entry point
│   └── package.json
├── frontend/                // Next.js 14 with Tailwind
│   ├── src/
│   │   ├── app/             // Pages (auth, dashboard, payments, admin, legal, blog)
│   │   ├── components/      // Layout (Navbar, Footer)
│   │   ├── hooks/           // useAuth context
│   │   └── lib/             // API client
│   └── next.config.js
└── README.md
```

## 𝚀 Supported Cryptocurrencies

- **Bitcoin (BTC)** — BlockCypher API, 3 confirmations
- **Ethereum (ETH)** ┐ Etherscan API, 12 confirmations
- **Litecoin (LTC)** ┐ BlockCypher API, 6 confirmations
- **Dogecoin (DOGE)** ┐ BlockCypher API, 20 confirmations
- **USDT (TRC20)** ┐ TronGrid API, 10 confirmations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
-  MongoDB (Atlas or local)
-  Crypto wallet addresses (for receiving deposits)

### Backend Setup

```bash
backend
npm install
cp .env.example .env   # Edit with your config
npm run dev             # Starts on port 5000
```

### Frontend Setup

```bash
frontend
npm install
npm run dev             # Starts on port 3000
```

## Deploy

- **Frontend**: `vercel` (Vercel)
- **Backend**: Push to GitHub and deploy on `railway.app` or `render.com`
- **Database**: MongoDB Atlas

Set environment variables from .env.example in your deployment platform.