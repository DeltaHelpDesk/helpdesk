Pro spuštění aplikace 


Spuštění aplikace
- npm start (v rootu aplikace)


Testování aplikace
Android studio
Android SDK tools



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