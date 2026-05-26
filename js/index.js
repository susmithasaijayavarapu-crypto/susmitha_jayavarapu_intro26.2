const body = document.querySelector('body');
const footerEle = document.createElement('footer');

body.appendChild(footerEle);
const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector('footer');
const copyright = document.createElement('p');
copyright.innerHTML = `&copy; Susmitha Jayavarapu ${thisYear}`;
footer.appendChild(copyright);

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
    const messageSection = document.getElementById('Messages');
    const messageList = messageSection.querySelector("ul");
    const newMessage  = document.createElement("li"); 
    newMessage.innerHTML =`<a href = "mailto : ${email}"> ${name} </a><br>
    <span> ${message}  </span> <br>` ;
    const removeButton = document.createElement("button");
    removeButton .innerText = "remove";
    removeButton.type = "button";

    removeButton.addEventListener('click', function(event){
        const entry = removeButton.parentNode;
        console.log(entry);
        entry.remove();
        if (messageList.children.length === 0) {
        messageSection.style.display = "none";
        }
       
    });
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    
    messageForm.reset();
});
