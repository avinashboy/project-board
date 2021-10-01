(() => {
    "use strict";

    let url = "https://raw.githubusercontent.com/avinashboy/project-board/main/projectBoard.json"

    let id = (id) => document.getElementById(id)

    let alert = (className, message) => {
        return (
            alertMe = id("alertMe"),
            alertMe.innerHTML = `<div class="alert alert-${className}" role="alert">${message}</div>`,
            setTimeout(() => {
                alertMe.innerHTML = ""
            }, 4000)
        );
    }

    axios.get(url)
        .then(response => createProjectList(response.data))
        .catch(error => alert("danger", error))

    let createProjectList = (projectList) => {
        const root = id("root")
        root.innerHTML = ""
        projectList.forEach((project) => {
            const div = document.createElement('div')
            div.setAttribute('class', "col-md-4 mb-4")
            div.innerHTML = `
   <div class="card" style="width: 18rem">
   <div class="card-body">
     <a href="./${project.file}/index.html" class="card-link"
       >${project.name}</a
     >
   </div>
 </div>
   `
            root.appendChild(div)
        })
    }
})()