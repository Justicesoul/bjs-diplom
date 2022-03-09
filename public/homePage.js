'use strict';

//Выход из личного кабинета.
const logout = new LogoutButton();
logout.action = () => {
  ApiConnector.logout((res) => {
    if (res.success) {
      location.reload();
    }
  });
};

//Получение информации о пользователе.
ApiConnector.current((res) => {
  if (res.success) {
    ProfileWidget.showProfile(res.data);
  }
});

//Получение текущих курсов валюты.
const ratesBoard = new RatesBoard();
const currencyRates = (ratesBoard) => {
  ApiConnector.getStocks((res) => {
    if (res.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(res.data);
    }
  });
};
currencyRates(ratesBoard);
setInterval(() => {
  currencyRates(ratesBoard);
}, 60000);

//Операции с деньгами.
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (res) => {
    if (res.success) {
      ProfileWidget.showProfile(res.data);
      moneyManager.setMessage(true, 'Баланс успешно пополнен.');
    } else {
      moneyManager.setMessage(false, res.error);
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (res) => {
    if (res.success) {
      ProfileWidget.showProfile(res.data);
      moneyManager.setMessage(true, 'Конвертация валюты прошла успешно.');
    } else {
      moneyManager.setMessage(false, res.error);
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (res) => {
    if (res.success) {
      ProfileWidget.showProfile(res.data);
      moneyManager.setMessage(true, 'Перевод средств выполнен успешно.');
    } else {
      moneyManager.setMessage(false, res.error);
    }
  });
};

//Работа с избранным.
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((res) => {
  if (res.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(res.data);
    moneyManager.updateUsersList(res.data);
  }
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (res) => {
    if (res.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(res.data);
      moneyManager.updateUsersList(res.data);
      favoritesWidget.setMessage(true, 'Пользователь успешно добавлен.');
    } else {
      favoritesWidget.setMessage(false, res.error);
    }
  });
};

favoritesWidget.removeUserCallback = (response) => {
  ApiConnector.removeUserFromFavorites(response, (res) => {
    if (res.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(res.data);
      moneyManager.updateUsersList(res.data);
      favoritesWidget.setMessage(true, 'Пользователь успешно удален.');
    } else {
      favoritesWidget.setMessage(false, res.error);
    }
  });
};
