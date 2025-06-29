# Blog Website

A modern, full-featured blog website built with Next.js, TypeScript, and MongoDB. Features a rich text editor, admin dashboard, and responsive design.

## Features

### 🎨 Frontend Features

#### Create Post Page (Admin)
- **Title Input**: Text field for post title
- **Rich Text Editor**: Powered by React Quill with full formatting options
- **Auto-generated Slug**: Automatically generated from title, read-only display
- **Create Button**: Submit functionality with validation
- **Real-time Slug Preview**: See the slug as you type the title

#### Post Page (Public View)
- **Dynamic Content**: Loads posts based on URL slug
- **Rich HTML Rendering**: Displays formatted content with proper styling
- **SEO Optimized**: Meta tags and Open Graph support
- **Social Sharing**: Twitter and Facebook share buttons
- **Responsive Design**: Works on all device sizes
- **Breadcrumb Navigation**: Easy navigation back to home

#### Edit Post Page (Admin)
- **Title Editing**: Modify existing post titles
- **Content Editing**: Full rich text editor for content
- **Smart Slug Management**: Auto-updates slug when title changes
- **Visual Indicators**: Shows when slug will be updated
- **SEO Integrity**: Maintains URL consistency

#### Admin Dashboard
- **Post List**: Displays all posts in a clean table format
- **Quick Actions**: View, Edit, and Delete buttons for each post
- **Post Statistics**: Shows creation and update dates
- **Delete Confirmation**: Safe deletion with confirmation dialog
- **Loading States**: Visual feedback during operations
- **Empty State**: Helpful message when no posts exist

#### Home Page
- **Post Grid**: Responsive grid layout for all posts
- **Post Cards**: Beautiful cards with hover effects
- **Date Display**: Shows creation and update dates
- **Admin Access**: Quick link to admin dashboard
- **Empty State**: Welcoming message when no posts exist

### 🔧 Technical Features

#### Rich Text Editor (React Quill)
- **Formatting Options**: Bold, italic, underline, strikethrough
- **Headers**: H1, H2, H3 support
- **Lists**: Ordered and unordered lists
- **Colors**: Text and background colors
- **Alignment**: Text alignment options
- **Links**: URL insertion
- **Images**: Image embedding
- **Blockquotes**: Quote formatting
- **Code Blocks**: Syntax highlighting support

#### Auto-generated Slugs
- **SEO Friendly**: Clean, readable URLs
- **Unique Generation**: Handles duplicate titles
- **Real-time Preview**: See slug as you type
- **Smart Updates**: Only changes when title changes

#### Content Management
- **CRUD Operations**: Create, Read, Update, Delete posts
- **Validation**: Required field validation
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during operations

#### Security Features
- **HTML Sanitization**: DOMPurify for XSS protection
- **Input Validation**: Server-side validation
- **Authentication**: NextAuth.js integration (ready for implementation)

### 🎯 User Experience

#### Admin Experience
- **Intuitive Interface**: Clean, modern design
- **Quick Actions**: Easy access to common tasks
- **Visual Feedback**: Loading states and confirmations
- **Responsive Design**: Works on desktop and mobile

#### Reader Experience
- **Clean Reading**: Optimized typography and spacing
- **Fast Loading**: Server-side rendering for SEO
- **Social Sharing**: Easy sharing on social platforms
- **Navigation**: Clear breadcrumbs and navigation

### 🛠 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Rich Text Editor**: React Quill
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js (configured)
- **Deployment**: Ready for Vercel/Netlify

### 📁 Project Structure

```
Blog Website/
├── app/
│   ├── admin/                 # Admin pages
│   │   ├── create/           # Create post
│   │   ├── edit/[slug]/      # Edit post
│   │   └── page.tsx          # Admin dashboard
│   ├── api/                  # API routes
│   │   └── posts/            # Post CRUD operations
│   ├── post/[slug]/          # Public post view
│   └── page.tsx              # Home page
├── components/               # Reusable components
├── lib/                      # Utilities and config
├── models/                   # Database models
└── styles/                   # Global styles
```

### 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env.local` file with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   ADMIN_USERNAME=admin
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Home Page: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin

### 📝 Usage Guide

#### Creating a Post
1. Navigate to `/admin`
2. Click "Create New Post"
3. Enter title (slug auto-generates)
4. Write content using rich text editor
5. Click "Create Post"

#### Editing a Post
1. Go to admin dashboard
2. Click "Edit" on any post
3. Modify title and/or content
4. Save changes

#### Deleting a Post
1. Go to admin dashboard
2. Click "Delete" on any post
3. Confirm deletion

#### Viewing Posts
- **Public View**: Click "View" in admin or visit `/post/[slug]`
- **Home Page**: See all posts at the root URL

### 🎨 Customization

#### Styling
- Modify `app/globals.css` for global styles
- Update Tailwind classes in components
- Customize Quill editor in component files

#### Content
- Rich text editor supports HTML content
- Images can be embedded via URLs
- Code blocks support syntax highlighting

#### SEO
- Meta tags are automatically generated
- Open Graph tags for social sharing
- Clean, semantic HTML structure

### 🔒 Security Considerations

- HTML content is sanitized using DOMPurify
- Input validation on both client and server
- Prepared for authentication implementation
- XSS protection built-in

### 📈 Performance

- Server-side rendering for SEO
- Optimized images and assets
- Efficient database queries
- Responsive design for all devices

### 🚀 Deployment

The application is ready for deployment on:
- **Vercel**: Zero-config deployment
- **Netlify**: Easy deployment with Git
- **Railway**: Full-stack deployment
- **Any Node.js hosting**: Traditional deployment

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS** 
