const showHome = () => {
    document.getElementById("Home").style.display = "block";
    document.getElementById("Staff").style.display = "none";
    document.getElementById("Shop").style.display = "none";
    document.getElementById("Register").style.display = "none";
    document.getElementById("GuestBook").style.display = "none";

}

const showStaff = () => {
    document.getElementById("Home").style.display = "none";
    document.getElementById("Staff").style.display = "block";
    document.getElementById("Shop").style.display = "none";
    document.getElementById("Register").style.display = "none";
    document.getElementById("GuestBook").style.display = "none";

}
const showShop = () => {
    document.getElementById("Home").style.display = "none";
    document.getElementById("Staff").style.display = "none";
    document.getElementById("Shop").style.display = "block";
    document.getElementById("Register").style.display = "none";
    document.getElementById("GuestBook").style.display = "none";

}

const showRegister = () => {
    document.getElementById("Home").style.display = "none";
    document.getElementById("Staff").style.display = "none";
    document.getElementById("Shop").style.display = "none";
    document.getElementById("Register").style.display = "block";
    document.getElementById("GuestBook").style.display = "none";

}

const showGB = () => {
    document.getElementById("Home").style.display = "none";
    document.getElementById("Staff").style.display = "none";
    document.getElementById("Shop").style.display = "none";
    document.getElementById("Register").style.display = "none";
    document.getElementById("GuestBook").style.display = "block";

}



    
const showVersion = () => {
    fetch("http://localhost:5000/api/GetVersion")
    .then(response => response.text())
    .then(data => console.log(data))
    
}

const getProductByName = () =>{
    var input, filter;
    input = document.getElementById("search");
    filter = input.value;
    showProductsByName(filter)
}

const showProducts = () => {
    fetch(`http://localhost:5000/api/GetItems/`)
    .then(response => response.json())
    .then(data => showProductsTable(data))
}

const showProductsByName = (filter) => {
    fetch(`http://localhost:5000/api/GetItems/${filter}`)
    .then(response => response.json())
    .then(data => showProductsTable(data))
}

const showAuth = () => {
    fetch("http://localhost:5000/api/GetVersionA",{
        credentials: "same-origin"
    })
    .then(response => response.text())
    .then(data => console.log(data))
}

const showStaffs = () => {
    fetch("http://localhost:5000/api/GetAllStaff")
    .then(response => response.json())
    .then(data => showStaffTable(data))
}

const showProductsTable = (products) => {
    let htmlString = "<tr class = 'topTable'><th>Photo</th><th>ProductName</th><th>Description</th><th>Price</th></tr>";

    const showIn = (info) => {
        htmlString += `<tr><td> <img src = "http://localhost:5000/api/GetItemPhoto/${info.id}" class = "TableImg" alt = "pImg"></td><td class = 'productName'>${info.name}</td><td class = 'productDesc'>${info.description}</td><td class ='productPrice'>$${info.price}</td><td class ='buyButton'>Buy Now</td></tr>`;
    }
    
    products.forEach(showIn);
    const pTable = document.getElementById("productsTable");
    pTable.innerHTML = htmlString;
}

const showStaffTable = (staff) => {
    let staffString = "<tr class = 'topTable'><th>Photo</th><th>Details</th><th>Research Areas</th><th>Electronic Card</th></tr>";
    let array = {}
    const showIn = (info) => {
        
        fetch(`http://localhost:5000/api/GetCard/${info.id}`)
        .then(response => response.text())
        .then(data => splitData(data))

        
            
        }
        const splitData = (data) => {
            
            let dataSplit = JSON.stringify(data).split("\\r\\n")
        
            for (i =0; i< dataSplit.length; i++){
                if (i ==0){
                    let begin = dataSplit[i].substring(7, dataSplit[i].length)
                    
                }
                if (dataSplit[i].substr(0,7) == "VERSION"){
                    let version = dataSplit[i].substr(8, dataSplit[i].length)
                
                }
                if (dataSplit[i].substr(0,1) == "N"){
                    let name = ""
                    let firstname = ""
                    let surname = ""
                    let title = ""
                    let totalName = dataSplit[i].substr(2, dataSplit[i].length)
                    let count = 0
                    for (j=0; j<totalName.length+1; j++){
                        if (totalName[j]== ";"){
                            count += 1
                        }
                        else{
                            if (count == 0){
                                firstname += totalName[j]
                            }
                            if (count == 1){
                                surname += totalName[j]
                            }
                            if (count == 3){
                                title += totalName[j]
                            }
                            
                        }
                    }
                    array.firstname = firstname
                    array.surname = surname
                    array.title = title
                    
                }
                if (dataSplit[i].substr(0,2) == "FN"){
                    let name = dataSplit[i].substr(3, dataSplit[i].length)
                    
                }
                if (dataSplit[i].substr(0,3) == "UID"){
                    let UID = dataSplit[i].substr(4, dataSplit[i].length)
                    array.id = UID
                }
                if (dataSplit[i].substr(0,3) == "ORG"){
                    let ORG = dataSplit[i].substr(4, dataSplit[i].length)
                    array.org = ORG
                }
                if (dataSplit[i].substr(0,5) == "EMAIL"){
                    let email = dataSplit[i].substr(16, dataSplit[i].length)
                    array.email = email
                }
                if (dataSplit[i].substr(0,3) == "TEL"){
                    let tel = dataSplit[i].substr(4, dataSplit[i].length)
                    array.tel = tel
                }
                if (dataSplit[i].substr(0,3) == "URL"){
                    let url = dataSplit[i].substr(4, dataSplit[i].length)
                    array.url = url
                }
                if (dataSplit[i].substr(0,10) == "CATEGORIES"){
                    let category = dataSplit[i].substr(11, dataSplit[i].length)
                
                    let list = {}
                    let count = 0
                
                    array.cat = category.split(",")
                    
                }
                
                
            }
            const showText = (json) =>{
                let string = `${json.id}`
                staffString += `<tr><td><img src = "http://localhost:5000/api/GetStaffPhoto/${json.id}" class = "TableImg" alt = "sImg"></td><td class ="staffName">${json.title} ${json.firstname} ${json.surname}<br><br><a class ="staffInfo" href = "mailto:${json.email}">${json.email}</a>📧<br><a  class ="staffInfo" href ="tel:${json.tel}"> ${json.tel}</a>📞<br><a  class ="staffInfo" href ="${json.url}"</a>/${json.firstname}${json.surname}/SHIT/🌐</td><td class ="staffDisplay">`
                for(j=0; j<json.cat.length; j++){
                    if (j<=json.cat.length-2){
                        staffString+=`<p > - ${json.cat[j]}</p>`
                    }
                    else{
                        staffString+=`<p > - ${json.cat[j]}</p></td><td class = "staffName">`
                    }
                        
                }

                staffString += `<a href="http://localhost:5000/api/GetCard/${json.id}" class = "cardLink"</a>Add to Contacts 👤</td></tr>`
                const pTable = document.getElementById("staffTable");
    
                pTable.innerHTML = staffString;
            
        
            
        }
        showText(array)
        
        
        
    }
    staff.forEach(showIn);
    
}

const checkLogin = (response) =>{
    if (response.status == 200){
        document.getElementById("loggedIn").style.display = "block";
        document.getElementById("loggedOut").style.display = "none";
        document.getElementById("userLoginYes").innerHTML = "User Login Successful";
        

    }
    else{
        document.getElementById("loggedIn").style.display = "none";
        document.getElementById("loggedOut").style.display = "block";
        document.getElementById("userLoginYes").innerHTML = "User Invalid Request - Logged Out";
    }
    
    
}

const logOut = () =>{
    

    fetch( "http://localhost:5000/api/GetVersionA", {
        method:'GET', 
        headers: new Headers({
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            'Content-Type': "application/text"
        }),
    }).then(response => checkLogin(response));

}


const getAuth = () =>{
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    fetch( "http://localhost:5000/api/GetVersionA", {
        method:'GET', 
        headers: new Headers({
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            'Content-Type': "application/text"
        }),
    }).then(response => checkLogin(response));

    

}





const addComment = () =>{
    let com = document.getElementById("comment").value;
    let n = document.getElementById("commentName").value;


    
    
    
    fetch("http://localhost:5000/api/WriteComment",{
        method: 'post',
        headers: new Headers({
            'Accept': 'application/json, text/plain',
            'Content-Type': "application/json"
        }
        
        ),
        body: JSON.stringify({comment: com, name: n})
    }).then(res => res.json())
    .then(res=> console.log(res))

}



const addNewUser = () =>{
    let username = document.getElementById("newUser").value;
    let pass = document.getElementById("newPass").value;
    let add = document.getElementById("address").value;

    
    
    
    fetch("http://localhost:5000/api/Register",{
        method: 'post',
        headers: new Headers({
            'Accept': 'application/json, text/plain',
            'Content-Type': "application/json"
        }
        
        ),
        body: JSON.stringify({userName: username, password: pass, address: add})
    }).then(res => res.json()).then(res =>userLog(res))
    

}



const userLog = (res) =>{
    if (res.status > 200){
        userText("Invalid Input")

    }else{
        if (res == "Username not available."){
            userText(res)
            console.log("works")
        }
        else{
            userText(res)
            document.getElementById("UserLogin").style.display = "block"
            document.getElementById("UserRegister").style.display = "none"
        }
    }
    
}

const userText = (touch) =>{
    let login = document.getElementById("userSuccess")
    login.innerHTML = touch
}



const alreadyLogin = () =>{
    document.getElementById("UserLogin").style.display = "block";
    document.getElementById("UserRegister").style.display = "none";
}

const dontLogin = () =>{
    document.getElementById("UserLogin").style.display = "none";
    document.getElementById("UserRegister").style.display = "block";
}





showProducts();
showStaffs();
checkLogin()
getAuth();
