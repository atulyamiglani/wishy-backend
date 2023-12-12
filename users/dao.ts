import model from "./model";
import User from "./user.type";

export const createUser = (user: User) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserByUsername = (username: string) =>
  model.findOne({ username: username });

export const findUserByFirstName = (firstName: string) =>
  model.find({ firstName });

export const findUserByName = (firstName: string, lastName: string) =>
  model.find({ firstName, lastName });

export const findUserByCredentials = (usr: string, pass: string) =>
  model.findOne({ username: usr, password: pass });
export const updateUser = (username: string, user: User) =>
  model.updateOne({ username: username }, { $set: user });

export const deleteUser = (username: string) => model.deleteOne({ username });
