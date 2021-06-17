import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = "https://jsonplaceholder.typicode.com/";

  constructor(private httpClient: HttpClient) { }

  public getPostList(){  
		return this.httpClient.get(`${this.SERVER_URL}posts`);  
	}

  public getPost(postId: any){  
		return this.httpClient.get(`${this.SERVER_URL}posts/${postId}`);  
	}

  public getComments(postId: any){  
		return this.httpClient.get(`${this.SERVER_URL}comments?postId=${postId}`);  
	}
}