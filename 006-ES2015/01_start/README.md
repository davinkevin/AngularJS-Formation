Installation :
* Installation des modules NodeJS :
    $ npm install
* Installation du driver Selenium
    $ ./node_modules/protractor/bin/webdriver-manager update
* Démarrage du serveur WebDriver :
    $ ./node_modules/protractor/bin/webdriver-manager start (ou node webdriver-manager start pour windows)
* Démarrage du serveur web (dans un onglet différent) :
    $ npm start
* Lancement des test protractor
    $ ./node_modules/protractor/bin/protractor protractor_conf.js