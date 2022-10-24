//document.getElementById("myForm").onsubmit = function() {myFunction()};

const validUsers = [
    {
        id:1, 
        name:"Sam",
        email: "sam@hotmail.com",
        password: "123456789"
    },
    {
        id:2, 
        name:"Emma",
        email: "emmam@hotmail.com",
        password: "789456123"
    }, 
    {
        id:2, 
        name:"Mike",
        email: "mike@hotmail.com",
        password: "111222"
    }
]

function myFunction(event) {
    event.preventDefault();
    document.getElementById("formMessage").textContent = "";


    let msg = "Invalid Password or Username";
    
    
    validUsers.forEach(user => {
        if(user.email == event.target.inputEmail.value && user.password == event.target.inputPassword.value )
        { 
            msg = "Welcome " + user.name;
            localStorage.setItem("ActiveUser", JSON.stringify(user));
            document.getElementById('statusSpinner').hidden = false;
            console.log("Logged in")
            setTimeout(() => {
                location.replace(location.href.split('/').slice(0, -2).join('/')+"/Home/index.html");
              }, "2000")
        }
    })

    document.getElementById("formMessage").textContent = msg;
}

const getPath = () =>{
    return "login Page";
}