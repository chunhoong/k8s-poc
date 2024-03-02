export interface UserEntity {
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserSessionEntity {
  session_id: string;
  username: string; 
  token: string; 
  created_at: Date
}

export class UserNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UserNotFoundException.prototype);
  }
}

export class CredentialNotMatchException extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CredentialNotMatchException.prototype);
  }
}
