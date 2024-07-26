import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { EventService } from '../../services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatDatepickerModule,
    NgIf,
    RouterLink,
    HomeComponent,
    HomeComponent,
  ],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})
export class EventFormComponent {
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private event: EventService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.eventForm.valid) {
      let formData = this.eventForm.value;
      try {
        await this.event.createEvent(formData);
        this._snackBar.open('Event created successfully', 'Close', {
          duration: 2000,
        });
        this.eventForm.reset();
        this.router.navigate(['/home/event-list']);
      } catch (error) {
        this._snackBar.open('Error creating event', 'Close', {
          duration: 2000,
        });
      }
    }
  }
}
