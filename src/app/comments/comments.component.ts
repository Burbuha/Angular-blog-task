import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Comment } from '../comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Output() addComment = new EventEmitter<string>();

  @Input() comments?: Comment[];

  constructor() {}

  ngOnInit(): void {}

  addNewComment(value: any) {
    this.addComment.emit(value);
  }
}
