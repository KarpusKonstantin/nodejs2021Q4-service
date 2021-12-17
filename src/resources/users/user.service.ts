import { StatusCodes } from 'http-status-codes';

import usersRepository from './user.memory.repository';
import { setUserIdToNull } from '../tasks/task.memory.repository';

const getAllUsers = () => usersRepository.getAllUsers();
const getUserById =  (id) => usersRepository.getUserById(id);
const createUser =  (userData) => usersRepository.createUser(userData);
const updateUser =  (id, userData) =>  usersRepository.updateUser(id, userData);

const deleteUser = (id) => {
  const result = usersRepository.deleteUser(id);

  setUserIdToNull(id);

  return { code: StatusCodes.OK, message: result.message }
}


export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
