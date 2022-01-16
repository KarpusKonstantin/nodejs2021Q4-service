import { StatusCodes } from 'http-status-codes';

import usersRepository from './user.memory.repository';
import { setUserIdToNull } from '../tasks/task.memory.repository';
import IResultToResponse from '../../common/globalInterafaces';
import { IUser } from './user.model';


/**
 * Returns all user list
 * @returns IResultToResponse - code = http status code (type is number) and message = user list
 */
const getAllUsers = (): Promise<IResultToResponse> => usersRepository.getAllUsers();


/**
 * Returns user by ID
 * @param id - user ID
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IUser
 */
const getUserById =  (id: string): Promise<IResultToResponse> => usersRepository.getUserById(id);


/**
 * Create new user
 * @param userData - user data (IUser)
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IUser
 */
const createUser =  (userData: IUser): Promise<IResultToResponse> => usersRepository.createUser(userData);


/**
 * Update record of board
 * @param id - user id
 * @param userData - user data (IUser)
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IUser
 */
const updateUser =  (id: string, userData: IUser): Promise<IResultToResponse> => usersRepository.updateUser(id, userData);

/**
 * Delete record of users and set to null all links in tasks
 * @param id - user id
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IUser
 */
const deleteUser = async (id: string): Promise<IResultToResponse> => {
  const result: IResultToResponse = await usersRepository.deleteUser(id);

  await setUserIdToNull(id);

  return { code: StatusCodes.OK, message: result.message }
}


export default {
   getAllUsers,
   getUserById,
   createUser,
   updateUser,
   deleteUser
};
