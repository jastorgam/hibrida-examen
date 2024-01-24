import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, arrowBackOutline } from 'ionicons/icons';
import { AddPostComponent } from 'src/app/components/add-post/add-post.component';
import { PostData } from 'src/app/models/post-data';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonButton,
    IonButtons,
    AddPostComponent,
  ],
})
export class CreatePostPage implements OnInit {
  constructor(
    private router: Router,
    private postService: PostService,
    private ngZone: NgZone
  ) {
    addIcons({ addCircle, arrowBackOutline });
  }

  ngOnInit() {
    if (!environment.production) console.log('CreatePostPage', 'Init');
  }

  async addPost(post: PostData) {
    await this.postService.savePost(post);

    /**
     * Aca me dio unos warnings el router.navigate,
     * ya que lo estaba llamando dentro de un async
     * Por ende busque info y encontre que tenia que meterlo dentro
     * de un ngZone. Ahi funciono sin warnings
     *
     * Imagen del error antes del ngZone
     * https://prnt.sc/Gd83ce_cFouC
     */
    this.ngZone.run(() => {
      this.router.navigate(['']);
    });
  }
}
