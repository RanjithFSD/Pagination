document.addEventListener("DOMContentLoaded", () => {
    const dataContainer = document.getElementById("data-container");
    const paginationContainer = document.getElementById("pagination");
    const itemsPerPage = 10;
    let currentPage = 1;
    let totalItems = 0;
    let totalPages = 0;
    let data = [];

    // Fetch data from the URL
    fetch("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json")
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            totalItems = data.length;
            totalPages = Math.ceil(totalItems / itemsPerPage);
            displayData();
            createPagination();
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to display data for the current page
    function displayData() {
        dataContainer.innerHTML = ""; // Clear existing data
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = data.slice(start, end);

        pageData.forEach(item => {
            const div = document.createElement("div");
            div.className = "item";
            div.textContent = `ID: ${item.id}, Name: ${item.name}, Email: ${item.email}`;
            dataContainer.appendChild(div);
        });
    }

    // Function to create pagination controls
    function createPagination() {
        paginationContainer.innerHTML = ""; // Clear existing controls

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.className = currentPage === i ? "active" : "";
            button.addEventListener("click", () => {
                currentPage = i;
                displayData();
                createPagination();
            });
            paginationContainer.appendChild(button);
        }
    }
});
