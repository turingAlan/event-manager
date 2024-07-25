import { Component, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from '../home/home.component';
import { Event } from '../../models/even.models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { EventService } from '../../event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const ELEMENT_DATA: Event[] = [
  {
    name: 'Ball',
    description: 'testing description',
    date: '01/01/24',
    id: '10',
    organizerId: '20',
    location: 'delhi',
  },
  {
    name: 'Ball',
    description: 'testing description',
    date: '01/01/24',
    id: '10',
    organizerId: '20',
    location: 'delhi',
  },
  {
    name: 'Ball',
    description: 'testing description',
    date: '01/01/24',
    id: '10',
    organizerId: '20',
    location: 'delhi',
  },
  {
    name: 'Ball',
    description: 'testing description',
    date: '01/01/24',
    id: '10',
    organizerId: '20',
    location: 'delhi',
  },
];

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
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  constructor(private events: EventService, private _snackBar: MatSnackBar) {}

  eventData = signal([]);
  loading = true;

  ngOnInit(): void {
    this.events
      .getEvents()
      .then((data) => {
        this.eventData.set(data);
      })
      .catch((err) => {
        let snackBarRef = this._snackBar.open(
          'Error fetching latest events',
          'Reload',
          {
            duration: 2000,
          }
        );
        snackBarRef.onAction().subscribe(() => {
          window.location.reload();
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
  }

  displayedColumns: string[] = [
    'name',
    'description',
    'date',
    'location',
    'icon',
  ];
}
