document.getElementById('cropForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const location = document.getElementById('location').value;
    const soilMoisture = document.getElementById('soilMoisture').value;
    const soilPH = document.getElementById('soilPH').value;

    document.getElementById('recommendation').innerHTML = 'Fetching recommendation...';

    try {
        // Example API call to ML model
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                location: location,
                soil_moisture: soilMoisture,
                soil_ph: soilPH
            })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('recommendation').innerHTML = `Recommended Crop: ${data.recommended_crop}`;
        } else {
            document.getElementById('recommendation').innerHTML = 'Error: ' + data.message;
        }
    } catch (error) {
        console.error(error);
        document.getElementById('recommendation').innerHTML = 'Failed to fetch recommendation. Please try again.';
    }
});
