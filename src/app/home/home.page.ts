import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ChansonsService } from 'src/services/chansons.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal ;

  cards:any=[]
  cardsSave:any=[]
  loading=false
  name!: string;
  is_open=false
  constructor(private chansonS:ChansonsService) {}
  ngOnInit(): void {
    this.loadListChansons()
  }
  loadListChansons(){
    this.chansonS.listofchansons().subscribe((data)=>{
      console.log(data.data)
      this.cards=data.data
      this.cardsSave=data.data
    })
  }
  trash(){
    this.cards=[]
    this.loading=true
  }
  doRefresh(event: any): void {
    this.trash()
      this.loadListChansons()
      this.loading=false
      event.detail.complete();}

open(){
  
  this.is_open=true
}
  cancel() {
    this.is_open=false
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.is_open=false
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    this.is_open=false
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      alert("hello");
    }
  }
  public results: any[] = [...this.cards];

  handleInput(event: any) {
    console.log( event.target.value.toLowerCase())
    const query = event.target.value.toLowerCase();
    this.cards = this.cardsSave.filter((chanson: any) =>
    chanson.titreChanson.toLowerCase().includes(query) ||
    chanson.nomArtiste.toLowerCase().includes(query)
  );
  }
  
  
}
