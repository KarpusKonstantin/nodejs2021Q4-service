import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import User, { IUser } from './user.model';
import IResultToResponse from '../../common/globalInterafaces';

// const users: IUser[] = [];

/**
 * Check validate User Data
 * @param userData - user data (IUser)
 * @returns IResultToResponse - code = http status code (type is number) and message = string
 */

const validateUserFields = (userData: IUser): IResultToResponse => {
  const result = {code: -1, message: ''}

  if (!userData.name || userData.name === '') {
    return {code: StatusCodes.BAD_REQUEST, message: 'Field [Name] is required. Please fill this field and try again'}
  }

  if (!userData.login || userData.login === '') {
    return {code: StatusCodes.BAD_REQUEST, message: 'Field [login] is required. Please fill this field and try again'}
  }

  if (!userData.password || userData.password === '') {
    return {code: StatusCodes.BAD_REQUEST, message: 'Field [password] is required. Please fill this field and try again'}
  }

  return result;
}

/**
 * Returns all user list
 * @returns IResultToResponse - code = http status code (type is number) and message = user array
 */
const getAllUsers = async (): Promise<IResultToResponse> => {
  const users = await getRepository(User).find();

  return {code: 200, message: users};
};


/**
 * Returns user by ID
 * @param id - user ID
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IUser
 */
const getUserById = async (id: string): Promise<IResultToResponse> => {
  const result = await getRepository(User).findOne(id);

  if (result === undefined) {
    return {code: StatusCodes.NOT_FOUND, message: `User id =  ${id} not found in DB`};

  }

  return {code: StatusCodes.OK, message: result};
};

/**
 * Create new user
 * @param userData - user data (IUser)
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IUser
 */
const createUser = async (userData: IUser): Promise<IResultToResponse> => {
  const result = validateUserFields(userData);

  if (result.code !== -1) {
    return result;
  }

  try {
    const insertResult = await getRepository(User).insert(userData);
    const user = await getRepository(User).findOne(insertResult.identifiers[0].id);

    if (user !== undefined) {
      return { code: StatusCodes.CREATED, message: User.toResponse(user) };
    }

    return {code: StatusCodes.BAD_REQUEST, message: `Error create User object`};


  } catch (e) {
    return {code: StatusCodes.BAD_REQUEST, message: `Error create User object`};
  }
};

/**
 * Update record of board
 * @param id - user id
 * @param userData - user data (IUser)
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IUser
 */
const updateUser = async (id: string, userData: IUser): Promise<IResultToResponse> => {
  const user =  await getRepository(User).findOne(id);

  if (user === undefined) {
    return {code: StatusCodes.NOT_FOUND, message: `User id = ${id} not found in DB`};
  }

  const result = validateUserFields(userData);

  if (result.code !== -1) {
    return result;
  }

  await getRepository(User).update(id, userData);
  const usr = await getRepository(User).findOne(id);

  if (usr !== undefined) {
    return {code: StatusCodes.OK, message: User.toResponse(usr)};
  }

  return {code: StatusCodes.BAD_REQUEST, message: `Error update User object`};
};

/**
 * Delete record of users
 * @param id - user id
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IUser
 */
const deleteUser = async (id: string): Promise<IResultToResponse> => {
  const result =  getRepository(User).findOne(id);

  if (result === undefined) {
    return {code: StatusCodes.BAD_REQUEST, message: `User id ${id} not found in DB`};
  }

  await getRepository(User).delete(id);

  return {code: StatusCodes.NO_CONTENT, message: `User id ${id} was deleted successfully`};
};

const getUserByLoginAndPassword = async (login: string, password: string): Promise<IResultToResponse> => {

  const result = await getRepository(User).findOne({ where: { login }});

  if (result === undefined) {
    return {code: StatusCodes.FORBIDDEN, message: 'Forbidden' };
  }

  const passwordTrue = await bcrypt.compare(password, result.password)

  if (!passwordTrue) {
    return {code: StatusCodes.FORBIDDEN, message: 'Forbidden' };
  }

  return {code: StatusCodes.OK, message: result};
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByLoginAndPassword
};
