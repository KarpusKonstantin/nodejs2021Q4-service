import { StatusCodes } from 'http-status-codes';
import User, { IUser } from './user.model';
import IResultToResponse from '../../common/globalInterafaces';

const users: IUser[] = [];

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
const getAllUsers = (): IResultToResponse => ({code: 200, message: users});


/**
 * Returns user by ID
 * @param id - user ID
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IUser
 */
const getUserById = (id: string): IResultToResponse => {
  const result =  users.filter(item => item.id === id);

  if (result.length === 0) {
    return {code: StatusCodes.NOT_FOUND, message: `User id =  ${id} not found in DB`};

  }

  return {code: StatusCodes.OK, message: result[0]};
};

/**
 * Create new user
 * @param userData - user data (IUser)
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IUser
 */
const createUser = (userData: IUser): IResultToResponse => {
  const result = validateUserFields(userData);

  if (result.code !== -1) {
    return result;
  }

  try {
    const user = new User({...userData});
    users.push(user.get());

    return {code: StatusCodes.CREATED, message: user.get()};

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
const updateUser = (id: string, userData: IUser): IResultToResponse => {
  const user = users.filter(item => item.id === id);

  if (user.length === 0) {
    return {code: StatusCodes.NOT_FOUND, message: `User id = ${id} not found in DB`};
  }

  const result = validateUserFields(userData);

  if (result.code !== -1) {
    return result;
  }

  const index = users.indexOf(user[0]);

  users[index].name = userData.name;
  users[index].login = userData.login;
  users[index].password = userData.password;

  return {code: StatusCodes.OK, message: User.toResponse(users[index])};

};

/**
 * Delete record of users
 * @param id - user id
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IUser
 */
const deleteUser = (id: string): IResultToResponse => {
  const result =  users.filter(item => item.id === id);

  if (result.length === 0) {
    return {code: StatusCodes.BAD_REQUEST, message: `User id ${id} not found in DB`};
  }

  const index = users.indexOf(result[0]);

  if (index > -1) {
    users.splice(index, 1);

    return {code: StatusCodes.NO_CONTENT, message: `User id ${id} was deleted successfully`};
  }

  return {code: StatusCodes.BAD_REQUEST, message: `User id ${id} not found in DB`};
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
