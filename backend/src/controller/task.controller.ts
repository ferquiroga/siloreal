// import { Router } from 'express'
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

  
export const findAllTasks = async () => {
    const tasks = await prisma.task.findMany();
    return tasks;
  };

  export const findById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const taskFound = await prisma.task.findFirst({
        where: {
          id: parseInt(id)
        }
      });
      return taskFound;
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  export const findUserTasks = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const taskFound = await prisma.task.findMany({
        where: {
          userId: parseInt(id)
        }
      });
      return taskFound;
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  export const  createTask = async (req: Request, res: Response) => {
    try {
      // get the user data from the request body
      const { title, description, state } = req.body;
  
      // check if user data is provided
      if (!title || !description || !state) {
        return res.status(400).json({
          message: "Please provide all task details",
        });
      }
  
      await prisma.task.create({
        data: { 
          title: title,
          description: description,
          state: state
        }
      });
  
      return res.status(200).json({
        message: "User registered successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  export const  updateTask = async (req: Request, res: Response) => {
    try {
      const { id, title, description, state } = req.body;

      const asignedTask = await prisma.task.update({
        where: {
          id: parseInt(id)
        },
        data: { 
          title: title,
          description: description,
          state: state
        }
      });
      return asignedTask;
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  export const  deleteTask = async (req: Request, res: Response) => {
    try {

      const { id } = req.body;

      const taskDeleted = await prisma.task.delete({
        where: {
          id: parseInt(id)
        }
      });
    
      if (!taskDeleted) {
        throw new Error("Task not found");
      }
    
      return taskDeleted;
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
