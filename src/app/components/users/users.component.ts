import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: UserModel[] = [];
  isLoading: boolean = false;
  constructor(private service: UsersService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.service.showUsers().subscribe((res) => {
      this.users = res;
      this.isLoading = false;
    });
  }

  deleteUser(user: UserModel, id: number) {
    Swal.fire({
      title: 'Borrar usuario',
      text: `¿Estas seguro de borrar al usuario ${user.name}?`,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
    }).then((res) => {
      if (res.value) {
        this.service.deleteUser(user.id).subscribe();
        this.users.splice(id, 1);
      }
    });
  }
}
