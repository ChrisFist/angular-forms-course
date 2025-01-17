import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  val = {
    email: "hello@gmail.com",
    password: "123456",
  };

  constructor() {}

  ngOnInit() {}

  login(loginForm: NgForm, submit) {
    console.log(loginForm.value, loginForm.valid, submit);
    this.val.email = loginForm.form.get("email").value;
    this.val.password = loginForm.form.get("password").value;
    console.log("val", this.val);
  }
}
