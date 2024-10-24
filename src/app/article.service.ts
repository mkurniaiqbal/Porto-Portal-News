import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private baseUrl = `https://api.nytimes.com/svc`;
  private apiKey = '8qhciJsk4HQ2qy4AYkYxtbHMG1JBG9PI'; // Ganti dengan kunci API Anda
  private apiUrl = `${this.baseUrl}/search/v2/articlesearch.json?api-key=${this.apiKey}`;
  private apiTopStories = `${this.baseUrl}/topstories/v2`;

  constructor(private http: HttpClient) {}

  async getArticles(): Promise<any> {
    return this.http.get<any>(this.apiUrl).toPromise(); // Mengonversi Observable ke Promise
  }

  async getTopStories(section: string): Promise<any> {
    const url = `${this.apiTopStories}/${section}.json?api-key=${this.apiKey}`;
    return this.http.get<any>(url).toPromise(); // Mengonversi Observable ke Promise
  }

  async searchArticles(query: string): Promise<any> {
    return this.http.get<any>(`${this.apiUrl}&q=${query}`).toPromise(); // Mengonversi Observable ke Promise
  }
}
