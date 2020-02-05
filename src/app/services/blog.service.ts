import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IBlog } from '../interfaces/IBlog';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(public db: AngularFirestore) { }

  loadBlogs() {
    return this.db.collection('blogs').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as IBlog;
          data.id = a.payload.doc.id;
          return data;
        })
      }),
    )
  }

  loadSingleBlog(id: string) {
    return this.db.collection('blogs').doc(id).ref.get().then(doc => {
      return doc.data();
    })
  }
}

