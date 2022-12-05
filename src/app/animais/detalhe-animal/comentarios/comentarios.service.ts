import { Comentarios, Comentario } from './comentarios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  constructor(private http: HttpClient) {}

  buscaComentario(id: number): Observable<Comentarios> {
    return this.http.get<Comentarios>(`${API}/Photos/${id}/comments`);
  }

  incluirComentario(id: number, commentText: string): Observable<Comentario> {
    return this.http.post<Comentario>(`${API}/Photos/${id}/comments`, {
      commentText,
    });
  }
}
