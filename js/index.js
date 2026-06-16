const body = document.querySelector('body');
const footerEle = document.createElement('footer');
/* Insert the copyright logo, current year, and student's name in the footer of index.html */
body.appendChild(footerEle);
const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector('footer');
const copyright = document.createElement('p');
copyright.innerHTML = `&copy; Susmitha Jayavarapu ${thisYear}`;
footer.appendChild(copyright);

/* Using an array, insert the array items as a list of skills in the skills section of index.html*/

const skills =["JavaScript", "HTML", "CSS", "Adobe Photoshop", "GitHub"];
const skillsSection  = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');
for (let i=0; i < skills.length ; i++){
    const skill = document.createElement('li');
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}
const messageForm = document.forms["leave_message"];
messageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = event.target.usersName.value;
    const email = event.target.usersEmail.value;
    const message = event.target.usersMessage.value;
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    const messageSection = document.getElementById('messages');
    const messageList = messageSection.querySelector("ul");
    const newMessage  = document.createElement("li"); 
    messageSection.style.display = "block";

    /* Convert form inputs into the author's name as a clickable link*/

    newMessage.innerHTML =`<a href = "mailto:${email}"> ${name} </a><br>
    <span class="message-content"> ${message}  </span>  <input type="text" class="edit-input" style="display:none;">
    <br>` ;

    // 1. Create remove Button
    const removeButton = document.createElement("button");
    removeButton .innerText = "Remove";
    removeButton.type = "button";
    removeButton.classList.add("btn-remove");
    removeButton.addEventListener('click', function(event){
        const entry = removeButton.parentNode;
        console.log(entry);
        entry.remove();
        if (messageList.children.length === 0) {
        messageSection.style.display = "none";
        }
       
    });

    // 2. Create Edit Button
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.type = "button";
    editButton.classList.add("btn-edit");
    editButton.addEventListener('click', function() {
        const span = newMessage.querySelector('.message-content');
        const input = newMessage.querySelector('.edit-input');
        if (editButton.innerText === "Edit") {
            // Switch to Edit Mode
            
            input.type = 'text';
            input.value = span.innerText;
            input.className = 'edit-input';
            
            span.style.display = "none";  // Hide span
        input.style.display = "inline-block";
            editButton.innerText = "Save";
        } else {
            // Switch to Save Mode
            span.innerText = input.value;
            
            span.style.display = "inline-block"; // Show span
            input.style.display = "none";
            editButton.innerText = "Edit";
        }
    });


    /* Display their message and Provide a remove button to delete the message */
    newMessage.appendChild(editButton);
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    
    messageForm.reset();
});

fetch("https://api.github.com/users/susmithasaijayavarapu-crypto/repos")
.then(response => {
    if(!response.ok){
        throw new Error("Request Failed");
    }
    return response.json();
})
.then(data => {
    const repositories = data;
    console.log(repositories);
    return repositories;
})
.then ((repositories) => {
    
    const projectSection = document.getElementById("Projects");
    const projectList = projectSection.querySelector("ul");
    for (let i= 0; i< repositories.length; i++){
    const project = document.createElement("li");
    
    project.innerText = repositories[i].name;
    projectList.appendChild(project);
}

})
.catch(error => {
   console.error("An error occurred:", error);

    const projectSection = document.getElementById("Projects");
    const errorMessage = document.createElement("p");
    errorMessage.style.color = "red";
    errorMessage.innerText = "Sorry, I am currently unable to load my GitHub repositories. Please check back later!";
    projectSection.appendChild(errorMessage);
});





