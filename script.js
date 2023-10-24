function maskPassword(pass){
    let str=""
    for (let index = 0; index < pass.length; index++) {
        str +="*"
        
    }
    return str
}

function copyText(txt){
    navigator.clipboard.writeText(txt).then(
        ()=>{
            // alert("copied the text" + txt)
            // document.querySelector(".alert").classList.remove("alert")
            document.getElementById("alert").style.display="inline";
            setTimeout(()=>{
                document.getElementById("alert").style.display="none";
            },2000);
        },
        ()=>{
            alert("failed");
        },
    );
}





const deletePassword =(website)=>{
    let data=localStorage.getItem("passwords")
    let arr=JSON.parse(data);
    arrUpdated=arr.filter((e)=>{
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))
    alert("sucessfully deleted")
    showPasswords();

}



//logic to fill the table
const showPasswords = () => {
    let tb = document.querySelector("table")
    let data = localStorage.getItem("passwords")
    if (data == null || JSON.parse(data).length==0) {
        tb.innerHTML = "No data to show"
    }
    else {
        tb.innerHTML = `<tr>
                        <th>Website</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Delete</th>
                        </tr>`
        let arr = JSON.parse(data);
        str = ""
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];


            str += `<tr>
                    <td>${element.website}<img src="copy.JPG" onclick="copyText('${element.website}')" alt="Copy Button" width="29" height="19"></td>
                    <td>${element.username}<img src="copy.JPG" onclick="copyText('${element.username}')" alt="Copy Button" width="29" height="19"></td>

                    <td>${maskPassword(element.password)} <img src="copy.JPG" onclick="copyText('${element.password}')" alt="Copy Button" width="29" height="19"> </td>

                    <td><button class="btnsm"  onclick="deletePassword('${element.website}')" >Delete</button></td>
                    </tr>`
        }
        tb.innerHTML = tb.innerHTML + str
    }
    website.value=""
    username.value=""
    password.value=""

}






console.log("Working...")
showPasswords();
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("clicked")
    console.log(website.value, username.value, password.value)
    let passwords = localStorage.getItem("passwords")
    console.log(passwords)
    if (passwords == null) {
        let json = [];
        json.push({ website: website.value, "username": username.value, "password": password.value })
        alert("password saved")
        localStorage.setItem("passwords", JSON.stringify(json))

    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({ website: website.value, "username": username.value, "password": password.value })
        alert("password saved")
        localStorage.setItem("passwords", JSON.stringify(json))

    }
    showPasswords();
})
