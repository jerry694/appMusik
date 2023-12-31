import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ChansonsService } from 'src/services/chansons.service';
import {NativeAudio} from '@capacitor-community/native-audio'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal ;

  cards:any=[]
  cardsSave:any=[]
  song:any={}
  loading=true
  name!: string;
  is_open=false
  button= 'play'
  resume=false
  constructor(private chansonS:ChansonsService) {}
  ngOnInit(): void {
    this.loadListChansons()
  }
  loadListChansons(){
    this.chansonS.listofchansons().subscribe((data)=>{
      console.log(data.data)
      this.cards=data.data
      this.cardsSave=data.data
      this.loading=false
    })
  }
  loadOneChanson(id:number){
    this.chansonS.oneChanson(id).subscribe((data:any)=>{
      this.song=data.data[0]
      this.preload()
      console.log(data.data[0])
    })
  }
  trash(){
    this.cards=[]
    this.loading=true
  }
  doRefresh(event: any): void {
      this.trash()
      this.loading=true
      this.loadListChansons()
      event.detail.complete();}

open(id:number){
  this.loadOneChanson(id)
  this.is_open=true
}
  cancel() {
    this.is_open=false
    this.modal.dismiss(null, 'cancel');
    this.unload()
  }

  confirm() {
    this.is_open=false
    this.unload()
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    this.is_open=false
    this.unload()
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
  preload(){
    NativeAudio.preload({ 
      assetId: this.song.titreChanson,  //Identifiant unique du fichier
      assetPath: this.song.chansonUrl,  //chemin relatif ou absolue (file://)
      audioChannelNum: 1, 
      isUrl: true  //Si oui ou non le chemin du fichier est une URL
   });

  }
  action(){
    if(this.button=='play'){
      if(this.resume){
        this.resumeS()
      }
      else{
      this.play()
      }
      this.button='pause'
    }
    else{
      this.stop()
      this.button='play'
      this.resume=true
    }
  }
play(){
  console.log("play")
  console.log(  NativeAudio.play({ 
    assetId: this.song.titreChanson,  //Identifiant unique du fichier
    time: 0.0 //start playing at 0.0 seconds
 }))
  NativeAudio.play({ 
    assetId: this.song.titreChanson,  //Identifiant unique du fichier
    time: 0.0 //start playing at 0.0 seconds
 });
}
 stop(){
  NativeAudio.stop({ 
    assetId: this.song.titreChanson, 
 });
 console.log(
    
  NativeAudio.getCurrentTime({assetId: this.song.titreChanson,})
     )
 }
 unload(){
  NativeAudio.unload({ 
    assetId: this.song.titreChanson, //Identifiant unique du fichier
 });
 this.resume=false
 this.button= 'play'
 }
 resumeS(){
  console.log(NativeAudio.resume({ 
    assetId: this.song.titreChanson,
 }))
  NativeAudio.resume({ 
    assetId: this.song.titreChanson,
 });
 
 }
  
}
