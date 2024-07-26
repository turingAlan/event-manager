import { Component, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from '../home/home.component';
import { Event } from '../../models/even.models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { EventService } from '../../services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from '../../components/loader/loader.component';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    HomeComponent,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    NgIf,
    LoaderComponent,
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  constructor(
    private event: EventService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  eventData = signal([]);
  loading = true;

  ngOnInit(): void {
    this.getLatestEvents();
  }

  async getLatestEvents() {
    this.loading = true;
    try {
      let latestEvents = await this.event.getEvents();
      this.eventData.set(latestEvents);
    } catch (error) {
      let snackBarRef = this._snackBar.open(
        'Error fetching latest events',
        'Reload',
        {
          duration: 2000,
        }
      );
      snackBarRef.onAction().subscribe(() => {
        this.getLatestEvents();
      });
    }
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  handleEventClick(event: Event) {
    this.router.navigate(['/home/event-detail', event.id]);
  }

  async handleDelete(eventData: Event) {
    this.loading = true;
    try {
      await this.event.deleteEvent(eventData.id);
      setTimeout(async () => {
        this._snackBar.open('Event deleted successfully', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['/home/event-list']);
        await this.getLatestEvents();
        this.loading = false;
      }, 1000);
    } catch (error) {
      this._snackBar.open('Error deleting event', 'Close', {
        duration: 2000,
      });
    }
  }

  handleEditClick(eventData: Event) {
    this.router.navigate([
      '/home/event-detail',
      eventData.id,
      { editing: true },
    ]);
  }

  handleAddEvent() {
    this.router.navigate(['/home/event-create']);
  }

  formatDate(date: string) {
    return DateTime.fromISO(date ?? new Date()).toISODate();
  }

  displayedColumns: string[] = [
    'name',
    'description',
    'date',
    'location',
    'icon',
  ];
}
