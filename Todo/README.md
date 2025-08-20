# Todo CLI (TypeScript + Node.js)

A simple **Command-Line Todo App** built using **TypeScript** and **Node.js**.  
It allows you to add tasks, list them, mark them as done, and clear completed tasks.  
All todos are stored locally in a JSON file (`.todo-cli.json`) inside your project directory.

---

## Features

- Add new tasks  
- List all tasks with status (`Pending` or `Completed`)  
- Mark a task as completed  
- Clear all completed tasks  
- Persistent storage using `.todo-cli.json`  

---

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Avi0304/typescript-practice.git
   cd Todo 

2. Install dependencies: 
    ```bash
        npm install
    
3. Run:
    ```bash 
        npx ts-node src/index.ts <command> [args]
    

## Usage:

1. ```bash 
        npx ts-node src/index.ts add "Buy groceries"
    
2. ```bash 
        npx ts-node src/index.ts list
    
3. ```bash 
        npx ts-node src/index.ts done 1
    
4. ```bash 
        npx ts-node src/index.ts clear-completed
    
