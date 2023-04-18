import { Injectable } from '@angular/core';
import { SearchResponse } from 'src/app/core/models/book-response.model';
import {Observable} from "rxjs"
import { ApiService } from './api.service';
import {map} from "rxjs/operators"

@Injectable({ 
  providedIn: 'root'
})
export class SearchService {



  constructor(private apiService:ApiService) {

  }  
    getSearchResults(searchQuery: string,limit:number,offset:number): Observable<SearchResponse>{
      
      return this.apiService.get(`/search.json?q=${searchQuery}&limit=${limit}&offset=${offset}`).pipe(
        map((response: any) => {
          
          response.docs = response.docs.map((doc:any)=>{
            if(doc.author_name){
              doc.authors  = [{name:doc.author_name[0]}];
              delete doc.author_name;
            }else{
              doc.authors = [];
            }
            return doc;
          })
          return response;
        })
      );
    }
}

// https://openlibrary.org/search.json?q=the+lord+of+the+rings