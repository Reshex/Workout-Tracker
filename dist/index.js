var exercisesArray = [];
var editMode = false;
var counter = 1;
var Workout = /** @class */ (function () {
    function Workout(name, date, duration, exercisesArray) {
        this.name = name;
        this.date = date;
        this.duration = duration;
        Workout.newId++;
        this.id = Workout.newId;
        this.exercises = exercisesArray;
    }
    Workout.newId = 0;
    return Workout;
}());
var Exercises = /** @class */ (function () {
    function Exercises(name, sets, reps, weight) {
        this.name = name;
        this.sets = sets;
        this.reps = reps;
        this.weight = weight;
        Exercises.newId++;
        this.id = Exercises.newId;
    }
    Exercises.newId = 0;
    return Exercises;
}());
function addWorkout(event) {
    event.preventDefault();
    var form = document.querySelector(".form ");
    var pendingExercisesDiv = document.querySelector(".pending-exercises");
    var workoutName = document.querySelector(".form__workout-name").value;
    var workoutDate = document.querySelector(".form__workout-date").value;
    var workoutDuration = Number(document.querySelector(".form__workout-duration").value);
    var workout = new Workout(workoutName, workoutDate, workoutDuration, exercisesArray);
    workoutBoxTemplate(workout);
    exercisesArray = [];
    form.reset();
    pendingExercisesDiv.textContent = "";
    counter = 1;
}
function workoutBoxTemplate(workout) {
    var workoutBoxesDiv = document.querySelector(".workout-details");
    var existingWorkoutBox = document.getElementById(workout.id.toString());
    var workoutBox = document.createElement("div");
    workoutBox.classList.add("workout-box");
    var workoutBoxDetails = document.createElement("div");
    workoutBoxDetails.classList.add("workout-box-details");
    var workoutName = document.createElement("p");
    var workoutDate = document.createElement("p");
    var workoutDuration = document.createElement("p");
    var deleteButton = createButton("deleteButton", "Delete", function (event) { return deleteExercise(event); });
    var editButton = createButton("editButton", "Edit", function (event) { return editWorkout(event, workoutBox, workout, deleteButton); });
    workoutName.textContent = workout.name;
    workoutDate.textContent = workout.date;
    workoutDuration.textContent = workout.duration + " Mins";
    if (existingWorkoutBox) {
        existingWorkoutBox.replaceWith(workoutBox);
    }
    else {
        workoutBoxesDiv.appendChild(workoutBox);
    }
    workoutBox.appendChild(workoutName);
    workoutBox.appendChild(workoutDate);
    workoutBox.appendChild(workoutBoxDetails);
    workoutExerciseInBox(workout, workoutBox);
    workoutBox.appendChild(workoutDuration);
    workoutBox.appendChild(deleteButton);
    workoutBox.appendChild(editButton);
    workoutBox.id = workout.id.toString();
    workoutBoxesDiv.appendChild(workoutBox);
}
function addPendingExercise() {
    var exerciseNameInput = document.querySelector(".form__exercise-name");
    var exerciseSetsInput = document.querySelector(".form__exercise-sets");
    var exerciseRepsInput = document.querySelector(".form__exercise-reps");
    var exerciseWeightInput = document.querySelector(".form__exercise-weight");
    var exerciseName = exerciseNameInput.value;
    var exerciseSets = Number(exerciseSetsInput.value);
    var exerciseReps = Number(exerciseRepsInput.value);
    var exerciseWeight = Number(exerciseWeightInput.value);
    var exercise = new Exercises(exerciseName, exerciseSets, exerciseReps, exerciseWeight);
    exercisesArray.push(exercise);
    exercisesPendingTemplate(exercise);
    exerciseNameInput.value = '';
    exerciseSetsInput.value = '';
    exerciseRepsInput.value = '';
    exerciseWeightInput.value = '';
}
function exercisesPendingTemplate(exercises) {
    var pendingExercisesDiv = document.querySelector(".pending-exercises");
    var exercisesToAddArea = document.createElement("div");
    exercisesToAddArea.className = "exercises-to-add";
    var exerciseAddH3 = document.createElement("h3");
    var exerciseDivElement = document.createElement("div");
    exerciseDivElement.id = exercises.id.toString();
    var exerciseDetails = document.createElement("p");
    var removeExercise = createButton("deleteExercise", "Remove", function (event) { return deleteExercise(event); });
    exerciseAddH3.textContent = "Exercise: " + counter;
    exerciseDetails.textContent = exercises.name + " (" + exercises.sets + " X " + exercises.reps + ") Weight: " + exercises.weight + " kg";
    exerciseDivElement === null || exerciseDivElement === void 0 ? void 0 : exerciseDivElement.appendChild(exerciseAddH3);
    exerciseDivElement === null || exerciseDivElement === void 0 ? void 0 : exerciseDivElement.appendChild(exerciseDetails);
    exerciseDivElement === null || exerciseDivElement === void 0 ? void 0 : exerciseDivElement.appendChild(removeExercise);
    exercisesToAddArea === null || exercisesToAddArea === void 0 ? void 0 : exercisesToAddArea.appendChild(exerciseDivElement);
    pendingExercisesDiv === null || pendingExercisesDiv === void 0 ? void 0 : pendingExercisesDiv.appendChild(exercisesToAddArea);
    counter++;
}
function workoutExerciseInBox(workout, workoutBox) {
    var excersicesAreaDiv = document.createElement("div");
    excersicesAreaDiv.classList.add("excersices-area-div");
    workout.exercises.forEach(function (exercise) {
        var workoutExercises = document.createElement("p");
        var exerciseWithButtonsDiv = document.createElement("div");
        exerciseWithButtonsDiv.classList.add("exerciseWithButtonsDiv");
        var changeExercises = createButton("changeExercise", "Change", function (event) { return changeWorkoutInBox(event, workout, exercise.id); });
        var xExercise = createButton("xExercise", "X", function (event) { return deleteExercise(event); });
        workoutExercises.textContent = exercise.name + " (" + exercise.sets + " X " + exercise.reps + ") Weight: " + exercise.weight + " kg";
        exerciseWithButtonsDiv.appendChild(workoutExercises);
        exerciseWithButtonsDiv.appendChild(changeExercises);
        exerciseWithButtonsDiv.appendChild(xExercise);
        excersicesAreaDiv.appendChild(exerciseWithButtonsDiv);
    });
    workoutBox.appendChild(excersicesAreaDiv);
}
function changeWorkoutInBox(event, workout, exerciseId) {
    var target = event.target;
    var parentElement = target.parentElement;
    var pExercise = parentElement.firstChild;
    var exerciseNameInput = document.querySelector(".form__exercise-name").value;
    var exerciseSetsInput = Number(document.querySelector(".form__exercise-sets").value);
    var exerciseRepsInput = Number(document.querySelector(".form__exercise-reps").value);
    var exerciseWeightInput = Number(document.querySelector(".form__exercise-weight").value);
    if (target) {
        pExercise.textContent = exerciseNameInput + " (" + exerciseSetsInput + " X " + exerciseRepsInput + ") Weight: " + exerciseWeightInput + " kg";
        var exerciseToUpdate = workout.exercises.find(function (exercise) { return exercise.id === exerciseId; });
        if (exerciseToUpdate) {
            exerciseToUpdate.name = exerciseNameInput;
            exerciseToUpdate.sets = exerciseSetsInput;
            exerciseToUpdate.reps = exerciseRepsInput;
            exerciseToUpdate.weight = exerciseWeightInput;
        }
    }
}
function deleteExercise(event) {
    var _a;
    var target = event.target;
    var parentElement = target.parentElement;
    if (parentElement) {
        var exerciseId_1 = parseInt(parentElement.id);
        exercisesArray = exercisesArray.filter(function (exercise) { return exercise.id !== exerciseId_1; });
        (_a = parentElement.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove("exercises-to-add");
        parentElement.remove();
    }
}
function editWorkout(event, workoutBox, workout, deleteButton) {
    var xExercise = document.querySelectorAll(".xExercise");
    var changeExercise = document.querySelectorAll(".changeExercise");
    var target = event.target;
    if (target && !editMode) {
        target.classList.add("hidden");
        deleteButton.classList.add("hidden");
        xExercise.forEach(function (button) { return button.style.display = "flex"; });
        changeExercise.forEach(function (button) { return button.style.display = "flex"; });
        var updateButton_1 = createButton("updateButton", "Update", function (event) { return updateButtonHandler(event, workout, target, cancelButton_1, updateButton_1, workoutBox); });
        var cancelButton_1 = createButton("cancelButton", "Cancel", function () { return cancelButtonHandler(target, cancelButton_1, updateButton_1, workoutBox); });
        var nameInput = createInput("text", "workout-name temp-input", workout.name, "Workout Name");
        var dateInput = createInput("date", "workout-date temp-input", workout.date, "Date");
        var durationInput = createInput("number", "workout-duration temp-input", workout.duration.toString(), "Duration");
        workoutBox.appendChild(nameInput);
        workoutBox.appendChild(dateInput);
        workoutBox.appendChild(durationInput);
        workoutBox.appendChild(updateButton_1);
        workoutBox.appendChild(cancelButton_1);
        editMode = true;
    }
}
function updateButtonHandler(event, workout, editButton, cancelButton, updateButton, workoutBox) {
    event.preventDefault();
    var newWorkoutName = document.querySelector(".workout-box input[type='text']").value;
    var newWorkoutDate = document.querySelector(".workout-box input[type='date']").value;
    var newWorkoutDuration = Number(document.querySelector(".workout-box input[type='number']").value);
    workout.name = newWorkoutName;
    workout.date = newWorkoutDate;
    workout.duration = newWorkoutDuration;
    workoutBoxTemplate(workout);
    cancelButtonHandler(editButton, cancelButton, updateButton, workoutBox);
}
function cancelButtonHandler(editButton, cancelButton, updateButton, workoutBox) {
    var tempInputs = workoutBox.querySelectorAll(".temp-input");
    var deleteButton = workoutBox.querySelector(".deleteButton");
    var xExercise = document.querySelectorAll(".xExercise");
    var changeExercise = document.querySelectorAll(".changeExercise");
    tempInputs.forEach(function (input) { return input.remove(); });
    deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.classList.remove("hidden");
    xExercise.forEach(function (button) { return button.style.display = "none"; });
    changeExercise.forEach(function (button) { return button.style.display = "none"; });
    editButton.classList.remove("hidden");
    cancelButton.remove();
    updateButton.remove();
    editMode = false;
}
function createButton(className, value, clickHandler) {
    var button = document.createElement("input");
    button.type = "button";
    button.className = className;
    button.value = value;
    button.addEventListener("click", clickHandler);
    return button;
}
function createInput(type, className, value, placeholder) {
    var input = document.createElement("input");
    input.type = type;
    input.className = className;
    input.value = value;
    input.placeholder = placeholder;
    return input;
}
// add navbar with two pages
// add another entity with recommended excersices
// add local storage
