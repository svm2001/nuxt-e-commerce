Приветствую. Это полноценное демо-приложение классического e-commerce магазина. Включает в себя все основные циклы при работе с интернет-магазином:
- авторизация
- регистрация
- просмотр товара: сортировка, фильтрация, пагинация
- добавление товара в корзину
- оформление заказа
- администрирование

Стек: 
- Vue3 (Nuxt3)
- Composition API
- Pinia
- Typescript
- Tailwind
- UI: Shadcn
- Iconify
- API: Platzi API
- Backend: NestJS (писался не мной)

Для пользователя приложение разделяется на 3 роли: 
- неавторизованный гость - может только просматривать товары и категории товаров
-  авторизованный пользователь - может добавлять товары в корзину и избранное, редактировать корзину и оформить заказ
- администратор - открывается доступ к дополнительному разделу сайта: Дашборд администратора.


Регистрация:
- создание нового пользователя (доступно для неавторизованного гостя)


Авторизация: 
- вход на сайт, аутентификация. Работает через JWT-токен.

Сайт, главная страница:
- общая информация

Сайт, страница продуктов: 
- вывод товаров
- возможность добавления товара в корзину (только для авторизованных пользователей)
- возможность добавления товара в избранное (только для авторизованных пользователей)
- возможность фильтровать товары по названию, цене (убывание, возрастание), по категории.
- возможность сортировки: по цене, по названию.
- возможность перейти на динамическую детальную страницу товара
- пагинация

Сайт, категории: 
- вывод категорий
- возможность перейти на детальную страницу категории

Корзина (только для авторизованных пользователей): 
- изменение количества товара в корзине
- удаление товара из корзины
- возврат товара в корзину
- оформление заказа

Дашборд администратора, страница продуктов (только для роли администратора):
- вывод товаров
- возможность фильтровать товары по названию, цене (убывание, возрастание), по категории.
- возможность сортировки: по цене, по названию.
- пагинация
- добавление товара
- удаление товара
- редактирование товара

Дашборд администратора, страница категорий (только для роли администратора):
- вывод категорий
- добавление категории
- удаление категории
- редактирование категории

Дашборд администратора, страница пользователя (только для роли администратора):
- вывод списка пользователей
- редактирование пользователя
- добавление нового пользователя
- удаление пользователя
- сортировка пользователей: по имени, по роли, по e-mail



Установка:
```
npm install
```
или
```
yarn install
```

Дев:
```
npm run dev
```
или
```
yarn dev
```

Сборка:
```
npm run build
```
или
```
yarn build
```
