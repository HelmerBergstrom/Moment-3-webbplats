# Moment 3 - Webbplats

Denna webbplats konsumerar ett REST API som är skapat av mig, Helmer Bergström.
API:ets repo finns här: [text](https://github.com/HelmerBergstrom/Moment-3.1-backend/tree/dev)

### Hemsida och Webbtjänst

Denna hemsida är skapad med HTML, CSS och mestadels JavaScript. Hemsidan konsumerar en REST-webbtjänst som använder MongoDB i samband med Mongoose som databas. 

#### GET 

Hemsidan hämtar data från databasen via Fetch API och använder CRUD-metoderna som REST-webbtjänsten stödjer. På startsidan(index.html) listas erfarenheter ut i en lista. Erfarenheterna är tagna från databasen där de lagras. För att hämta och skriva ut dessa erfarenheter används först GET för att hämta erfarenheterna, sedan används en forEach-loop för att skriva ut dessa användaren.

#### POST 

Förutom GET, används såklart även POST. POST används för att lägga till erfarenheter och detta gör man på undersidan "LÄGG TILL"(add.html). På denna sida möts användaren av ett formulär där personen kan fylla i en erfarenhet som de vill lagra i listan på startsidan.

Validering görs i formuläret för att kontrollera att användaren har fyllt i allt, detta görs via REST-webbtjänsten. Har användaren fyllt i allt korrekt, kan användaren klicka på "LÄGG TILL ERFARENHET" och därmed skickas de inmatade fälten till databasen. Efter det har skickats till databasen, kan tidigare GET-anrop hämta erfarenheten.

#### PUT och DELETE

PUT och DELETE används också på hemsidan. Båda dessa används på startsidan i samband med de listade erfarenheterna. Ett klick på knappen "ÄNDRA" ger användaren ett nytt formulär som placerar sig där erfarenheten tidigare låg. I detta formulär kan användaren mata in om något ska ändras. Erfarenhetens tidigare värden och text ligger kvar i detta formulär som standard.

PUT-metoden använder id:t som varje erfarenhet får vid lagring i databasen, för att veta vilken erfarenhet som gäller.

DELETE-metoden har samma logik som PUT och vid klick på knappen "RADERA" kan användaren ta bort erfarenheten från hemsidan men även databasen såklart. 