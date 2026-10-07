const roles=[...document.querySelectorAll(".role")];
let selectedRole=null;

roles.forEach(button=>{
  button.addEventListener("click",()=>{
    roles.forEach(item=>item.classList.remove("selected"));
    button.classList.add("selected");
    selectedRole=button.dataset.role;
  });
});

document.querySelectorAll(".toggle-password").forEach(button=>{
  button.addEventListener("click",()=>{
    const input=button.parentElement.querySelector("input");
    const show=input.type==="password";
    input.type=show?"text":"password";
    button.setAttribute("aria-label",show?"Ocultar contraseña":"Mostrar contraseña");
  });
});

const firstName=document.getElementById("firstName");
const lastName=document.getElementById("lastName");
const email=document.getElementById("email");
const password=document.getElementById("password");
const confirmPassword=document.getElementById("confirmPassword");

const emailMessage=document.getElementById("emailMessage");
const matchMessage=document.getElementById("matchMessage");

const ruleLength=document.getElementById("ruleLength");
const ruleUpper=document.getElementById("ruleUpper");
const ruleNumber=document.getElementById("ruleNumber");
const ruleSymbol=document.getElementById("ruleSymbol");

function setRule(el, ok){
  el.classList.toggle("ok", ok);
  el.classList.toggle("pending", !ok);
}

function validatePasswordRules(){
  const value=password.value;
  setRule(ruleLength, value.length>=8);
  setRule(ruleUpper, /[A-ZÁÉÍÓÚÑ]/.test(value));
  setRule(ruleNumber, /\d/.test(value));
  setRule(ruleSymbol, /[^A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]/.test(value));
}

function validateEmail(){
  const value=email.value.trim();
  const control=email.closest(".control");
  const valid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  emailMessage.classList.toggle("is-hidden", !valid);
  control.classList.toggle("control-success", valid);
  if(!valid) control.classList.remove("control-error");
  return valid;
}

function validateMatch(){
  const control=confirmPassword.closest(".control");
  if(confirmPassword.value===""){
    matchMessage.classList.add("is-hidden");
    control.classList.remove("control-error","control-success");
    return false;
  }

  const same=password.value===confirmPassword.value;
  matchMessage.classList.remove("is-hidden");
  matchMessage.innerHTML=same
    ? '<span class="success-circle">✓</span> Las contraseñas coinciden'
    : '<span class="alert">!</span> Las contraseñas no coinciden';
  matchMessage.className=same
    ? "helper helper-success"
    : "helper helper-error";
  control.classList.toggle("control-success", same);
  control.classList.toggle("control-error", !same);
  return same;
}

password.addEventListener("input",()=>{
  validatePasswordRules();
  if(confirmPassword.value!=="") validateMatch();
});
confirmPassword.addEventListener("input",validateMatch);
email.addEventListener("input",validateEmail);

document.getElementById("registerForm").addEventListener("submit",e=>{
  e.preventDefault();

  const fieldsComplete=
    firstName.value.trim() &&
    lastName.value.trim() &&
    email.value.trim() &&
    password.value &&
    confirmPassword.value;

  const emailOk=validateEmail();
  validatePasswordRules();
  const passwordsOk=validateMatch();

  if(!fieldsComplete || !emailOk || !passwordsOk || !selectedRole){
    if(!selectedRole){
      roles.forEach(r=>r.animate(
        [{transform:"translateX(0)"},{transform:"translateX(-3px)"},{transform:"translateX(3px)"},{transform:"translateX(0)"}],
        {duration:220}
      ));
    }
    return;
  }

  alert("Formulario válido para registro.");
});


registerForm.addEventListener("submit", (event) => {

    event.preventDefault();


    if (!selectedRole) {

        alert("Por favor, selecciona un rol.");

        return;

    }


    const firstName =
        document.getElementById("firstName").value;

    const lastName =
        document.getElementById("lastName").value;

    const email =
        document.getElementById("email").value;


    const user = {

        firstName: firstName,

        lastName: lastName,

        email: email,

        role: selectedRole

    };


    localStorage.setItem(
        "capacitaUser",
        JSON.stringify(user)
    );


    // Redirección

    switch (selectedRole) {

        case "student":
            window.location.href = "index.html";
            break;

        case "teacher":
            window.location.href = "docente.html";
            break;

        case "admin":
            window.location.href = "administrador.html";
            break;

    }

});