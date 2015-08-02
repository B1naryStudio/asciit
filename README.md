# asciit
BSA 2015 Forum Project

### Развертывание в системном окружении разработчика:
1. Клонирование репозитория

    ```
    git clone https://github.com/m1x0n/asciit.git
    ```
    или по ssh:
    ```
    git clone git@github.com:m1x0n/asciit.git
    ```

    Команда создаст в текущей директории поддиректорию с именем проекта, в которой
     будут расположены склонированные файлы репозитория.

3. Создание локальной версии ветки `development`

   - Перейти в папку проекта:

        ```
        cd asciit
        ```

   - Создать ветку:

        ```
        git checkout development
        ```

2. Установка зависимостей

    ```
    composer install
    ```

4. Создание таблиц в базе данных

   - Создать в СУБД базу данных `ascit`
   - Добавить в основной директории проекта файл с именем `.env` по примеру
   `.env.example` и исправить в нем настройки базы данных на актуальные. Например:

       ```
       DB_HOST=192.168.10.10
       DB_DATABASE=ascit
       DB_USERNAME=homestead
       DB_PASSWORD=secret
       ```

   - запустить миграции

       ```
       php artisan migrate
       ```

5. Заполнение таблиц тестовыми данными

    ```
    php artisan db:seed
    ```

    Тестовые пользователи:

    ```
    email: admin@admin.com
    pass:  admin

    email: cypherpunks01@europe.com
    pass:  cypherpunks01
    ```
    У всех остальных пользователей случайно сгенерированый email и пароль `secret`.