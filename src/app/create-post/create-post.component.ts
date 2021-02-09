import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  @Output() newItemPost = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  addNewItem(value: any) {
    this.newItemPost.emit(value);
  }
}
