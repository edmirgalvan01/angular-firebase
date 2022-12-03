import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: UserModel = new UserModel();

  constructor(
    private service: UsersService,
    private currentPath: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Obtenemos el id mediante query params
    const id: string = this.currentPath.snapshot.paramMap.get('id') || '';
    if (id !== 'new') {
      this.service.getUser(id).subscribe((res) => {
        this.user = res;
        this.user.id = id;
      });
    }
  }

  saveUser(data: NgForm) {
    //Si algun dato que sea requerido no viene en el formulario
    if (data.invalid) {
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false,
    });

    Swal.showLoading(Swal.getDenyButton());

    let response: Observable<any>;

    //Si tiene valor, haremos una actualizacion, si no, un nuevo usuario
    if (this.user.id) {
      response = this.service.updateUser(this.user);
    } else {
      response = this.service.createUser(this.user);
    }

    response.subscribe((res) => {
      Swal.fire({
        title: 'Guardado',
        text: `El usuario ${this.user.name} ha sido guardado correctamente`,
        icon: 'success',
      });
    });
  }
}
