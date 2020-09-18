import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, Validators, FormArray,ValidationErrors} from '@angular/forms';

import { AlbumService } from  'src/app/services/album.service'


import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {MatChipInputEvent} from '@angular/material/chips';
@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['albums.component.scss']
})
     

export class AlbumsComponent implements OnInit {
	
	myForm;
	
  constructor(private fb: FormBuilder, private albumService: AlbumService) {
	 
	        
     //form's initialization  
	 
	 this.myForm =    this.fb.group({
             
            "name": new FormControl(null, [Validators.required]),
            "band": new FormControl(null, [Validators.required]),
            "genre": new FormArray([], [Validators.required]),
			"label": new FormArray([], [Validators.required]),
			"producer": new FormArray([], [Validators.required]),
			
        });}
  
ngOnInit(): void { 
	this.get();
}    
	itemsList;
    spin=false;  
	visible=true;
	visibleDel = true;
	id; idDel;
  
  //this variables are needed for mat-forms
  
	selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
	
	//downloading data from server using Observable and subscribe
	get(){
	
		this.albumService.get().subscribe(res => {  this.itemsList = res; this.spin=true })
		}

	
	fill(dat) {
		this.id = dat.id;
		
		this.visible=!this.visible;
		    // display data in the form when editing info
        let name = dat ? dat.data.name : "";
        let band = dat ? dat.data.band : "";
        let genre = dat ? dat.data.genre : [];
        let label = dat ? dat.data.label : [];
        let producer = dat ? dat.data.producer: [];

        // initialize form
this.refreshForm()
		this.myForm.get('name').setValue(name);
		this.myForm.get('band').setValue(band);
		genre.forEach((res,i)=> this.myForm.get('genre').push(new FormControl(res, [Validators.required])))
		label.forEach((res,i)=> this.myForm.get('label').push(new FormControl(res, [Validators.required])))
		producer.forEach((res,i)=> this.myForm.get('producer').push(new FormControl(res, [Validators.required])))
		
		
		
		 }
  
		

		
		//getters for formArrays
	get labelsFormArray() {      		
			return <FormArray>this.myForm.get('label') as FormArray;    
	}
	get genresFormArray() {      
			return <FormArray>this.myForm.get('genre') as FormArray;    
		}
	get producersFormArray() {      
			return <FormArray>this.myForm.get('producer') as FormArray;    
		}

// mat-form's code
	add(ev,event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

    // Add a value
    if ((value || '').trim()) {
		ev.push(new FormControl(null, [Validators.required]));  
		ev.controls[ev.controls.length-1].setValue(value);
  
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }  
	
		displayedColumns: string[] = ['name', 'band', 'genre', 'label', 'producer','edit','del']

deleteWarn(id) {this.idDel = id;

		this.visibleDel = !this.visibleDel;
		
}
	//delete data from base through a service
	delete(){ 
		this.albumService.delete(this.idDel);
		this.visibleDel = !this.visibleDel}
	//submit form button (crud - push/post)
	subm(){
		this.visible = true;
		let res = {};
		let key = Object.keys(this.myForm.controls);
		key.forEach(data => 
			res[data] = this.myForm.controls[data].value)
			if (this.id) this.albumService.update(this.id, res)
				else this.albumService.create(res)

	}
	
	//just toggles visibility of form when user clicks a create button
	create() {
	
		this.visible = !this.visible;}
 
//just toggles visibility when "cancel" pressed
	cancel() {
		this.visible = !this.visible;
		this.refreshForm();
}
refreshForm(){
this.myForm =    this.fb.group({
             
            "name": new FormControl(null, [Validators.required]),
            "band": new FormControl(null, [Validators.required]),
            "genre": new FormArray([], [Validators.required]),
			"label": new FormArray([], [Validators.required]),
			"producer": new FormArray([], [Validators.required]),
			
        });
}
//just toggles visibility when "cancel" on delete modal pressed
	cancelDel() {
	this.visibleDel = !this.visibleDel;
	
}


remove(ev, index: number) {  
 
		ev.removeAt(index);   }
 


}

		



