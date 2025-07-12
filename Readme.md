# Resumify - Professional Resume Builder

A modern, feature-rich resume builder application that combines a beautiful landing page with an intuitive resume creation form. Built with HTML, CSS, and JavaScript.

## 🚀 Features

### Core Functionality
- **Interactive Resume Builder**: Create professional resumes with a user-friendly form interface
- **Real-time Preview**: See your resume updates instantly as you type
- **Multiple Templates**: Choose from different resume templates (Modern, Classic, Creative)
- **PDF Export**: Download your resume as a high-quality PDF
- **Shareable Links**: Generate unique URLs to share your resume
- **Print Support**: Print your resume directly from the browser

### Form Features
- **Personal Information**: Name, email, phone, location, address, social links
- **Education Section**: Add multiple education entries with degree, university, graduation year, and GPA
- **Skills Management**: Add and remove skills dynamically with a clean interface
- **Work Experience**: Add multiple job experiences with detailed descriptions
- **Projects Section**: Showcase your projects with descriptions and links
- **Profile Picture**: Upload and display your profile picture

### UI/UX Improvements
- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: CSS variables for easy theme customization
- **Toast Notifications**: User-friendly feedback for all actions
- **Auto-save**: Form data is automatically saved to localStorage
- **Form Validation**: Comprehensive validation with helpful error messages

### Technical Features
- **ATS Optimized**: Templates designed to pass through Applicant Tracking Systems
- **Mobile First**: Responsive design that works on all screen sizes
- **Performance Optimized**: Fast loading and smooth interactions
- **Cross-browser Compatible**: Works on all modern browsers
- **Accessibility**: WCAG compliant with proper ARIA labels

## 📁 Project Structure

```
resume-builder/
├── index.html          # Main application file
├── style.css           # Complete styling with modern CSS
├── script.js           # JavaScript functionality
├── assets/             # Images and resources
│   ├── web-logo.webp
│   ├── img1.jpg
│   ├── img2.jpg
│   ├── img3.jpg
│   └── ... (other images)
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and modern HTML features
- **CSS3**: Flexbox, Grid, CSS Variables, Animations
- **JavaScript (ES6+)**: Modern JavaScript with async/await
- **Font Awesome**: Icons for better UX
- **html2pdf.js**: PDF generation library
- **Google Fonts**: Inter font family for modern typography

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start building your resume!

### Usage
1. **Fill out the form**: Enter your personal information, education, skills, and experience
2. **Preview your resume**: See real-time updates in the preview section
3. **Download or share**: Export as PDF, print, or share via link
4. **Save your work**: Data is automatically saved to your browser

## 🎨 Customization

### Adding New Templates
1. Create a new template function in `script.js`
2. Add template selection in the HTML
3. Style the template in `style.css`

### Modifying Colors
The application uses CSS variables for easy theming:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #f59e0b;
    --accent-color: #10b981;
    /* ... other variables */
}
```

### Adding New Form Fields
1. Add the HTML form field
2. Update the JavaScript data collection
3. Modify the resume template rendering

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

## 🔧 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Known Issues

- PDF generation may take a few seconds for complex resumes
- Some older browsers may not support all CSS features
- File upload size is limited to 5MB for profile pictures

## 🔮 Future Enhancements

- [ ] Multiple resume templates
- [ ] Cover letter builder
- [ ] Resume analytics and scoring
- [ ] Integration with job boards
- [ ] Cloud storage for resumes
- [ ] Collaborative editing
- [ ] AI-powered content suggestions
- [ ] Dark mode toggle
- [ ] Offline support with Service Workers

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for errors
2. Ensure all files are in the correct directory structure
3. Try clearing browser cache and localStorage
4. Open an issue on the project repository

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- html2pdf.js for PDF generation
- All contributors and users of this project

---

**Made with ❤️ for job seekers everywhere** 