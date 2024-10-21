import { Router } from "express";

import { createTask, findAllTasks, findById, findUserTasks, updateTask, deleteTask } from "../controller/task.controller";

export const taskRouter = Router();

// Create a new task
taskRouter.post("/create", createTask);

// Find all tasks
taskRouter.post("/findAll", findAllTasks);

// Find task by id
taskRouter.get("/findOne", findById);

// Find user tasks
taskRouter.get("/findByUser", findUserTasks);

// Update a task
taskRouter.get("/update", updateTask);

// Delete a tasks
taskRouter.get("/delete", deleteTask);