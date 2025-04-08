function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}


document.querySelectorAll('.experience-card').forEach(card => {
  card.addEventListener('click', function() {
    this.classList.toggle('flipped');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const roles = [" an Engineer ", " a Data Scientist ", "a Leader ", "a Researcher "];
  const roleElement = document.querySelector('.animated-roles');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;
  
  function typeRoles() {
    const currentRole = roles[roleIndex];
    
    // Update text content with cursor
    roleElement.innerHTML = currentRole.substring(0, charIndex) + 
                          '<span class="cursor">|</span>';
    
    if (isDeleting) {
      charIndex--;
      typingSpeed = 50;
    } else {
      charIndex++;
      typingSpeed = charIndex === currentRole.length ? 2000 : 150;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }
    
    setTimeout(typeRoles, typingSpeed);
  }
  
  typeRoles();
});