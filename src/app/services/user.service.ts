import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { User } from '../interface/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;
  private user: User = {};
  constructor( private http: HttpClient,
               private storage: Storage,
               private navCtrl: NavController ) { }

  registry( user: User ) {

  // tslint:disable-next-line: no-shadowed-variable
  return new Promise( resolve => {
    // console.log( user );
    // console.log(user.typeUser);
    this.http.post(`${ URL }/user/create`, user)
      .subscribe( async resp => {
        console.log( resp );
        // tslint:disable-next-line: no-string-literal
        if ( resp['ok'] ) {
          // tslint:disable-next-line: no-string-literal
          //await this.saveToken(  resp['token'] );
          resolve( true );
          // console.log('ok');
        } else {
          this.token = null;
          this.storage.clear();
          resolve( false );
          console.log('false');
        }

      });
  });

  }
  async saveToken( token: string ) {
    this.token = token;
    await this.storage.set('token', token);

  }
  run( run: string ) {
    const data = { run  };
    this.returnN(data);
    // tslint:disable-next-line: no-shadowed-variable
    
    return { ...this.user };
  }
  async returnN(data){
    return new Promise( resolve => {
      this.http.post(`${URL}/user/rut`, data).
      subscribe( async resp => {
        console.log( resp );
        // tslint:disable-next-line: no-string-literal
        if ( resp['ok'] ) {
          // tslint:disable-next-line: no-string-literal
          //await this.saveToken(  resp['token'] );
          this.user = resp['user'];
          resolve( true );
          // console.log('ok');
        } else {
          this.token = null;
          this.storage.clear();
          resolve( false );
          // console.log('false');

        }
    });
    });
  }
  run2( run: string ) {
    const data = { run  };
    return new Promise( resolve => {
      this.http.post(`${URL}/user/rut`, data).
      subscribe( async resp => {
        console.log( resp );
        // tslint:disable-next-line: no-string-literal
        if ( resp['ok'] ) {
          // tslint:disable-next-line: no-string-literal
          //await this.saveToken(  resp['token'] );
          this.user = resp['user'];
          resolve( true );
          // console.log('ok');
        } else {
          this.token = null;
          this.storage.clear();
          resolve( false );
          // console.log('false');

        }
    });
    });
  }

  getUser() {
    if (!this.user._id ) {
      this.tokenValid();
    }
    return { ...this.user };
  }
  async loadToken() { // un async lo convierte en una promesa
    this.token = await this.storage.get('token') || null;
  }
  async tokenValid(): Promise<boolean> {

    await this.loadToken();
    if ( !this.token ) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve( false );
    }
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise( resolve => { // Promise<boolean>
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      this.http.get(`${ URL }/user/`, { headers })
        .subscribe( resp => {
          // tslint:disable-next-line: no-string-literal
          if ( resp['ok'] ) {
            // tslint:disable-next-line: no-string-literal
            this.user = resp['user'];
            resolve( true );

          } else {
            this.navCtrl.navigateRoot('/login');
            resolve( false );
          }

        });
    });
  }

  updateUser( user: User ) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    // console.log( this.token );
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise( resolve => {
      this.http.post(`${ URL }/user/update`, user, { headers })
      .subscribe(  resp => {
        console.log(user._id);
        console.log( resp);

        // tslint:disable-next-line: no-string-literal
        if ( resp['ok'] ) {
          // console.log( resp );
          // tslint:disable-next-line: no-string-literal
          this.saveToken( resp['token'] );
          resolve(true);
        } else {
          resolve(false);

        }
      });
    });
  }

}



  
  

 
  
  
  
  
  

