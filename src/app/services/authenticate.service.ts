import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sha256 } from 'js-sha256';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private http: HttpClient) {}

  async getUserData(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`localhost:3000/user/${id}`).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  async checkUserExist(email: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let isUserExist = false;
      this.http.get<any>(`http://localhost:3000/user`).subscribe({
        next: (response) => {
          response?.forEach((element: any) => {
            if (element.email === email || element.password === password) {
              isUserExist = true;
              return;
            }
          });
          resolve(isUserExist);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  async login(email: string, password: string): Promise<User> {
    let userData: any;
    return new Promise<User>((resolve, reject) => {
      this.http.get<any>(`http://localhost:3000/user`).subscribe({
        next: (response) => {
          response?.forEach((element: User) => {
            if (element.email === email && element.password === password) {
              userData = element;
            }
          });
          if (userData) {
            resolve(userData);
          } else {
            reject('User not found');
          }
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  logout(): Boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<User> {
    const stringToHash = email + password;
    const hashedString = sha256(stringToHash);
    return new Promise<User>(async (resolve, reject) => {
      let isUserExist = false;
      isUserExist = await this.checkUserExist(email, password);
      if (isUserExist) {
        reject('User already exist');
      } else {
        this.http
          .post<any>(`http://localhost:3000/user`, {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            id: hashedString,
          })
          .subscribe({
            next: (response) => {
              resolve(response);
            },
            error: (error) => {
              reject(error);
            },
          });
      }
    });
  }
}
