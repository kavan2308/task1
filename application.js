document.addEventListener("DOMContentLoaded", function () {
    fetch('https://s3.amazonaws.com/open-to-cors/assignment.json')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => b.Popularity - a.Popularity);
            displayProducts(data);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayProducts(products) {
    const productListDiv = document.getElementById('productList');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `<strong>Title:</strong> ${product.Title}, <strong>Price:</strong> ${product.Price.toFixed(2)}`;
        productListDiv.appendChild(productDiv);
    });
}
