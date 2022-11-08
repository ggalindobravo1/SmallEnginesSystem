//document.getElementById("myForm").onsubmit = function() {myFunction()};

const validUsers = [
    {
        id:1, 
        name:"Sam",
        lastName:"Lopez",
        email: "shopping@emmas.com",
        password: "123456789",
        role: "Admin"
    },
    {
        id:2, 
        name:"Emma",
        lastName:"Martin",
        email: "emmam@emmas.com",
        password: "789456123",
        role: "Manager"
    }, 
    {
        id:3, 
        name:"Wendy",
        lastName:"Salinas",
        email: "wsalinas@hotmail.com",
        password: "111222",
        role: "Sales"
    }
    , 
    {
        id:4, 
        name:"Eugene",
        lastName:"Herrera",
        email: "warehouse1@emmas.com",
        password: "545454",
        role: "Warehouse"
    }
]

function myFunction(event) {
    event.preventDefault();
    document.getElementById("formMessage").textContent = "";


    let msg = "Invalid Password or Username";
    
    
    validUsers.forEach(user => {
        if(user.email == event.target.inputEmail.value && user.password == event.target.inputPassword.value )
        { 
            logSession(user);
            msg = "Welcome " + user.name;
            localStorage.setItem("ActiveUser", JSON.stringify(user));
            document.getElementById('statusSpinner').hidden = false;
            console.log("Logged in")
            console.log(document.getElementById("navbarNav"))
            setTimeout(() => {
                location.replace(location.href.split('/').slice(0, -2).join('/')+"/Main/Main.html?page=inventoryListView");
              }, "2000")
        }
    })

    document.getElementById("formMessage").textContent = msg;
}

const logSession = (user) => {
    let logEntry ={
        dateIn: new Date().toLocaleDateString(),
        timeIn: new Date().toLocaleTimeString('en-US',{ hour12: false}),
        userName: `${user.name}  ${user.lastName}`,
        userEmail: user.email,
        userRole: user.role
    }
    
    //get elems in storage
    let logs = JSON.parse(localStorage.getItem("logSession"));

    if(Array.isArray(logs)){
        //if exists, add element
        logs.push(logEntry);
    }else{
        //if not, create new
        logs = [logEntry];
    }

    //save in storage
    localStorage.setItem("logSession", JSON.stringify(logs));

};

const getPath = () =>{
    return "login Page";
}

// For todays date;
Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}