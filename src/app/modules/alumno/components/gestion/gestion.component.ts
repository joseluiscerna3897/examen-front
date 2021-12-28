import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlumnnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      id: [''],
      name: ['', [Validators.required]],
      dateOfBirth: ['',[Validators.required]],
      sex: ['', [Validators.required]],
      state: ['']
    })
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<GestionComponent>,
    private _service: AlumnnoService
  ) { this.initForm(); }

  ngOnInit(): void {
    if (this.data != null ){
      this.form.setValue(this.data)
    }
  }

  save(): void {
    console.log(this.form.value)
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const id = this.form.get('id').value;

    if (id > 0) {
      this.updateAlumno(id);
    } else {
      this.createAlumno();
    }
  }

  createAlumno(): void {
    this._service.create(this.form.value).subscribe(() => {
      this.dialogRef.close(1);
    });
  }

  updateAlumno(_id: number): void {
    this._service.update(_id, this.form.value).subscribe(() => this.dialogRef.close(1));
  }

  close(): void {
    this.dialogRef.close(0);
  }

}
