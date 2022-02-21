## Vocabsitory
[Vocabsitory](https://vocabsitory.site/)(Vocabulary Repository) is an application combined with the forgetting curve to learn new words. It helps to learn vocabulary in an more efficient way.<p />

This application also demonstrate the integration of NextJS with SSL, Knex, Firebase and Nginx

The demonstration is deployed on Oracle cloud and Cloudflare. It is Ad-free and free for use.

 <img src="https://i.imgur.com/FanQzUF.png" width="300">
 
## Tech Stack
#### Database
- Oracle autonomous database, Redius
#### Backend
- Firebase, Knex
#### Frontend
- NextJS, Bootstrap, React, Redux 
#### Deployment
- Docker, Nginx, CloudFlare
#### Unit testing
- Jest

## Development
If you like this project, feel free to clone and deploy your own one.
### Preparation
- Create an `.env` file on root folder
- Oracle Database</p>
Download the database wallet and place all files into `oracle/wallet`. Include the database login information in `.env`.
```
DATABASEUSER=<you database username>
DATABASEPASS=<you database password>
CONNNETSTRING=<you database connnectstring, could find in wallet/tnsnames.ora>
```
- Firebase</p>
Create a Firebase project. Obtain the Firebase config from `Firebase console > Project setting > General > SDK setup and configuration`. Copy and append all into `.env` (Remenber to change `:` to `=`)
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
- Firebase Admin</p>
Obtain your private key from `Firebase console > Project setting > Service accounts > Generate new private key`. Copy `project_id, private_key and client_email` then append it into `.env` (Remenber to change `:` to `=`)
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

## Contributing
Contributions, issues, and feature requests are welcome!
Give a ⭐️ if you like this project!
