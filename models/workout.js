const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workout_schema = new Schema(

{
    day: {
        type: Date,
        default: () => new Date()
    },

    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Exercise type is required"
            },
            
            name: {
                type: String,
                trim: true,
                required: "Exercise name is required"
            },

            duration: {
                type: Number,
                required: "Workout duration is required"
            },

            weight: {
                type: Number
                // do not add required here because it is not needed for cardio workout
            },

            reps: {
                type: Number
                // the  same case here not required for cardio
            },

            sets: {
                type: Number
                // the same case here not required for cardio
            },

            distance: {
                type: Number
                // cant make it required because it's only needed for cardio
            }
            
        }
    ]
},
{
    toJSON: {
        // allowing virtual properties when the data is requested
        //apply virtual getters (can override getters option)
        virtuals: true
    }
}
    
);


// adds a dynamic property to schema 
workout_schema.virtual("totalDuration").get(function() {
    //combining the sunm of the workout duration with reduce array function
    return this.exercises.reduce((total, exercise) => {  return total + exercise.duration;}, 0);
  });

const Workout = mongoose.model("Workout", workout_schema);
module.exports = Workout;