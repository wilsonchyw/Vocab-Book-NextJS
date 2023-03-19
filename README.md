## Vocabsitory

[Vocab Book](http://vocab.services/) is a TypeScript, React, and Next.js application that uses the forgetting curve to help language learners memorize new words efficiently. Its user-friendly interface and advanced algorithms present users with new words at scientifically optimized intervals for maximum memory retention. With a wide range of languages and word lists, learners of all levels can use it to enhance their vocabulary knowledge and achieve their language learning goals faster.

 <img src="https://i.imgur.com/Sr8i3DJ.png" width="300">
 
## Tech Stack
* Database: Oracle Autonomous Database (Radius)
* Backend: Firebase, Knex
* Frontend: NextJS, Bootstrap, React, Redux
* Deployment: Docker, Nginx, CloudFlare
* Unit testing: Jest

## Development
### Preparation
1. Create an `.env` file on root folder
2. For the Oracle database, download the database wallet and place all files into oracle/wallet. Include the database login information in .env:
```
DATABASEUSER=<you database username>
DATABASEPASS=<you database password>
CONNNETSTRING=<your database connection string, which can be found in wallet/tnsnames.ora>
```
3. For Firebase, create a Firebase project and obtain the Firebase config from Firebase console > Project setting > General > SDK setup and configuration. Copy and append all into .env (remember to change : to =):
```
...
apiKey=Example
authDomain=Example
projectId=Example
storageBucket=Example
messagingSenderId=Example
appId=Example
measurementId=Example
```
4. For Firebase Admin, obtain your private key from Firebase console > Project setting > Service accounts > Generate new private key. Copy project_id, private_key, and client_email and append them into .env (remember to change : to =):
```
...
project_id=Example
private_key=Example
client_email=Example
```
### Start
```
docker-compose -f docker-compose-dev.yml up --build
```

## Deployment
### Preparation
1. Obtain a free SSL certificate from Let's Encrypt and place the privkey.pem and fullchain.pem into the nginx/certificate folder.
### Start
```
docker-compose -f docker-compose-prod.yml up --build
```

## Contributing
Contributions, issues, and feature requests are welcome!
Give a ⭐️ if you like this project!
