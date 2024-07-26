import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location, NgIf } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';
import { HomeComponent } from '../home/home.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    NgIf,
    LoaderComponent,
    HomeComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css',
})
export class EventDetailComponent implements OnInit {
  eventForm: FormGroup;
  eventId: string = '';
  loading = true;
  isEditing = false;
  eventData = signal({
    id: '',
    eventName: '',
    date: '',
    location: '',
    description: '',
    organizerId: '',
  });

  constructor(
    private route: ActivatedRoute,
    private event: EventService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
    });
    this.eventForm.disable();
  }
  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      // get the event id & editing state from the route params
      this.eventId = params['id'];
      this.isEditing = params['editing'] === 'true';

      try {
        let data = await this.event.getEventById(this.eventId);
        this.eventData.set(data);
        this.eventForm.patchValue({
          eventName: data.eventName ?? '',
          description: data.description ?? '',
          location: data.location ?? '',
          date: data.date ?? '',
        });
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } catch (error) {
        this.loading = false;
        // navigate back to the previous page
        this.router.navigate(['..']);
        this._snackBar.open('Error fetching event data', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  handleEditClick() {
    this.handleEditState(true);
    this.eventForm.enable();
  }

  handleCancelEdit() {
    this.handleEditState(false);
    this.eventForm.disable();
    this.setFormInitialValue();
  }

  handleEditState(state: boolean) {
    this.isEditing = state;
    const params = { editing: state.toString() };
    this.router.navigate([], { queryParams: params });
  }

  setFormInitialValue() {
    this.eventForm.patchValue({
      eventName: this.eventData().eventName ?? '',
      description: this.eventData().description ?? '',
      location: this.eventData().location ?? '',
      date: this.eventData().date ?? '',
    });
  }

  async onEdit() {
    let formData = { ...this.eventData(), ...this.eventForm.value };
    this.loading = true;

    try {
      const updatedData = await this.event.updateEvent(formData);
      this.eventData.set(updatedData);
      setTimeout(() => {
        this.loading = false;
        this._snackBar.open('Event updated successfully', 'Close', {
          duration: 2000,
        });
      }, 1000);
    } catch (error) {
      this.loading = false;
      this._snackBar.open('Error updating event', 'Close', {
        duration: 2000,
      });
    }
  }

  async handleDelete() {
    this.loading = true;
    try {
      await this.event.deleteEvent(this.eventId);
      setTimeout(() => {
        this._snackBar.open('Event deleted successfully', 'Close', {
          duration: 2000,
        });
        this.eventForm.reset();
        this.router.navigate(['/home/event-list']);
        this.loading = false;
      }, 1000);
    } catch (error) {
      this._snackBar.open('Error deleting event', 'Close', {
        duration: 2000,
      });
    }
  }
}
