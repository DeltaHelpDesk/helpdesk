Pro spuštění aplikace 


Spuštění aplikace
    npm start (v rootu aplikace)


Testování aplikace
Pro testování aplikace musíme nainstalovat Capacitor, Android Studio a SDK tools pro Android
Instalce Capacitoru
Minimálně jednou musíme použít příkaz build v naší aplikaci: npm run build
Nainstalujeme Capacitor: npm install --save @capacitor/cli @capacitor/core

Spuštění aplikace pro testování s pomocí Android studia
    npx cap init "appName" "appId" (appId = doména aplikace)
Přidání platformy
    npx cap add android
Otevření Android studia
    npx cap open android
V případě, že nemáme Android studio nainstalované defaulutně na disku C, přídáme do souboru capacitor.config.json
    "windowsAndroidStudioPath": "Cesta k souboru"
Aplikace se spustí a je připravena pro testování
Pokaždé když spustíme build aplikace je nutné poté nakopírovat změny
    npx cap copy

src
    app
        components
        - Funkční části kódu
        ----
        guards
        - Rozděluje, co se zobrazí přihlášenému uživateli a co nepřihlášenému
        ----
        assets
        - Obsahuje soubory, obrázky a ikony přístupné pro celou applikaci
        ----
        pages
            about: Stránka o členech
            task
            task-detail: Detail jednoho tasku
            task-form: Formulař na zadání nového tasku
            task-list: Seznam tasku
            authenticate: Přihlašovací stránka
            ----
        queries
        - Obsahuje soubory s dotazy do databáze
        ----
        services
enviroments
 -Připojení k GraphQL
theme
- ionic css -> pro celý program