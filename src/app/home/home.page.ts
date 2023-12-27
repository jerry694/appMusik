import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal) modal!: IonModal ;

  cards=[1,1,1,1,1,1,1,1,1,1]
  loading=false
  name!: string;
  is_open=false
  constructor() {}
  trash(){
    this.cards=[]
    this.loading=true
  }
  doRefresh(event: any): void {
    this.trash()
    setTimeout(() => {
      this.cards=[1,1,1,1,1,1,1,1,1,1]
      this.loading=false
      event.detail.complete();
    }, 2000);
  }

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
}
