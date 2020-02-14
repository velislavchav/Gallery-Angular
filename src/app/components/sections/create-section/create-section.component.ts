import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css']
})
export class CreateSectionComponent implements OnInit {
  templateInfo: Array<any> = [{
    title: 'blog',
    imageUrl: 'https://2.bp.blogspot.com/-R3Aw-IKOm_M/XD930fQF2FI/AAAAAAAAAuM/9Rq9olKsvdYpMnon-4MXHTaFCdxCMLZogCKgBGAs/w0/abstract-colorful-7-4k.jpg'
  }, {
    title: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?ixlib=rb-1.2.1&w=1000&q=80'
  }]
  constructor() { }

  ngOnInit() {
  }

}
