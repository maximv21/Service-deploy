import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule  } from '@angular/fire/firestore';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';









@NgModule({
  declarations: [
    AppComponent,
    
   
  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
	BrowserAnimationsModule,
    FormsModule,
	MatChipsModule,
	MatFormFieldModule,
    MatToolbarModule,
	MatInputModule,
	MatTableModule,
    MatIconModule,
    MatButtonModule,
	ReactiveFormsModule,
	AngularFireModule.initializeApp(environment.firebaseConfig),
	HttpClientModule,
    AngularFirestoreModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
