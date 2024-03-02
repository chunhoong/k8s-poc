import * as jose from "jose"
import Logger from "./logger";

export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  jti?: string;
  nbf?: number;
  exp?: number;
  iat?: number;
  [propName: string]: unknown;
}

export interface JwtHelper {
  sign(param: {
    jti: string;
    sub: string;
    aud: string;
    payload: object;
    exp: Date;
  }): Promise<string>;
  read(jwt: string, audience: string): Promise<JwtPayload | undefined>;
}

export class JoseJwtHelper implements JwtHelper {
  private secret: Uint8Array;
  constructor(
    private logger: Logger,
    private issuer: string,
    secret: string,
    private signingAlgorithm: string
  ) {
    this.secret = new TextEncoder().encode(secret);
  }

  sign(param: {
    jti: string;
    sub: string;
    aud: string;
    payload: object;
    exp: Date;
  }): Promise<string> {
    return new jose.SignJWT({
      ...param.payload
    })
      .setProtectedHeader({ alg: this.signingAlgorithm })
      .setJti(param.jti)
      .setSubject(param.sub)
      .setAudience(param.aud)
      .setIssuer(this.issuer)
      .setIssuedAt()
      .setExpirationTime(param.exp.getTime() / 1000)
      .sign(this.secret);
  }
  
  async read(jwt: string, audience: string): Promise<JwtPayload | undefined> {
    try {
      const result = await jose.jwtVerify(jwt, this.secret, {
        issuer: this.issuer,
        audience
      });
      return { ...result.payload };
    } catch (error) {
      this.logger.warn(error);
      return undefined;
    }
  }
}
