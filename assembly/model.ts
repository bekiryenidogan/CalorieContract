import { PersistentUnorderedMap, math, Context, u128} from "near-sdk-as";
import { AccountId, Money } from "./utils";


 export const exercises = new PersistentUnorderedMap<u32, walking>("exercises");
 export const exercisesOwner= new PersistentUnorderedMap<u32, Array<AccountId>>("access")


 @nearBindgen
 export class walking {
    
    id: u32
    name: string
    weight: u32
    hour: u32
    tempo : bool
    price: Money

   //Constructor for default workout

    constructor (name:string,weight:u32,hour:u32,tempo:bool,price:Money){
        
 
        this.id = math.hash32<string>(name);
        this.name=name;
        this.weight= weight;
        this.hour= hour;
        this.tempo= tempo;
        this.price = price;
  
    }

    //Creating new workout for default constructor

    static createWorkout (name:string,weight:u32,hour:u32,tempo:bool,price:Money): walking {
        this.assert_name(name);
        assert(Context.attachedDeposit > u128.One,"You need to attach atleast 1 Near !")
        const workout = new walking(name,weight,hour,tempo,price);
        exercises.set(workout.id,workout);
        return workout;
    }

    // Listing the workouts that created by createWorkout function. 
    static workoutList(offset:u32, limit:u32): walking[] {
        let allWorkouts = exercises.length;
        return exercises.values(offset, offset + allWorkouts);
    }


    //  Lookup a workout in the PersistentUnorderetMap by workout id.
    static findById(id: u32): walking {
        assert(exercises.contains(id),"There is no workout with that id");
        return exercises.getSome(id);
      }

      // Calculating the burned calorie. If there is a tempo true, multiplied by 3 
    static getCalculate (id:u32): string {
        assert(exercises.contains(id),"There is no workout with that id");
        let selectedWorkout = exercises.getSome(id);
        let calorie: u32;
        
        if (selectedWorkout.tempo == true) {
            calorie=selectedWorkout.weight*selectedWorkout.hour*3;
            return `${ calorie } calorie burned. WOW`;
        }else{
            calorie=selectedWorkout.weight*selectedWorkout.hour*2;
            return `${ calorie } calorie burned. WOW`;
            }
    }   

        // Delete a workout with his id
    static deleteWorkout(id: u32): void {
        exercises.delete(id);
      }

    static assert_name(name:string): void {
        assert(!exercises.contains(math.hash32<string>(name)),"You cannot take this name. Please take another one")
      }

    static assert_price(id:u32):void {
        let exercises=this.findById(id);
        assert(exercises.price<=Context.attachedDeposit,"Money is not enough")
      }
 }