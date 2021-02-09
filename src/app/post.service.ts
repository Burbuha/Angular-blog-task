import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Post } from './post';
import { Posts } from './posts';
import { CommentService } from './comment.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsUrl = 'api/posts';

  // private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private commentService: CommentService
  ) {}

  getPosts(): Observable<Post[]> {
    this.commentService.add('PostService: fetched posts'); //получить сообщения с сервера??????
    return this.http.get<Post[]>(this.postsUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  getPost(id: number): Observable<Post | undefined> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Post>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  private log(message: string) {
    this.commentService.add(`CommentService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  updatePosts(post: Post): Observable<any> {
    return this.http.put(this.postsUrl, post, this.httpOptions).pipe(
      tap((_) => this.log(`updated post id=${post.id}`)),
      catchError(this.handleError<any>('updatePost'))
    );
  }

  deletePosts(post: Post | number): Observable<Post> {
    const id = typeof post === 'number' ? post : post.id;
    const url = `${this.postsUrl}/${id}`;

    return this.http.delete<Post>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted post id=${id}`)),
      catchError(this.handleError<Post>('deletePost'))
    );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post, this.httpOptions).pipe(
      tap((newPost: Post) => this.log(`added post w/ id=${newPost.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }

}
