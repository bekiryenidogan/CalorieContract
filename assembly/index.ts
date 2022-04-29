import {  u128 } from "near-sdk-as";
import { walking } from "./model";



export function create_workout(name:string,weight:u32,hour:u32,tempo:bool,price:u128): walking{
  return walking.createWorkout(name,weight,hour,tempo,price);
}

export function showWorkouts(offset:u32,limit:u32): walking[]{
  return walking.workoutList(offset,limit);
}

export function findWorkout (id:u32) :walking{
  return walking.findById(id);
}
export function calculateCalorie (id:u32): string {
  return walking.getCalculate(id);
}

export function del(id: u32): void {
  walking.deleteWorkout(id);
}

