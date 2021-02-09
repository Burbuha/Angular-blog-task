import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  comments: string[] = [];

  add(comment: string) {
    this.comments.push(comment);
  }

  clear() {
    this.comments = [];
  }

  constructor() {}
}
