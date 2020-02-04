import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogs: Observable<any[]>;
  constructor(public db: AngularFirestore) {
    this.blogs = db.collection('blogs').valueChanges();
  }

  loadBlogs() {
    return this.blogs;
  }
}
