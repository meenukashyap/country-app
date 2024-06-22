document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries';
    const countryContainer = document.getElementById('country-container');
    const sortSelect = document.getElementById('sort');

    sortSelect.addEventListener('change', () => {
        fetchCountries(sortSelect.value);
    });

    async function fetchCountries(order = 'asc') {
        try {
            const response = await fetch(`${API_URL}?sort=population&order=${order}`);
            const data = await response.json();
            displayCountries(data.data);
        } catch (error) {
            console.error('Error fetching country data:', error);
        }
    }

    function displayCountries(countries) {
        countryContainer.innerHTML = '';
        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.classList.add('country-card');
            
            countryCard.innerHTML = `
                <h2>${country.name}</h2>
                <p>Population: ${country.population}</p>
                <p>Region: ${country.region}</p>
                <p>Capital: ${country.capital}</p>
            `;
            
            countryContainer.appendChild(countryCard);
        });
    }

    // Initial fetch
    fetchCountries();
});
