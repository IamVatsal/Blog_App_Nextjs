# Blog App

A modern, responsive blogging platform built with Next.js, MongoDB, and NextAuth.

# /

![Blog App Home Screenshot](public/blog-app-screenshot.jpeg)

# /create

![Blog App Create Screenshot](public/blog-app-create-screenshot.jpeg)

# /post

![Blog App Posts Screenshot](public/blog-app-posts-screenshot.jpeg)

# /mypost

![Blog App My Posts Screenshot](public/blog-app-myposts-screenshot.jpeg)

## Features

-   **Dark Mode UI**: Sleek, modern interface with a dark theme
-   **User Authentication**: Secure login via Google OAuth
-   **Anonymous Posting**: Write posts without revealing your identity
-   **Interactive Comments**: Engage with other users through comments
-   **Full CRUD Operations**: Create, read, update, and delete your posts
-   **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
-   **Markdown Support**: Write rich-formatted posts with Markdown
-   **Protected Routes**: Access control based on authentication status
-   **404 Error Pages**: Custom error handling for non-existent routes

## Tech Stack

-   **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
-   **Backend**: Next.js API Routes, MongoDB with Mongoose
-   **Authentication**: NextAuth.js with Google OAuth
-   **Styling**: Tailwind CSS
-   **State Management**: React Hooks
-   **Forms**: React Hook Form
-   **Markdown**: MDEditor

## Getting Started

### Prerequisites

-   Node.js 18.x or later
-   MongoDB database (local or Atlas)
-   Google OAuth credentials (for authentication)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/IamVatsal/Blog_App_Nextjs.git
cd Blog_App_Nextjs
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```
# MongoDB
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.mongodb.net/blog-app

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

> **Important Note for MongoDB Atlas Users**: Remember to whitelist your IP address in the MongoDB Atlas dashboard under Network Access. For development, you might want to allow access from anywhere (`0.0.0.0/0`), but make sure to restrict this in production.

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
blog-app/
├── app/                   # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── posts/         # Post endpoints
│   │   ├── comments/      # Comment endpoints
│   │   └── users/         # User endpoints
│   ├── create/            # Post creation page
│   ├── myposts/           # User's posts page
│   ├── posts/             # Posts listing page
│   │   └── [id]/          # Single post page
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── auth/              # Auth components
│   └── ui/                # UI components
├── lib/                   # Utilities
│   └── mongoose.ts        # MongoDB connection
├── models/                # Mongoose models
│   ├── comment.ts
│   ├── post.ts
│   └── user.ts
└── public/                # Static files
```

## Setting Up Authentication

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Google OAuth API
3. Configure the OAuth consent screen
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.env.local` file

## Database Schema

### User

-   `_id`: MongoDB ObjectId
-   `name`: User's display name
-   `email`: User's email address (unique)
-   `avatar`: URL to user's profile picture
-   `createdAt`: Timestamp of account creation
-   `updatedAt`: Timestamp of last update

### Post

-   `_id`: MongoDB ObjectId
-   `title`: Post title
-   `content`: Markdown content
-   `author`: Author's name
-   `email`: Author's email
-   `status`: Post status (draft/published/archived)
-   `isPublished`: Boolean indicating if post is published
-   `createdAt`: Timestamp of creation
-   `updatedAt`: Timestamp of last update

### Comment

-   `_id`: MongoDB ObjectId
-   `text`: Comment text
-   `name`: Commenter's name
-   `postId`: Reference to post
-   `likes`: Number of likes
-   `createdAt`: Timestamp of creation
-   `updatedAt`: Timestamp of last update

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

-   [Next.js](https://nextjs.org/) for the amazing framework
-   [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
-   [NextAuth.js](https://next-auth.js.org/) for authentication
-   [MongoDB](https://www.mongodb.com/) for the database

---

## Created with ❤️ by Vatsal

Connect with me:

-   [GitHub](https://github.com/IamVatsal)
-   [LinkedIn](https://www.linkedin.com/in/vatsal-patel0609/)
-   [Instagram](https://www.instagram.com/vatsal06)
