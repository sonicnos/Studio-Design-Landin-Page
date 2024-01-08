const scrollers = document.querySelectorAll(".our-clients");
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const contactForm = document.getElementById('contact-form');
const nameForm = document.getElementById('form-name');
const companyForm = document.getElementById('form-company');
const emailForm = document.getElementById('form-email');

let errors = [];

//fucntion

function checkRequired (input) {
    if(!input.value.trim().length) {
        showError(input, `This field is required`);
    }else{
        showSuccess(input);
    }
}

function showError (input, msg){
    input.classList = 'error'
    input.previousElementSibling.classList = 'errorMsg';
    input.previousElementSibling.innerText = msg;
    errors.push(input);
}

function showSuccess (input) {
    input.previousElementSibling.classList = 'successMsg';
    input.classList = 'success';
}

function checkEmail (input) {
    if(
        !emailForm.value.match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
    ) {
        showError (input, `Must be a valid email`);
    }else{
        showSuccess(input);
    }
}


//popup
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget)
      openModal(modal)
    })
  })
  
  overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.popup.active')
    modals.forEach(modal => {
      closeModal(modal)
    })
  })
  
  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.popup')
      closeModal(modal)
    })
  })
  
  function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
  }
  
  function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
  }

//submit function

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errors.length = 0;

    checkRequired(nameForm);
    checkRequired(companyForm);
    checkRequired(emailForm);

    checkEmail(emailForm);

    console.log(errors);

    if(!errors.length) {
        console.log({name: nameForm.value,
            company: companyForm.value,
            email: emailForm.value});
    }

});


//scroling bar
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }

  function addAnimation() {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);
  
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }
