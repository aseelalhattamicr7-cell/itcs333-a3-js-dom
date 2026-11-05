// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const errorMsg = document.getElementById("error-msg");
const counter = document.getElementById("counter");

const filterAll = document.getElementById("filter-all");
const filterActive = document.getElementById("filter-active");
const filterDone = document.getElementById("filter-done");

let currentFilter = "all";


form.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = input.value.trim();

    if (taskText === "") {
        errorMsg.classList.remove("hidden");
        return;
    }

    errorMsg.classList.add("hidden");

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.className = "item-text";
    span.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";

    li.appendChild(span);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    input.value = "";

    updateCounter();
    applyFilter();
});


todoList.addEventListener("click", function(event) {

    const li = event.target.parentElement;

    
    if (event.target.classList.contains("delete-btn")) {
        li.remove();
    }

    
    else if (event.target.classList.contains("item-text")) {
        li.classList.toggle("completed");
    }

    updateCounter();
    applyFilter();
});


function updateCounter() {
    const tasks = todoList.children;
    let count = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].classList.contains("completed")) {
            count++;
        }
    }

    counter.textContent = count + " items left";
}


function applyFilter() {
    const tasks = todoList.children;

    for (let i = 0; i < tasks.length; i++) {

        const isDone = tasks[i].classList.contains("completed");

        if (currentFilter === "all") {
            tasks[i].style.display = "";
        }
        else if (currentFilter === "active") {
            tasks[i].style.display = isDone ? "none" : "";
        }
        else if (currentFilter === "done") {
            tasks[i].style.display = isDone ? "" : "none";
        }
    }
}


filterAll.addEventListener("click", function() {
    currentFilter = "all";
    applyFilter();
});


filterActive.addEventListener("click", function() {
    currentFilter = "active";
    applyFilter();
});


filterDone.addEventListener("click", function() {
    currentFilter = "done";
    applyFilter();
});