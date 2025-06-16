const User = require('../models/user');
const createUser = ('/', async (req, res) => {
  try{
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  }catch(error){
    res.status(500).json({message: "Error creating user", error});
  }
});

const getUsers = ('/', async (req, res) => {
  try{
    const users = await User.find();
    res.status(200).json(users);
  }catch(error){
    res.status(500).json({message: "Error fetching users", error});
  }
});

const getUser = ('/', async(req, res) => {
  try{
      const user = await User.findById(req.params.id);
      if(!user){
          return res.status(404).json({message: "User not found"});
      }
      res.status(200).json(user);
  }catch(error){
      res.status(500).json({message: 'Error getting User', error});
  }
})

const updateUser = ('/', async(req, res) => {
  try{
      const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
           {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          },
           {new: true}
          );
          if(!updatedUser){
              return res.status(404).json({message: "User not found"});
          }
      res.status(200).json(updatedUser);
  }catch(error){
      res.status(500).json({message: 'Error updating User', error});
  }
})

const deleteUser = ('/', async(req, res) => {
  try{
      const user = await User.findByIdAndDelete(req.params.id);
      if(!user){
          return res.status(404).json({message: "User not found"});
      }
      res.status(200).json({message: "User deleted successfully"});
  }catch(error){
      res.status(500).json({message: 'Error deleting User', error});
  }
});
module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
