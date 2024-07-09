
# Pet shop UI 

## Table of content
1.  [Project Overview](#project-overview)
2.  [Cloning and Running the Project](#cloning-and-running-the-project)
3.  [Current Progress](#current-progress)
4.  [To Dos](#to-dos)


## Project Overview

Pet shop UI is a project designed to test candidates experience in frontend development. On this part of the test, I showcased my knowledge, skills, and detail-oriented Frontend experience.

This application is connected to the existing PetShop API test demo and fetch all the necessary data from it's endpoints.

This project was created using the following technologies and tools:
- [VueJS framework](https://vuejs.org)
- [Vuetify UI library](https://vuetifyjs.com/en/)
- [Vitest for testing](https://vitest.dev/)
- [Pinia for state management](https://pinia.vuejs.org/)

This project was scaffolded with Vuetify, which is designed to give you a head start in building your new Vuetify application. It sets up a base template with all the necessary configurations and standard directory structure, enabling you to begin development without the hassle of setting up the project from scratch. Feel free to check vuetify  [full documentation](https://vuetifyjs.com/) 



## Cloning and Running the Project

### Prerequisites
- Node.js installed 
- npm installed 

### Cloning the Repository

1. Open your terminal and run the following command to clone the project:
```bash
git clone https://github.com/Sami-21/pet-shop-ui.git
```
\
2. Enter project directory:
```bash
cd pet-shop-ui
```
\
3. Install dependencies:
```bash
npm install 
```

 \
In case of conflict (probably will happen) run:
```bash
npm install --legacy-peer-deps
```
 
\
4. Create an .env file within the root directory , create it manually or via terminal with :
```bash 
touch .env
```
\
5. Copy the content of .env.example and paste it in your new .env file, your file should look like this :
```env
VITE_API_URL=https://pet-shop.buckhill.com.hr/api/v1
```


#### ❗️ Important info
Always make sure to include your .env in .gitignore file to prevent leaking any sensitive data.\
\
6. Run the project with the following command:
```bash 
npm run dev
```
\
7. Run test with vitest : 
```bash 
npm run test
```



## Current Progress

- Log in
- Create user account
- Logout
- View user details
- View user orders

## To Dos
- Order details page.
- Order invoice print (PDF format)

## License

[MIT](https://choosealicense.com/licenses/mit/)

