const btnSearch = document.getElementById('btnSearch');

btnSearch.addEventListener('click', searchRecommendation);

function searchRecommendation() {

    const input = document.getElementById('conditionSearch')
        .value
        .toLowerCase()
        .trim();
    document.getElementById('heroSection').style.display = 'none';
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation.json')
        .then(response => response.json())
        .then(data => {

            let results = [];

            if (input === 'beach' || input === 'beaches') {
                results = data.beaches;
            }

            else if (input === 'temple' || input === 'temples') {
                results = data.temples;
            }

            else if (input === 'country' || input === 'countries') {
                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        results.push(city);
                    });
                });
            }

            else {
                const matchedCountry = data.countries.find(country =>
                    country.name.toLowerCase() === input
                );

                if (matchedCountry) {
                    results = matchedCountry.cities;
                }
            }

            resultDiv.innerHTML = results.length
                ? results.map(place => `
                    <div class="card">
                        <img src="${place.imageUrl}" alt="${place.name}">
                        <h2>${place.name}</h2>
                        <p>${place.description}</p>
                    </div>
                `).join('')
                : `<p>No recommendations found.</p>`;

        })
        .catch(error => {
            console.error(error);
            resultDiv.innerHTML = 'Error loading recommendations.';
        });
}

const btnClear = document.getElementById('btnClear');
btnClear.addEventListener('click', clearResults);

function clearResults() {

    // Clear input field
    document.getElementById('conditionSearch').value = '';

    // Clear results section
    document.getElementById('result').innerHTML = '';

    // Show hero section again
    document.getElementById('heroSection').style.display = 'block';
}