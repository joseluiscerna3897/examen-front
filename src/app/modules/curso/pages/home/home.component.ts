import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GestionComponent } from '../../components/gestion/gestion.component';
import { ICurso } from '../../models/curso.model';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filterExpan: boolean = true;
  countRow: number = 0;
  curso: ICurso[] = [];

  cursoDT: MatTableDataSource<ICurso> = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'option',
    'description',
    'obligatory'
  ];

  constructor(
    public dialog: MatDialog,
    private _service: CursoService
  ) { }

  ngOnInit(): void {
    this.getCurso();
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
      .subscribe((rep) => (rep == 1 ? this.getCurso() : ''));
  }

  getCurso(): void {
    this._service.getAll().subscribe(resp => {
      this.curso = resp;
      this.curso == null || undefined
        ? (this.countRow = 0)
        : (this.countRow = this.curso.length);
      this.cursoDT = new MatTableDataSource(this.curso);
      if (this.cursoDT.data != null) {
        this.cursoDT.paginator = this.paginator;
        this.cursoDT.sort = this.sort;
      }
    })
  }

  edit(curso: ICurso): void {
    let dialogRef = this.dialog.open(GestionComponent, {
      data: curso,
      disableClose: true,
      autoFocus: true,
      hasBackdrop: true,
      width: '450px',
    });
    dialogRef
      .afterClosed()
      .subscribe((rep) => (rep == 1 ? this.getCurso() : ''));
  }
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.cursoDT.data != null) {
      this.cursoDT.filter = filterValue.trim().toLowerCase();
      this.countRow = this.cursoDT.filteredData.length;
    }
  }

}
