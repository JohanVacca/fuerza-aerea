import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from './services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmacionDialogData } from '../Dialog/confirm-dialog/confirm-dialog.component';
import { EditDialogComponent, EditarUserDialogData } from './edit-dialog/edit-dialog.component';
import { SucessDialogComponent, SucessDialogData } from '../Dialog/sucess-dialog/sucess-dialog.component';

export class Usuarios {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit {
  public usuarios: Usuarios[] = [];
  rows = [];
  temp = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', "activo", "actions"];
  constructor(private usersService: UsersService, public dialog: MatDialog) {

  }

  async ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    return this.usersService.getAll()
      .subscribe((usuarios: Usuarios[]) => {
        this.usuarios = usuarios
      }
      );
  }
  deleteUser(id, name) {
    let datos: ConfirmacionDialogData = {
      icono: 'info',
      severidad: 'dialog-info',
      encabezado: 'Eliminar Usuario',
      descripcion: `¿Se encuentra seguro de eliminar el Usuario ${name}?`
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      ariaLabel: `Confirmar eliminación el usuario `,
      role: 'alertdialog',
      autoFocus: false,
      data: datos

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.usersService.delete(id).subscribe((result) => {
          this.getAllUsers();
        });
      } else {

      }

    });
    // return this.usersService.delete(id)

  }

  update(id, status, name) {
    let encabezado
    let descripcion
    let state
    if (status) {
      encabezado = `Desactivar usuario`
      descripcion = `¿Se encuentra seguro de Desactivar el Usuario ${name}?`
      state = false;
    }
    else {
      encabezado = `Activar usuario`
      descripcion = `¿Se encuentra seguro de Activar el Usuario ${name}?`
      state = true;
    }
    let datos: ConfirmacionDialogData = {
      icono: 'info',
      severidad: 'dialog-info',
      encabezado: encabezado,
      descripcion: descripcion
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      ariaLabel: `${encabezado} ${name} `,
      role: 'alertdialog',
      autoFocus: false,
      data: datos

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        try {
          this.usersService.activeOrDeactivateUser(id, state)
          this.getAllUsers();
          //inicio dialog sucess
          let datossucess: SucessDialogData = {
            icono: 'done',
            severidad: 'dialog-sucess',
            encabezado: `${encabezado}`,
            descripcion: `El Proceso para ${encabezado} ${name} se ha completado Satisfactoriamente`

          }
          const dialogRef = this.dialog.open(SucessDialogComponent, {
            ariaLabel: `${encabezado} ${name} Satisfactoriamente`,
            role: 'alertdialog',
            autoFocus: false,
            data: datossucess
          });
          dialogRef.afterClosed().subscribe(result => {
            this.getAllUsers();

          });
          //fin del dialog sucess

        } catch (error) {
        }
      }
      else {
        this.getAllUsers();
      }
    });
  }
  editar(id) {

    let datos: EditarUserDialogData = {
      id: id
    }
    const dialogRef = this.dialog.open(EditDialogComponent, {
      ariaLabel: `Editar`,
      role: 'alertdialog',
      autoFocus: false,
      data: datos
    });
    dialogRef.afterClosed().subscribe(result => {
      let datossucess: SucessDialogData = {
        icono: 'done',
        severidad: 'dialog-sucess',
        encabezado: `Proceso Completado`,
        descripcion: `El Proceso para editar el usuario se ha completado Satisfactoriamente`
      }
      const dialogRef = this.dialog.open(SucessDialogComponent, {
        ariaLabel: `El usuario fue Editado Satisfactoriamente`,
        role: 'alertdialog',
        autoFocus: false,
        data: datossucess
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getAllUsers();

      });

    });
  }

}
