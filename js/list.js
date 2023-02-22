// const { Utilities } = require("winjs");

class List {
  updateNoOftasks() {
    let allTasksLeft = document.querySelector(".no-of-all-tasks");
    let activeTasksLeft = document.querySelector(".no-of-active-tasks");
    let compltedTasksLeft = document.querySelector(".no-of-completed-tasks");
    // let tasksLeft=document.querySelector(".no-of-items");
    allTasksLeft.innerText = `${
      document.querySelector(".all-tasks").children.length
    }`;
    activeTasksLeft.innerText = `${
      document.querySelector(".active-tasks").children.length
    }`;
    compltedTasksLeft.innerText = `${
      document.querySelector(".completed-tasks").children.length
    }`;
  }
  clearCompleted() {
    document.querySelectorAll("ul").forEach((ul) => {
      ul.querySelectorAll(".li-crossed").forEach((li) => {
        li.style.animationName = "slide-out";
        setTimeout(() => {
          li.remove();
        }, 800);
      });
    });
  }
  removeFromList(e) {
    let listItem;

    listItem = e.target.parentElement.parentElement;

    listItem.style.animationName = "slide-out";
    setTimeout(() => {
      listItem.remove();
    }, 800);

    document.querySelector(".all-tasks").childNodes.forEach((child) => {
      if (child.innerHTML === e.target.parentElement.parentElement.innerHTML) {
        child.style.animationName = "slide-out";
        setTimeout(() => {
          child.remove();
        }, 800);
      }
    });
    document.querySelector(".completed-tasks").childNodes.forEach((child) => {
      if (child.innerHTML === e.target.parentElement.parentElement.innerHTML) {
        child.style.animationName = "slide-out";
        setTimeout(() => {
          child.remove();
        }, 800);
      }
    });

    document.querySelector(".active-tasks").childNodes.forEach((child) => {
      if (child.innerHTML === e.target.parentElement.parentElement.innerHTML) {
        child.style.animationName = "slide-out";
        setTimeout(() => {
          child.remove();
        }, 800);
      }
    });
  }

  appendToGeneralList(input) {
    const ui = new Ui();

    let genList = document.querySelector(".all-tasks");
    let listItem = document.createElement("li");
    listItem.classList.add("task");
    listItem.setAttribute("draggable", "true");

    listItem.innerHTML = `<span class="check-btn checked"><i class="bi bi-check"></i></span> <p class="inner-text">${input}</p><span class="close-btn"><i class="bi bi-x"></i>
        </span>`;
    genList.appendChild(listItem);
    this.appendToActiveList(listItem.cloneNode(true));
    const myCloseBtns = document.querySelectorAll(".close-btn");

    myCloseBtns.forEach((btn) => {
      btn.addEventListener("click", this.removeFromList);
    });
    const checkBtns = document.querySelectorAll(".check-btn");
    checkBtns.forEach((btn) => {
      btn.onclick = ui.crossTask;
    });
  }

  // append to active list
  appendToActiveList(input) {
    let tasksLeft = document.querySelector(".no-of-items");

    const ui = new Ui();
    let activeList = document.querySelector(".active-tasks");
    activeList.appendChild(input);
    const myCloseBtns = document.querySelectorAll(".close-btn");

    myCloseBtns.forEach((btn) => {
      btn.addEventListener("click", this.removeFromList);
    });
    const checkBtns = document.querySelectorAll(".check-btn");
    // make checked tasks disapair from active list and appear in completed tasks while also marking the task in the general list
    checkBtns.forEach((btn) => {
      btn.parentElement.onclick = (e) => {
        if (
          e.target.classList.contains("check-btn") &&
          e.target.parentElement.parentElement.classList.contains(
            "active-tasks"
          )
        ) {
          btn.parentElement.style.animationName = "slide-out";
          setTimeout(() => {
            btn.parentElement.remove();
          }, 800);
          document.querySelector(".all-tasks").childNodes.forEach((child) => {
            if (child.innerText === e.target.parentElement.innerText) {
              child.classList.add("li-crossed");
              child.firstChild.classList.add("check-btn-checked");
            }
          });
        }
      };

      document.querySelector(".completed-tasks").childNodes.forEach((child) => {
        if (child.innerHTML === btn.parentElement.parentElement.innerHTML) {
          child.classList.add("check-btn-checked");
        }
      });
    });
  }

  // append to completed list
  appendToCompletedList(input) {
    const ui = new Ui();

    let completedList = document.querySelector(".completed-tasks");
    completedList.appendChild(input);

    const myCloseBtns = document.querySelectorAll(".close-btn");

    myCloseBtns.forEach((btn) => {
      btn.addEventListener("click", this.removeFromList);
    });
    const checkBtns = document.querySelectorAll(".check-btn");
  }
  updateLocalStorage() {
    const generalTask = [];
    const activeTask = [];
    const completedTask = [];
    document
      .querySelector(".all-tasks")
      .querySelectorAll("li p")
      .forEach((statement) => {
        generalTask.push(statement.innerText);
      });
    document
      .querySelector(".active-tasks")
      .querySelectorAll("li p")
      .forEach((statement) => {
        activeTask.push(statement.innerText);
      });
    document
      .querySelector(".completed-tasks")
      .querySelectorAll("li p")
      .forEach((statement) => {
        completedTask.push(statement.innerText);
      });
    localStorage.setItem("All Tasks", JSON.stringify(generalTask));
    localStorage.setItem("Active Tasks", JSON.stringify(activeTask));
    localStorage.setItem("Completed Tasks", JSON.stringify(completedTask));
  }
  retrieveFromLocalStorage() {
    const generalTasks = JSON.parse(localStorage.getItem("All Tasks"));
    const activeTask = JSON.parse(localStorage.getItem("Active Tasks"));
    const completedTasks = JSON.parse(localStorage.getItem("Completed Tasks"));

    generalTasks.forEach((task) => {
      this.appendToGeneralList(task);
    });
    completedTasks.forEach((task) => {
      document
        .querySelector(".all-tasks")
        .querySelectorAll("li")
        .forEach((genTask) => {
          if (task == genTask.children[1].innerText) {
            genTask.classList.add("task", "li-crossed");
            genTask
              .querySelector(".check-btn")
              .classList.add("check-btn-checked");
            genTask.classList.add("li-crossed");
            // compare with active tasks to remove
            document
              .querySelector(".active-tasks")
              .querySelectorAll("li")
              .forEach((li) => {
                if (li.innerText == task) {
                  li.remove();
                }
              });

            this.appendToCompletedList(genTask.cloneNode(true));
          }
        });
    });

    let lis = document.querySelectorAll("li");
    lis.forEach((li) => {
      li.style.left = "-100%";
    });
    let timeDelay = 0.1;
    lis.forEach((li) => {
      li.style.animationName = "slide-in";
      li.style.animationDelay = `${timeDelay}s`;
      timeDelay += 0.1;
      setTimeout(() => {
        li.style.left = "0%";
      }, 1000);
    });
  }
  dragging(e) {
    e.target.classList.add("dragging");
  }
  dragOver(e) {
    e.preventDefault();
  }
  dragDrop(e) {
    let parent = e.target.parentElement;
    let selectedItem = parent.querySelector(".dragging");
    const parentArr = Array.from(parent.children);
    let selectedItemIndex = parentArr.indexOf(selectedItem);
    selectedItem.style.left = "-100%";
    selectedItem.style.animationDelay = "0";
    if (selectedItem !== null) {
      if (e.target.tagName == "LI" && selectedItem.tagName == "LI") {
        e.target.insertAdjacentElement("beforebegin", selectedItem);
      } else {
        return;
      }
      selectedItem.classList.remove("dragging");
    } else {
      console.log("its null");
      return;
    }
  }
}
