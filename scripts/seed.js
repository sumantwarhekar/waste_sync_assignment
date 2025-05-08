const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const categories = ['electronics', 'clothing', 'books', 'home', 'beauty'];
const tenants = ['amazon', 'walmart', 'target', 'bestbuy', 'flipkart'];

async function seed() {
  try {
    await client.connect();
    const db = client.db('waste_sync'); // DB name
    const collection = db.collection('products');

    // Optional: Clear existing data
    await collection.deleteMany({});

    const products = [];

    for (let i = 0; i < 1000; i++) {
      products.push({
        name: faker.commerce.productName(),
        category: faker.helpers.arrayElement(categories),
        tenant: faker.helpers.arrayElement(tenants),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        createdAt: new Date(),
      });
    }

    const result = await collection.insertMany(products);
    console.log(`Inserted ${result.insertedCount} products.`);
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await client.close();
  }
}

seed();
