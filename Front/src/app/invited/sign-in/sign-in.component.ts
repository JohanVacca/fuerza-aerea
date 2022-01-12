import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../@core/services/auth/auth.service';
import {alertStatuses} from '../../@core/consts/alert-statuses.const';
import {AlertModel} from '../../@core/old-models/alert.model';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    // providers:[AuthService]
})
export class SignInComponent implements OnInit {

    hide = true;
    // emailFormControl = new FormControl('', [
    //   Validators.required,
    //   Validators.email,
    // ]);

    CorrI = false;
    ClaveI = false;
    CorrCN = false;

    LoginForm: FormGroup;
    showAlertBox = false;
    alert: AlertModel;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        public authService: AuthService,
    ) {
    }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.LoginForm = this.fb.group({
            email: ['', Validators.compose(
                [
                    Validators.required,
                    Validators.email,
                ],
            )],
            password: ['', Validators.compose(
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(12),
                ])],
        });
    }

    email = () => this.LoginForm.controls.email;
    password = () => this.LoginForm.controls.password;

    onSubmit() {
        const datos = this.LoginForm.value;
        var email = datos['email'].toLowerCase();
        var password = datos['password'];
        this.authService.signIn(email, password)
            .subscribe(
                (res) => {
                    this.showSuccessAlert();
                    this.goToDashboard();
                },
                (err) => {
                    if (err.status === 404) {
                        this.showUserDoesntExistsAlert();
                        this.CorrI = true;
                    } else if (err.status === 403) {
                        this.showUserNotActivedAlert();
                        this.CorrCN = true;
                    } else if (err.status === 400) {
                        this.showUserNotActivedAlert();
                        this.ClaveI = true;
                    }
                },
            );
    }

    CloseAlert() {
        this.CorrI = false;
        this.ClaveI = false;
        this.CorrCN = false;
    }

    showSuccessAlert() {
        this.showAlert();
        this.alert = {
            type: alertStatuses.success,
            message: 'Bienvenido!',
        };
    }

    showUserDoesntExistsAlert() {
        this.showAlert();
        this.alert = {
            type: alertStatuses.danger,
            message: 'El usuario ingresado no existe.',
        };
    }

    showUserNotActivedAlert() {
        this.showAlert();
        this.alert = {
            type: alertStatuses.danger,
            message: 'El usuario no se encuentra activo, por favor contacte al administrador.',
        };
    }

    showUserContrActivedAlert() {
        this.showAlert();
        this.alert = {
            type: alertStatuses.danger,
            message: 'La contraseña equivocada',
        };
    }


    private showAlert() {
        this.showAlertBox = true;
    }

    private hideAlert() {
        this.showAlertBox = false;
    }

    public goToSignUp() {
        this.router.navigate(['home/sign-up']);
    }

    public goToDashboard() {
        this.router.navigate(['pages']);
    }

}
