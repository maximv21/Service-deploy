import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private firestore: AngularFirestore) { }
 
//here all the CRUD's

get() {return this.firestore.collection("albums").snapshotChanges().pipe(map(actions => actions.map (a=>
		{ 
      const data = a.payload.doc.data(); 
      const id = a.payload.doc.id; 
	  
	  let obj = {id: id}
	  const dat = {data: data}
	  
		return Object.assign(obj, dat)}) 
	
	)  
	);}


	update(id, ob) {
	
   console.log(id)
       this.firestore
       .collection("albums")
       .doc(id)
       .set( ob );
} 
	create(data) {
	 	return new Promise<any>((resolve, reject) =>{
			this.firestore
				.collection("albums")
				.add(data)
				.then(res => {}, err => reject(err));
    });
}
	delete(id) {
		
		this.firestore
		  .collection("albums")
		  .doc(id)
		  .delete();
	}
	
	 
 

	
}
