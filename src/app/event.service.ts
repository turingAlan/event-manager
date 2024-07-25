import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from './models/even.models';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  async getEvents(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>('http://localhost:3000/event').subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  async getEventById(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`http://localhost:3000/event/${id}`).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  async createEvent(data: Event): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>('http://localhost:3000/event', data).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  async updateEvent(data: Event): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .put<any>(`http://localhost:3000/event/${data.id}`, data)
        .subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          },
        });
    });
  }

  async deleteEvent(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.delete<any>(`localhost:3000/event/${id}`).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }
}
