# digital_ocean

## husk at dropletten skal være en CentOS 6,9 x32

Lad os se hvad der sker :O

# alt dette forgår i putty, hvor man tilslutter sig droplettens ip adresse og sætter root burger op første gang man tilslutter sig. NB!! husk passwordet man bruger til root!! Da man skal bruge det hver gang man tilslutter sig.

# putty er et konsol program der gør det lettere at kører kommandoer på linux serveren, det er en SSH forbindelse, (secure shell)

Når man har fået dropletten op at kører, dvs den virtuelle linux server på digital ocean skal man

# sudo npm config set strict-ssl false

# 1. installere nano
nano er en tekst editor for linux, der gør det nemmere at skrive til og redigere filer på serveren.
- yum install nano

# 2. installer my-sql

- yum install mysql-server
- service mysqld start/stop/restart

# 3. så skal Node.JS installeres da det ikke ligger på serveren i forvejen

- yum install epel-release
- yum install nodejs
- yum install npm
- npm install -g n

node opdateres
- n lts
- n

# 4. installering af pm2

- install -g pm2

senere skal pm2 bruges istedet for nodemon når serveren skal startes op, men det kommer efter git installen


# 5. installering af github

- yum install git

konfigurer

- git config --global user.name "Dit navn"
- git config --global user.email "din@email.dk"

tjek på konfig er rigtigt

- nano ~/.gitconfig


# 6. oprettelse af en ssh nøgle så man sikkert kan tillade github at pushe til dropletten

oprettelse

- ssh-keygen -t rsa

læs file med den offentlige nøgle i

- nano ~/.ssh/id_rsa.pub

brug cat så man får indholdet ud på en linje, da det er lettere at kopier, evt.

Kopier indholdet af den offentlige nøgle til

- GitHub -> Settings -> SSH and GPG keys -> New SSH key

# 7. oprettelse af mappe til indholdet fra ens app

- mkdir ~/www

naviger ind i mappen da det er her git skal pull's til

- cd www

# 8. pull fra github

først opret alias

- alias pull = "git pull git@github.com:brugernavn/repository branch"

så kan man bare skrive pull i consolen, og så laver den et pull fra det repository man bruger.

så skal repositoriet clones til dropletten det gøres med kommandoen

git clone git@github.com:brugernavn/repository branch

# 9. start af pm2

inden start skal man kører en npm install, da modulerne skal installeres.

- pm2 startup server/app.js

så starter pm2 modulet app.js filen op og navngiver den app, så fremad kan skrive pm2 start app.
Dette er vigtigt da pm2 sørger for at genstarte app.js i tilfælde af crash, nu skulle hjemmesiden kører på den ip adresse der er tildelt.
# god fornøjelse ;)

# obs!!! i tilfælde af at der skal kopires en sql database på serveren

# 1. opret en tilladelse via putty

start mysql op først

- service mysqld start

log på mysgl på linux maskinen
angivelse af password
- mysql -p

man skal give root bruger lov til at logge på, på andre steder end localhosten

- GRANT ALL ON *.* TO 'root'@'%';

giver rettigeheder til alle databaser i alle tabeller, til root fra alle adresser.


Det næste man skal gøre er at angive passwordet man skal bruge fra andre adresser end lokalhost.

- SET PASSWORD FOR 'root*@'%' = PASSWORD('1234');

nu har root bruger lov til at logge ind fra andre steder end lokalhost.

gå ud af mysql

- quit;

så er du ude i root mappen igen.

# 2. brug af mysql-workbench til at tilslutte til sql databasen.

åbn mysql workbench, gå ind på lokalhosten

- klikke oppe på server -> data eksport, vælger databasen, eksporter den i en mappe. -> start eksport

- bare luk forbindelse og database

så skal det importeres ind på linux maskinen

mysql-workbench skal tilslutte sig linux serveren

- klik på ny forbindelse
- indtast ip adressen til linux serveren
- username = root
- når man connecter skal man skrive passworded fra serveren man lavede i putty

# 3. oprettelse af databasen på serveren

lige nu er der ikke nogen databaser, det skal oprettes, skal hede det samme som den gjorde på lokalhosten

- create new scheme - samme navn på lokalhosten -> apply

der er ingen tabeller i databasen, skal importeres fra dumpen man lavede lokalt

- server -> data import -> vælg fra mappen hvor dumpsne er -> import

husk genopfrisk for at kunne se tabbelerne

nu skulle node serveren kunne få tilgang til alt i databasen via lokalhosten


hvis i tvivl -> https://www.youtube.com/watch?v=7ouzVS1OP00


# vigtigt!!! husk!!!

service mysqld start

pm2 startup

pm2 start server/app.js --så burde den være navngivet

så kulle det kører