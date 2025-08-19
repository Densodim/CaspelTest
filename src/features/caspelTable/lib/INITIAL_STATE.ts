import { v4 as uuidv4 } from "uuid"

export const INITIAL_STATE = [
  {
    id: uuidv4(),
    lastName: "Snow",
    firstName: "Jon",
    age: 14,
    data: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    lastName: "Lannister",
    firstName: "Cersei",
    age: 31,
    data: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    lastName: "Lannister",
    firstName: "Jaime",
    age: 31,
    data: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    lastName: "Stark",
    firstName: "Arya",
    age: 11,
    data: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: 85,
    data: new Date().toISOString(),
  },
]