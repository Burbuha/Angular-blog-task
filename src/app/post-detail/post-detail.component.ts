import { Location } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import * as EventEmitter from 'events';
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

  // @Output() onClick = new EventEmitter ();

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
    this.postService.getComments(id).subscribe((comments) => {
      console.log(comments);
      this.comments = comments;
    });
  }

  addComment(value: string): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    if (!value) {
      return;
    }

    const name = value[0].trim();
    const body = value[1].trim();

    this.postService
      .addComment({ name, body } as Comment, id)
      .subscribe((comment) => {
        console.log(comment);
        console.log(this.comments);
        this.comments.push(comment);
      });
  }

  save(): void {
    this.postService.updatePosts(this.post!).subscribe(() => this.goBack());
  }

  delete(): void {
    this.postService.deletePosts(this.post!).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
