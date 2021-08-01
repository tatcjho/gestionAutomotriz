import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from '../storage/storage.service';
import { News } from 'app/interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(  private db: AngularFirestore,
    private storageService: StorageService) { }


    public saveNews(news: News) {
      return this.db.collection('news').doc(`${news.news_id}`).set(news)
    }
  
    public updateNews(news: News) {
      return this.db.collection('news').doc(`${news.news_id}`).update(news)
    }
  
    public getNews() {
      return this.db.collection('news', ref => ref.orderBy('news_id', 'asc')).valueChanges()
    }
  
    public getNewsId(newsId: string) {
      return this.db.collection('news').doc(`${newsId}`).valueChanges()
    }
  
    public getNewsById(news_id: string) {
      return this.db
        .collection("news")
        .doc(news_id)
        .valueChanges();
    }
  
  
    public deleteNews(news: News) {
      return this.db.collection('news').doc(`${news.news_id}`).delete()
    }

}


