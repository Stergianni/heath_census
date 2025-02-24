// Variable Initialization
const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById("btnSearch");
const patients = [];

// Function to add a patient
function addPatient() {
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

    if (name && gender && age && condition) {
        patients.push({ name, gender: gender.value, age, condition });
        resetForm();
        generateReport();
    } else {
        alert("Please fill in all fields before adding a patient.");
    }
}

// Function to reset the form fields after adding a patient
function resetForm() {
    document.getElementById("name").value = "";
    document.querySelectorAll('input[name="gender"]').forEach(radio => radio.checked = false);
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
}

// Event listener for Add Patient button
addPatientButton.addEventListener("click", addPatient);
