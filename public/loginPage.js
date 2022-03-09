'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (res) => {
    if (res.success) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(`Ошибка авторизации. ${res.error}`);
    }
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (res) => {
    if (res.success) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(`Ошибка регистрации. ${res.error}`);
    }
  });
};
