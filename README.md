# Contact Manager - Beautiful Contact Management Application

A modern, beautiful, and feature-rich contact management web application built with Next.js, TypeScript, MongoDB Atlas, and Tailwind CSS. This application provides a seamless experience for managing your contacts with advanced search, filtering, and sorting capabilities.

## 🌟 Features

### Core Functionality

-   **Contact Management**: Create, read, update, and delete contacts
-   **Required Fields**: Name and email validation
-   **Optional Fields**: Phone number and group categorization
-   **Group Organization**: Organize contacts into Friends, Work, Family, or Other groups

### Advanced Features

-   **Real-time Search**: Search contacts by name with instant results
-   **Smart Filtering**: Filter contacts by group categories
-   **Flexible Sorting**: Sort contacts alphabetically (A-Z or Z-A)
-   **Form Validation**: Comprehensive client-side and server-side validation
-   **Responsive Design**: Beautiful UI that works on all devices

### User Experience

-   **Beautiful UI**: Modern gradient design with smooth animations
-   **Interactive Elements**: Hover effects, loading states, and transitions
-   **Toast Notifications**: Real-time feedback for all user actions
-   **Modal Dialogs**: Clean, accessible modals for forms and confirmations
-   **Delete Confirmation**: Safety prompts before deleting contacts

## 🚀 Technology Stack

-   **Frontend**: Next.js 15, React 19, TypeScript
-   **Styling**: Tailwind CSS 4, Framer Motion for animations
-   **Backend**: Next.js API Routes
-   **Database**: MongoDB Atlas
-   **Validation**: Zod for schema validation
-   **Forms**: React Hook Form with Zod resolver
-   **UI Components**: Custom components with Radix UI primitives
-   **Icons**: Lucide React
-   **Notifications**: React Hot Toast

## 📦 Installation & Setup

### Prerequisites

-   Node.js 18+
-   npm or yarn
-   MongoDB Atlas account

### Environment Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🗄️ Database Configuration

The application uses MongoDB Atlas with the following collection structure:

**Collection**: `contacts`
**Database**: `contact_manager`

**Document Schema**:

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, validated),
  phone: String (optional),
  group: String (optional: "Friends" | "Work" | "Family" | "Other"),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI/UX Design Features

### Visual Design

-   **Gradient Backgrounds**: Beautiful blue to purple gradients
-   **Glass Morphism**: Subtle glass effects on cards and modals
-   **Smooth Animations**: Framer Motion powered transitions
-   **Responsive Grid**: Adaptive layout for all screen sizes
-   **Color-Coded Groups**: Visual distinction for contact groups

### Interactive Elements

-   **Hover Effects**: Cards lift and transform on hover
-   **Loading States**: Elegant loading spinners and button states
-   **Form Validation**: Real-time validation with helpful error messages
-   **Search Highlighting**: Instant search with smooth filtering
-   **Toast Notifications**: Beautiful success/error notifications

## 📱 API Endpoints

### Contacts API

-   `GET /api/contacts` - Fetch all contacts
-   `POST /api/contacts` - Create a new contact
-   `GET /api/contacts/[id]` - Fetch a specific contact
-   `PUT /api/contacts/[id]` - Update a contact
-   `DELETE /api/contacts/[id]` - Delete a contact

### Request/Response Format

All API responses follow this structure:

```javascript
{
  success: boolean,
  data?: any,
  error?: string
}
```

## 🔧 Development

### Project Structure

```
├── app/
│   ├── api/contacts/          # API routes
│   ├── globals.css           # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── ContactCard.tsx      # Contact display component
│   ├── ContactForm.tsx      # Contact form component
│   ├── SearchAndFilter.tsx  # Search and filter component
│   └── DeleteConfirmation.tsx # Delete confirmation modal
├── lib/
│   ├── mongodb.ts           # Database connection
│   ├── contacts.ts          # Database operations
│   ├── types.ts             # TypeScript types and schemas
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

### Key Components

-   **ContactCard**: Displays contact information with edit/delete actions
-   **ContactForm**: Handles contact creation and editing with validation
-   **SearchAndFilter**: Provides search, filter, and sort functionality
-   **Modal**: Reusable modal component with animations
-   **Button**: Custom button component with variants and loading states

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production

```env
MONGODB_URI=your_production_mongodb_uri
```

## 📋 Testing

The application includes comprehensive error handling and validation:

-   Client-side form validation with Zod
-   Server-side API validation
-   Database connection error handling
-   User-friendly error messages
-   Loading states for all async operations

## 🎯 Future Enhancements

Potential improvements for future versions:

-   Contact import/export functionality
-   Profile pictures for contacts
-   Advanced search with multiple criteria
-   Contact sharing capabilities
-   Bulk operations (delete multiple contacts)
-   Contact history and activity logs
-   Integration with external services (Google Contacts, etc.)

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using Next.js, TypeScript, and MongoDB Atlas**
