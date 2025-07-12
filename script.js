// Global variables
let currentTemplate = 'modern';
let skills = [];
let resumeData = {};

// DOM elements
const form = document.getElementById('resumeForm');
const preview = document.getElementById('resumePreview');
const actionButtons = document.getElementById('actionButtons');
const toast = document.getElementById('toast');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadSavedData();
});

function initializeApp() {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    // Initialize mobile menu
    setupMobileMenu();
}

function setupEventListeners() {
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
    
    // Skills input
    const skillInput = document.getElementById('skillInput');
    skillInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    });

    // File input for profile picture
    const profilePic = document.getElementById('profilePic');
    profilePic.addEventListener('change', handleProfilePicChange);

    // Real-time preview updates
    form.addEventListener('input', debounce(updatePreview, 500));
}

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Form handling
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
        generateResume();
        showToast('Resume generated successfully!', 'success');
        actionButtons.style.display = 'flex';
        scrollToPreview();
    } else {
        showToast('Please fill in all required fields', 'error');
    }
}

function validateForm() {
    // Check personal information
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const location = document.getElementById('location');
    
    // Check if basic personal info is filled
    if (!fullName || !fullName.value.trim()) {
        showToast('Please enter your full name', 'error');
        return false;
    }
    
    if (!email || !email.value.trim()) {
        showToast('Please enter your email address', 'error');
        return false;
    }
    
    if (!phone || !phone.value.trim()) {
        showToast('Please enter your phone number', 'error');
        return false;
    }
    
    if (!location || !location.value.trim()) {
        showToast('Please enter your location', 'error');
        return false;
    }
    
    // Check if at least one education entry is filled
    const educationItems = document.querySelectorAll('.education-item');
    let hasEducation = false;
    
    educationItems.forEach(item => {
        const degree = item.querySelector('[name="degree[]"]');
        const university = item.querySelector('[name="university[]"]');
        const graduationYear = item.querySelector('[name="graduationYear[]"]');
        
        if (degree && degree.value.trim() && 
            university && university.value.trim() && 
            graduationYear && graduationYear.value.trim()) {
            hasEducation = true;
        }
    });
    
    if (!hasEducation) {
        showToast('Please fill in at least one education entry', 'error');
        return false;
    }
    
    return true;
}

function generateResume() {
    // Get form elements directly
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const location = document.getElementById('location');
    const address = document.getElementById('address');
    const linkedin = document.getElementById('linkedin');
    const github = document.getElementById('github');
    const profilePic = document.getElementById('profilePic');
    
    resumeData = {
        personal: {
            fullName: fullName ? fullName.value : '',
            email: email ? email.value : '',
            phone: phone ? phone.value : '',
            location: location ? location.value : '',
            address: address ? address.value : '',
            linkedin: linkedin ? linkedin.value : '',
            github: github ? github.value : '',
            profilePic: profilePic ? profilePic.files[0] : null
        },
        education: getEducationData(),
        skills: skills,
        experience: getExperienceData(),
        projects: getProjectsData()
    };
    
    renderResume();
    saveData();
}

function getEducationData() {
    const educationItems = document.querySelectorAll('.education-item');
    return Array.from(educationItems).map(item => ({
        degree: item.querySelector('[name="degree[]"]').value,
        university: item.querySelector('[name="university[]"]').value,
        graduationYear: item.querySelector('[name="graduationYear[]"]').value,
        gpa: item.querySelector('[name="gpa[]"]').value
    }));
}

function getExperienceData() {
    const experienceItems = document.querySelectorAll('.experience-item');
    return Array.from(experienceItems).map(item => ({
        jobTitle: item.querySelector('[name="jobTitle[]"]').value,
        company: item.querySelector('[name="company[]"]').value,
        startDate: item.querySelector('[name="startDate[]"]').value,
        endDate: item.querySelector('[name="endDate[]"]').value,
        currentJob: item.querySelector('[name="currentJob[]"]').checked,
        description: item.querySelector('[name="jobDescription[]"]').value
    }));
}

function getProjectsData() {
    const projectItems = document.querySelectorAll('.project-item');
    return Array.from(projectItems).map(item => ({
        name: item.querySelector('[name="projectName[]"]').value,
        url: item.querySelector('[name="projectUrl[]"]').value,
        description: item.querySelector('[name="projectDescription[]"]').value
    }));
}

// Resume rendering
function renderResume() {
    const template = getTemplateHTML();
    preview.innerHTML = template;
    preview.classList.add('resume-template', currentTemplate);
}

function getTemplateHTML() {
    const { personal, education, skills, experience, projects } = resumeData;
    
    return `
        <div class="resume-header">
            ${personal.profilePic ? `<img src="${URL.createObjectURL(personal.profilePic)}" alt="Profile" class="profile-pic">` : ''}
            <h1>${personal.fullName}</h1>
            <div class="resume-contact">
                <span><i class="fas fa-envelope"></i> ${personal.email}</span>
                <span><i class="fas fa-phone"></i> ${personal.phone}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${personal.location}</span>
                ${personal.linkedin ? `<span><i class="fab fa-linkedin"></i> <a href="${personal.linkedin}" target="_blank">LinkedIn</a></span>` : ''}
                ${personal.github ? `<span><i class="fab fa-github"></i> <a href="${personal.github}" target="_blank">GitHub</a></span>` : ''}
            </div>
            ${personal.address ? `<p><i class="fas fa-home"></i> ${personal.address}</p>` : ''}
        </div>

        ${education.length > 0 ? `
        <div class="resume-section">
            <h2><i class="fas fa-graduation-cap"></i> Education</h2>
            ${education.map(edu => `
                <div class="resume-item">
                    <h3>${edu.degree}</h3>
                    <h4>${edu.university} • ${formatDate(edu.graduationYear)}</h4>
                    ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${skills.length > 0 ? `
        <div class="resume-section">
            <h2><i class="fas fa-tools"></i> Skills</h2>
            <ul>
                ${skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        ${experience.length > 0 ? `
        <div class="resume-section">
            <h2><i class="fas fa-briefcase"></i> Work Experience</h2>
            ${experience.map(exp => `
                <div class="resume-item">
                    <h3>${exp.jobTitle}</h3>
                    <h4>${exp.company} • ${formatDateRange(exp.startDate, exp.endDate, exp.currentJob)}</h4>
                    <p>${exp.description}</p>
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${projects.length > 0 ? `
        <div class="resume-section">
            <h2><i class="fas fa-project-diagram"></i> Projects</h2>
            ${projects.map(project => `
                <div class="resume-item">
                    <h3>${project.name}</h3>
                    ${project.url ? `<h4><a href="${project.url}" target="_blank">${project.url}</a></h4>` : ''}
                    <p>${project.description}</p>
                </div>
            `).join('')}
        </div>
        ` : ''}
    `;
}

// Skills management
function addSkill() {
    const skillInput = document.getElementById('skillInput');
    const skill = skillInput.value.trim();
    
    if (skill && !skills.includes(skill)) {
        skills.push(skill);
        renderSkills();
        skillInput.value = '';
        updatePreview();
    }
}

function removeSkill(skill) {
    skills = skills.filter(s => s !== skill);
    renderSkills();
    updatePreview();
}

function renderSkills() {
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = skills.map(skill => `
        <span class="skill-tag">
            ${skill}
            <button onclick="removeSkill('${skill}')" type="button">
                <i class="fas fa-times"></i>
            </button>
        </span>
    `).join('');
}

// Dynamic form sections
function addEducation() {
    const container = document.getElementById('educationContainer');
    const newItem = document.createElement('div');
    newItem.className = 'education-item';
    newItem.innerHTML = `
        <div class="form-row">
            <div class="form-field">
                <label for="degree">Degree</label>
                <input type="text" name="degree[]" placeholder="Bachelor of Science in Computer Science" required>
            </div>
            <div class="form-field">
                <label for="university">University</label>
                <input type="text" name="university[]" placeholder="University Name" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-field">
                <label for="graduationYear">Graduation Year</label>
                <input type="date" name="graduationYear[]" required>
            </div>
            <div class="form-field">
                <label for="gpa">GPA (Optional)</label>
                <input type="text" name="gpa[]" placeholder="3.8/4.0">
            </div>
        </div>
        <button type="button" class="btn-remove" onclick="removeItem(this)">
            <i class="fas fa-trash"></i> Remove
        </button>
    `;
    container.appendChild(newItem);
}

function addExperience() {
    const container = document.getElementById('experienceContainer');
    const newItem = document.createElement('div');
    newItem.className = 'experience-item';
    newItem.innerHTML = `
        <div class="form-row">
            <div class="form-field">
                <label for="jobTitle">Job Title</label>
                <input type="text" name="jobTitle[]" placeholder="Software Engineer" required>
            </div>
            <div class="form-field">
                <label for="company">Company</label>
                <input type="text" name="company[]" placeholder="Company Name" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-field">
                <label for="startDate">Start Date</label>
                <input type="date" name="startDate[]" required>
            </div>
            <div class="form-field">
                <label for="endDate">End Date</label>
                <input type="date" name="endDate[]">
                <label class="checkbox-label">
                    <input type="checkbox" name="currentJob[]"> Currently working here
                </label>
            </div>
        </div>
        <div class="form-field">
            <label for="jobDescription">Job Description</label>
            <textarea name="jobDescription[]" placeholder="Describe your responsibilities and achievements"></textarea>
        </div>
        <button type="button" class="btn-remove" onclick="removeItem(this)">
            <i class="fas fa-trash"></i> Remove
        </button>
    `;
    container.appendChild(newItem);
}

function addProject() {
    const container = document.getElementById('projectsContainer');
    const newItem = document.createElement('div');
    newItem.className = 'project-item';
    newItem.innerHTML = `
        <div class="form-row">
            <div class="form-field">
                <label for="projectName">Project Name</label>
                <input type="text" name="projectName[]" placeholder="Project Name">
            </div>
            <div class="form-field">
                <label for="projectUrl">Project URL</label>
                <input type="url" name="projectUrl[]" placeholder="https://project-url.com">
            </div>
        </div>
        <div class="form-field">
            <label for="projectDescription">Project Description</label>
            <textarea name="projectDescription[]" placeholder="Describe your project and technologies used"></textarea>
        </div>
        <button type="button" class="btn-remove" onclick="removeItem(this)">
            <i class="fas fa-trash"></i> Remove
        </button>
    `;
    container.appendChild(newItem);
}

function removeItem(button) {
    button.parentElement.remove();
}

// Profile picture handling
function handleProfilePicChange(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            showToast('File size too large. Please select a smaller image.', 'error');
            e.target.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            updatePreview();
        };
        reader.readAsDataURL(file);
    }
}

// Template selection
function selectTemplate(template) {
    currentTemplate = template;
    
    // Update template cards to show selected state
    document.querySelectorAll('.template-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-template="${template}"]`).classList.add('selected');
    
    showToast(`Template "${template}" selected`, 'success');
    updatePreview();
}

// Preview functionality
function updatePreview() {
    if (Object.keys(resumeData).length > 0) {
        renderResume();
    }
}

function togglePreview() {
    preview.style.display = preview.style.display === 'none' ? 'block' : 'none';
}

// Action buttons
function editResume() {
    actionButtons.style.display = 'none';
    scrollToBuilder();
}

function downloadPDF() {
    if (!resumeData.personal) {
        showToast('Please generate a resume first', 'error');
        return;
    }
    
    const element = preview.cloneNode(true);
    element.style.padding = '20px';
    element.style.margin = '0';
    
    const opt = {
        margin: 1,
        filename: `${resumeData.personal.fullName.replace(/\s+/g, '_')}_resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save().then(() => {
        showToast('PDF downloaded successfully!', 'success');
    });
}

function shareResume() {
    if (!resumeData.personal) {
        showToast('Please generate a resume first', 'error');
        return;
    }
    
    const shareData = {
        title: `${resumeData.personal.fullName}'s Resume`,
        text: 'Check out my professional resume',
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Link copied to clipboard!', 'success');
        });
    }
}

function printResume() {
    if (!resumeData.personal) {
        showToast('Please generate a resume first', 'error');
        return;
    }
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>${resumeData.personal.fullName} - Resume</title>
                <link rel="stylesheet" href="style.css">
                <style>
                    body { margin: 0; padding: 20px; }
                    .resume-template { font-size: 12px; }
                </style>
            </head>
            <body>
                ${preview.innerHTML}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Utility functions
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.getFullYear();
}

function formatDateRange(startDate, endDate, isCurrent) {
    const start = formatDate(startDate);
    const end = isCurrent ? 'Present' : formatDate(endDate);
    return `${start} - ${end}`;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function scrollToBuilder() {
    document.getElementById('builder').scrollIntoView({ behavior: 'smooth' });
}

function scrollToTemplates() {
    document.getElementById('templates').scrollIntoView({ behavior: 'smooth' });
}

function scrollToPreview() {
    preview.scrollIntoView({ behavior: 'smooth' });
}

function clearForm() {
    if (confirm('Are you sure you want to clear all form data?')) {
        form.reset();
        skills = [];
        renderSkills();
        preview.innerHTML = `
            <div class="preview-placeholder">
                <i class="fas fa-file-alt"></i>
                <p>Your resume preview will appear here</p>
            </div>
        `;
        actionButtons.style.display = 'none';
        resumeData = {};
        localStorage.removeItem('resumeData');
        showToast('Form cleared successfully', 'success');
    }
}

// Data persistence
function saveData() {
    const dataToSave = {
        formData: new FormData(form),
        skills: skills,
        resumeData: resumeData
    };
    localStorage.setItem('resumeData', JSON.stringify(dataToSave));
}

function loadSavedData() {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (data.skills) {
                skills = data.skills;
                renderSkills();
            }
            if (data.resumeData) {
                resumeData = data.resumeData;
                renderResume();
            }
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }
}

// Export functions for global access
window.selectTemplate = selectTemplate;
window.addSkill = addSkill;
window.removeSkill = removeSkill;
window.addEducation = addEducation;
window.addExperience = addExperience;
window.addProject = addProject;
window.removeItem = removeItem;
window.editResume = editResume;
window.downloadPDF = downloadPDF;
window.shareResume = shareResume;
window.printResume = printResume;
window.clearForm = clearForm;
window.scrollToBuilder = scrollToBuilder;
window.scrollToTemplates = scrollToTemplates;
window.togglePreview = togglePreview; 