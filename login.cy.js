describe('Автотесты на авторизацию', function () {
    
    it('Правильный логин и правильный пароль', function () {
        cy.visit('https://login.qa.studio/');

        cy.get('#mail').type('german@dolnikov.ru'); // ввёл логин
        cy.get('#loginButton').should('be.disabled'); // кнопка не кликабельна

        cy.get('#pass').type('iLoveqastudio1'); // ввёл пароль
        cy.get('#loginButton').should('be.enabled'); // кнопка кликабельна

        cy.get('#loginButton').click(); // нажимаю кнопку войти

        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверка выдачи Авторизация прошла успешно

        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик виден пользователю
        })

    it('Проверка логики восстановления пароля', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#forgotEmailButton').click(); // нажимаю кнопку забыли пароль
        cy.get('#mailForgot').type('Brovan385@yandex.ru'); // ввёл электронную почту
        cy.get('#restoreEmailButton').should('be.enabled'); // кнопка отправить код кликабельна
        cy.get('#restoreEmailButton').click(); // нажимаю кнопку отправить код
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Проверка выдачи Успешно отправили пароль на e-mail
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик виден пользователю
        })

    it('Правильный логин и не правильный пароль', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#mail').type('german@dolnikov.ru'); // ввёл верный логин
        cy.get('#loginButton').should('be.disabled'); // кнопка не кликабельна
        cy.get('#pass').type('iLoveqastudio2'); // ввёл не верный пароль
        cy.get('#loginButton').should('be.enabled'); // кнопка кликабельна
        cy.get('#loginButton').click(); // нажимаю кнопку войти
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверка выдачи Такого логина и пароля нет
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик виден пользователю
        })

    it('Не правильный логин и правильный пароль', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#mail').type('german@dolinikov.ru'); // ввёл не верный логин
        cy.get('#loginButton').should('be.disabled'); // кнопка не кликабельна
        cy.get('#pass').type('iLoveqastudio1'); // ввёл верный пароль
        cy.get('#loginButton').should('be.enabled'); // кнопка кликабельна
        cy.get('#loginButton').click(); // нажимаю кнопку войти
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверка выдачи Такого логина и пароля нет
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик виден пользователю
        })

    it('Проверка на негативный кейс валидации', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#mail').type('germandolnikov.ru'); // ввёл логин без собачки
        cy.get('#loginButton').should('be.disabled'); // кнопка не кликабельна
        cy.get('#pass').type('iLoveqastudio1'); // ввёл верный пароль
        cy.get('#loginButton').should('be.enabled'); // кнопка кликабельна
        cy.get('#loginButton').click(); // нажимаю кнопку войти
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Проверка выдачи Нужно исправить проблему валидации
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик виден пользователю
        })

    it('Проверка на приведение к строчным буквам', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#mail').type('GerMan@Dolinikov.ru'); // ввёл не верный логин
        cy.get('#loginButton').should('be.disabled'); // кнопка не кликабельна
        cy.get('#pass').type('iLoveqastudio1'); // ввёл верный пароль
        cy.get('#loginButton').should('be.enabled'); // кнопка кликабельна
        cy.get('#loginButton').click(); // нажимаю кнопку войти
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверка выдачи Авторизация прошла успешно
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик виден пользователю
        })

})

describe('Покупка аватара', function () {
   it('e2e тест на покупку нового аватара для тренера', function () {
        cy.visit('https://pokemonbattle.me/');
        cy.get(':nth-child(1) > .auth__input').type('USER_LOGIN');
        cy.get('#password').type('USER_PASSWORD');
        cy.get('.auth__button').click();
        cy.get('.header__btns > [href="/shop"]').click();
        cy.get('.shop__list > li').not('.feature-empty').children('.shop__button').eq(0).click();
        cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4620869113632996');
        cy.get(':nth-child(1) > .pay_base-input-v2').type('1225');
        cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125');
        cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('German Dolnikov');
        cy.get('.pay-btn').click();
        cy.get('#cardnumber').type('56456');
        cy.get('.payment__submit-button').click();
        cy.get('.payment__adv').click();
    })
})