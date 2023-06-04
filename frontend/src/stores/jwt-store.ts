export interface Jwt {
  payload: jose.JWTPayload;
  options: {
    secret: string;
    signOptions: {
      algorithm: string;
      expiresIn: string;
    };
  };
}
export interface Params {
  _start?: number;
  _limit?: number;
}

import { defineStore } from 'pinia';
import axios from 'axios';
import * as jose from 'jose';

export const useJwtStore = defineStore('jwt', {
  state: () => ({
    jwt: <undefined | string>undefined
  }),

  getters: {
    getJwt: (state) => state.jwt
  },

  actions: {
    setJwt(jwt: string) {
      this.jwt = jwt;
    },
    async sendData(data: object) {
      return await axios.post('http://localhost:3000/random-data', {
        save: data
      });
    },
    async fetchData(_start: number, _limit: number) {
      const params: Params = {};

      if (_start) params._start = _start;
      if (_limit) params._limit = _limit;

      return await axios.get('http://localhost:3000/random-data', {
        headers: {
          Authorization: `Bearer ${this.jwt}`
        },
        params: params
      });
    },
    async generateJwt(payload: Jwt['payload'], options: Jwt['options']) {
      const secretEncoded = new TextEncoder().encode(options.secret);
      const jwt = await new jose.SignJWT(payload)
        .setProtectedHeader({
          alg: options.signOptions.algorithm
        })
        .setExpirationTime(options.signOptions.expiresIn)
        .sign(secretEncoded);
      return jwt;
    }
  }
});
