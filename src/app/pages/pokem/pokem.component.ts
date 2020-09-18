import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray,ValidationErrors, AbstractControl} from '@angular/forms';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { PokService } from  'src/app/services/pok.service'

import {MatChipInputEvent} from '@angular/material/chips';

 
    
@Component({
  selector: 'app-pokemon', 
  templateUrl: './pokem.component.html',
  styleUrls: ['./pokem.component.scss']
})
export class PokemComponent implements OnInit{
   
 
	  
    
     //form's initialization  
	 
	
  constructor(private fb: FormBuilder, private pokService: PokService ) { 
   //form initiating
   this.myForm = this.fb.group({
             
            "name": new FormControl(null, [Validators.required]),
            "weight": new FormControl(null, [Validators.required, this.customValidator]),
            "experience": new FormControl(null, [Validators.required, this.customValidator]),
			"attack": new FormControl(null, [Validators.required, this.customValidator]),
			"abil": new FormArray([], Validators.required),
			
        });
		}
  
  ngOnInit() {
		
 this.get()  
  
 
}
  //initial variables
  myForm;
  db; 
  result;
  res;
  last;
  pokeList=[];
  spin = false;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];  
  visible=true;
  visibleDel = true;
  id; idDel;
get(){
	
	//two consequent subscription(see all the logic in a pok.service)
	this.pokService.get().subscribe(res=> this.pokService.get1(res.url).subscribe(res=>{ 	
	this.pokeList.push({id:res.id,data:{name:res.name, abil:res.abilities.map(res=> {
			const ability = res.ability.name
			return ability
			}), 
			    weight: res.weight,
				experience: res.base_experience,
	
				attack: res.stats[1].base_stat}
				});
		
			}
))
		//after downloading data will be stored in a local variable and all CRUD(mock), here we subscribe on it
	this.pokService.dat.subscribe(res => (this.pokeList = res ))
	
  

}


 displayedColumns: string[] = ['name', 'weight', 'attack', 'abil', 'experience']

fill(dat) {  // display data in the form when editing info
		this.id = dat.id;
		
		this.visible=!this.visible;
		  
        let name = dat ? dat.data.name : "";
        let weight = dat ? dat.data.weight : "";
        let experience = dat ? dat.data.experience : "";
        let attack = dat ? dat.data.attack : "";
        let abil = dat ? dat.data.abil: [];

        // initialize form and assigning a value
this.refreshForm()
		this.myForm.get('name').setValue(name);
		this.myForm.get('weight').setValue(weight);
		this.myForm.get('experience').setValue(experience);
		this.myForm.get('attack').setValue(attack);
		
		abil.forEach((res,i)=> this.myForm.get('abil').push(new FormControl(res, [Validators.required])))

		
		
		 }
		 //getters for formArrays
	get abilFormArray() {      		
			return <FormArray>this.myForm.get('abil') as FormArray;    
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
  

deleteWarn(id) {this.idDel = id;

		this.visibleDel = !this.visibleDel;
		
}
	//delete data from base through a service
	delete(){ 
		this.pokService.delete(this.idDel);
		this.visibleDel = !this.visibleDel;
		this.spin=true;}
	//submit form button (crud - push/post)
	subm(){
		this.visible = true;
		let res = {};
		let key = Object.keys(this.myForm.controls);
		key.forEach(data => 
			res[data] = this.myForm.controls[data].value)
			if (this.id) this.pokService.update(this.id, res)
				else this.pokService.create(res)

	}
	//just toggles visibility of form when user clicks a create button
	create() {
	
		this.visible = !this.visible;}
 
	//just toggles visibility when "cancel" pressed
	cancel() {
		this.visible = !this.visible;
		this.refreshForm()		
}
refreshForm(){
			this.myForm = this.fb.group({
            "name": new FormControl(null, [Validators.required]),
            "weight": new FormControl(null, [Validators.required, this.customValidator]),
            "experience": new FormControl(null, [Validators.required, this.customValidator]),
			"attack": new FormControl(null, [Validators.required,  this.customValidator]),
			"abil": new FormArray([], Validators.required),
			
        });
}
	//just toggles visibility when "cancel" on delete modal pressed
	cancelDel() {
	this.visibleDel = !this.visibleDel;
	
}


remove(ev, index: number) {  
 
		ev.removeAt(index);   
		}
//validator for a digits
	customValidator = function (control: AbstractControl): ValidationErrors | null  {
	
		let errors: any = {}, value: string = control.value || '';
	
		if (!value) {
			return null
		}
		
		if (/[0-9]+/g.test(value) === false) {
			errors.digits = "Enter at least 1 digit"
		}
			return errors;

	}   

}
