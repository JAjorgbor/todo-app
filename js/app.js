// initialize ui class

const ui = new Ui()
const list = new List()
let themes = document.querySelector(".theme-logo-container");
let uls = document.querySelectorAll("ul");
let taskForm = document.querySelector(".task-input-form")
let taskInput = document.querySelector(".task-input");
const lis = document.querySelectorAll("li");
const choices = document.querySelectorAll(".choice");
const closeBtns = document.querySelectorAll(".close-btn");
const checkBtns = document.querySelectorAll(".check-btn");
let tasksLeft = document.querySelector(".no-of-items");
const noOfItems = document.querySelectorAll(".items-no-container div");

let clicked = true;

// stack animation on page load

themes.onclick = () => {

    themes.classList.toggle("theme-logo-container-clicked");

    if (clicked) {
        document.querySelector(".themeStyleSheet").href = "/css/lightTheme.css";
        clicked = false;
        localStorage.setItem("theme", "light")
    }
    else {
        document.querySelector(".themeStyleSheet").href = "/css/darkTheme.css";
        clicked = true;
        localStorage.setItem("theme", "dark")

    }
}

window.onload = () => {


    if (localStorage.getItem("loaded for the first time") == "" || localStorage.getItem("loaded for the first time") == null) {
        const generalTasks = ["learn HTML and CSS", "Learn SCSS", "Learn Javascript", "Learn Git", "Complete Todo App on Frontend Mentor", "learn REACT", "learn NEXT.js"]

        const completedTasks = ["learn HTML and CSS", "Learn SCSS", "Learn Javascript", "Complete Todo App on Frontend Mentor", "Learn Git"]
        localStorage.setItem("All Tasks", JSON.stringify(generalTasks))

        localStorage.setItem("Completed Tasks", JSON.stringify(completedTasks))
        document.querySelector(".themeStyleSheet").href = "/css/darkTheme.css";
        localStorage.setItem("theme", "dark")

        localStorage.setItem("loaded for the first time", "true")
    }
    list.updateNoOftasks()
    list.retrieveFromLocalStorage()
    uls.forEach((ul) => {
        ul.querySelectorAll("li").forEach((li) => {

            li.ondragstart = list.dragging;
            li.ondrag = list.dragging;
            li.onmousedown = list.dragging;
        })


        ul.ondrop = list.dragDrop;
        ul.ondragover = list.dragOver;


    })

    noOfItems.forEach((item) => {
        if ([...noOfItems].indexOf(item) == 0) {
            item.style.opacity = "1";
        }
    })
    if (localStorage.getItem("theme") == "light") {
        document.querySelector(".themeStyleSheet").href = "/css/lightTheme.css";
        themes.classList.add("theme-logo-container-clicked")
        clicked = false;
    }
    else if (localStorage.getItem("theme") == "dark") {
        document.querySelector(".themeStyleSheet").href = "/css/darkTheme.css";
        themes.classList.remove("theme-logo-container-clicked")
        clicked = true;


    }
}

setInterval(() => {
    list.updateNoOftasks()
    list.updateLocalStorage();

}
    , 100)


choices.forEach((choice) => {
    let index = Number([...choices].indexOf(choice));

    choice.onclick = () => {
        choices.forEach((choice) => {
            choice.classList.remove("active-choice")
        })
        choice.classList.add("active-choice")
        ui.changeListType(-index);
        noOfItems.forEach((item) => {
            item.style.opacity = "0";
        })
        if (index == 0) {
            noOfItems[0].style.opacity = "1";
        }
        else if (index == 1) {
            noOfItems[1].style.opacity = "1";

        }
        else if (index == 2) {
            noOfItems[2].style.opacity = "1";

        }

    }
})
// task input event
taskForm.onsubmit = (e) => {
    let task = taskInput.value;
    if (task !== " " && task != "") {

        taskInput.value = "";
        list.appendToGeneralList(task);

        // list.appendToActiveList(task);   
        list.updateNoOftasks()
        list.updateLocalStorage();

    }


    e.preventDefault()
}
// crossed task event
checkBtns.forEach((btn) => {
    btn.onclick = ui.crossTask;

})
// clear completed event
document.querySelector(".clear-completed").onclick = (e) => {
    list.clearCompleted()
    list.updateLocalStorage()

    e.preventDefault()
}
uls.forEach((ul) => {
    ul.querySelectorAll("li").forEach(() => {

        lis.querySelector(".close-btn").addEventListener("click", list.removeFromList)


    })
})