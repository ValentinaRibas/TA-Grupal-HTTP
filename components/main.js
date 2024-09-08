import { TaskModal } from "./taskModal.js";
import { TaskColumns } from "./kanbanColumns.js";

document.addEventListener("DOMContentLoaded", () => {
    const tasks = [];
    const assignedToList = ["Rodrigo Lujambio", "Michel Sampil", "Jose Abadie"];

    async function getData() {
        const url = "http://localhost:3000/api/tasks";
        try {
        const response = await fetch(url);

        if (!response.ok) {
            console.log(response.status);
        }

        const json = await response.json();
        tasks.push(...json);

        taskColumns.renderColumns();
        } catch (error) {
        console.error(error.message);
        }
    }

    const taskModal = new TaskModal(
        document.getElementById("task-modal"),
        document.getElementById("task-form"),
        tasks,
        () => taskColumns.renderColumns(),
        assignedToList
    );

    const taskColumns = new TaskColumns(
        document.getElementById("task-columns"),
        tasks,
        taskModal
    );

    getData();

    document.getElementById("new-task-button").addEventListener("click", () => {
        taskModal.openModal("Nueva Tarea");
    });

    // Event listener for the new task form
    const themeSwitch = document.getElementById("dark-mode-switch");
    const htmlElement = document.documentElement;

    // Event listener for the theme switch
    themeSwitch.addEventListener("change", () => {
        if (themeSwitch.checked) {
            htmlElement.setAttribute("data-theme", "dark");
        } else {
            htmlElement.setAttribute("data-theme", "light");
        }
    });

    // Checks the theme switch based on the data-theme attribute
    if (htmlElement.getAttribute("data-theme") === "dark") {
        themeSwitch.checked = true;
    }
});
