document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for the goal form
    document.getElementById('goalForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Get the new goal value
        let newGoal = document.getElementById('goal').value;

        // Store the new goal in local storage
        localStorage.setItem('dailyGoal', newGoal);

        // Update the goal message
        let goalMessage = document.getElementById('goalMessage');
        goalMessage.textContent = `New daily goal of ${newGoal} steps added to the goals!`;

        // Clear the form
        document.getElementById('goal').value = "";
    });

    // Add event listener for the log form
    document.getElementById('logForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Get the workout details
        let workoutType = document.getElementById('workoutType').value;
        let duration = parseInt(document.getElementById('duration').value);
        let completion = parseInt(document.getElementById('completion').value);

        // Retrieve existing workouts or initialize an empty array
        let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

        // Add the new workout
        workouts.push({ type: workoutType, duration: duration, completion: completion });

        // Store updated workouts in local storage
        localStorage.setItem('workouts', JSON.stringify(workouts));

        // Update the workout history
        updateWorkoutHistory();

        // Clear the form
        document.getElementById('workoutType').value = "";
        document.getElementById('duration').value = "";
        document.getElementById('completion').value = "";
    });

    // Function to update workout history
    function updateWorkoutHistory() {
        let workoutList = document.getElementById('workoutList');
        workoutList.innerHTML = '';

        let workouts = JSON.parse(localStorage.getItem('workouts'));

        if (workouts && workouts.length > 0) {
            workouts.forEach(function(workout, index) {
                let li = document.createElement('li');
                li.innerHTML = `${workout.type} - ${workout.duration} minutes (${workout.completion}% completed)
                    <button class="deleteButton" onclick="deleteWorkout(${index})">Delete</button>`;
                workoutList.appendChild(li);
            });
        } else {
            workoutList.innerHTML = '<p>No workouts logged yet.</p>';
        }
    }

    // Call the workout history update when the page loads
    updateWorkoutHistory();
});

// Function to delete a workout
function deleteWorkout(index) {
    let workouts = JSON.parse(localStorage.getItem('workouts'));
    workouts.splice(index, 1);
    localStorage.setItem('workouts', JSON.stringify(workouts));

    // Update workout history
    updateWorkoutHistory();
}

// Function to update workout history
function updateWorkoutHistory() {
    let workoutList = document.getElementById('workoutList');
    workoutList.innerHTML = '';

    let workouts = JSON.parse(localStorage.getItem('workouts'));

    if (workouts && workouts.length > 0) {
        workouts.forEach(function(workout, index) {
            let li = document.createElement('li');
            li.innerHTML = `${workout.type} - ${workout.duration} minutes (${workout.completion}% completed)
                <button class="deleteButton" onclick="deleteWorkout(${index})">Delete</button>`;
            workoutList.appendChild(li);
        });
    } else {
        workoutList.innerHTML = '<p>No workouts logged yet.</p>';
    }
}