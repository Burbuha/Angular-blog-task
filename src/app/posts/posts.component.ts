import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { CommentService } from './../comment.service';
import { PostService } from './../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts?: Post[];


  constructor(private PostService: PostService, private commentService: CommentService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.PostService.getPosts().subscribe(posts => this.posts = posts);
  }

  addComment(value: string): void {
    this.commentService.add(value);
  }

}
