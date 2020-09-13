const db = require("../models");

module.exports = function (app) {

   // finding workout
    app.get("/api/workouts", (req, res) => {
        db.Workout.find().sort({day: -1}).limit(1).then(
            user => {
                console.log(user);
                res.json(user);
            }
        ).catch(error => res.json(error));
    });

    
  app.get("/api/workouts", (req, res) => {
    db.Workout.find().sort({day: -1}).limit(1)
      .then(dbUser => {
        console.log(dbUser);
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  }); 
    //updating a workout
    app.put("/api/workouts/:id", (req,res) => {
        console.log("The added workout is: ", req.body, "workout id: ", req.params.id);
        db.Workout.update(
            {
                _id: req.params.id
            },
            {
                $push: {exercises: req.body}
            },
            (error,updatedExercise) => {
                if (error) {
                    console.log(error);
                    res.json(error);
                } else {
                    console.log(updatedExercise);
                    res.json(updatedExercise);
                }
            }
        );
    });

    //adding new workout
    app.post("/api/workouts", (req,res) => {
      

        let workout = new db.Workout({exercise: req.body});
        db.Workout.create(workout).then(newWorkout => {
            console.log(newWorkout);
            res.json(newWorkout);
        }).catch(error => res.json(error));
    });



    // get all workouts
    app.get("/api/workouts/range", (req,res) => {
        db.Workout.find({}).then(user => {
            console.log(user);
            res.json(user);
        }).catch(error => res.json(error));
    });
};




