document.addEventListener("DOMContentLoaded", function () {
    fetch('https://s3.amazonaws.com/open-to-cors/assignment.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const productMap = new Map(Object.entries(products).map(([productId, product]) => [productId, {
                Subcategory: product.subcategory,
                Title: product.title,
                Price: parseFloat(product.price),
                Popularity: parseInt(product.popularity)
            }]));

            const sortedProducts = [...productMap.entries()].sort((a, b) => b[1].Price - a[1].Price);

            displayProducts(sortedProducts);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayProducts(products) {
    const productListTable = document.getElementById('productListTable');
    const rowHeader = productListTable.insertRow(0);
    createCell(rowHeader, 'Title', true);
    createCell(rowHeader, 'Subcategory', true);
    createCell(rowHeader, 'Price', true);
    createCell(rowHeader, 'Popularity', true);

    products.forEach(([productId, product]) => {
        const rowProduct = productListTable.insertRow(-1);
        createCell(rowProduct, product.Title);
        createCell(rowProduct, product.Subcategory);
        createCell(rowProduct, product.Price.toFixed(2));
        createCell(rowProduct, product.Popularity);
    });
}

function createCell(row, text, isHeader = false) {
    const cell = isHeader ? document.createElement('th') : document.createElement('td');
    cell.textContent = text;
    row.appendChild(cell);
}
