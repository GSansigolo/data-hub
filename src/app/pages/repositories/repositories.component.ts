import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { Routes, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})

export class RepositoriesComponent implements OnInit {

  displayedColumns = ['name', 'image', 'abstract'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  
  filterCategories = {}
  filterKeywords = {}
 
  categories = [
   { id: 1, name: 'Chemistry' },
   { id: 2, name: 'Oceans' },
   { id: 3, name: 'Atmosphere' },
   { id: 4, name: 'Ecology' },
   { id: 5, name: 'Land Surface' },
   { id: 6, name: 'Geophysics' },
   { id: 7, name: 'Lakes & Rivers' },
   { id: 8, name: 'Human Dimensions' },
   { id: 9, name: 'Agriculture' }
  ]
  
  keywords = [
    { id: 1, name: 'Climate' },
    { id: 2, name: 'Fire ' },
    { id: 3, name: 'Biodiversity' },
    { id: 4, name: 'Monitoring' },
    { id: 5, name: 'Ecology' }
  ]

filterChange() {
    this.dataSource.data = ELEMENT_DATA;
    for (let i = 0; i < this.categories.length; i++) {
        if (this.filterCategories[this.categories[i].name] != false) {
            this.dataSource.data = this.dataSource.data.filter(x => (x.categories.includes(this.categories[i].name)))
        } else {}
    }

    for (let i = 0; i < this.keywords.length; i++) {
        if (this.filterKeywords[this.keywords[i].name] != false) {

            this.dataSource.data = this.dataSource.data.filter(x => (x.keywords.includes(this.keywords[i].name)))

        } else {

        }

    }
}

@ViewChild(MatPaginator, {
    static: false
}) paginator: MatPaginator;

form: FormGroup;

/**
 * Set the paginator after the view init since this component will
 * be able to query its view for the initialized paginator.
 */
ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
}

constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.form = this.formBuilder.group({
        categories: new FormArray([]),
        keywords: new FormArray([])
    });

    this.addCheckboxes();
}

private addCheckboxes() {
    this.categories.map((o, i) => {
        const control = new FormControl(i === 0); // if first item set to true, else false
        (this.form.controls.categories as FormArray).push(control);
    });
    this.keywords.map((o, j) => {
        const control = new FormControl(j === 0); // if first item set to true, else false
        (this.form.controls.keywords as FormArray).push(control);
    });
}

ngOnInit() {

    this.categories.forEach(obj => {
        this.filterCategories[obj.name] = false
    })
    this.keywords.forEach(obj => {
        this.filterKeywords[obj.name] = false
    })
}

}

export interface DialogData {

}

export interface Element {
    id: number;
    name: string;
    image: Array < string > ;
    abstract: string;
    categories: Array < string > ;
    keywords: Array < string > ;
}

const ELEMENT_DATA: Element[] = [
  {id: 1, name: 'Hydrogen Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: [,'Atmosphere','Geophysics'] , keywords: ['Climate','Ecology']},
  {id: 2, name: 'Helium Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Oceans','Lakes & Rivers' ], keywords: ['Fire','Biodiversity ']},
  {id: 3, name: 'Lithium Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface','Agriculture'], keywords: ['Fire','Monitoring']},
  {id: 4, name: 'Beryllium Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Oceans','Ecology','Geophysics'], keywords: ['Climate','Fire ']},
  {id: 5, name: 'Boron Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png",], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface','Lakes & Rivers','Human Dimensions'], keywords: ['Biodiversity','Monitoring']},
  {id: 6, name: 'Carbon Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Oceans','Atmosphere' ], keywords: ['Monitoring','Biodiversity ']},
  {id: 7, name: 'Nitrogen Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Land Surface','Agriculture'], keywords: ['Climate', 'Fire ']},
  {id: 8, name: 'Oxygen Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Ecology','Land Surface','Geophysics'], keywords: ['Fire','Monitoring']},
  {id: 9, name: 'Fluorine Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Ecology','Human Dimensions'], keywords: ['Biodiversity','Ecology']},
  {id: 10, name: 'Neon Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Atmosphere'], keywords: ['Climate','Biodiversity ']},
  {id: 11, name: 'Sodium Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Oceans','Ecology','Geophysics','Agriculture'], keywords: ['Monitoring','Monitoring']},
  {id: 12, name: 'Magnesium Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface'], keywords: ['Biodiversity','Fire ']},
  {id: 13, name: 'Aluminum Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Land Surface','Lakes & Rivers'], keywords: ['Climate','Ecology']},
  {id: 14, name: 'Silicon Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Oceans','Ecology','Geophysics'], keywords: ['Fire','Biodiversity ']},
  {id: 15, name: 'Phosphorus Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface'], keywords: ['Monitoring','Monitoring']},
  {id: 16, name: 'Sulfur Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Atmosphere','Geophysics','Lakes & Rivers','Human Dimensions'], keywords: ['Biodiversity', 'Fire ']},
  {id: 17, name: 'Chlorine Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Atmosphere','Geophysics'], keywords: ['Fire','Ecology']},
  {id: 18, name: 'Argon Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Atmosphere','Geophysics'], keywords: ['Climate','Biodiversity ']},
  {id: 19, name: 'Potassium Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Land Surface','Agriculture'], keywords: ['Climate','Monitoring']},
  {id: 20, name: 'Calcium Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Atmosphere','Geophysics','Lakes & Rivers','Human Dimensions'], keywords: ['Biodiversity', 'Fire ']},
];
