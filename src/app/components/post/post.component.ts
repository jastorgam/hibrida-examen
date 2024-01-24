import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  IonAlert,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPopover,
  IonTitle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

import { trashOutline } from 'ionicons/icons';
import { PostData } from 'src/app/models/post-data';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonItem,
    IonImg,
    IonLabel,
    IonIcon,
    IonPopover,
    IonContent,
    IonTitle,
    IonAlert,
  ],
})
export class PostComponent implements OnInit {
  @Input() post!: PostData;
  @Output() deletePost = new EventEmitter<PostData>();

  alertButton = ['Cerrar'];

  constructor(private alertController: AlertController) {
    addIcons({ trashOutline });
  }

  ngOnInit() {
    if (!environment.production) console.log('PostComponent', 'Init');
  }

  async onDeletePost(post: PostData) {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: '¿Esta seguro?',
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.deletePost.emit(post);
          },
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        },
      ],
    });

    await alert.present();
  }
}
