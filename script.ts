const form = document.getElementById("form");
let userform = document.getElementsByClassName("userform_remove")[0]
let formbox = document.querySelector(".form-container")
let editbuttonbox = document.querySelector(".edit-resume-box")
let generate_resume_btn = document.querySelector(".generate-resume")



form.addEventListener("submit", (e) => {
  e.preventDefault();

  editbuttonbox.style.display = "flex";
  form?.style.display = "none";
  userform?.classList.remove("userform_remove");
  let profilepic_ele = document.getElementsByClassName("input-profile")[0] as HTMLInputElement;
  let fullName_ele = document.getElementsByClassName("fullname")[0] as HTMLInputElement;
  let email_ele = document.getElementsByClassName("email")[0] as HTMLInputElement;
  let contact_ele = document.getElementsByClassName("Contact")[0] as HTMLInputElement;
  let address_ele = document.getElementsByClassName("Address")[0] as HTMLInputElement;
  let githublink_ele = document.getElementsByClassName("github")[0] as HTMLInputElement;
  let degree_ele = document.getElementsByClassName("degree")[0] as HTMLInputElement;
  let univercity_ele = document.getElementsByClassName("uniname")[0] as HTMLInputElement;
  let graducationyear_ele = document.getElementsByClassName("graducationyear")[0] as HTMLInputElement;
  let allskills_ele = document.getElementsByClassName("skill-input");
  let workexperience_ele = document.getElementsByClassName("workexperience")[0] as HTMLInputElement;

  if (profilepic_ele && fullName_ele && email_ele && contact_ele && address_ele && githublink_ele && degree_ele && univercity_ele && graducationyear_ele && allskills_ele && workexperience_ele) {

    const profile = profilepic_ele.files?.[0] ? URL.createObjectURL(profilepic_ele.files[0]) : 'profile picture';
    const fullname = fullName_ele.value
    const email = email_ele.value
    const contact = contact_ele.value
    const address = address_ele.value
    const githublink = githublink_ele.value;
    const degree = degree_ele.value;
    const univercity = univercity_ele.value;
    const graduationyear = graducationyear_ele.value;
    const allskills = Array.from(allskills_ele).map((skill: HTMLInputElement) => skill.value).join(', ');
    const workexperience = workexperience_ele.value;

    // Update userform content
    const resumeoutput = document.getElementsByClassName("userform")[0];

    if (resumeoutput) {
      resumeoutput.innerHTML = `
        <div class="resume-header">
              
             <h2>Personal Information</h2>
            <div class="profile-container"><img id="profile-pic" src="${profile}" alt="Profile Picture" class="profile-pic"></div>
            <hr>
            <p id="user-fullname">${fullname}</p>
            <p id="user-email>${email}</p>
            <p id="user-contact">${contact}</p>
            <p id="user-address">${address}</p>
            <p id="user-github"><a href="${githublink}" target="_blank">GitHub Profile</a></p>
        </div>

  <div class="resume-education">
            <div class="education-remove">
             <h2>Education</h2>
              <label for=""><b>Degree</b>
            <p id="user-degree">${degree}</p>
            </label
            <label for=""><b>University</b>
            <p id="user-degree" >${univercity}</p>
             </label
               <label for=""><b>Graduation Year</b>
            <p id="user-degree"> ${graduationyear}</p>
              </label
        </div>
        </div>

        <div class="resume-skills">
          <h2>Skills</h2>
          <ul id="user-skills">
            ${allskills.split(', ').map(skill => `<li>${skill}</li>`).join('')}
          </ul>
        </div>
        <div class="resume-work-experience">
          <h2>Work Experience</h2>
          <p id="user-workexperience">${workexperience}</p>
        </div>
      `;
    }


    let editButton = document.querySelector(".edit-resume");
    editButton?.addEventListener("click", () => {

      editbuttonbox.style.display = "none";
      form?.style.display = "block";
      userform?.classList.add("userform_remove");
      generate_resume_btn?.innerHTML = "Save Resume"
    })
    let sharebutton = document.querySelector(".share-resume-btn");

    sharebutton?.addEventListener("click", () => {

      function shareUrl(username) {
        const baseUrl = `https://${username}-resume.vercel.app`
        return `${baseUrl}`

      }
      if(fullname){
      alert(`Your Unique url: ${shareUrl(fullname)}`)  
      }
    });
      let pdfdownload=document.querySelector(".download-btn")

      pdfdownload?.addEventListener("click",()=>{
        if(pdfdownload){
        html2pdf().from(document.querySelector(".userform")).saveAs("resume.pdf");
        }
        else{
          alert("Resume Downloaded Successfully")
        }
      } )

     
    
  }
});
