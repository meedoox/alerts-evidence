# Backend dokumentace

Tato dokumentace se zaměřuje na podrobný popis backendové části aplikace, včetně architektury, použité technologie, struktury databáze, API endpointů a dalších relevantních detailů.

## Obsah

1. [Architektura backendu](#architektura-backendu)
2. [Technologie](#technologie)
3. [Databázová struktura](#databazova-struktura)
4. [API endpointy](#api-endpointy)
5. [Autentizace a autorizace](#autentizace-a-autorizace)
6. [Budoucí vylepšení backendu](#budouci-vylepseni-backendu)
7. [Testování](#testování)
8. [Udržitelnost kódu](#udržitelnost-kódu)

## Architektura backendu

Backend aplikace je postaven na frameworku **NestJS**, což je progresivní framework pro tvorbu škálovatelných a udržovatelných serverových aplikací. Architektura backendu je modulární a využívá koncepty jako Dependency Injection a moduly pro oddělení funkční logiky, což umožňuje snadnou rozšiřitelnost a údržbu.

Backend se skládá z následujících klíčových modulů:

- **UserModule**: Modul zodpovědný za správu uživatelů, včetně jejich registrace, úprav a mazání účtů.
- **AlertModule**: Modul pro správu upozornění, jejich vytváření, úpravy, mazání a přidávání souborů.
- **PrismaModule**: Modul zajišťující komunikaci s databází prostřednictvím Prisma ORM.

## Technologie

- **NestJS**: Použit pro základní architekturu backendu a organizaci modulů.
- **PostgreSQL**: Relační databáze pro ukládání dat o uživatelích, upozorněních a v budoucnu dalších entitách.
- **Prisma ORM**: Používá se pro komunikaci s databází, zajišťuje datové modelování a migrace.
- **Multer**: Middleware pro zpracování nahrávání souborů.

## Postup pro spuštění aplikace lokálně

Pro spuštění backendové části aplikace lokálně postupujte podle následujících kroků:

### Požadavky

- **Node.js**: Aplikace vyžaduje Node.js. Doporučuje se použít nejnovější stabilní verzi.
- **NPM**: Pro instalaci závislostí použijte **npm**
- **PostgreSQL**: Nainstalujte a spusťte PostgreSQL databázi. Ujistěte se, že máte přístup k databázi a můžete ji používat.

### Postup

1. **Klonování repozitáře**

   - Klonujte repozitář aplikace z GitHubu pomocí příkazu:
     ```bash
     git clone <URL_REPOZITARE>
     ```

2. **Instalace závislostí**

   - Přesuňte se do složky s backendovým projektem a nainstalujte závislosti:
     ```bash
     cd backend
     npm install
     ```

3. **Nastavení prostředí**

   - Vytvořte soubor `.env` v kořenovém adresáři projektu a přidejte potřebné proměnné prostředí (např. připojení k databázi):
     ```env
     DATABASE_URL=postgresql://user:password@localhost:5432/mydb
     APP_PORT=3003
     API_VERSION=1
     ```

4. **Databáze**

   - Použijte Prisma k inicializaci migraci databáze:
     ```bash
     npx prisma generate
     npx prisma migrate dev --name init
     ```

5. **Spuštění vývojového serveru**

   - Spusťte aplikaci lokálně:
     ```bash
     npm run start:dev
     ```
   - Backendová aplikace bude dostupná na adrese `http://localhost:4000`.

6. **Testování aplikace**
   - Zajistěte, aby PostgreSQL databáze byla spuštěna před spuštěním backendu, aby se aplikace mohla úspěšně připojit k databázi.

Tento postup vám umožní spustit backendovou část aplikace na lokálním stroji pro vývoj a testování.

## Databázová struktura

Backend využívá **PostgreSQL** databázi a **Prisma ORM** pro správu dat. Následuje popis hlavních modelů používaných v databázi:

### Model User

- **id** (Int, Primary Key, Auto Increment): Jedinečný identifikátor uživatele.
- **email** (String, Unique): E-mailová adresa uživatele.
- **firstName** (String): Křestní jméno uživatele.
- **lastName** (String): Příjmení uživatele.
- **password** (String): Heslo uživatele, uložené v hashované podobě.
- **createdAt** (DateTime): Datum a čas vytvoření účtu.
- **updatedAt** (DateTime): Datum a čas poslední aktualizace účtu.

### Model Alert

- **id** (Int, Primary Key, Auto Increment): Jedinečný identifikátor upozornění.
- **name** (String): Název osoby které se upozornění týká.
- **age** (Int): Věk osoby související s upozorněním.
- **note** (String, Optional): Poznámka k upozornění.
- **file** (String, Optional): Cesta k nahranému souboru.
- **userId** (Int, Foreign Key): Odkaz na uživatele, který upozornění vytvořil.
- **createdAt** (DateTime): Datum a čas vytvoření upozornění.
- **updatedAt** (DateTime): Datum a čas poslední aktualizace.

## API endpointy

Backend poskytuje REST API, které umožňuje frontendové části komunikovat se serverem. Níže jsou uvedeny hlavní API endpointy.

### /users

- **GET /users**: Vrátí seznam všech uživatelů.
- **GET /users/:id**: Vrátí detaily konkrétního uživatele podle jeho ID.
- **POST /users**: Vytvoří nového uživatele.
- **DELETE /users/:id**: Smaže uživatele.

### /alerts

- **GET /alerts**: Vrátí seznam všech upozornění.
- **GET /alerts/:id**: Vrátí detaily konkrétního upozornění podle jeho ID.
- **POST /alerts**: Vytvoří nové upozornění.
- **PUT /alerts/:id**: Aktualizuje údaje upozornění včetně nahrání souboru.
- **DELETE /alerts/:id**: Smaže upozornění.

## Autentizace a autorizace

Aktuálně není implementována žádná autentizace ani autorizace. Aktuálně se musí vytvořit user a ve frontendové části v .env se musí nastavit id uživatele se kterým se pracuje NEXT_PUBLIC_LOGGED_IN_USER_ID='4'.

Do budoucna by to chtělo implementovat **JWT** (JSON Web Token) pro autentizaci a autorizaci. Každý uživatel, který by se přihlásil, by obdržel JWT token, který by byl přiložen ke každému dalšímu požadavku na chránění API endpointů.

Middleware by mohl zajišťovat kontrolu platnosti tokenu a oprávnění uživatele přistupovat k daným zdrojům. Různé role a úrovně oprávnění zatím nejsou implementovány, ale jsou plánovány jako budoucí rozšíření.

## Budoucí vylepšení backendu

- **Autentizace a autorizace**: Přidat možnost přihlášení (registrace) a následné autorizace každého requestu
- **Podpora více rolí a oprávnění**: Přidání uživatelských rolí, jako jsou administrátor, editor a běžný uživatel, což by umožnilo diferencovat oprávnění pro různé části aplikace.
- **Přidání kategorií k upozorněním**: Přidat možnost určit kategorii upozornění
- **Lepší logování**: Implementace detailního logování pro sledování akcí uživatelů a systémových událostí.
- **Rate limiting**: Zavedení rate limiting pro ochranu API před přetížením nebo útoky.

## Testování

Aktuálně nejsou pro backend implementovány žádné testy, ale zde je seznam doporučených testů, které by měly být zahrnuty pro zajištění kvality a spolehlivosti aplikace:

### Unit Testy

- **Testování služeb (Services)**: Každá služba by měla být testována izolovaně, aby bylo ověřeno, že správně zpracovává data a vrací očekávané výsledky.
- **Testování utilit a pomocných funkcí**: Všechny pomocné funkce a utility by měly být pokryty pomocí unit testů, aby byla ověřena jejich správná funkčnost.

### Integrační Testy

- **Testování API endpointů**: Každý endpoint by měl být testován, aby bylo ověřeno, že správně zpracovává požadavky a vrací odpovídající odpovědi. Testy by měly zahrnovat jak pozitivní, tak negativní scénáře.
- **Testování interakce s databází**: Testy by měly ověřit, že operace s databází (vytváření, aktualizace, mazání) probíhají správně a že data jsou správně ukládána a získávána.

### Další doporučení pro testování

- **Mockování závislostí**: Pro jednotkové testy by měly být závislosti (např. databáze nebo externí služby) mockovány, aby testy byly izolované a rychlé.
- **Automatické spouštění testů**: Implementace CI/CD pipeline, která automaticky spouští testy při každém pushi do repozitáře, zajistí rychlé odhalení chyb a zvýší kvalitu kódu.

Implementace těchto testů by výrazně zvýšila stabilitu a spolehlivost aplikace a zajistila, že nové změny v kódu nebudou negativně ovlivňovat stávající funkcionalitu.

## Udržitelnost kódu

Pro zajištění čistého a udržitelného kódu by měly být implementovány následující nástroje a postupy:

### Prettier

- **Prettier** je nástroj pro formátování kódu, který zajistí konzistentní styl ve všech souborech. Používání Prettieru umožňuje snížit množství neshod ve stylu kódu a usnadňuje spolupráci mezi vývojáři.
- **Doporučení**: Přidat Prettier jako závislost a konfigurační soubor `.prettierrc` do projektu. Automatické spouštění formátování při uložení kódu v editoru výrazně zvyšuje efektivitu.

### ESLint

- **ESLint** je linter pro JavaScript/TypeScript, který analyzuje kód a identifikuje potenciální chyby nebo nekonzistentní styl. Pomocí ESLintu lze zajistit dodržování definovaných pravidel a zvýšit kvalitu kódu.
- **Doporučení**: Konfigurovat ESLint pro TypeScript a NestJS. Přidat pravidla pro zajištění dodržování standardů kódování.

### Husky

- **Husky** umožňuje přidávat githooky, což jsou akce, které se spouštějí při určitých operacích s Gitem (např. před commitem nebo push). Husky může být použit pro automatické spuštění ESLintu nebo Prettieru před každým commitem.
- **Doporučení**: Přidat Husky pro automatické spuštění kontroly kódu před commitem (`pre-commit` hook). Zabrání se tak přidání nekonzistentního nebo nevalidního kódu do hlavní větve.

### Commitlint

- **Commitlint** kontroluje zprávy commitů, aby zajistil, že dodržují definovaný formát (např. [Conventional Commits](https://www.conventionalcommits.org/)). Použití konzistentních zpráv commitů zjednodušuje práci s historií repozitáře.
- **Doporučení**: Přidat Commitlint pro kontrolu formátu zpráv commitů. Například `feat:`, `fix:`, `chore:` pro lepší srozumitelnost změn.

### CI/CD Integrace

- **GitHub Actions nebo GitLab CI**: Automatizace procesu testování, lintování a nasazení pomocí CI/CD nástrojů zajistí, že každý commit splňuje požadované standardy kvality a aplikace je vždy v nasaditelném stavu.

Tato dokumentace poskytuje přehled o backendové části aplikace, zahrnující její architekturu, technologie a budoucí vylepšení. Pro více informací o frontendu si prosím přečtěte [Frontend dokumentaci](../frontend/README.md).
