import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef  } from '@angular/core';
import { MediaMatcher  } from '@angular/cdk/layout';
// import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
  selector: 'app-navbar-landingpage',
  templateUrl: './navbar-landingpage.component.html',
  styleUrls: ['./navbar-landingpage.component.scss']
})
export class NavbarLandingpageComponent implements OnInit {
 
 // inicio de la prueba 
  currentSection = 'home';
  windowScroll() {
    const navbar = document.getElementById('navbar');
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop > 50) {
      navbar.classList.add('nav-sticky');
    } else {
      navbar.classList.remove('nav-sticky');
    }
  }

  toggleMenu() {
    document.getElementById('navbarCollapse').classList.toggle('show');
  }

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }
// fin de la prueba 


  toSomos(){
    document.getElementById("somos").scrollIntoView({behavior:"smooth",
    block :"center"});
  }
  toModelo(){
    document.getElementById("model").scrollIntoView({behavior:"smooth",
    block :"center"});
  }
  toFunciones(){
    document.getElementById("functions").scrollIntoView({behavior:"smooth",
    block :"center"});
  }
  toNormativas(){
    document.getElementById("capacidades").scrollIntoView({behavior:"smooth",
    block :"start"});
  }
  toPublicaciones(){
    document.getElementById("gallery").scrollIntoView({behavior:"smooth",
    block :"start"});
  }
  toMision(){
    document.getElementById("mision").scrollIntoView({behavior:"smooth",
    block :"center"});
  }
  toContacto(){
    document.getElementById("contact").scrollIntoView({behavior:"smooth",
    block :"center"});
  }
  toConvocatorias(){
    document.getElementById("convocatorias").scrollIntoView({behavior:"smooth",
    block :"center"});
  }

  
  constructor() {
    
  }

  


  ngOnInit(): void {
    
  }


}
