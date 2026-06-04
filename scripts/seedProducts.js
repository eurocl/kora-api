const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/database.db');

const products = [
    ['Essential Tee Black', 'tees', 'Premium oversized cotton t-shirt', 35, 50, 'tee-black.jpg'],
    ['Essential Tee Sand', 'tees', 'Premium oversized cotton t-shirt', 35, 45, 'tee-sand.jpg'],
    ['Essential Tee Stone', 'tees', 'Premium oversized cotton t-shirt', 35, 40, 'tee-stone.jpg'],
    ['Essential Tee Olive', 'tees', 'Premium oversized cotton t-shirt', 35, 35, 'tee-olive.jpg'],
    ['Essential Tee White', 'tees', 'Premium oversized cotton t-shirt', 35, 55, 'tee-white.jpg'],

    ['Linen Overshirt Sand', 'overshirts', 'Lightweight linen overshirt', 75, 20, 'overshirt-sand.jpg'],
    ['Linen Overshirt Black', 'overshirts', 'Lightweight linen overshirt', 75, 18, 'overshirt-black.jpg'],
    ['Linen Overshirt Stone', 'overshirts', 'Lightweight linen overshirt', 75, 15, 'overshirt-stone.jpg'],
    ['Linen Overshirt Clay', 'overshirts', 'Lightweight linen overshirt', 75, 14, 'overshirt-clay.jpg'],
    ['Linen Overshirt Olive', 'overshirts', 'Lightweight linen overshirt', 75, 16, 'overshirt-olive.jpg'],

    ['Minimal Kimono Jacket Black', 'outerwear', 'Japandi inspired kimono jacket', 120, 10, 'kimono-black.jpg'],
    ['Minimal Kimono Jacket Sand', 'outerwear', 'Japandi inspired kimono jacket', 120, 10, 'kimono-sand.jpg'],
    ['Minimal Kimono Jacket Stone', 'outerwear', 'Japandi inspired kimono jacket', 120, 10, 'kimono-stone.jpg'],
    ['Minimal Kimono Jacket Olive', 'outerwear', 'Japandi inspired kimono jacket', 120, 8, 'kimono-olive.jpg'],
    ['Minimal Kimono Jacket Charcoal', 'outerwear', 'Japandi inspired kimono jacket', 120, 7, 'kimono-charcoal.jpg'],

    ['Wide Leg Trousers Black', 'pants', 'Relaxed fit trousers', 85, 20, 'pants-black.jpg'],
    ['Wide Leg Trousers Sand', 'pants', 'Relaxed fit trousers', 85, 20, 'pants-sand.jpg'],
    ['Wide Leg Trousers Stone', 'pants', 'Relaxed fit trousers', 85, 20, 'pants-stone.jpg'],
    ['Wide Leg Trousers Olive', 'pants', 'Relaxed fit trousers', 85, 18, 'pants-olive.jpg'],
    ['Wide Leg Trousers Charcoal', 'pants', 'Relaxed fit trousers', 85, 18, 'pants-charcoal.jpg'],

    ['Relaxed Hoodie Black', 'hoodies', 'Heavyweight minimalist hoodie', 95, 15, 'hoodie-black.jpg'],
    ['Relaxed Hoodie Sand', 'hoodies', 'Heavyweight minimalist hoodie', 95, 15, 'hoodie-sand.jpg'],
    ['Relaxed Hoodie Stone', 'hoodies', 'Heavyweight minimalist hoodie', 95, 15, 'hoodie-stone.jpg'],
    ['Relaxed Hoodie Olive', 'hoodies', 'Heavyweight minimalist hoodie', 95, 15, 'hoodie-olive.jpg'],
    ['Relaxed Hoodie Charcoal', 'hoodies', 'Heavyweight minimalist hoodie', 95, 15, 'hoodie-charcoal.jpg'],

    ['Canvas Tote Bag', 'accessories', 'Minimal everyday tote bag', 25, 30, 'tote.jpg'],
    ['Minimal Cap Black', 'accessories', 'Structured cotton cap', 22, 25, 'cap-black.jpg'],
    ['Minimal Cap Sand', 'accessories', 'Structured cotton cap', 22, 25, 'cap-sand.jpg'],
    ['Linen Scarf Stone', 'accessories', 'Lightweight linen scarf', 30, 20, 'scarf-stone.jpg'],
    ['Utility Crossbody Bag', 'accessories', 'Compact utility bag', 45, 15, 'crossbody.jpg']
];

const query = `
INSERT INTO products (
    name,
    category,
    description,
    price,
    stock,
    image
)
VALUES (?, ?, ?, ?, ?, ?)
`;

let inserted = 0;

products.forEach(product => {
    db.run(query, product, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            inserted++;

            if (inserted === products.length) {
                console.log(`${inserted} productos cargados correctamente`);
                db.close();
            }
        }
    });
});