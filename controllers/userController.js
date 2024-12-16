const users = [];

// Get all users
exports.getUsers = (req, res) => {
  res.status(200).json(users);
};

// Create a new user
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

// Update an existing user by ID
exports.updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  if (name) users[userIndex].name = name;
  if (email) users[userIndex].email = email;
  
  res.status(200).json(users[userIndex]);
};

// Delete a user by ID
exports.deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  users.splice(userIndex, 1);
  res.status(204).send();
};
