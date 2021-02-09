import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { Post } from './post';
import { Comment } from './comment';

@Injectable()
export class PostService {
  // private postsUrl = 'api/posts';
  comments: string[] = [];

  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postsUrl}?_limit=10`).pipe(
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

  getComment(id: number): Observable<Comment | undefined> {
    const url = `${this.postsUrl}/${id}/comments`;
    return this.http.get<Comment>(url).pipe(
      tap((comments) => console.log(comments)),
      catchError(this.handleError<Comment>(`getComment id=${id}`))
    );
  }

  private log(message: string) {
    this.addComment(`CommentService: ${message}`);
  }

  addComment(comment: string) {
    this.comments.push(comment);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  updatePosts(post: Post | number): Observable<any> {
    const id = typeof post === 'number' ? post : post.id;
    const url = `${this.postsUrl}/${id}`;

    return this.http.put(url, post, this.httpOptions).pipe(
      tap((_) => this.log(`updated post id=${id}`)),
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
