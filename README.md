# 🚀 Skilio - AI-Powered Resume Builder

<div align="center">

![Skilio Logo](client/public/logo.svg)

**Land your dream job with AI-powered resumes**

[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)](https://tailwindcss.com/)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Screenshots](#screenshots)
- [Features](#features)
- [Upcoming Features](#upcoming-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

**Skilio** is a modern, full-stack resume builder platform that helps professionals create, edit, and optimize their resumes with AI-powered features. The platform offers a seamless user experience for building professional resumes that stand out in today's competitive job market.

Whether you're a job seeker looking to create your first resume or a professional updating your existing one, Skilio provides the tools and templates you need to create a standout resume.

---

## 📸 Screenshots

### Landing Page
<div align="center">
  <img src="screenshots/landing-page.jpg" alt="Skilio Landing Page" width="800"/>
  <p><em>Modern, responsive landing page with AI-powered resume builder features</em></p>
</div>

---

## ✨ Features

### 🎨 **Modern UI/UX**
- Beautiful, award-winning design inspired by top websites
- Glassmorphism effects and smooth animations
- Responsive design for all devices
- Modern dashboard with intuitive navigation

### 📝 **Resume Building**
- **Multiple Professional Templates**: Classic, Modern, Minimal, Minimal Image, and Professional templates
- **Real-time Preview**: See your changes instantly
- **Interactive Forms**: Easy-to-use forms for all resume sections
- **Drag-and-Drop Interface**: Intuitive customization

### 🤖 **AI-Powered Features**
- AI-powered resume enhancement and optimization
- Smart content suggestions

### 💾 **Export & Storage**
- **PDF Export**: Download your resume as a professional PDF
- **LaTeX Export**: Export to Overleaf for advanced customization
- **Cloud Storage**: Secure, cloud-based resume storage
- **Multiple Resumes**: Create and manage multiple resumes

### 📚 **Resume Sections**
- Personal Information
- Professional Summary
- Work Experience
- Education
- Projects
- Skills
- Certifications & Achievements

### 🔐 **Security**
- Secure authentication with JWT
- Password hashing with bcrypt
- Protected routes and API endpoints

---

## 🚀 Upcoming Features

We're continuously working on improving Skilio! Here's what's coming next:

### 🎯 **Job Recommendations**
- **AI-Powered Matching**: Get personalized job recommendations based on your skills, experience, and career goals
- **Real-time Updates**: Receive notifications about new opportunities that match your profile
- **Industry Insights**: Access valuable insights about job market trends and requirements
- **Smart Matching**: Advanced algorithms match you with opportunities that align perfectly with your profile

### 📝 **ATS-Friendly Keyword Suggestions**
- **Keyword Analysis**: Get intelligent suggestions for industry-relevant keywords
- **ATS Optimization**: Optimize your resume to pass Applicant Tracking Systems (ATS)
- **Industry-Specific**: Tailored keyword suggestions based on your target job and industry
- **Real-time Feedback**: See how your resume scores with ATS systems

### 💡 **Additional Planned Features**
- **Resume Analytics**: Track views and performance metrics for your resumes
- **Cover Letter Builder**: Create professional cover letters to accompany your resumes
- **Portfolio Integration**: Link your portfolio and GitHub projects directly to your resume
- **Collaboration Tools**: Share resumes with mentors or colleagues for feedback
- **Multi-language Support**: Create resumes in multiple languages
- **Mobile App**: Native mobile applications for iOS and Android
- **Advanced Customization**: More template options and customization features
- **Resume Sharing**: Generate shareable links for your resumes
- **Version History**: Track changes and revert to previous versions of your resume

Stay tuned for these exciting updates! 🎉

---

## 🛠️ Tech Stack

### **Frontend**
- **React.js** (v19.1.1) - UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Routing
- **Tailwind CSS** (v4.1.13) - Styling
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **Axios** - HTTP client

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** (v5.1.0) - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **OpenAI API** - AI features
- **ImageKit** - Image storage

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **OpenAI API Key** (for AI features)

---

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Skilio.
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

---

## 🚀 Running the Project

### **Start Backend Server**

```bash
cd server
npm start
```

The backend server will run on `http://localhost:3000`

### **Start Frontend Development Server**

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

### **Access the Application**

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 📁 Project Structure

```
Skilio.
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── home/      # Landing page components
│   │   │   ├── templates/ # Resume templates
│   │   │   └── ui/        # UI components
│   │   ├── pages/         # Page components
│   │   ├── app/           # Redux store and slices
│   │   ├── configs/       # Configuration files
│   │   └── utils/         # Utility functions
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Backend Node.js application
│   ├── configs/           # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middlewares/       # Express middlewares
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── server.js          # Entry point
│   └── package.json
│
└── README.md
```

---

## 💻 Usage

### **Creating a Resume**

1. **Sign Up / Login**: Create an account or log in to your existing account
2. **Navigate to Dashboard**: After logging in, you'll be redirected to the dashboard
3. **Create New Resume**: Click "Create New Resume" button
4. **Fill in Information**: 
   - Personal Information
   - Professional Summary
   - Work Experience
   - Education
   - Projects
   - Skills
   - Certifications & Achievements
5. **Choose Template**: Select from available templates
6. **Preview**: View your resume in real-time
7. **Save**: Save your resume to the cloud
8. **Export**: Download as PDF or export to LaTeX for Overleaf

### **Managing Resumes**

- View all your resumes on the dashboard
- Edit existing resumes
- Delete resumes you no longer need
- Create multiple resumes for different job applications

### **Exporting to Overleaf**

1. Open your resume in the builder
2. Click "Export to Overleaf" button
3. A `.tex` file will be downloaded
4. Open [Overleaf](https://www.overleaf.com)
5. Create a new project and upload the `.tex` file
6. Compile to generate your PDF resume

---

## 🎨 Templates

Skilio offers 5 professional resume templates:

1. **Classic Template** - Traditional, professional layout
2. **Modern Template** - Contemporary design with clean lines
3. **Minimal Template** - Simple, elegant layout
4. **Minimal Image Template** - Minimal design with profile image
5. **Professional Template** - Overleaf-compatible LaTeX style

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Deepak Prajapati**

---

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for AI capabilities
- [Tailwind CSS](https://tailwindcss.com) for styling
- [React](https://reactjs.org) community
- All contributors and users of Skilio

---

## 📞 Support

For support, email support@skilio.com or open an issue in the repository.

---

<div align="center">

**Made with ❤️ by the Skilio Team**

⭐ Star this repo if you find it helpful!

</div>

