import * as fs from "node:fs";
import * as path from "node:path";

interface Todo {
  id: number,
  text: string,
  completed: boolean,
  createdAt: string,
  completedAt?: string
}

const STORE_PATH = path.join(process.cwd(),".todo-cli.json");

function loadTodos(): Todo[] {
  try {
    if (!fs.existsSync(STORE_PATH)) return [];
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    return JSON.parse(raw) as Todo[];
  } catch {
    return [];
  }
}


function saveTodos(todos: Todo[]) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(todos, null, 2), "utf-8");
  } catch (error) {
    console.log("Failed to save todo: ", error);
  }
}


function nextId(todos: Todo[]): number {
  const max = todos.reduce((m, t) => Math.max(m, t.id), 0);
  return max + 1;
}

function list() {
  const todos = loadTodos();
  if (todos.length === 0) {
    console.log("No todos yet. Add one with: todo add \"your task\"");
    return;
  }
  console.log("Your Todos:");
  for (const t of todos) {
    const status = t.completed ? "Completed" : "Pending";
    console.log(`[${status}] ${t.id}. ${t.text}`);
  }
}


function add(text: string) {
  if (!text || !text.trim()) {
    console.error("Error: Cannot add empty todo.");
    return;
  }
  const todos = loadTodos();
  const todo: Todo = {
    id: nextId(todos),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  saveTodos(todos);
  console.log(`Added ${todo.id}: ${todo.text}`);
}

function done(idStr: string) {
  const id = Number(idStr);
  if (!Number.isInteger(id) || id <= 0) {
    console.error("Error: Invalid ID.");
    return;
  }
  const todos = loadTodos();
  const t = todos.find((x) => x.id === id);
  if (!t) {
    console.error(`Error: No todo with ID ${id}.`);
    return;
  }
  if (t.completed) {
    console.log(`Todo #${id} is already completed.`);
  } else {
    t.completed = true;
    t.completedAt = new Date().toISOString();
    saveTodos(todos);
    console.log(`Marked #${id} as completed.`);
  }
}

function clearCompleted() {
  const todos = loadTodos();
  const remaining = todos.filter((t) => !t.completed);
  const removed = todos.length - remaining.length;
  if (removed === 0) {
    console.log("No Completed todos to clear");
    return;
  }
  saveTodos(remaining);
  console.log(`Clear the ${removed} Completed todos`);
}



function main() {
  const [, , cmd, ...args] = process.argv;
  switch (cmd) {
    case "add":
      add(args.join(" "));
      break;
    case "list":
      list();
      break;
    case "done":
      done(args[0]);
      break;
    case "clear-completed":
      clearCompleted();
      break;
    default:
      console.log(`Usage:
  ts-node src/index.ts add "task description"
  ts-node src/index.ts list
`);
  }
}

main();
