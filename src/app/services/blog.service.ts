import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IBlog } from '../interfaces/IBlog';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogsCollection: AngularFirestoreCollection<IBlog>;

  constructor(public db: AngularFirestore) {
    this.blogsCollection = this.db.collection('blogs');
   }
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
    return this.db.collection('blogs').doc(id).ref.get()
    .then(doc => {
      return doc.data() as IBlog;
    })
  }

  addBlog(blog: IBlog) {
    this.blogsCollection.add(blog);
  }
}

