import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { User } from '../interface/interfaces';
//import { UiServiceService } from '../services/ui-service.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  //directionForm: FormGroup;
  registerUser: User = {
    email: 'eros@gmail.com',
    password: '12346',
    name: 'Eros',
    avatar: 'av-1.png',
    typeUser: 'admin',
    surnames: 'Porra',
    run: '19887539-2',
    celphone: '+56965514177',
    gender: 'm',
  };

  constructor(/*private fb: FormBuilder,*/ private alertCtrl: AlertController, private userService: UserService,
    private navCtrl: NavController/*, private uiService: UiServiceService*/) {
    //this.createDirectionForm();
  }

  ngOnInit() {
  }

  /*createDirectionForm() {
    this.directionForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', Validators.required],
      telefono: [''],
      celular: ['', Validators.required],
      email: ['', Validators.required],
      universidad: ['', Validators.required],
      sexo: ['', Validators.required],
    });
  }*/
  /*async pro(formValues) {
      
    const alert = await this.alertCtrl.create({
      header: 'Datos enviados',
      //subHeader: 'Subtitle',
      message: 'Los registros fueron enviados correctamente',
      buttons: ['OK'],
    });
    
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
      
    
    console.log(formValues.nombre)
    console.log(formValues.apellido)
    console.log(formValues.rut)
    if (formValues.telefono!=""){
      console.log(formValues.telefono)
    }
    console.log(formValues.celular)
    console.log(formValues.email)
    console.log(formValues.universidad)
    console.log(formValues.sexo)
  }*/
  //substring(0, 1);
  async registry( fRegistry: NgForm ) {
    if ( fRegistry.invalid ) {
      return;
    }
    this.checkRut();
    if (this.registerUser.run=='Invalid'){
      const alert = await this.alertCtrl.create({
        header: 'Alerta',
        //subHeader: 'Subtitle',
        message: ' El rut ingresado es invalido',
        buttons: ['OK'],
      });
      await alert.present();
      let result = await alert.onDidDismiss();
      console.log(result);
    }else{
      const valid = await this.userService.registry( this.registerUser );
      if ( valid ) {
        // navegar al tabs
        //if ( this.registerUser.typeUser === 'Usuario Principal') { // pantalla usuario tea
        const alert = await this.alertCtrl.create({
          header: 'Exito',
          //subHeader: 'Subtitle',
          message: 'El registro del usuarios se ha realizado con exito',
          buttons: ['OK'],
        });
        await alert.present();
        let result = await alert.onDidDismiss();
        console.log(result);
          this.navCtrl.navigateRoot('tabs/tab1', { animated: true } );
        //}
      } else {
        //this.uiService.infoAlert(' El correo electrónico ya existe. ');
        // mostrar aleta de usuario y contraseña no correctos
        const alert = await this.alertCtrl.create({
          header: 'Alerta',
          //subHeader: 'Subtitle',
          message: ' El correo electrónico ya existe. ',
          buttons: ['OK'],
        });
        await alert.present();
        let result = await alert.onDidDismiss();
        console.log(result);
        this.navCtrl.navigateRoot('tabs/tab3', { animated: true } );
      }
    }
    // console.log( fRegistry.valid );
  }
  checkRut() {
    this.registerUser.run=this.registerUser.run.replace(/\./g,'');
    this.registerUser.run=this.registerUser.run.replace('-','');
    console.log(this.registerUser.run)
    
    let valor = this.registerUser.run;
    let cuerpo = valor.slice(0,-1);
    let dv = valor.slice(-1).toUpperCase();
    //console.log(cuerpo)
    // Formatear RUN
    const rut = cuerpo + '-'+ dv
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if(cuerpo.length >= 7) { 

      let indi =cuerpo.length;
      // Calcular Dígito Verificador
      let suma = 0;
      let multiplo = 2;
      let i;
      // Para cada dígito del Cuerpo
      for(i=1;i<=cuerpo.length;i++) {
        
          // Obtener su Producto con el Múltiplo Correspondiente
          let f= Number(valor.charAt(indi- i));
          let index = multiplo * f;
          
          // Sumar al Contador General
          suma = suma + index;
          
          // Consolidar Múltiplo dentro del rango [2,7]
          if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    
      }
      
      // Calcular Dígito Verificador en base al Módulo 11
      const dvEsperado = 11 - (suma % 11);
      
      // Casos Especiales (0 y K)
      
      
      if (dv=='K'){
        dv = '10';
      }
      if (dv=='0'){
        dv = '11';
      }
      //console.log(dv +'..............'+ dv2)
      // Validar que el Cuerpo coincide con su Dígito Verificador
      if(dvEsperado != Number(dv)) { 
        console.log('feat')
        this.registerUser.run='Invalid';
      }else{
        console.log('exito')
        this.registerUser.run=rut;
      }
    
    }
    
  }

}
