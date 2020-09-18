import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient}   from '@angular/common/http';
import { map, flatMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';



@Injectable({  
  providedIn: 'root'
})
export class PokService { 

  constructor(private http: HttpClient) { 
     
 this.dat.next(this.data) 
  }
	data = []; //here the DB will be stored after downloading
	// BehaviorSubject for making a subscribing to a local variable
		
	    
	dat = new BehaviorSubject([]);    
	   
  get(): Observable<any>{
	 return this.http.get<any>("https://pokeapi.co/api/v2/pokemon").pipe(flatMap(character =>  character.results))
  }
	  get1(url): Observable<any>{
	 return this.http.get<any>(url)
  }  
	 

//CRUD operations
  update(id, ob) {
		var index = this.data.findIndex(x => x.id == id);
		this.data[index] = {id: id,data: ob};
	
}
  create(ob){
		let newInd = this.data.map(fil=> fil.id).sort((a,b)=> b-a)[0]
		this.data.push({id:newInd, data: ob});
		
}
  delete(id) {
	var index = this.data.findIndex(x => x.id == id);
	this.data.splice(index, 1);
	
	}

}


