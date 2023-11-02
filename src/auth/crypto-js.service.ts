import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private readonly Key: 'Aehc#s8723ba[hf7';
  private readonly initVector: 'encryptionIntVec';
  private readonly keyEncoding: BufferEncoding = 'utf-8';

  createIvParameterSpec(): Buffer {
    try {
      const ivBuffer = Buffer.from(this.initVector, this.keyEncoding);
      return ivBuffer;
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  createAesSecretKeySpec(): crypto.KeyObject {
    try {
      const keyObject = crypto.createSecretKey(
        Buffer.from(this.Key, this.keyEncoding),
      );
      return keyObject;
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  decrypt(encryptedInput: string): string {
    try {
      const decryptedData = CryptoJS.AES.decrypt(
        CryptoJS.enc.Utf8.parse(this.Key),
        encryptedInput,
        {
          iv: this.initVector,
        },
      ).toString();
      console.log(decryptedData);
      return decryptedData;
    } catch (error) {
      console.error('Decryption error:', error);
      return ''; // Handle decryption error as per your requirements
    }
  }

  encrypt(input: string): string {
    const keyBytes = CryptoJS.enc.Utf8.parse(this.Key);
    const ivBytes = CryptoJS.enc.Utf8.parse(this.initVector);
    const encrypted = CryptoJS.AES.encrypt(input, keyBytes, {
      iv: ivBytes,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
  }
}
