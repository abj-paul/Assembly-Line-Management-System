import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  carousel : any ;
  images : any ;
  currentIndex : number = 0;



  ngOnInit(): void {
    this.carousel = document.getElementById('carousel');
    this.images = this.carousel.getElementsByTagName('img');
    this.images[this.currentIndex].style.display = 'block';
    setInterval(()=>{
      this.images[this.currentIndex].style.display = 'none';
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.images[this.currentIndex].style.display = 'block';
    }, 3000);
  }
 
  
}
