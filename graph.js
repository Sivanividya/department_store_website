async function fetchData() {
    const response = await fetch('http://your-server.com/api/data'); // Adjust this URL
    const data = await response.json();
    return data;
}

async function createChart() {
    const data = await fetchData();

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar', // or 'line', 'pie', etc.
        data: {
            labels: data.map(item => item.label), // Assuming your data has a 'label' field
            datasets: [{
                label: 'Dataset Label',
                data: data.map(item => item.value), // Assuming your data has a 'value' field
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

createChart();
