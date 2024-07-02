const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index'); // Adjust the path as per your project structure
const User = require('../models/User'); // Adjust the path as per your project structure
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const jwtSecret = process.env.PRIVATE_TOKEN_KEY; // Ensure this matches your setup in .env

// Example test user data
const testUser = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: 'testpassword',
};

// Connect to MongoDB before running tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
});

// Clear users collection in MongoDB after each test
afterEach(async () => {
  await User.deleteMany({});
});

// Disconnect from MongoDB after all tests are done
afterAll(async () => {
  await mongoose.disconnect();
});

describe('User API - Register and Login', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send(testUser)
      .expect(201);

    // Assert that the response body contains the expected properties
    expect(response.body.user).toBeDefined();
    expect(response.body.user.name).toBe(testUser.name);
    expect(response.body.user.email).toBe(testUser.email);

    // Verify that user is actually saved in the database
    const user = await User.findOne({ email: testUser.email });
    expect(user).toBeDefined();
    expect(user.name).toBe(testUser.name);
    expect(user.email).toBe(testUser.email);
  });

  it('should not register a user with duplicate email', async () => {
    // Create a user with the same email
    await User.create(testUser);

    // Try to register another user with the same email
    await request(app)
      .post('/auth/register')
      .send(testUser)
      .expect(500); // Assuming server responds with 500 for duplicate email
  });

  it('should login an existing user', async () => {
    // Hash the password for comparison
    const hashedPassword = await bcrypt.hash(testUser.password, saltRounds);

    // Create a user in the database
    await User.create({
      name: testUser.name,
      email: testUser.email,
      password: hashedPassword,
    });

    // Attempt to login with valid credentials
    const response = await request(app)
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password })
      .expect(200);

    // Assert that the response body contains a token
    expect(response.body.token).toBeDefined();

    // Verify the token by decoding it
    const decoded = jwt.verify(response.body.token, jwtSecret);
    expect(decoded.userId).toBeDefined();
  });

  it('should not login with incorrect password', async () => {
    // Hash the password for comparison
    const hashedPassword = await bcrypt.hash(testUser.password, saltRounds);

    // Create a user in the database
    await User.create({
      name: testUser.name,
      email: testUser.email,
      password: hashedPassword,
    });

    // Attempt to login with incorrect password
    await request(app)
      .post('/auth/login')
      .send({ email: testUser.email, password: 'incorrectpassword' })
      .expect(403); // Assuming server responds with 403 for incorrect password
  });

  it('should not login with non-existent user', async () => {
    // Attempt to login with non-existent user
    await request(app)
      .post('/auth/login')
      .send({ email: 'nonexistentuser@example.com', password: 'testpassword' })
      .expect(404); // Assuming server responds with 404 for non-existent user
  });
});
