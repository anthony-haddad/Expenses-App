# Expenses-App

### Project Setup

- cd into project then...  
`cp .env.example .env`  
`docker-compose up -d --build`

#### Backend
- Exec into php container  
`./php.sh`  
- Create .env file  
`cp .env.example .env`
- Fill in below values in .env  
```yaml
DB_CONNECTION=mysql
DB_HOST=database
DB_PORT=3306
DB_DATABASE=expenses_app
DB_USERNAME=user
DB_PASSWORD=password
PER_PAGE=10
```
- Install composer dependencies  
`composer install`  
- Generate app key  
`php artisan key:generate`  
- Migrate db schema  
`php artisan migrate`  

#### Frontend
- Exec into node container  
`./npm.sh`  
- Install dependencies  
`npm install`
- Copy .env  
`cp .env.example .env`  
> In .env you can find `REACT_APP_BASE_URL` var that is the base API url for fetching from the backend it should be set to **http://localhost:{NGINX_PORT}/api**  
- Start dev server  
`npm start`  

-------------------------
### Tools and dependencies

#### Backend
1- **DarkaOnLine/L5-Swagger** for generating api documentation  
2- **Laravel Framework** Using php-v8.0  
3- **Nginx** as a web server  
4- **Mysql8** for database  

#### Frontend
1- **React v18**  
2- **Typescript v4.9**  
3- **Zustand + React Query** for state management  
4- **React Bootstrap** for styling  
5- **React Toastify** for notifications  
6- **React Hook Form** for handling form submissions  

--------------------------

### Infrastructure

This app is deployed on AWS (https://expensemanager.tk)

#### Services used
**EC2** t2.small as the VM of choice  
**Route 53** for DNS management  
**GHA** for continuous integration  
**Docker** for containerization  
**Docker Compose** for container orchestration  

---------------------------

### Documentation

Find swagger documentation [here](https://expensemanager.tk/api/documentation)  
