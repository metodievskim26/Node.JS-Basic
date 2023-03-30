import path from "node:path";
import { fileURLToPath } from "node:url";
import { v4 as uuid } from "uuid";
import { DataService } from "./services/data.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const trainersPath = path.join(__dirname, "data", "trainers.json");

const saveTrainers = async (trainers) => {
  await DataService.saveJSONFile(trainersPath, trainers);
};

//1. Get all trainers
export const getAllTrainers = async () => {
  const trainers = await DataService.readJSONFIle(trainersPath);
  return trainers;
};

//2. Get trainer by ID
export const getTrainerByID = async (trainerID) => {
  const trainers = await getAllTrainers();
  const foundTrainer = trainers.find((trainer) => trainer.id === trainerID);
  if (!foundTrainer) throw new Error("Trainer not found");
  return foundTrainer;
};

//3. Add trainers

export const addTrainers = async (
  firstName,
  lastName,
  email,
  timeEmployed,
  coursesFinished
) => {
  const trainers = await getAllTrainers();
  const trainer = {
    id: uuid(),
    firstName,
    lastName,
    email,
    isCurrentlyTeaching: false,
    timeEmployed,
    coursesFinished,
  };

  const updatedTrainers = [...trainers, trainer];
  await saveTrainers(updatedTrainers);
  return trainer;
};

//4.Update trainer info

export const updateTrainer = async (trainerID, updateData) => {
  const trainers = await getAllTrainers();
  const foundTrainer = await getTrainerByID(trainerID);

  const updatedTrainer = { ...foundTrainer, ...updateData };
  const updatedTrainers = trainers.map((trainer) =>
    trainer.id === updatedTrainer.id ? updatedTrainer : trainer
  );
  await saveTrainers(updatedTrainers);
  return updatedTrainer;
};

//5.Delete trainer

export const deleteTrainer = async (trainerID) => {
  const trainers = await getAllTrainers();
  const updatedTrainers = trainers.filter(
    (trainer) => trainer.id !== trainerID
  );
  if (updatedTrainers.length === trainers.length)
    throw new Error("Trainer not found");
  await saveTrainers(updatedTrainers);
};

//6.Delete all trainers

export const deleteAllTrainers = async () => {
  await saveTrainers([]);
};
