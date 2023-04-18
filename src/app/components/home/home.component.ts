import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';
import { Doc } from 'src/app/core/models/book-response.model';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  searchQuery: string;
  isLoading = false;
  allBooks: Doc[] = [];
  currentPage=0;
  totalPages=10;
  offset=0;
  limit=10; //No. of entries per page
  error="";
  
  constructor(private route:ActivatedRoute,private searchService:SearchService) {
    this.bookSearch = new FormControl('');
    this.searchQuery = "";
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];
  

  //clear results
  clearResults(){
    this.searchQuery="";
    this.bookSearch.patchValue("");
    this.allBooks=[];
  }

  //function to check if current page is last page
  isLastPage():boolean{
    return this.allBooks.length<10 || this.currentPage==9;
  }

  //Move to next set of results
  onNextPage(){
    console.log(this.currentPage);
    if (this.currentPage < this.totalPages - 1 && !this.isLastPage()) {
      this.currentPage++;
      this.offset = this.currentPage * this.limit; // Update offset based on current page
      this.isLoading = true;
      this.getSearchResults(this.searchQuery); // Fetch and update Books array
    }
  }


  //Move back to previous page of results
  onPreviousPage(){
    if (this.currentPage > 0) {
      this.currentPage--;
      this.offset = this.currentPage * this.limit; // Update offset based on current page
      this.isLoading = true;
      this.getSearchResults(this.searchQuery); // Fetch and update Books array
    }
  }

  //Get search results based on query with error handling
  getSearchResults(value:string){
    this.searchService.getSearchResults(value,this.limit,this.offset).subscribe({
      next:(data)=>{
        console.log(data.docs);
        this.allBooks = data.docs;
        this.isLoading = false;
        this.error="";
      },
      error:(error)=>{
        this.isLoading = false;
        this.error ='An error occurred while fetching data. Please try again later';
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
      ).
      subscribe({
        next:(value:string)=>{
          if (value!="") {
            console.log(value);
            this.isLoading = true;
            this.currentPage = 0;
            this.searchQuery = value;
            this.getSearchResults(value); 
          }else{
            this.clearResults();
          }
        }
        });
  }
}
