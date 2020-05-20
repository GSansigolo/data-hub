import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CKAN_User } from '../newgroup/newgroup.component';

@Injectable({ providedIn: 'root' })
export class DatasetsService {

  /** start http service client */
  constructor(private http: HttpClient) {
  }


  public async get_datasets(): Promise<any> {
    const response = await this.http.get(`http://127.0.0.1:8000/get_datasets.json`).toPromise();
    return response;
  }

  public async get_ckan_datasets(): Promise<any> {
    const response = await this.http.get(`http://localhost:5000/api/3/action/package_search`).toPromise();
    return response;
  }

  public async get_ckan_tags(): Promise<any> {
    const response = await this.http.get(`http://localhost:5000/api/3/action/tag_list`).toPromise();
    return response;
  }

  public async get_ckan_datasets_search(search: string): Promise<any> {
    const response = await this.http.get(`http://localhost:5000/api/3/action/package_search?q=`+search).toPromise();
    return response;
  }

  public async get_ckan_dataset(id: string): Promise<any> {
    const response = await this.http.post(`http://localhost:5000/api/3/action/package_show`,{'id': id}).toPromise();
    return response;
  }

  public async get_license_list(): Promise<any> {
    const response = await this.http.get(`http://localhost:5000/api/3/action/license_list`).toPromise();
    return response['result'];
  }

  public async create_datasets(name: string, description: string, visibility: boolean, author: string, author_email: string, maintainer: string, license_id: string, collaborators: string, owner_org: string, file_url: string, dataname: string, datadescription: string, dataformat: string, tags: string[], key1: string, value1: string, key2: string, value2: string, key3: string, value3: string, year: number, nameAlpha: string, ckan_api_key: string): Promise<any> {
    
    let API_KEY= '4b6df95f-911f-4ce4-8957-91a0bbc99a8e';
    
    let tags_dict = tags.map(x => {
      return({'name': x.trim()});
    });

    let key_list = [key1, key2, key3]
    let value_list = [value1, value2, value3]
    var extra = []; 
    
    extra.push({
      value: 'Year',
      key: year
    });

    for (let index = 0; index < 3; index++) {
      if (key_list[index] && value_list[index])
        extra.push({
          value: key_list[index],
          key: value_list[index]
      });
    }
    
    const responseDataset = await this.http.post(`http://localhost:5000/api/3/action/package_create`, {'name': nameAlpha, 'title': name, 'notes': description, 'private': visibility, 'author': author, 'author_email': author_email, 'maintainer': maintainer, 'license_id': license_id, 'owner_org': owner_org, 'groups': [{"id": collaborators}], 'tags': tags_dict, "extras": extra }, {
      headers: new HttpHeaders ({
        Authorization: API_KEY
      })
    }).toPromise();

    let package_id = responseDataset['result']['id']

    const responseResource = await this.http.post(`http://localhost:5000/api/3/action/resource_create`, {'package_id': package_id, 'name': dataname, 'url': 'http://localhost:8090/api/v1.0/uploads/'+file_url, 'description': datadescription, 'format': dataformat}, {
      headers: new HttpHeaders ({
        Authorization: API_KEY
      })
    }).toPromise();

    return responseDataset;
  }

}