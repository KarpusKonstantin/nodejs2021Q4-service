import { StatusCodes } from 'http-status-codes';

import usersRepository from './user.memory.repository';
import { setUserIdToNull } from '../tasks/task.memory.repository';
import IResultToResponse from '../../common/globalInterafaces';
import { IUser } from './user.model';

const getAllUsers = async (): Promise<IResultToResponse> => usersRepository.getAllUsers();
const getUserById =  async (id: string): Promise<IResultToResponse> => usersRepository.getUserById(id);
const createUser =  (userData: IUser): IResultToResponse => usersRepository.createUser(userData);
const updateUser =  (id: string, userData: IUser): IResultToResponse => usersRepository.updateUser(id, userData);

const deleteUser = (id: string): IResultToResponse => {
  const result: IResultToResponse = usersRepository.deleteUser(id);

  setUserIdToNull(id);

  return { code: StatusCodes.OK, message: result.message }
}


export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
