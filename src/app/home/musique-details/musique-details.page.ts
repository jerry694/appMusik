import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ChansonsService } from 'src/services/chansons.service';
import {NativeAudio} from '@capacitor-community/native-audio'


@Component({
  selector: 'app-musique-details',
  templateUrl: './musique-details.page.html',
  styleUrls: ['./musique-details.page.scss'],
})
export class MusiqueDetailsPage implements OnInit {
song:any={}
button= 'play'
resume=false
  constructor(private chansonS:ChansonsService,private router:ActivatedRoute) {}
  ngOnInit(): void {
    this.loadOneChanson()
    // this.other()
  } 
other(){
  
  const audio = new Audio('./assets/sounds/NYXIA.mp3');
  audio.addEventListener('loadedmetadata', () => {
    const duration = audio.duration;
    console.log('Durée de la piste audio:', duration);
  });
  audio.load();
}

  loadOneChanson(){
    this.chansonS.oneChanson(this.router.snapshot.params['id']).subscribe((data:any)=>{
      this.song=data.data[0]
      this.preload()
      console.log(data.data[0])
    })
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
