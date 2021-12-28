import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { GestionComponent } from '../../components/gestion/gestion.component';
import { IAlumno } from '../../models/alumno.model';
import { AlumnnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filterExpan: boolean = true;
  countRow: number = 0;
  alumno: IAlumno[] = [];

  alumnoDT: MatTableDataSource<IAlumno> = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'option',
    'name',
    'dateOfBirth',
    'sex',
    'state'
  ];

  constructor(
    public dialog: MatDialog,
    private _service: AlumnnoService
  ) { }

  ngOnInit(): void {
    this.getAlumno();
  }

  add(): void {
    let dialogRef = this.dialog.open(GestionComponent, {
      disableClose: true,
      autoFocus: true,
      hasBackdrop: true,
      width: '450px',
    });
    dialogRef
      .afterClosed()
      .subscribe((rep) => (rep == 1 ? this.getAlumno() : ''));
  }

  getAlumno(): void {
    this._service.getAll().subscribe(resp => {
      this.alumno = resp;
      this.alumno == null || undefined
        ? (this.countRow = 0)
        : (this.countRow = this.alumno.length);
      this.alumnoDT = new MatTableDataSource(this.alumno);
      if (this.alumnoDT.data != null) {
        this.alumnoDT.paginator = this.paginator;
        this.alumnoDT.sort = this.sort;
      }
    })
  }

  edit(alumno: IAlumno): void {
    let dialogRef = this.dialog.open(GestionComponent, {
      data: alumno,
      disableClose: true,
      autoFocus: true,
      hasBackdrop: true,
      width: '450px',
    });
    dialogRef
      .afterClosed()
      .subscribe((rep) => (rep == 1 ? this.getAlumno() : ''));
  }

  desactivar(_id: number): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Esta accion desactivar el alumno!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, desactivar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.delete(_id).subscribe(() => this.getAlumno());
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.alumnoDT.data != null) {
      this.alumnoDT.filter = filterValue.trim().toLowerCase();
      this.countRow = this.alumnoDT.filteredData.length;
    }
  }

}
