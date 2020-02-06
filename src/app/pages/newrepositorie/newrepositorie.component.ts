import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-newrepositorie',
  templateUrl: './newrepositorie.component.html',
  styleUrls: ['./newrepositorie.component.scss']
})
export class NewrepositorieComponent implements OnInit {

  formGroup: FormGroup;

  showMsg: boolean = false;
 
  public name: string = "";
  public description: string = "";
  public collaborators: number = 0;
  public maintainer: string = "";
  public categorie: number = 0;
  public keywords: string = "";
  public postgres: boolean = true;
  public geoserver: boolean = true;
  public geonetwork: boolean = true;
  public terrama2: boolean = true;
  public owncloud: boolean = true;

  public nameModelChange(str: string): void {
    this.name = str;
  }

  public descriptionModelChange(str: string): void {
    this.description = str;
  }

  public collaboratorsModelChange(num: number): void {
    this.collaborators = num;
  }

  public maintainerModelChange(str: string): void {
    this.maintainer = str;
  }

  public categorieModelChange(num: number): void {
    this.categorie = num;
  }

  public keywordsModelChange(str: string): void {
    this.keywords = str;
  }

  public postgresModelChange(bol: boolean): void {
    this.postgres = bol;
  }

  public geoserverModelChange(bol: boolean): void {
    this.geoserver = bol;
  }

  public geonetworkModelChange(bol: boolean): void {
    this.geonetwork = bol;
  }

  public terrama2ModelChange(bol: boolean): void {
    this.terrama2 = bol;
  }
  
  public owncloudModelChange(bol: boolean): void {
    this.owncloud = bol;
  }
  constructor() { }

  ngOnInit() {

    this.formGroup = new FormGroup({

      Name: new FormControl('', [
        Validators.required
      ]),

      Description: new FormControl('', [
        Validators.required
      ]),

      Collaborators: new FormControl('', [
        Validators.required
      ]),

      Maintainer: new FormControl('', [
        Validators.required
      ]),

      Categorie: new FormControl('', [
        Validators.required
      ]),

      Keywords: new FormControl('', [
        Validators.required
      ]),

      PostgreSQL: new FormControl('', [
      ]),

      GeoServer: new FormControl('', [
      ]),

      GeoNetwork: new FormControl('', [
      ]),

      TerraMA2: new FormControl('', [
      ]),      

      OwnCloud: new FormControl('', [
      ]),
    });

  }

  private async onSubmit() {
    try {
      console.log("sucess")
    } catch (err) {
        console.log(err)
    }
}

  onReset() {
    this.formGroup.reset();
  }
}