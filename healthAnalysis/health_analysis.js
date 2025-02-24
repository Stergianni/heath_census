// Ensure the script runs only after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Variable Initialization (Declared only once)
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

    // Function to reset the form fields
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

        // Loop through patient data
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

    // Function to search for a health condition
    function searchCondition() {
        const input = document.getElementById('conditionInput').value.toLowerCase();
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';

        fetch('health_analysis.json')
            .then(response => response.json())
            .then(data => {
                const condition = data.conditions.find(item => item.name.toLowerCase() === input);

                if (condition) {
                    const symptoms = condition.symptoms.join(', ');
                    const prevention = condition.prevention.join(', ');
                    const treatment = condition.treatment;

                    resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
                    resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="${condition.name} Image" width="200">`;
                    resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
                    resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
                    resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
                } else {
                    resultDiv.innerHTML = '<p style="color:red;">Condition not found.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                resultDiv.innerHTML = '<p style="color:red;">An error occurred while fetching data.</p>';
            });
    }

    // Ensure the buttons exist before adding event listeners
    if (addPatientButton) {
        addPatientButton.addEventListener("click", addPatient);
    } else {
        console.error("Error: 'addPatient' button not found in the HTML.");
    }

    if (btnSearch) {
        btnSearch.addEventListener('click', searchCondition);
    } else {
        console.error("Error: 'btnSearch' button not found in the HTML.");
    }
});
