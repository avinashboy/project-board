
let id = (id) => document.getElementById(id)

let localStorage = window.localStorage

let getItems = () => JSON.parse(localStorage.getItem("todo")) || {}

let setItems = (payLoad) => localStorage.setItem("todo", JSON.stringify(payLoad))

let setAbb = (element,data,method) => element.setAttribute(data, method)

let getAbb = (element,data) => element.getAttribute(data)

// * adding the todo
let addData = ()=>{
    let task = id("task")
    let cleanTxt = task.value.trim()
    if(cleanTxt.length === 0 ) return alert("danger", "Please enter a task")
    let payLoad = getItems()
    let action = getAbb(task, "data-action")
    if(action === "edit"){
        let id = getAbb(task, "data-changeId")
        payLoad[id] = cleanTxt
        setAbb(task, "data-action", "add")
    } else {
    payLoad[cleanTxt] = cleanTxt
    
    }
    setItems(payLoad)
    displayTodo()
    task.value = ""
}

// * alert
let alert = (className, message) => {
    return (
    alertMe = id("alertMe"),
    alertMe.innerHTML =  `<div class="alert alert-${className}" role="alert">${message}</div>`,
    setTimeout(() => {
        alertMe.innerHTML = ""
    }, 4000)
    );
}

// * edit teh todo
let edit = (edit)=>{
    let task = id("task")
    let payLoad = getItems()
    task.value = payLoad[edit]
    setAbb(task, "data-changeId", edit)
    setAbb(task, "data-action", "edit")
}

// * removed todo
let remove = (remove)=>{
    let payLoad = getItems()
    delete payLoad[remove]
    setItems(payLoad)
    displayTodo()

}

// * display the todo
let displayTodo = () =>{
    let payLoad = getItems()
    let root = id("root")
    if(Object.keys(payLoad).length === 0) return root.innerHTML = `<h1>Nothing.!!!</h1>`
    root.innerHTML= ""
    Object.entries(payLoad).forEach(key =>{
        const div = document.createElement('div')
        div.setAttribute("class", "col-md-12 mt-3")
        div.innerHTML = `
        <div class="d-flex justify-content-between">
            <div><h3 id="${key[0]}">${key[1]}</h3></div>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary" onclick="edit('${key[0]}')"><i class="far fa-edit"></i></button>
                <button type="button" class="btn btn-primary" onclick="remove('${key[0]}')"><i class="far fa-trash-alt"></i></button>
            </div>
        </div>
        `
        root.appendChild(div)
    })



}

displayTodo()