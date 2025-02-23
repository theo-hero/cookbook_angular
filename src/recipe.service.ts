import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiURL = '/api/recipes';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL);
  }

  getRecipeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }
}
