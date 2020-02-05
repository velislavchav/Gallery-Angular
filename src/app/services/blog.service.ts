import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IBlog } from '../interfaces/IBlog';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  // blogs: Observable<Array<IBlog>>;
  constructor(public db: AngularFirestore) { }

  loadBlogs() {
    // this.blogs = 
    return this.db.collection('blogs').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as IBlog;
          data.id = a.payload.doc.id;
          // this.blogs.push(data);
          // console.log(data);
          // debugger;
          return data;
        })
      }),
    )
    // return this.blogs;
  }

  loadSingleBlog(id: string) {
    return this.db.collection('blogs').doc(id).ref.get().then(doc => {
      return doc.data();
    })
  }
}

