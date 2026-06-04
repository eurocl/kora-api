async function loadProducts(category = '') {

    let endpoint =
        'http://localhost:3001/productos';

    if (category) {

        endpoint +=
            `?category=${category}`;
    }

    const response =
        await fetch(endpoint);

    const products =
        await response.json();

    const grid =
        document.getElementById('product-grid');

    grid.innerHTML = '';

    products.forEach(product => {

        grid.innerHTML += `

            <div class="card">

                <a
                    href="product.html?id=${product.id}">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        $${product.price}
                    </p>

                </a>

            </div>

        `;
    });
}

loadProducts();