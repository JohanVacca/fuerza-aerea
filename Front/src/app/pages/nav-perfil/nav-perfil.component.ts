import { Component, OnInit } from '@angular/core';
import { AuthStorageService } from '../../@core/services/storage/auth-storage/auth-storage.service'
import { AuthService } from '../../@core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-perfil',
  templateUrl: './nav-perfil.component.html',
  styleUrls: ['./nav-perfil.component.scss']
})
export class NavPerfilComponent implements OnInit {

  UserName = 'Cargando';
  rol = 'NN';
  constructor(
      private authService: AuthService,
      private authStorageService: AuthStorageService,
      private router: Router
      ) {
        setTimeout(() => {
          this.UserName = this.authStorageService.getFullName();
          this.rol = localStorage.getItem("Role");
        },
        2000
      );
  }


  ngOnInit(): void {
    this.UserName = this.authStorageService.getFullName();
    this.rol = localStorage.getItem("Role");
    this.cargarName();
  }

  cargarName(){
    this.UserName = this.authStorageService.getFullName();
    this.rol = localStorage.getItem("Role");
  }

  public Salir(){
  this.authService.signOut();
  this.router.navigate(['home/sign-in']);
  }
}
