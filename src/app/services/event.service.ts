import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/even.models';
import { sha256 } from 'js-sha256';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  async getEvents(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get<any>('https://ppr1cswp-4000.inc1.devtunnels.ms/event')
        .subscribe({
          next: (data) => {
            let fitleredData = data.filter((event: Event) => {
              return event?.organizerId === localStorage.getItem('token');
            });
            resolve(fitleredData);
          },
          error: (error) => {
            reject(error);
          },
        });
    });
  }

  async getEventById(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get<any>(`https://ppr1cswp-4000.inc1.devtunnels.ms/event/${id}`)
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

  async createEvent(data: Event): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let organizerId = <string>localStorage.getItem('token');
      let eventId = sha256(organizerId + data.date);
      data.id = eventId;
      data.organizerId = organizerId;

      this.http
        .post<any>('https://ppr1cswp-4000.inc1.devtunnels.ms/event', data)
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

  async updateEvent(data: Event): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .put<any>(
          `https://ppr1cswp-4000.inc1.devtunnels.ms/event/${data.id}`,
          data
        )
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
      this.http
        .delete<any>(`https://ppr1cswp-4000.inc1.devtunnels.ms/event/${id}`)
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
}
