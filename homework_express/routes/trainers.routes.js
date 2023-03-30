import { Router } from "express";
import {
  addTrainers,
  deleteAllTrainers,
  deleteTrainer,
  getAllTrainers,
  getTrainerByID,
  updateTrainer,
} from "../trainers.js";

export const trainerRouter = Router();

//1.Get all trainers
trainerRouter.get("/", async (req, res) => {
  try {
    const trainers = await getAllTrainers();
    return res.json(trainers);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

//2.Get trainers by ID
trainerRouter.get("/:id", async (req, res) => {
  try {
    const trainersID = req.params.id;
    const foundTrainer = await getTrainerByID(trainersID);
    return res.json(foundTrainer);
  } catch (error) {
    console.log(error);
    return res.status(404).send(error.message);
  }
});

//3.Add trainers

trainerRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, timeEmployed, coursesFinished } =
      req.body;
    if (!firstName || !lastName || !email || !timeEmployed || !coursesFinished)
      throw new Error("Invalid trainer data");
    const newTrainer = await addTrainers(
      firstName,
      lastName,
      email,
      timeEmployed,
      coursesFinished
    );
    return res.json(newTrainer);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

//4.Update trainer

trainerRouter.patch("/:id", async (req, res) => {
  try {
    const updateData = req.body;
    const trainerID = req.params.id;

    if (updateData.id) throw new Error("Invalid update");

    const updatedTrainer = await updateTrainer(trainerID, updateData);
    return res.send(updatedTrainer);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

//6. Delete all trainers

trainerRouter.delete("/all", async (req, res) => {
  try {
    await deleteAllTrainers();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

//5. Delete trainer

trainerRouter.delete("/:id", async (req, res) => {
  try {
    const trainerID = req.params.id;
    await deleteTrainer(trainerID);
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(404).send(error.message);
  }
});
