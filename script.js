'use strict';
import accounts from './data.js';

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

class Bankist {
  #accounts;
  constructor(accounts) {
    this.#accounts = accounts;
    this.#createUsername(this.#accounts);
    this.#selectDOMElements();
    this.#displayMovements(accounts[1].movements);
    this.#displaySummary(accounts[1].movements);
    console.log(accounts[1].movements);
  }
  #selectDOMElements() {
    // Elements
    this.labelWelcome = document.querySelector('.welcome');
    this.labelDate = document.querySelector('.date');
    this.labelBalance = document.querySelector('.balance__value');
    this.labelSumIn = document.querySelector('.summary__value--in');
    this.labelSumOut = document.querySelector('.summary__value--out');
    //prettier-ignore
    this.labelSumInterest = document.querySelector('.summary__value--interest');
    this.labelTimer = document.querySelector('.timer');
    this.containerApp = document.querySelector('.app');
    this.containerMovements = document.querySelector('.movements');
    this.btnLogin = document.querySelector('.login__btn');
    this.btnTransfer = document.querySelector('.form__btn--transfer');
    this.btnLoan = document.querySelector('.form__btn--loan');
    this.btnClose = document.querySelector('.form__btn--close');
    this.btnSort = document.querySelector('.btn--sort');
    this.inputLoginUsername = document.querySelector('.login__input--user');
    this.inputLoginPin = document.querySelector('.login__input--pin');
    this.inputTransferTo = document.querySelector('.form__input--to');
    this.inputTransferAmount = document.querySelector('.form__input--amount');
    this.inputLoanAmount = document.querySelector('.form__input--loan-amount');
    this.inputCloseUsername = document.querySelector('.form__input--user');
    this.inputClosePin = document.querySelector('.form__input--pin');
  }
  #displayMovements(movements) {
    movements.forEach((movement, index) => {
      const typeMovement = movement < 0 ? 'withdrawal' : 'deposit';
      const order = index + 1;
      const html = `<div class="movements__row">
        <div class="movements__type movements__type--${typeMovement}">${order} ${typeMovement}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${movement} €</div>
      </div>`;
      this.containerMovements.insertAdjacentHTML('afterbegin', html);
    });
  }
  #createUsername(accounts) {
    accounts.forEach(account => {
      account.username = account.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join('');
    });
  }
  #displaySummary(movements) {
    const income = movements
      .filter(movement => movement > 0)
      .reduce((previousMovement, currentMovement) => {
        return previousMovement + currentMovement;
      });

    console.log(movements);

    this.labelSumIn.textContent = `${income}€`;

    const out = movements
      .filter(movement => movement < 0)
      .reduce((previousMovement, currentMovement) => {
        return previousMovement + currentMovement;
      });

    this.labelSumOut.textContent = `${out}€`;

    const interest = movements
      .filter(movement => movement > 0)
      .map(interest => (interest * 1.2) / 100)
      .reduce((previousMovement, currentMovement) => {
        return previousMovement + currentMovement;
      });

    this.labelSumInterest.textContent = `${interest}€`;
  }
}

const BankistApp = new Bankist(accounts);
