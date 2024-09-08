export class BackendManager {
    static apiUrl = 'http://localhost:3000/api/';

    static async getTasks(){
        const tasks = await fetch(this.apiUrl + 'tasks', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const tasksJson = await tasks.json();
        return this.formatTasksDates(tasksJson);
    }

    static async createTask(task){
        const taskResult = await fetch(this.apiUrl + 'tasks', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        const taskJson = await taskResult.json();
        return taskJson.id;
    }

    static async editTask(task){
        const putUrl = this.apiUrl + 'tasks/' + task.id;
        const taskResult = await fetch(putUrl, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        const taskJson = await taskResult.json();
        return taskJson.id;
    }

    static getAssignees(tasks){
        return tasks.map(t => t.assignedTo);
    }

    static formatTasksDates(tasks){
        tasks.forEach(task => {
            if(task.endDate){
                task.dueDateFTD = this.convertDate(task.endDate);
            }
        });

        return tasks;
    }

    static convertDate(dateVal){
        const splitDate = dateVal.split('/');
        const day = splitDate[0];
        const month = splitDate[1];
        const year = splitDate[2];

        return `${year}-${month}-${day}`;
    }

    static reverseDate(dateVal){
        const splitDate = dateVal.split('-');
        const day = splitDate[2];
        const month = splitDate[1];
        const year = splitDate[0];

        return `${day}/${month}/${year}`;
    }
}