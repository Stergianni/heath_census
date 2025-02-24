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
    
    // Uncheck all gender radio buttons safely
    document.querySelectorAll('input[name="gender"]').forEach(radio => radio.checked = false);
    
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
}

// Function to generate the report
function generateReport() {
    const numPatients = patients.length;
    
    const conditionsCount = {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
    };

    const genderConditionsCount = {
        Male: { Diabetes: 0, Thyroid: 0, "High Blood Pressure": 0 },
        Female: { Diabetes: 0, Thyroid: 0, "High Blood Pressure": 0 },
    };

    // Loop through patient data to count conditions
    for (const patient of patients) {
        conditionsCount[patient.condition]++;
        genderConditionsCount[patient.gender][patient.condition]++;
    }

    // Generate the report
    report.innerHTML = `<h3>Number of Patients: ${numPatients}</h3><br>`;
    report.innerHTML += `<h3>Conditions Breakdown:</h3>`;
    for (const condition in conditionsCount) {
        report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
    }

    report.innerHTML += `<br><h3>Gender-Based Conditions:</h3>`;
    for (const gender in genderConditionsCount) {
        report.innerHTML += `<strong>${gender}:</strong><br>`;
        for (const condition in genderConditionsCount[gender]) {
            report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
        }
    }
}

// Event listener for Add Patient button
addPatientButton.addEventListener("click", addPatient);
