import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlbumsComponent } from './albums.component';
import { FormsModule } from '@angular/forms';
import { AlbumsRoutingModule } from './albums-routing.module';
import { ReactiveFormsModule }   from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({ 
	declarations: [
    AlbumsComponent,
    
   
  ],
  imports: [
	CommonModule,
    AlbumsRoutingModule, 
	ReactiveFormsModule, 
	FormsModule,
	MatToolbarModule,
    MatIconModule,
    MatButtonModule,
	MatTableModule,MatInputModule,
	MatFormFieldModule,
	MatChipsModule

  ]
 
})
export class AlbumsModule { }
