import argon2 from "argon2";

export interface PasswordHelper {
  verifyPassword(hashedPassword: string, plainPassword: string): Promise<boolean>;
  hashPassword(plainPassword: string): Promise<string>;
}

export class Argon2PasswordHelper implements PasswordHelper {
  verifyPassword(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return argon2.verify(hashedPassword, plainPassword);  
  }

  hashPassword(plainPassword: string): Promise<string> {
    return argon2.hash(plainPassword);
  }

}