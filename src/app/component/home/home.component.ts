import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postList = []
  isLoading = true
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true
    this.apiService.getPostList().subscribe((data: any) => {
      this.postList = data;
    })
    setTimeout(()=>{ this.isLoading = false }, 2000);
  }

  openComment(postId: any) {
    this.router.navigate(['/comment', postId]);
  }

}
