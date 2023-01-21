import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { createPromoRangeValidator } from "../../validators/date-range.validator";

@Component({
  selector: "create-course-step-2",
  templateUrl: "create-course-step-2.component.html",
  styleUrls: ["create-course-step-2.component.scss"],
})
export class CreateCourseStep2Component implements OnInit {
  form = this.fb.group(
    {
      courseType: ["premium", Validators.required],
      price: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(9999),
          Validators.pattern("([0-9]+(.?[0-9]?[0-9]?)?)"),
        ],
      ],
      thumbnail: [null],
      promoStartAt: [null],
      promoEndAt: [null],
    },
    {
      validators: [createPromoRangeValidator()],
    }
  );

  constructor(private fb: FormBuilder) {}

  isUploadValid(): boolean {
    let thumbnail = this.form.controls["thumbnail"];
    if (thumbnail.errors == null) return true;
    if (thumbnail.errors.requiredFileType == "image/png") return false;
    return true;
  }

  ngOnInit() {
    //valueChanges you can apply on field and complete Formlevel
    this.form.controls["courseType"].valueChanges.subscribe(() => {
      const courseType = this.form.controls["courseType"];
      const priceControl = this.form.controls["price"];

      if (courseType.value == "free" /* && courseType.enabled*/) {
        priceControl.disable({ emitEvent: false });
      } else if (courseType.value == "premium" /*&& priceControl.disabled*/) {
        priceControl.enable({ emitEvent: false });
      }
    });
    // this.form.controls["thumbnail"].valueChanges.subscribe((val) => {
    //   alert("Test Upload Change");
    // });
  }
}
