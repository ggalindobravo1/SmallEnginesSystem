const userMngrF = () => {
};

userMngrF.initTable = (listFiltered = null) => {
    document.getElementById("usersTable").innerHTML = "<thead> <tr> <th>Name</th>"
    +" <th>Last Name</th> <th>e-Mail</th> <th>Role</th> <th></th> </tr> </thead>";

    let users = listFiltered? listFiltered : JSON.parse(localStorage.getItem("validUsers"));
    var output = "";

    users.forEach(c => {
      output += "<tr>"
      + "<td>" + c.name + "</td>"
      + "<td>" + c.lastName + "</td>"
      + "<td>" + c.email + "</td>"
      + "<td>"+  c.role + "</td>"
      + "<td>" + `<button type='button' class='btn btn-success' onclick='userMngrF.selectUser(${c.id})'  title='view and edit'>`
      + " <i class='fa-solid fa-pen'></i> View </button>" +  "</td>"
      + "</tr>";
    });
    document.getElementById("usersTable").innerHTML += output;
}; //data-bs-toggle="modal" data-bs-target="#exampleModal"

userMngrF.filterTable = (elem) => {
    let filter = elem.value.toUpperCase();
    let users = JSON.parse(localStorage.getItem("validUsers"));

    let usersFiltered = users.filter(i => {
        return i.name.toString().toUpperCase().includes(filter) ||
        i.lastName.toString().toUpperCase().includes(filter) ||
        i.email.toString().toUpperCase().includes(filter) ||
        i.role.toString().toUpperCase().includes(filter);
      });
  
      userMngrF.initTable(usersFiltered);
    
}

userMngrF.selectUser = (id) => {
   
    if(validateUser()){ //show modal only if password is correct
        var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});
        myModal.show();
    }

    let user = JSON.parse(localStorage.getItem("validUsers")).find(c => Number(c.id) === id);
    let editData = document.querySelectorAll(".editData");
    editData.forEach(f => f.disabled = true)
    document.getElementById("userID").innerHTML = user.id;
    editData[0].value = user.name;
    editData[1].value = user.lastName;
    editData[2].value = user.email;
    editData[3].value = user.password;
    editData[4].value = user.role;

    document.getElementById("btnEdit").hidden = false;
    document.getElementById("btnSave").hidden = true;
}

userMngrF.editUser = (action) => {
    if(action == "add"){
        if(validateUser()){ //show modal only if password is correct
            var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});
            myModal.show();
        }
        else
            return;
    }
    document.getElementById("btnSave").hidden = false;
    document.getElementById("btnEdit").hidden = true;
    
    userMngrF.clean(action);
}

userMngrF.saveUser = () => {
    let userID = document.getElementById("userID").innerHTML;
    let editData = document.querySelectorAll(".editData");
    let users = JSON.parse(localStorage.getItem("validUsers"));
    let index = users? users.length : 0 ;
    
    let user = new User();

    if(userID){ // meaning is edit mode
        index = users.findIndex(c => Number(c.id) === Number(userID));
        user = users[index];
    }
    
    user.name = editData[0].value;
    user.lastName= editData[1].value;
    user.email= editData[2].value;
    user.password= editData[3].value;
    user.role= editData[4].value;

    if(validateEntry(editData)){

        if(userID){ //meaning is edit mode
            users[index] = user;
        }
        else{ //meaning is new 
            user.id = users.length+1;
            users.push(user)
        }
        
        localStorage.setItem("validUsers", JSON.stringify(users));
        document.getElementById("btnSave").hidden = true;
        document.getElementById("btnEdit").hidden = false;
        

        userMngrF.initTable();
        document.getElementById("success").hidden = false;

        setTimeout(()=> {
            editData.forEach(f => {f.value=""; f.disabled = true; f.style.border="";});
            let myModalEl = document.getElementById('exampleModal')
            let modal = bootstrap.Modal.getInstance(myModalEl)
            modal.hide()
            document.getElementById("success").hidden = true;
        }, 1800)
        
    }
    
   return
}

userMngrF.clean = (action) => {
    
    let editData = document.querySelectorAll(".editData");
    if(action === "add"){
        document.getElementById("userID").innerHTML = "";
        editData.forEach(f => f.value="");
        }
    editData.forEach(f =>{  f.disabled = false; f.style.border = "";});
    document.getElementById("modal-msg").innerHTML = "";
}

const validateEntry = (editData) => {
    let errMsg = ""; 
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i
    const passPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    
    if(editData[0].value.length < 2){
        editData[0].style.border = "2px solid red";
        errMsg = "* Name is mandatory </br>";
    }
    if(editData[1].value.length < 2){
        editData[1].style.border = "2px solid red";
        errMsg += "* Last name is mandatory </br>";
    }
    if(!emailPattern.test(editData[2].value)){
        editData[2].style.border = "2px solid red";
        errMsg += "* Invalid email </br>";
    }
    if(!passPattern.test(editData[3].value)){
        editData[3].style.border = "2px solid red";
        errMsg += "* Password must be: At leats one number, </br> At least one special character (!@#$%^&*) </br> and between 6 and 16 length.</br>"
    }
    if(!editData[4].value.length > 0){
        editData[4].style.border = "2px solid red";
        errMsg += "* Please select a Role";
    }
    
    document.getElementById("modal-msg").innerHTML = errMsg;

    return errMsg.length > 0? false : true;

    
  }

  const validateUser = () => {
  let pin = prompt("Please enter your security PIN:", "");
  if (pin == "123456789") {
    return true;
  } else {
    return false;
  }
  }


  class User {
    id ;
    name; 
    lastName;
    email;
    password;
    role;
  }