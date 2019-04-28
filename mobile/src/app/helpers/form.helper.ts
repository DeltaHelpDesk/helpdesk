import { FormGroup } from "@angular/forms";

/**
 * Marks all controls in a form group as touched
 * @param formGroup - The form group to touch
 */
export function markFormGroupTouched(formGroup: FormGroup) {
  (<any>Object).values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control.controls) {
      this.markFormGroupTouched(control);
    }
  });
}
