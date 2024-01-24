import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addOutline } from 'ionicons/icons';
import { PostComponent } from 'src/app/components/post/post.component';
import { PostData } from 'src/app/models/post-data';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.page.html',
  styleUrls: ['./list-post.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    PostComponent,
    IonFab,
    IonFabButton,
    IonIcon,
    RouterModule,
  ],
})
export class ListPostPage implements OnInit {
  posts: PostData[] | undefined;

  constructor(private postService: PostService, private route: ActivatedRoute) {
    addIcons({ addOutline });
  }

  async ngOnInit() {
    if (!environment.production) console.log('ListPostPage', 'Init');

    /**
     * Coloque un parametro que en realidad nunca viene
     * para que cada vez que carge la pagina refresque la data posts
     */
    this.route.paramMap.subscribe(async () => {
      console.log('Leyendo desde parametros');
      await this.getAndCleanData();
    });
  }

  async onDeletePost($event: PostData) {
    await this.postService.deletePost($event);
    await this.getAndCleanData();
  }

  /**
   * Se no hay post se deja como undefined para que no
   * muestre el list en la pagina
   */
  private async getAndCleanData() {
    let result = await this.postService.getPosts();
    this.posts = result.length !== 0 ? result : undefined;
  }
}
