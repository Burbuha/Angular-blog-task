import { CommentService } from './../comment.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(public commentService: CommentService) { }

  ngOnInit(): void {
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

}
