import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  articles: any[] = [];
  topStoriesTechnology: any[] = [];
  topStoriesScience: any[] = [];
  topStoriesSports: any[] = [];

  constructor(private articleService: ArticleService) {}

  async ngOnInit() {
    await this.loadArticles();
    await this.loadTopStories('technology');
    await this.loadTopStories('science');
    await this.loadTopStories('sports');
  }

  private async loadArticles() {
    try {
      const data = await this.articleService.getArticles();
      this.articles = data.response.docs;
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  private async loadTopStories(section: string) {
    try {
      const data = await this.articleService.getTopStories(section);
      // Simpan data sesuai dengan section
      if (section === 'technology') {
        this.topStoriesTechnology = data.results;
      } else if (section === 'science') {
        this.topStoriesScience = data.results;
      } else if (section === 'sports') {
        this.topStoriesSports = data.results;
      }
    } catch (error) {
      console.error('Error fetching top stories:', error);
    }
  }

  async search(query: string) {
    try {
      const data = await this.articleService.searchArticles(query);
      this.articles = data.response.docs; // Update hasil pencarian
    } catch (error) {
      console.error('Error searching articles:', error);
    }
  }

  mixTopStories() {
    return [
      this.topStoriesTechnology[0],
      this.topStoriesScience[0],
      this.topStoriesSports[0],
    ].filter((story) => story !== undefined);
  }
}
