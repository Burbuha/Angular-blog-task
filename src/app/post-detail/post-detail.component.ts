import { Location } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import * as EventEmitter from 'events';
import { PostService } from './../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post?: Post;

  // @Output() onClick = new EventEmitter ();

  constructor(
    private route: ActivatedRoute, //содержит информацию о маршруте
    private postService: PostService,
    private location: Location ) { }

  ngOnInit(): void {
    this.getPost()
  }

  getPost(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(id).subscribe(post => this.post = post);
  }

  save(): void {
    this.postService.updatePosts(this.post!)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    this.postService.deletePosts(this.post!)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
