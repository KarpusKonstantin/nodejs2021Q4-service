import { StatusCodes } from 'http-status-codes';

import usersRepository from './user.memory.repository';
import { setUserIdToNull } from '../tasks/task.memory.repository';
import IResultToResponse from '../../common/globalInterafaces';
import { IUser } from './user.model';

const getAllUsers = async (): Promise<IResultToResponse> => usersRepository.getAllUsers();
const getUserById =  async (id: string): Promise<IResultToResponse> => usersRepository.getUserById(id);
const createUser =  async (userData: IUser): Promise<IResultToResponse>=> usersRepository.createUser(userData);
const updateUser =  async (id: string, userData: IUser): Promise<IResultToResponse> =>  usersRepository.updateUser(id, userData);

const deleteUser = (id: string): IResultToResponse => {
  const result: IResultToResponse = usersRepository.deleteUser(id);

  setUserIdToNull(id);

  return { code: StatusCodes.OK, message: result.message }
}


export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
