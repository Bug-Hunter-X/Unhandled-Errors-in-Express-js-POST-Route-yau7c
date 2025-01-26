const express = require('express');
const app = express();
app.use(express.json());
app.post('/users', (req, res) => {
  const user = req.body;
  // Validate request body
  if (!user || !user.name || !user.email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  try {
    //Attempt to parse numerical data
    user.age = parseInt(user.age);
    if (isNaN(user.age)){
      return res.status(400).json({error: "Age must be a number"})
    }
  } catch (error) {
    return res.status(400).json({ error: 'Invalid age format' });
  }
  console.log('Creating user:', user);
  res.status(201).json({ message: 'User created successfully', user });
}).catch(err => {
  console.error('Error creating user:', err);
  res.status(500).json({ error: 'Failed to create user' });
});
app.listen(3000, () => console.log('Server listening on port 3000'));