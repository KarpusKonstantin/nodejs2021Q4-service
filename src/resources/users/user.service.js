const { StatusCodes } = require('http-status-codes');

const usersRepository = require('./user.memory.repository');
const { setUserIdToNull } = require('../tasks/task.memory.repository');

const getAllUsers = () => usersRepository.getAllUsers();
const getUserById =  (id) => usersRepository.getUserById(id);
const createUser =  (userData) => usersRepository.createUser(userData);
const updateUser =  (id, userData) =>  usersRepository.updateUser(id, userData);

const deleteUser = (id) => {
  const result = usersRepository.deleteUser(id);

  setUserIdToNull(id);

  return { code: StatusCodes.OK, message: result.message }
}


module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
