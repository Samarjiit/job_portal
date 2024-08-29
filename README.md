
# Full Stack Job Portal

This is a Full Stack Job Portal built using React JS, Tailwind CSS, Supabase, Clerk Authentication, and Shadcn UI. The project showcases a modern, responsive, and feature-rich job portal, demonstrating a comprehensive skill set in full-stack development.

## Features

- **User Authentication**: Secure authentication system using Clerk.
- **Supabase Integration**: Data management and backend services handled by Supabase.
- **Shadcn UI Components**: Utilized Shadcn UI for a consistent and sleek user interface.
- **Responsive Design**: Styled with Tailwind CSS to ensure mobile responsiveness and ease of use.
- **Job Listings**: Users can view, search, and filter job listings.
- **Save/Unsave Jobs**: Users can save jobs for later reference.
- **Job Applications**: Users can apply for jobs and track their application status.
- **User Onboarding**: New users are guided through an onboarding process.
- **Company Management**: Employers can add new companies and post jobs.
- **Application Management**: Users can view their applications, and employers can track applicants.
- **Protected Routes**: Ensured route protection based on user authentication.
- **Deployment**: Deployed on a suitable hosting platform for public access.

## Technologies Used

- **Frontend**: React JS, Tailwind CSS, Shadcn UI
- **Backend**: Supabase
- **Authentication**: Clerk
- **State Management**: React Hook Form, Zod
- **Custom Hooks**: Created for data fetching and other reusable functionalities


## Database Schema

Below is the database schema used in the project:

![Database Schema](https://github.com/Samarjiit/job_portal/blob/main/public/database.png)


## Setup and Installation

To get the project running locally, follow these steps:

1. **Clone the Repository**

   \```bash
   git clone https://github.com/Samarjiit/job_portal.git
   cd job_portal
   \```

2. **Install Dependencies**

   Make sure you have [Node.js](https://nodejs.org/) installed, then run:

   \```bash
   npm install
   \```

3. **Set Up Supabase**

   - Create a project on [Supabase](https://supabase.com/).
   - Retrieve your Supabase API URL and Key from the Supabase dashboard.
   - Create the required tables in Supabase as per the data schema.
   - Add these details to your environment variables.

4. **Set Up Clerk Authentication**

   - Create an account on [Clerk](https://clerk.dev/).
   - Set up the authentication configuration as per your needs.
   - Add Clerk credentials to your environment variables.

5. **Environment Variables**

   Create a `.env` file in the root directory and add the following:

   \```bash
   REACT_APP_SUPABASE_URL=<Your Supabase URL>
   REACT_APP_SUPABASE_KEY=<Your Supabase Key>
   REACT_APP_CLERK_FRONTEND_API=<Your Clerk Frontend API>
   REACT_APP_CLERK_API_KEY=<Your Clerk API Key>
   \```

6. **Run the Application**

   Start the development server:

   \```bash
   npm start
   \```

   The application will run on `http://localhost:3000`.

## Deployment

To deploy the application:

1. Build the application:

   \```bash
   npm run build
   \```

2. Deploy the build to your preferred hosting platform.

