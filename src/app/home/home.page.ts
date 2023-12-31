import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ChansonsService } from 'src/services/chansons.service';
import { NativeAudio } from '@capacitor-community/native-audio'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  cards: any = []
  cardsSave: any = []
  song: any = {}
  loading = true
  name!: string;
  is_open = false
  button = 'play'
  resume = false
  err!: string
  specificIndex: number = -1
  musiqueCours: string = ''
  first: boolean = true

  constructor(private chansonS: ChansonsService) { }
  ngOnInit(): void {
    this.loadListChansons()
  }

  load(card: string) {
    this.song = card
    if (!this.first) {
      this.unload()
      this.preload()
      this.action()
    }
    else {
      this.preload()
      this.action()
      this.first = false
    }
    console.log(this.song)
  }
  loadListChansons() {
    this.chansonS.listofchansons().subscribe((data) => {
      console.log(data.data)
      this.cards = data.data
      alert(data.data)
      this.cardsSave = data.data
      this.loading = false
      this.err = ''
    },
      error => {
        console.log(error)
        this.err = error.message
      })
  }
  loadOneChanson(id: number) {
    this.chansonS.oneChanson(id).subscribe((data: any) => {
      this.song = data.data[0]
      // this.preload()
      console.log(data.data[0])
    })
  }
  trash() {
    this.cards = []
    this.loading = true
  }
  doRefresh(event: any): void {
    this.trash()
    this.loading = true
    this.loadListChansons()
    event.detail.complete();
  }

  open(id: number) {
    this.loadOneChanson(id)
    this.is_open = true
  }
  cancel() {
    this.is_open = false
    this.modal.dismiss(null, 'cancel');
    // this.unload()
  }

  confirm() {
    this.is_open = false
    this.unload()
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    this.is_open = false
    // // this.unload()
    // const ev = event as CustomEvent<OverlayEventDetail<string>>;
    // if (ev.detail.role === 'confirm') {
    //   alert("hello");
    // }
  }
  public results: any[] = [...this.cards];

  handleInput(event: any) {
    console.log(event.target.value.toLowerCase())
    const query = event.target.value.toLowerCase();
    this.cards = this.cardsSave.filter((chanson: any) =>
      chanson.titreChanson.toLowerCase().includes(query) ||
      chanson.nomArtiste.toLowerCase().includes(query)
    );
  }
  preload() {
    NativeAudio.preload({
      assetId: this.song.titreChanson,  //Identifiant unique du fichier
      assetPath: this.song.chansonUrl,  //chemin relatif ou absolue (file://)
      audioChannelNum: 1,
      isUrl: true  //Si oui ou non le chemin du fichier est une URL
    });
    this.setVolume()
    console.log(this.setVolume())
    this.musiqueCours = this.song.titreChanson
  }
  setVolume() {
    NativeAudio.setVolume(
      {
        assetId: this.song.titreChanson,
        volume: 1
      }
    )
  }
  action() {
    if (this.button == 'play') {

      this.play()
      this.button = 'pause'
      setTimeout(() => {
        this.stop()
      }, 30000);
    }

    else {

      this.stop()
      this.button = 'play'
      this.resume = true
    }
  }
  play() {
    console.log("play")
    console.log(NativeAudio.play({
      assetId: this.song.titreChanson,  //Identifiant unique du fichier
      time: 0.0 //start playing at 0.0 seconds
    }))
    NativeAudio.play({
      assetId: this.song.titreChanson,  //Identifiant unique du fichier
      time: 0.0 //start playing at 0.0 seconds
    });
  }
  stop() {
    NativeAudio.stop({
      assetId: this.song.titreChanson,
    });
    console.log(NativeAudio.getCurrentTime({ assetId: this.song.titreChanson, }))

    this.first = true
    this.unload()

    this.specificIndex = -1
    this.button = 'play'
  }
  unload() {
    NativeAudio.unload({
      assetId: this.musiqueCours, //Identifiant unique du fichier
    });

    this.resume = false
    this.button = 'play'
  }
  resumeS() {
    console.log(NativeAudio.resume({
      assetId: this.song.titreChanson,
    }))
    NativeAudio.resume({
      assetId: this.song.titreChanson,
    });
    //  this.unload()

  }
  chipClicked(event: Event, card: any, index: number) {
    event.stopPropagation();
    if (index == this.specificIndex) {
      this.stop()
    }
    else { // Empêche la propagation de l'événement
      this.load(card);
      this.specificIndex = index
    }
  }
}
