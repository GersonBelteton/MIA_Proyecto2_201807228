import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service'
import {Usuario} from '../../models/usuario'
import {Login} from '../../models/Login'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  
  constructor(private usuarioService: UsuariosService) { }

  login: Login={
    correo:'',
    contrasena:''
  };
  usuario: Usuario={
    idUsuario: 0,
    correo:'',
    contrasena:'',
    nombre:'',
    apellido:'',
    fecha_nacimiento:'',
    pais:''
  };
  contra1
  contra2
  existeUsuario = false
  usuarioEncontrado

  usuarios: any=[];  
  ngOnInit(): void {
  }
  
  validar(){
    if(this.contra1 == this.contra2){
      this.usuario.contrasena = this.contra1
      this.buscarUsuario()
    }else{
      console.log('contrasenas no coinciden')
    }
  }

  buscarUsuario(){
    console.log('buscandoUsuario')
    this.usuarioService.buscarUsuario(this.usuario.correo).subscribe(
      res=>{
        console.log(res);
        if(res != '0'){
          console.log('usuario ya existe')
          this.existeUsuario = true
        }else{
          console.log('usuario no existe')
          this.registrar()
        }

      }
    )
  }

  
  registrar(){
    console.log('registrar')
    this.usuarioService.saveUsuario(this.usuario).subscribe(
     res =>{
        console.log(res);
        localStorage.setItem("sesion",JSON.stringify(this.usuario)) 
        //location.href = '/user'
     },
     err => console.error(err)
    );
  }


  logIn() {
   
    if(this.login.correo == 'admin' && this.login.contrasena == 'admin'){
      console.log('administrador')
      location.href = '/admin' 
    }else{
      console.log("login us")
      this.usuarioService.auth(this.login)
      .subscribe(res => {
        console.log(res)
        
        localStorage.setItem("sesion",JSON.stringify(res));
        location.href = '/user'
        
      }, error => {
        console.log('hay un error :(')
        console.log(error)
      })
    }

  }

}





