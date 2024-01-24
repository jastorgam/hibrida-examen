import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  AlertController,
  IonButton,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonTextarea,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';
import { PostData } from 'src/app/models/post-data';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    IonText,
    IonIcon,
    IonImg,
    IonTextarea,
    IonList,
  ],
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  image: string | undefined;

  @Output() addPost = new EventEmitter<PostData>();

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {
    addIcons({ cameraOutline });

    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  ngOnInit() {
    if (!environment.production) console.log('AddPostComponent', 'init');
  }

  async onAddPost() {
    let newPost = new PostData();
    newPost.description = this.postForm.get('description')?.value;
    newPost.title = this.postForm.get('title')?.value;
    newPost.image = this.image;

    /**
     * Si no hay imagen seteada al grabar
     * pregunta si quiere grabar sin imagen
     */
    if (!this.image) {
      const alert = await this.alertController.create({
        header: 'Advertencia',
        message: '¿Grabar publicación sin imagen?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {},
          },
          {
            text: 'Si',
            role: 'confirm',
            handler: () => {
              this.addPost.emit(newPost);
            },
          },
        ],
      });

      await alert.present();
    } else {
      this.addPost.emit(newPost);
    }
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      const imageUrl = `data:image/jpeg;base64,${image.base64String}`;
      this.image = imageUrl;
    } catch (error) {
      this.image = undefined;
    }
  }
}
