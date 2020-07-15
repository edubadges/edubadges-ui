<script>
  import RemoteImage from "../components/RemoteImage.svelte";
  import DownloadButton from "../components/DownloadButton.svelte";
  import marked from 'marked';
  import Select from "svelte-select";


  const text = `# DRAFT - Edubadges Privacy Statement - DIENST EDUBADGES - NL
Goed dat je de privacyverklaring voor de Pilot Edubadges bekijkt! Het Team Edubadges van SURFnet heeft veel aandacht besteed aan de bescherming van jouw persoonsgegevens en hier kun je daar alles over lezen. Als er tijdens het lezen van deze privacyverklaring toch nog vragen of zorgen zijn, stuur dan gerust een e-mail naar [info@edubadges.nl](mailto:info@edubadges.nl) of neem contact op met je eigen onderwijsinstelling.

## 1 Introductie Edubadges
Een badge is een digitaal insigne (afbeelding), dat aantoont dat de ontvanger over bepaalde kennis of vaardigheden beschikt. De ontvanger van een badge kan deze delen met anderen, bijvoorbeeld op sociale media, een digitaal cv of met een (potentiële) werkgever. De Pilot Edubadges faciliteert onderwijsinstellingen, studenten en medewerkers om te experimenteren met deze badges. Meer informatie over Edubadges is te vinden op de [website van SURF](https://www.surf.nl/innovatieprojecten/onderwijsinnovatie-met-ict/edubadges-en-microcredentialing.html).

## 2 Persoonsgegevens
### Welke gegevens gebruiken we en waarom?
Onderwijsinstellingen die binnen de doelgroep van SURFnet vallen zijn in 2018 in de gelegenheid gesteld om deel te nemen aan de Pilot Edubadges. De onderwijsinstelling stelt binnen deze pilot eigen doelstellingen vast rond het gebruik van Edubadges en is in het kader van de Algemene verordening gegevensbescherming (AVG) de verwerkingsverantwoordelijke. SURFnet voorziet in de technische infrastructuur rondom Edubadges en treedt in het kader van de AVG op als verwerker.

Voor de werking van Edubadges en het inschrijven, uitgeven en ontvangen van badges zijn verschillende persoonsgegevens vereist. Omdat de Pilot Edubadges een optioneel karakter heeft, wordt voor bijna alle persoonsgegevens toestemming gevraagd. Alle persoonsgegevens worden uitsluitend gebruikt voor Edubadges. Wil je de gegeven toestemming weer intrekken? Dit kun je melden in een e-mail gericht aan info@edubadges.nl. Binnen drie werkdagen zal contact worden opgenomen om de verdere procedure af te stemmen. Na intrekken van de toestemming zullen alle badges en persoonsgegevens van jou verwijderd worden.

### Studenten
In de tabel hieronder zijn de verwerkte persoonsgegevens met bijbehorend(e) doel(en) en grondslag opgenomen.

| Persoonsgegeven | Doel | Grondslag |
| ------------------- | -------- | ------------- |
| Voornaam | Identificatie bij Badgeuitgifte | Toestemming |
| Achternaam| Identificatie bij Badgeuitgifte | Toestemming |
| E-mailadres | Melding over uitgegeven badges en serviceberichten | Toestemming |
| EduID | Mogelijk maken uitwisselbaarheid tussen onderwijsinstellingen | Toestemming |
| EntityID | Technisch noodzakelijk uniek databasenummer | Toestemming |
| Affiliation | Technisch noodzakelijk voor onderscheid medewerker en student | Toestemming |
| Toestemming | Of er toestemming gegeven is: verplicht bij toestemming als grondslag | Toestemming |
| Badgeclass | Nodig voor inschrijving bij badge | Toestemming |
| IP-adres | Beschikbaarheid Edubadges en misbruik achterhalen. Belang SURFnet voor beschikbaarheid en beveiliging weegt zwaarder dan belang betrokkene | Gerechtvaardigd belang |

### Medewerkers
In de tabel hieronder zijn de verwerkte persoonsgegevens met bijbehorend(e) doel(en) en grondslag opgenomen.

| **Persoonsgegeven** | **Doel** | **Grondslag** |
| ------------------- | -------- | ------------- |
| E-mailadres | Melding over badges en serviceberichten en extra identifier | Toestemming |
| Persistent NameID | Unieke identifier voor medewerkers | Toestemming |
| EntityID | Technisch noodzakelijk uniek databasenummer | Toestemming |
| Affiliation | Technisch noodzakelijk voor onderscheid medewerker en student | Toestemming |
| Toestemming | Of er toestemming gegeven is: verplicht bij toestemming als grondslag | Toestemming |
| Organisatie | Koppelen medewerker aan instelling/faculteit/opleiding/badgeclass | Toestemming |
| Faculteit | Koppelen medewerker aan faculteit/opleiding/badgeclass | Toestemming |
| IP-adres | Beschikbaarheid Edubadges en misbruik achterhalen. Belang SURFnet voor beschikbaarheid en beveiliging weegt zwaarder dan belang betrokkene | Gerechtvaardigd belang |

### Hoe lang gebruiken we je gegevens?
De Pilot Edubadges loopt tot en met *31 december 2020*. Binnen twee weken na afloop van de Pilot Edubadges zullen alle persoonsgegevens worden verwijderd of wordt er opnieuw om toestemming gevraagd.

### Aan wie verstrekken we de gegevens?
Medewerkers van jouw onderwijsinstelling hebben toegang tot voornaam, achternaam en e-mailadres. SURFnet heeft toegang tot alle persoonsgegevens. De persoonsgegevens worden niet aan andere derde partijen verstrekt.

## 3 Beveiliging
Onder andere de volgende veiligheidsmaatregelen zijn getroffen om de persoonsgegevens te beschermen:

* Communicatie tussen systemen is versleuteld conform moderne standaarden en best practices.
* De toegang tot servers is beveiligd conform moderne beveiligingsstandaarden en best practices.
* Alle fysieke en virtuele servers en data bevinden zich in SURFnetdatacentrums in Nederland. Fysieke toegang tot de servers en opslagapparatuur is beperkt tot personeel van SURFnet en diens housingpartners.
* Alle Edubadgesystemen en -software worden up to date gehouden.
* Alle data op de pilotomgeving wordt dagelijks gebackupt.
* Alle servers in de Pilot Edubadges zijn beschermd met een restrictieve firewall in het besturingssysteem of container.
* Alle handelingen binnen het besturingssysteem worden gelogd.
* De webserver maakt gebruik van een geharde configuratie en security headers.
* De rollen in Edubadges voor medewerkers zijn beperkt tot een scope die geen onnodige persoonsgegevens laat zien.

## 4 Je rechten met betrekking tot je (persoons)gegevens
Je hebt de volgende rechten met betrekking tot je persoonsgegevens:

* Je kunt een verzoek indienen tot wijziging, aanvulling of verwijdering van je gegevens wanneer deze onjuist of niet (meer) relevant zijn.
* Je kunt een verzoek indienen om inzage te verkrijgen in de gegevens die we van jou verwerken.
* Je kunt bezwaar maken tegen verwerking van je gegevens, als we je gegevens verwerken op basis van een eigen gerechtvaardigd belang of op basis van de uitvoering van een taak van algemeen belang.
* Je kunt een verzoek indienen tot beperking van de verwerking van je gegevens ten aanzien van de verwerking van gegevens waartegen je bezwaar hebt gemaakt, die je onrechtmatig acht, waarvan je de juistheid van de persoonsgegevens hebt betwist of wanneer we de persoonsgegevens niet meer nodig hebben, maar je ze nodig hebt in het kader van een rechtsvordering.
* Je kunt een overzicht, in een gestructureerde en gangbare vorm opvragen van de gegevens die we van jou verwerken en je hebt het recht op overdraagbaarheid van deze gegevens naar een andere dienstverlener.
* Je kunt de door jou gegeven toestemming voor het verwerken van je persoonsgegevens intrekken. Het intrekken van je toestemming doet echter geen afbreuk aan de rechtmatigheid van de verwerking op basis van je toestemming vóór de intrekking daarvan.
* Als je van mening bent dat SURFnet niet goed omgaat met je persoonsgegevens kun je een klacht indienen bij SURFnet.
* Als jij en SURFnet er echter niet samen uitkomen en het antwoord van SURFnet op je klacht niet leidt tot een acceptabel resultaat, heb je het recht om een klacht over SURFnet in te dienen bij de Autoriteit Persoonsgegevens. Meer informatie over de Autoriteit Persoonsgegevens en het indienen van klachten vind je op de [website van de Autoriteit Persoonsgegevens](https://www.autoriteitpersoonsgegevens.nl).

Om deze rechten uit te kunnen oefenen, kun je contact opnemen met [info@edubadges.nl](mailto@info@edubadges.nl) of je eigen onderwijsinstelling.

## 5 Wijziging privacyverklaring
Er kunnen wijzigingen worden aangebracht in deze privacyverklaring. We raden je daarom aan om deze privacyverklaring geregeld te raadplegen. `

  let htmlTerms = marked(text);

    const items = ['One', 'Two', 'Three', '4'];
    let ms = ['One',  '4'];
</script>
<style>

</style>
<h1>test</h1>

<!--  {@html htmlTerms}-->
<p>{JSON.stringify(ms)}</p>
<hr/>
<Select items={items} isMulti={true} bind:selectedValue={ms}></Select>
<!--<hr>-->
<!--<RemoteImage imageUrl="https://api-test.edubadges.nl/media/uploads/institution/surf.png" useToken={true}/>-->
<!--<hr>-->
<!--<RemoteImage imageUrl="https://api-test.edubadges.nl/media/uploads/institution/surf.png" useToken={false}/>-->
<!--<hr>-->
<!--<img src="https://api-test.edubadges.nl/media/uploads/institution/surf.png">-->
<!--<hr>-->
<!--<DownloadButton text="download" url="https://api-test.edubadges.nl/media/uploads/badges/assertion-hsKBUW9oQoieYMk3S1Jyjg.png"/>-->
<!--failing-->
<!--<DownloadButton useToken={true} text="download" url="https://api-test.edubadges.nl/media/uploads/badges/assertion-hsKBUW9oQoieYMk3S1Jyjg.png"/>-->
<!--<hr>-->
<!--<DownloadButton text="download" url="https://api-test.edubadges.nl/media/uploads/badges/assertion-Fj38yGR6Sbu86az-43a_-g.png"/>-->
<!--failing-->
<!--<DownloadButton useToken={true} text="download" url="https://api-test.edubadges.nl/media/uploads/badges/assertion-Fj38yGR6Sbu86az-43a_-g.png"/>-->
<!--<img src="https://api-test.edubadges.nl/media/uploads/badges/assertion-Fj38yGR6Sbu86az-43a_-g.png" alt="">-->
