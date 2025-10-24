import { signal } from '@angular/core';
import { FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';

export class FormHelperMethods {
  private formGroup!: FormGroup;
  public isFormSubmitted = signal<boolean>(false);

  public setFormGroup(formGroup: FormGroup): void {
    this.formGroup = formGroup;
  }
  public getFormGroup(formGroupName: string, formGroupNameFrom: FormGroup | string | null = null): FormGroup {
    if (formGroupNameFrom !== null) {
      if (formGroupNameFrom instanceof FormGroup) {
        return formGroupNameFrom.get(formGroupName) as FormGroup;
      }
      return this.formGroup.get(formGroupNameFrom) as FormGroup;
    }
    return this.formGroup.get(formGroupName) as FormGroup;
  }
  public getControl(formControlName: string, findControlFrom: FormGroup | FormArray | null = null): FormControl {
    if (findControlFrom !== null) {
      return findControlFrom.get(formControlName) as FormControl;
    }
    return this.formGroup.get(formControlName) as FormControl;
  }
  public getFormArray(formControlName: string, formGroupNameFrom: FormGroup | FormArray | null = null): FormArray {
    if (formGroupNameFrom !== null) {
      return formGroupNameFrom.get(formControlName) as FormArray;
    }
    return this.formGroup.get(formControlName) as FormArray;
  }
  public getControlError(formControlName: string, error: string, findControlFrom: FormGroup | FormArray | null = null): boolean {
    const formContol = (null !== findControlFrom) ? this.getControl(formControlName, findControlFrom) : this.getControl(formControlName);

    return (null !== formContol[`errors`] && undefined !== formContol[`errors`][error]) ? formContol[`errors`][error] as boolean : false;
  }
  public getControlEl(formControlName: string, key: keyof FormControl, findControlFrom: FormGroup | FormArray | null = null): any {
    const formContol = this.getControl(formControlName, findControlFrom);
    return formContol[key];
  }
  public getControlErrorView(formControlName: string, findControlFrom: FormGroup | FormArray | null = null): boolean {
    return (
      this.getControlEl(formControlName, 'touched', findControlFrom) || this.isFormSubmitted()
    ) ? true : false;
  }
  public mustMatch(controlName: string, matchControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchControl = formGroup.controls[matchControlName];

      if (matchControl.errors && !matchControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchControl.value) {
        matchControl.setErrors({ mustMatch: true });
      } else {
        matchControl.setErrors(null);
      }
    };
  }
  public touchAndChangeInUi<T extends AbstractControl>(controlName: T): void {
    controlName.markAsTouched();
    controlName.markAsDirty();
  }
  public untouchAndChangeInUi<T extends AbstractControl>(controlName: T): void {
    controlName.markAsUntouched();
    controlName.markAsPristine();
  }
}
