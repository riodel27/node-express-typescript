import { Service, Inject } from "typedi";
import argon2 from "argon2";

import { IUser, IUserInputDTO } from "../interfaces/IUser";
import { randomBytes } from "crypto";

@Service()
export default class UserService {
  constructor(
    @Inject("userModel") private user: any,
    @Inject("logger") private logger: any
  ) {}

  public async GetUser(id: String): Promise<IUser> {
    try {
      await this.user.findOne({ _id: id });

      return {
        _id: "string",
        name: "string",
        email: "string",
        password: "string",
        salt: "string",
      };
    } catch (e) {
      /**
       * @TODO: how to handle database error like duplicate key. ex. email uniqueness
       */
      this.logger.error(e);
      throw e;
    }
  }

  public async UpdateUser(
    id: String,
    userInput: IUserInputDTO
  ): Promise<IUser> {
    try {
      if (userInput.email) {
        const existingUserEmail = await this.user.findOne({
          email: userInput.email,
        });

        if (existingUserEmail && existingUserEmail.id !== id)
          throw new Error("User with this email already exists");
      }

      const salt = randomBytes(32);

      const hashPassword =
        userInput.password &&
        userInput.password.trim() &&
        (await argon2.hash(userInput.password, { salt }));

      const user = await this.user.findOneAndUpdate(
        { _id: id },
        {
          ...userInput,
          ...(hashPassword && {
            salt: salt.toString("hex"),
            password: hashPassword,
          }),
        },
        { new: true }
      );

      return user;
    } catch (e) {
      /**
       * @TODO: how to handle database error like duplicate key. ex. email uniqueness
       */
      this.logger.error(e);
      throw e;
    }
  }
}
