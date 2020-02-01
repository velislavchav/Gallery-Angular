import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {
  backgroundImages: Array<string> = [
      'https://wallpaperaccess.com/full/754629.jpg',
      'https://wallpaperaccess.com/full/763110.jpg',
      'https://cdn.wallpapersafari.com/46/34/Mxjr2p.jpg',    
      'https://photos.smugmug.com/Wallpapers/i-9f7H7SN/0/01c72b86/O/HDRshooter-4K-wallpaper-053-3840x2160.jpg',
      'https://live.staticflickr.com/7497/15363260754_309df57095_k.jpg',
      'https://media1.esportsfast.com/2019/08/best-pubg-wallpapers-hd-download-with-4k-1080p-resolution-for-mobile-and-desktop.jpg',
  ]
  pickedImageNumber: number = 0;
  chosenImage: string = this.backgroundImages[0];
  slideshow: any;
  constructor() { }

  ngOnInit() {
    this.slideshow = setInterval(() => {
      if(this.pickedImageNumber === this.backgroundImages.length - 1) {
        this.pickedImageNumber = 0;
      } else {
        this.pickedImageNumber++;
        this.chosenImage = this.backgroundImages[this.pickedImageNumber];
      }   
    }, 10000)
  }

  ngOnDestroy() {
    clearInterval(this.slideshow)
  }
}