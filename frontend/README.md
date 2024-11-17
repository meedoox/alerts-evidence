# Frontend dokumentace

Tato dokumentace se zaměřuje na podrobný popis frontendové části aplikace, včetně architektury, použité technologie, struktury komponent, komunikace s backendem a dalších relevantních detailů.

## Obsah

1. [Architektura frontendu](#architektura-frontendu)
2. [Technologie](#technologie)
3. [Struktura komponent](#struktura-komponent)
4. [Komunikace s backendem](#komunikace-s-backendem)
5. [Postup pro spuštění aplikace lokálně](#postup-pro-spusteni-aplikace-lokalne)
6. [Testování](#testovani)
7. [Udržitelnost kódu](#udrzitelnost-kodu)
8. [Budoucí vylepšení frontendu](#budouci-vylepseni-frontendu)

## Architektura frontendu

Frontend aplikace je postaven na frameworku **Next.js**, což je populární React framework, který poskytuje možnost server-side renderingu a podporuje statické stránky. Architektura frontendu je založena na modulárním přístupu, kdy jsou jednotlivé funkční celky odděleny do komponent, což umožňuje snadnou údržbu a rozšiřitelnost.

Frontend se skládá z následujících klíčových modulů:

- **app**: Složka, která obsahuje jednotlivé stránky aplikace.
- **components**: Znovupoužitelné komponenty, které jsou používány v různých částech aplikace.
- **services**: Služby pro komunikaci s backendem, které zahrnují volání API endpointů.

## Technologie

- **Next.js**: Framework pro vývoj React aplikací s podporou server-side renderingu a statického generování.
- **React**: Používá se pro tvorbu uživatelského rozhraní pomocí komponent.
- **Tailwind**: Tailwind css slouží ke stylování komponent a stránek
- **shadcn UI**: Knihovna komponent, která umožňuje rychlou tvorbu elegantního a responzivního UI a staví na tailwind css.
- **Axios**: Používá se pro komunikaci s backendem, zejména pro HTTP požadavky.
- **React Hook Form** a **Zod**: Používají se pro validaci formulářů a správu formulářových dat.

## Struktura komponent

Frontend je navržen modulárně, s komponentami, které jsou znovupoužitelné a snadno rozšiřitelné. Následuje popis hlavních složek:

### Pages

- **/**: Úvodní stránka
- **/alerts**: Stránka, která zobrazuje seznam všech upozornění.
- **/alerts/[id]**: Stránka, která zobrazuje detail konkrétního upozornění.
- **/alerts/edit/[id]**: Stránka pro úpravu existujícího upozornění.

### Components

- **AlertsTable**: Komponenta pro zobrazení tabulky upozornění s akcemi (úprava, smazání).
- **AlertForm**: Formulář pro vytvoření nebo úpravu upozornění.
- **ConfirmDialog**: Komponenta pro potvrzení akce, např. smazání upozornění.
- **AppSidebar**: Komponenta pro sidebar kde je logo aplikace a odkazy na jednotlivé stránky
- **ui**: Složka **ui** slouží pro nainstalované komponenty ze **shadcn**

### Services

- **alerts.ts**: Obsahuje funkce pro komunikaci s API endpointy týkajícími se upozornění (např. `getAlerts`, `createAlert`, `updateAlert`, `deleteAlert`).

## Komunikace s backendem

Frontend komunikuje s backendem prostřednictvím REST API. Pro komunikaci se používá knihovna **Axios**, která umožňuje odesílat požadavky a zpracovávat odpovědi. Každý service obsahuje definice funkcí, které volají konkrétní API endpointy.

### Axios instance

V projektu je vytvořena instance Axios s nastaveným základním URL, které odkazuje na backendový server. Tato instance se používá v každé službě pro zajištění jednotné komunikace.

## Postup pro spuštění aplikace lokálně

Pro spuštění frontendové části aplikace lokálně postupujte podle následujících kroků:

### Požadavky

- **Node.js**: Aplikace vyžaduje Node.js ve verzi 14 nebo vyšší. Doporučuje se použít nejnovější stabilní verzi.
- **NPM**: Pro instalaci závislostí použijte **npm**

### Postup

1. **Klonování repozitáře**

   - Klonujte repozitář aplikace z GitHubu pomocí příkazu:
     ```bash
     git clone <URL_REPOZITARE>
     ```

2. **Instalace závislostí**

   - Přesuňte se do složky s frontendovým projektem a nainstalujte závislosti:
     ```bash
     cd frontend
     npm install
     ```

3. **Nastavení prostředí**

   - Vytvořte soubor `.env` v kořenovém adresáři projektu a přidejte potřebné proměnné prostředí (např. URL backendového serveru):
     ```env
     NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:3003/
     NEXT_PUBLIC_API_BASE_URL=http://localhost:3003/api/v1
     NEXT_PUBLIC_LOGGED_IN_USER_ID=4
     ```

4. **Spuštění vývojového serveru**

   - Spusťte aplikaci lokálně:
     ```bash
     npm run dev
     ```
   - Aplikace bude dostupná na adrese `http://localhost:3000`.

5. **Testování aplikace**
   - Zajistěte, aby backendová část aplikace byla spuštěna před spuštěním frontendu, aby se aplikace mohla úspěšně připojit k API.

Tento postup vám umožní spustit frontendovou část aplikace na lokálním stroji pro vývoj a testování.

## Testování

Pro frontend aplikace aktuálně nejsou implementovány testy, ale doporučuje se vytvořit testy pro zajištění kvality a spolehlivosti aplikace

## Udržitelnost kódu

Pro zajištění čistého a udržitelného kódu by měly být použity následující nástroje a postupy:

### Prettier

- **Prettier** je nástroj pro formátování kódu, který zajistí konzistentní styl ve všech souborech. Používání Prettieru umožňuje snížit množství neshod ve stylu kódu a usnadňuje spolupráci mezi vývojáři.
- **Doporučení**: Přidat Prettier jako závislost a konfigurační soubor `.prettierrc` do projektu. Automatické spouštění formátování při uložení kódu v editoru výrazně zvyšuje efektivitu.

### ESLint

- **ESLint** je linter pro JavaScript/TypeScript, který analyzuje kód a identifikuje potenciální chyby nebo nekonzistentní styl. Pomocí ESLintu lze zajistit dodržování definovaných pravidel a zvýšit kvalitu kódu.
- **Doporučení**: Konfigurovat ESLint pro TypeScript a Next.js. Přidat pravidla pro zajištění dodržování standardů kódování.

### Husky

- **Husky** umožňuje přidávat githooky, což jsou akce, které se spouštějí při určitých operacích s Gitem (např. před commitem nebo push). Husky může být použit pro automatické spuštění ESLintu nebo Prettieru před každým commitem.
- **Doporučení**: Přidat Husky pro automatické spuštění kontroly kódu před commitem (`pre-commit` hook). Zabrání se tak přidání nekonzistentního nebo nevalidního kódu do hlavní větve.

### Commitlint

- **Commitlint** kontroluje zprávy commitů, aby zajistil, že dodržují definovaný formát (např. [Conventional Commits](https://www.conventionalcommits.org/)). Použití konzistentních zpráv commitů zjednodušuje práci s historií repozitáře.
- **Doporučení**: Přidat Commitlint pro kontrolu formátu zpráv commitů. Například `feat:`, `fix:`, `chore:` pro lepší srozumitelnost změn.

### CI/CD Integrace

- **GitHub Actions nebo GitLab CI**: Automatizace procesu testování, lintování a nasazení pomocí CI/CD nástrojů zajistí, že každý commit splňuje požadované standardy kvality a aplikace je vždy v nasaditelném stavu.

## Budoucí vylepšení frontendu

- **Lepší podpora pro mobilní zařízení**: Přidání podpory pro lepší responzivitu a optimalizaci UI pro mobilní zařízení.
- **Vícejazyčná podpora**: Přidání lokalizace, aby byla aplikace dostupná ve více jazycích.
- **Pokročilé notifikace**: Implementace push notifikací nebo integrace s dalšími platformami, aby uživatelé dostávali důležité informace v reálném čase.
- **Tematické režimy (dark/light mode)**: Přidání možnosti volby mezi světlým a tmavým režimem pro zlepšení uživatelské zkušenosti.
