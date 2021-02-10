import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from './../post.service';
import { Post } from '../post';
import { Comment } from '../comment';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post?: Post;
  comments: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPost();
    this.getComment();
  }

  getPost(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(id).subscribe((post) => (this.post = post));
  }

  getComment(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService
      .getComments(id)
      .subscribe((comments) => (this.comments = comments));
  }

  addComment(value: string): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const name = value[0].trim();
    const body = value[1].trim();
    const postID = id;
    if (!name && !body && !postID) {
      return;
    }
    this.postService
      .addComment({ postID, name, body } as Comment)
      .subscribe((comment) => this.comments.push(comment));
  }

  saveChanges(): void {
    this.postService.updatePost(this.post!).subscribe(() => this.goBack());
  }

  deletePost(): void {
    this.postService.deletePost(this.post!).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
