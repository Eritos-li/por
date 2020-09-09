import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import * as CKEditor from '@ckeditor/ckeditor5-angular';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { User } from '../interface/interfaces';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  user: User = {};
  public Editor = ClassicEditor;
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        //editor.resize( '100%', '100%', true ),
        //editor.config.height="300",
        editor.ui.getEditableElement()
    );
  }
  directionForm: FormGroup;
  //buscarN: FormGroup;
  //buscarR: FormGroup;
  nombre2=[];
  rut2=[];
  VerRut = {
    name: 'eros12',
    run: '19887539-3'
  };
  CKedior= {
    text: '<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>'
  };

  constructor(private fb: FormBuilder, private alertCtrl:AlertController,private userService: UserService,
    private navCtrl: NavController,) {
    this.createDirectionForm();
    //let nuevaLongitu = this.nombre2.push("eros")
  }

  ngOnInit() {
   
  }
  //Verificar si el rut es correcto
  async rut22( fRut: NgForm ) {
    if ( fRut.invalid ) {
      return;

    }
    this.checkRut()
    if (this.rut2.indexOf(this.VerRut.run)>=0){
      console.log('Repetido');    
      this.RutExi(); 

    }else{

      const valid = await this.userService.run2( /*this.VerRut.name,*/ this.VerRut.run );
      
      if ( valid ) {

        this.user = this.userService.run(this.VerRut.run); 
        console.log('Exito');
        this.nombre(this.user.name);
        this.rut(this.VerRut.run);
        
      } else {
        this.RutInv();
      }

    }

  }

  createDirectionForm() {
    this.directionForm = this.fb.group({
      edit: ['', Validators.required],
    });
    /*this.buscarN = this.fb.group({
      nombre: ['', Validators.required],
    });
    this.buscarR = this.fb.group({
      rut: ['', Validators.required],
    });*/
  }
  //formulario CKEditor y usuarios
  pro(formValues) {
  
    console.log(formValues.edit)
    this.nombre2.forEach(function(elemento, indice, array) {
      console.log(elemento, indice);
    })
    this.rut2.forEach(function(elemento, indice, array) {
      console.log(elemento, indice);
    })

    let ultimo = this.nombre2[this.nombre2.length - 1]

    if (ultimo==null){
      this.NoHayReceptor();
    } else{
      this.exito();
    }
    

  }
  //Alerta no existe destinatario
  async NoHayReceptor() {
    const alert =await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: 'Se deben ingresar los destinatarios',
      buttons: ['Cerrar']
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  //alerta se han enviado
  async exito() {
    const alert =await this.alertCtrl.create({
      header: 'Datos enviados',
      subHeader: 'El mensaje se ha enviado con exito',
      buttons: ['Ok']
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  //alerta Rut no existe
  async RutInv() {
    const alert =await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: 'El rut ingresado no existe',
      buttons: ['Ok']
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  async RutExi() {
    const alert =await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: 'El rut ya está ingresado',
      buttons: ['Ok']
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  //crear arreglo de los nombres
  nombre(formValues) {
  
    //console.log(formValues.nombre)
    
    //let nuevaLongitud = this.nombre2.push(formValues.nombre)
    let nuevaLongitud = this.nombre2.push(formValues)
    this.nombre2.forEach(function(elemento, indice, array) {
      console.log(elemento, indice);
    })
  }

  /*ElimNombre(nom){
    console.log(nom);
    this.nombre2.push(nom)
    let pos = this.nombre2.indexOf(nom)
    console.log(pos);
    let elementoEliminado = this.nombre2.splice(pos,1);
    let ultimo = this.nombre2.pop()
    
  }*/
  //crear arreglo de rut
  rut(formValues) {
  
    //console.log(formValues.rut)
    //let nuevaLongitud = this.rut2.push(formValues.rut)
    let nuevaLongitud = this.rut2.push(formValues)
    this.rut2.forEach(function(elemento, indice, array) {
      console.log(elemento, indice);
    })
  }
  //eliminar destinatarios
  ElimRut(run){
    
    //console.log(run);
    this.rut2.push(run)
    let pos = this.rut2.indexOf(run)
    //console.log(pos);
    let elementoEliminado = this.rut2.splice(pos,1);
    let ultimo = this.rut2.pop()
    let elementoEliminado2 = this.nombre2.splice(pos,1);
    //let ultimo2 = this.nombre2.pop()
    
  } 
  checkRut() {
    this.VerRut.run=this.VerRut.run.replace(/\./g,'');
    this.VerRut.run=this.VerRut.run.replace('-','');
    
    
    let valor = this.VerRut.run;
    let cuerpo = valor.slice(0,-1);
    let dv = valor.slice(-1).toUpperCase();
    //console.log(cuerpo)
    // Formatear RUN
    this.VerRut.run= cuerpo + '-'+ dv
    console.log(this.VerRut.run)
  }
}

