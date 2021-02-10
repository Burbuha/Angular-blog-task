import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { Post } from './post';
import { Comment } from './comment';

@Injectable()
export class PostService {
  // private postsUrl = 'api/posts';

  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.postsUrl}?_limit=10`)
      .pipe(catchError(this.handleError<Post[]>('getPosts', [])));
  }

  getPost(id: number): Observable<Post | undefined> {
    const url = `${this.postsUrl}/${id}`;
    return this.http
      .get<Post>(url)
      .pipe(catchError(this.handleError<Post>(`getPost id=${id}`)));
  }

  updatePost(post: Post | number): Observable<any> {
    const id = typeof post === 'number' ? post : post.id;
    const url = `${this.postsUrl}/${id}`;

    return this.http
      .put(url, post, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updatePost')));
  }

  deletePost(post: Post | number): Observable<Post> {
    const id = typeof post === 'number' ? post : post.id;
    const url = `${this.postsUrl}/${id}`;

    return this.http
      .delete<Post>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Post>('deletePost')));
  }

  addPost(post: Post): Observable<Post> {
    return this.http
      .post<Post>(this.postsUrl, post, this.httpOptions)
      .pipe(catchError(this.handleError<Post>('addPost')));
  }

  getComments(id: number): Observable<Comment | undefined> {
    const url = `${this.postsUrl}/${id}/comments`;
    return this.http
      .get<Comment>(url)
      .pipe(catchError(this.handleError<Comment>(`getComment id=${id}`)));
  }

  addComment(comment: Comment) {
    const id = comment.postID;
    const url = `${this.postsUrl}/${id}/comments`;
    return this.http
      .post<Comment>(url, comment, this.httpOptions)
      .pipe(catchError(this.handleError<Post>('addPost')));
  }
}
