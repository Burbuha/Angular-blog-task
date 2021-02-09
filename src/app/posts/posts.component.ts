import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from './../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts?: Post[];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }

  addPost(value: any): void {
    console.log(value);
    const title = value[0].trim();
    const body = value[1].trim();
    if (!value) {
      return;
    }
    this.postService.addPost({ title, body } as Post).subscribe((post) => {
      console.log(post);
      console.log(this.posts);
      this.posts?.unshift(post);
    });
  }
}
