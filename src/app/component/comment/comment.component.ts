import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Location } from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private apiService: ApiService, private route: ActivatedRoute, private location: Location) { }
  postData: any = {};
  commentList = []
  commentListFiltered = []
  isLoading = true
  searchInput = ''
  ngOnInit(): void {
    this.isLoading = true
    let id = this.route.snapshot.paramMap.get('id')
    this.apiService.getPost(id).subscribe((data: any) => {
      this.postData = JSON.parse(JSON.stringify(data));
    })
    this.apiService.getComments(id).subscribe((data: any) => {
      this.commentList = data;
    })
    setTimeout(()=>{ this.isLoading = false }, 2000);
    
  }

  getInitials(name: string) {
    let nameSplitted = name.match(/\b(\w)/g) || [];
    let formattedName = nameSplitted.slice(0, 2).join('')
    return formattedName
  }

  getFilteredComments() {
    return _.isEmpty(this.commentListFiltered) ? this.commentList : this.commentListFiltered
  }

  filter() {
    if (this.searchInput == "") {
      this.commentListFiltered = []
      this.isLoading = false
      return
    }
    let filteredName = this.commentList.filter((comment: any) => comment.name.toLowerCase().match(new RegExp(this.searchInput)))
    let filteredEmail = this.commentList.filter((comment: any) => comment.email.toLowerCase().match(new RegExp(this.searchInput)))
    let filteredBody = this.commentList.filter((comment: any) => comment.body.toLowerCase().match(new RegExp(this.searchInput)))
    this.commentListFiltered = [...filteredName, ...filteredEmail, ...filteredBody]
  }

  goBack(){
    this.location.back()
  }
}
