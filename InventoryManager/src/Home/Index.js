//document.getElementById("myForm").onsubmit = function() {myFunction()};

function myFunction(event) {
    event.preventDefault();
    console.log(event.target.inputEmail.value);
    console.log(event.target.inputPassword.value);

    let msg = "";
    //evaluate if the username input is not null
    if(!event.target.inputEmail.value.trim())
        msg = "--Enter a valid user name \n";

    //evaluate if the password input is less than 5 chars
    if(5>event.target.inputPassword.value.length || !event.target.inputPassword.value.trim())
       msg += "--Provide a valid password longer than 5 characters \n"; 


    console.log(event.target);

    document.getElementById("formMessage").textContent = msg;
}