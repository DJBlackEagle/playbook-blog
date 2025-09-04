import { Injectable } from '@nestjs/common';
import { InjectQueryService, QueryService } from '@ptc-org/nestjs-query-core';
import { plainToClass } from 'class-transformer';
import { PostEntity } from '../../post/entities/post.entity';
import { Post } from '../../post/models/post.model';
import { SeederPost } from './seeder-post.model';

@Injectable()
export class SeederPostService {
  constructor(
    @InjectQueryService(PostEntity)
    private postService: QueryService<PostEntity>,
  ) {}

  /**
   * Seeds posts data.
   * @returns Promise resolving to an array of seeded posts.
   */
  async seed(): Promise<SeederPost> {
    const data: SeederPost = new SeederPost();
    data.startedAt = new Date();
    data.success = true;

    await this.postService.deleteMany({});

    const postsToSeed = [
      {
        title: 'The Rise of AI in Modern Software Development',
        teaser:
          'Artificial intelligence is transforming how we build and deploy software. Get the lowdown on the new tools for automation, analysis, and optimization.',
        content:
          'Artificial intelligence is rapidly transforming how we build and deploy software, offering new tools for automation, analysis, and optimization.',
      },
      {
        title: "GraphQL vs. REST: A Developer's Dilemma",
        teaser:
          'Deciding between GraphQL and REST for your API can be tricky. This post breaks down the pros and cons of each to help you make the right choice for your project.',
        content:
          'Choosing between GraphQL and REST for your API can be challenging. This post explores the pros and cons of each approach.',
      },
      {
        title: 'NestJS: Building Scalable and Maintainable Backends',
        teaser:
          'Thinking about building your next backend application? NestJS offers a powerful and scalable architecture that can help you get the job done right.',
        content:
          'NestJS, a progressive Node.js framework, provides a robust architecture for developing efficient and scalable server-side applications.',
      },
      {
        title:
          'Festkörperbatterien: BASF und chinesischer Partner erreichen Durchbruch ',
        sources: [
          'https://www.heise.de/news/BASF-und-chinesischer-Partner-erreichen-Durchbruch-bei-Festkoerperbatterien-10629173.html',
          'https://t3n.de/news/basf-festkoerperbatterien-1705203/',
        ],
        teaser:
          'Festkörperbatterien für E-Autos rücken näher: BASF und der chinesische Partner Welion haben einen wichtigen Schritt in Richtung Serienproduktion erreicht. ',
        content: `Festkörperbatterien (Solid-State Batteries), inklusive ihrer halbfesten Varianten, gelten als Schlüsseltechnologie für die nächste Generation von Batterien für E-Autos oder E-Bikes sowie Speicherlösungen. Sie versprechen mehr Sicherheit, eine höhere Energiedichte und kürzere Ladedauer als herkömmliche Lithium-Ionen-Batterien.
BASF liefert Kathodenmaterialien für Feststoffbatterien

Dem Joint-Venture BASF Shanshan Battery Materials (BSBM) ist in Zusammenarbeit mit dem chinesischen Hersteller Beijing Welion New Energy Technology jetzt ein Durchbruch bei der Entwicklung von Semi-Festkörperbatterien gelungen, wie BASF mitteilt. Demnach seien die ersten Chargen seriengefertigter Kathodenmaterialien (CAM) für halbfeste Festkörperbatterien erfolgreich ausgeliefert worden.

Konkret geht es dabei um ein neu entwickeltes Hoch-Nickel-NCM-Kathodenmaterial mit einer speziellen Kompositbeschichtung. Dadurch sollen die Schnittstellenprobleme zwischen den Kathodenmaterialien und Festelektrolyt angegangen werden.
Mehr Energiedichte und längere Lebensdauer

Das neue Material erhöht laut BASF zum einen die Energiedichte durch eine höhere Kapazität und einen geringeren Widerstand. Zugleich sollen auch die Zyklenstabilität und Lebensdauer gesteigert werden, indem Nebenreaktionen an der CAM-Elektrolyt-Grenzfläche unterdrückt werden.

Die Auslieferung der ersten Charge der neuen Technologie soll die Kommerzialisierung von Festkörperbatterien vorantreiben. Sprich: Schon bald werden erste Produkte mit den neuen Kathodenmaterialien in Serie gefertigt werden – und das, wie BASF betont, nur ein Jahr nach dem Projektstart im August 2024.

BSBM-CEO Desmond Long spricht daher von einem "Meilenstein für unser Batteriematerialgeschäft". Zugleich stelle die Entwicklung "einen bedeutenden Fortschritt im Bereich Festkörperbatterien" dar. Welion wird die Kathodenmaterialien von BASF eigenen Angaben zufolge in der nächsten Generation halbfester Festkörperbatterien einsetzen.

Welion gilt als Pionier im Bereich Festkörperbatterie-Entwicklung. Die Produkte des Herstellers kommen in Elektroautos, Speichersystemen sowie Drohnen oder Elektrowerkzeugen zum Einsatz. Schon mit den Semi-Solid-State-Batteriezellen von Welion ausgerüstet sind etwa die E-Autos ET7 und EL6 von Nio. Hier sollen sie für Reichweiten von bis zu 1.000 Kilometern sorgen.
Reine Festkörperbatterien noch nicht in Sicht

Während sogenannte halbfeste Festkörperbatterien, die noch einen geringen Anteil an Flüssigkeit haben, schon in Serie produziert und eingesetzt werden, sind reine Festkörperbatterien noch nicht in Sicht. Hier gibt es aktuell lediglich Prototypen, um die Vorteile der Technologie zu präsentieren.`,
      },
      {
        title: '30 Jahre eBay: Alles begann mit einem defekten Laserpointer ',
        sources: [
          'https://www.heise.de/hintergrund/30-Jahre-eBay-Von-der-Verkaufsseite-zum-weltweiten-Riesenmarktplatz-10629942.html',
        ],
        teaser:
          '30 Jahre sind für Internetunternehmen ein stolzes Alter. Mit eBay wurde seit 1995 das Ersteigern und Verkaufen im Netz zur Selbstverständlichkeit. ',
        content: `Es gibt kaum jemanden, dem beim Wort "Maggi" nicht sofort die braune, gelb etikettierte Würzflasche einfällt. Ähnlich ist es mit eBay und seinem vierfarbigen Logo: Seit Jahrzehnten steht es für Onlineauktionen schlechthin, obwohl das Unternehmen sich alle Mühe gibt, dieses Klischee aufzuweichen. Manche typischen eBay-Begriffe wie "Geheimer Mindestpreis", "Turbolister" oder "Auktionssniper" haben sich im Lauf der Jahre in den allgemeinen Alltagswortschatz geschlichen.

iele bekannte Marken haben eine Gründungsanekdote, die möglichst knuffig-sympathisch wirkt. Darüber, wie viel historische Wahrheit drinsteckt, zankt sich die Forschung.

Das heute überragend große und an der Börse mit fast 30 Milliarden Euro bewertete Unternehmen eBay bildet da keine Ausnahme: Gründer Pierre Omidyar, so heißt es, habe zunächst für seine Frau eine Sammlertauschbörse schaffen wollen, über die sie mit anderen Fans von PEZ-Figuren Kontakt aufnehmen könnte. eBay sei dann die Folge des enorm wachsenden Bedarfs nach Plattformen solcher Art gewesen.

Triebfeder Programmierfaszination

Gesichert ist, dass Pierre Omidyar 1967 als Sohn aus dem Iran stammender Eltern in Paris geboren wurde. Als er sechs Jahre alt war, zog die Familie in die amerikanische Bundeshauptstadt Washington, D.C. Er studierte Informatik, schloss 1988 mit dem Rang eines Bachelor of Science ab und arbeitete danach als Entwickler. Omidyar und einige Freunde betrieben ein Unternehmen, das zunächst Ink Development, dann eShop hieß, und verkauften dieses an Microsoft. Anfang der Neunzigerjahre betrieb der seit seiner Jugend von Programmierung faszinierte Mann eine eigene Website namens "Echo Bay Technology Group", unter deren Dach er als Experiment eine kleine Online-Auktionsplattform namens Auction Web einrichtete.

Dort bot Omidyar am 3. September 1995 probehalber einen defekten Laserpointer an. Einige Tage später erhielt ein Käufer den Zuschlag für knapp 15 US-Dollar. Sicherheitshalber wurde er gefragt, ob ihm klar sei, dass er ein nicht funktionsfähiges Gerät ersteigert habe. Der Käufer, passenderweise ein Sammler defekter Laserpointer, hatte kein Problem damit: Die erste Verkaufstransaktion ging über die Bühne.

Und so war vor genau 30 Jahren in San José, Kalifornien, der Startschuss für die Online-Verkaufs- und Auktionsplattform gefallen, die zwei Jahre später eBay hieß. Die Domain eBay.com war für Omidyar zunächst eigentlich nicht die erste Wahl gewesen. Als Heimat für seine Projekte hätte er gern "EchoBay.com" gehabt, doch der Domainname war bereits vergeben. Also wurde es eBay.com.

Nach kurzer Zeit verdrängte die Auktionsplattform alle anderen Projekte von seiner Website. Er lud Freunde und Bekannte ein, ebenfalls Waren dort anzubieten. Die Gelegenheit sprach sich schnell herum. Schon nach wenigen Monaten soll Omidyar durch Gebühren und Provisionen für Verkäufe mehr verdient haben als in seinem Hauptberuf als Softwareentwickler. Bereits 1996 verzeichnete eBay 40.000 registrierte Teilnehmer, 1997 liefen 200.000 Einzelauktionen pro Monat über die Plattform. Immer stärker zeigte sich, dass nicht jeder Käufer und Verkäufer nur ehrliche Absichten hatte. Es kam zu Konflikten. Als Reaktion führte eBay ein System zur gegenseitigen Bewertung von Teilnehmern ein, das vom Konzept her noch heute besteht.

Im selben Jahr fand über die Plattform der einmillionste Artikel einen neuen Besitzer – es handelte sich um eine kleine Figur des Sesamstraße-Charakters Big Bird, der in Deutschland Bibo heißt. 1998 machte der Börsengang seines Unternehmens Omidyar zum Milliardär. Der Ausgabepreis für eine Aktie betrug am 24. September 1998 18 US-Dollar. Heute ist eine eBay-Aktie rund 90 US-Dollar wert. Da inzwischen aber vier Aktiensplits stattgefunden haben, würde eine 1998 erworbene Aktie heute das 24-Fache ihres damaligen Wertes repräsentieren, also über 2100 Dollar. Als CEO und Präsidentin des Unternehmens stieg Meg Whitman ein. Sie bekleidete bis 2008 den CEO-Posten und war Mitglied des Board of Directors bei eBay. 2010 kandidierte sie für das Gouverneursamt des US-Bundesstaats Kalifornien. 2011 erklomm sie den Chefsessel von Hewlett-Packard. Bei eBay löste John Donahoe sie 2008 als CEO ab. Er hatte die Position bis 2015 inne. Der aktuelle Unternehmenschef, Jamie Iannone, ist seit 2020 dabei.

Aus dem Nachahmer wird der deutsche Zweig

Der Erfolg von Omidyars Idee ließ bald Nachahmer auf den Plan treten. In Berlin startete eine sechsköpfige Unternehmergruppe Anfang 1999 die Plattform Alando.de, die nach dem gleichen Konzept arbeitete wie eBay, auch Aussehen und Handhabung der Website waren stark daran angelehnt. Zu den Gründern gehörten die Brüder Marc, Oliver und Alexander Samwer, die später noch vielfach als Gründer beziehungsweise Investoren im Zusammenhang mit klangvollen Unternehmen der Technikwelt von sich reden machten: Jamba, Rocket Internet und Zalando. Der deutsche eBay-Klon bot Verkäufern Gelegenheit, ihre Waren kostenlos einzustellen, und setzte sich schnell als führende deutsche Online-Auktionswebsite durch.

Als Omidyar auf Alando aufmerksam wurde, ging er nicht etwa juristisch gegen das Plagiat seiner Plattform vor, sondern kaufte das Unternehmen für 50 Millionen US-Dollar gerade mal ein halbes Jahr nach dessen Gründung und machte daraus den deutschen eBay-Zweig. Auch noch im Jahr 1999 expandierte Omidyars Unternehmen international weiter: Zweige entstanden in Australien und dem Vereinigten Königreich. Unterdessen stieg die weltweite Mitgliederzahl auf über 10 Millionen.

Neuerungen Schlag auf Schlag

Zu Beginn des neuen Jahrtausends führte eBay vieles ein, was seitdem das Kaufen und Verkaufen auf der Plattform prägt: Die Sofort-Kaufen-Funktion brachte zunächst in den USA, dann international Angebote zum Festpreis ins Programm. Die eBay-Betreiber sind seit Jahren bestrebt, das Sofortkaufgeschäft immer stärker in den Vordergrund zu stellen. Daher charakterisieren sie das Unternehmen offiziell stets als "Marktplatz", nicht als Auktionsplattform.

Mit "eBay Motors" kam eine besonders gestaltete Sparte zur Plattform hinzu, die auch eine eigene Gebührenstruktur bekam. Sie diente zum Handel mit Fahrzeugen und Zubehör. In Deutschland und einigen europäischen Nachbarländern hatte sich mobile.de als übersichtliche und vielfältig durchsuchbare Handelsplattform etabliert, auf der man ähnlich wie bei klassischen Kleinanzeigen Fahrzeuge zum Festpreis oder auf Verhandlungsbasis einstellte. Im April 2004 übernahm eBay mobile.de.

Mit "eBay Shops" können Verkäufer seit 2001 ihre Angebote auf der Plattform in durchsuchbaren virtuellen Läden bündeln. 2002 übernahm eBay den im Jahr 2000 aus Unternehmen der libertären Tech-Milliardäre Peter Thiel und Elon Musk entstandenen Zahlungsdienstleister PayPal für 1,5 Milliarden US-Dollar. In den folgenden Jahren integrierte eBay die Zahlungsabwicklung über PayPal sehr stark in den Online-Marktplatz. Im Juli 2015 wurde PayPal jedoch als eigenständiges börsennotiertes Unternehmen wieder ausgegliedert. Ab 2018 fuhr eBay dann die Zusammenarbeit mit PayPal zurück und wollte den Zahlungsabwickler eigentlich ab 2023 von eBay-Geschäften ausschließen. Dennoch ist es auch heute noch möglich, als eBay-Nutzer über PayPal zu bezahlen beziehungsweise die Bezahlung von Käufern zu empfangen.

Aufmerksamkeit durch Kuriositäten

Immer wieder sind eBay-Geschäfte in den Schlagzeilen der allgemeinen Presse aufgetaucht – auch als das Internet noch als ein Revier von besonders technikaffinen Eingeweihten galt. Es wurde aber zunehmend Mode, auch bei Leuten, die sich nicht gerade zur Netzgemeinde zählten, sich für besonders kuriose oder kostenträchtige eBay-Transaktionen zu interessieren. Die Plattformbetreiber förderten das nach Kräften, denn ihnen war daran gelegen, stets im Gespräch zu bleiben. Aufsehen erregte etwa 2006 der Verkauf einer von Frank Mulder designten Riesenyacht über eBay für 168 Millionen Dollar.

Das Ende des ersten Jahrzehnts im neuen Millennium markierte den Beginn der bald gewaltig anwachsenden Smartphonewelle: eBay-Teilnehmer nutzten den Marktplatz normalerweise vom Webbrowser eines PC aus; auch eine mobil nutzbare Websiteversion gab es bereits. Die erste eBay-App fürs iPhone kam 2008 zu einem Zeitpunkt, der einen Umbruch für die alltägliche Netznutzung bedeutete: Das Internet ist seit jenen Tagen mehr und mehr mobil geworden. In öffentlichen Verkehrsmitteln, an Familienesstischen und in Schulen beugten sich in zunehmendem Maße eBay-Teilnehmer über ihre Smartphones, um wischender- und tippenderweise Gebote zu setzen oder Waren einzustellen.

Bereits im März 2005 hatte eBay in Deutschland die Tochterplattform kijiji gestartet, die wie klassische Inseratenblätter lokale Waren- und Dienstleistungsangebote ohne Auktionsoption verzeichnete. 2009 wurde daraus "eBay Kleinanzeigen". Da ein Inserat dort deutlich günstiger war als das Einstellen eines Angebots bei eBay selbst, fanden nicht zuletzt Anbieter weniger hochwertiger Gebrauchtartikel dort eine willkommene Nische. 2020 verkaufte eBay seinen gesamten Kleinanzeigensektor, zu dem auch mobile.de gehörte, für 9,2 Milliarden US-Dollar an die norwegische Onlineplattformgruppe Adevinta. Das frühere "eBay Kleinanzeigen" heißt nun nur noch "Kleinanzeigen".

Aufreger

Immer wieder fanden Höchstmarken und andere Neuigkeiten rund um eBay den Weg ins allgemeine Stadt- oder Dorfgespräch: Staunend nahm man etwa 2011 zur Kenntnis, dass ein deutscher eBay-Händler namens "dynamic-auction" als erstes Mitglied in Europa eine Million Bewertungspunkte erreicht hatte. Gesprächsstoff lieferten auch Rechtsstreitigkeiten um eBay-Geschäfte, die Zivilgerichte in wachsendem Maß zu beschäftigen begannen. Mancher hatte bis dahin kaum etwas vom Unterschied zwischen Garantien und gesetzlicher Gewährleistung gehört. Die Frage, wer dafür haftet, wenn ersteigerte Ware nicht wohlbehalten ankommt, musste ebenso ausgestritten werden wie manche mutmaßliche oder tatsächliche arglistige Täuschung auf Seiten von Handelspartnern.

Das wohl spektakulärste Urteil in einem eBay-Fall sprach 2014 der Bundesgerichtshof (BGH): Bei der sogenannten Passat-Entscheidung (Az. VIII ZR 42/14) ging es darum, dass ein Verkäufer die Auktion eines Autos vorzeitig abgebrochen hatte, weil er befürchtete, dass sich bis zum Ablauf nicht genügend Bieter für zufriedenstellende Gebote finden würden. Er verkaufte dann den Wagen anderweitig. Um Bieter zu locken und zugleich auch Auktionsentgelte zu sparen, hatte der Verkäufer den Wagen für ein Mindestgebot von 1 Euro bei eBay eingestellt. Als er die Auktion abbrach, lag bereits ein Gebot über 1 Euro vor. Als der Bieter das Auto für diesen Preis verlangte, erfuhr er, dass es nicht mehr bereitstand und der Verkäufer auch der Meinung war, es sei kein bindender Kaufvertrag zustande gekommen.

Die Sache ging durch drei Instanzen; der BGH machte klar, dass bei eBay mit dem Einstellen und dem letzten Höchstgebot doch ein wirksamer Kaufvertrag geschlossen worden war. Die allgemeinen Geschäftsbedingungen der Plattform dienten als Basis, um den Vorgang des Vertragsschlusses zu bestimmen. Das Ende vom Lied: Der Verkäufer musste dem Bieter einen Schadenersatz in Höhe von 5.249 Euro zahlen, was dem geschätzten Wagenwert abzüglich des zu zahlenden Euros entsprach. Seitdem wissen auch Nichtfachleute, wie riskant es sein kann, die Bedingungen von Onlineauktionen nicht ernst zu nehmen.

Der Rest ist, wie man so schön sagt, Geschichte. eBay ist auch heute ein hochprofitables Unternehmen, nur 2017 und 2022 ist es in die Verlustzone geraten. So attraktiv, glitzernd und cool wie die Plattform noch vor einigen Jahren erschien, wirkt sie heute allerdings für viele nicht mehr. Chinesische Versandriesen wie Aliexpress und Temu haben gerade bei der Zielgruppe Smartphone-affiner Schnäppchenjäger etwas geschafft, was alle über die Jahre aufgekommenen und untergegangenen Mini-Konkurrenzauktionswebsites nicht vermochten: eBay hat seine jahrelang lieb gewonnene Position als weltweit wichtigster Online-Marktplatz eingebüßt. So ätzte denn etwa das Magazin "Absatzwirtschaft" bereits vor fünf Jahren, die Plattform gehöre als E-Commerce-Pionier zur "alten Garde", dümple aber im Schatten von Amazon und chinesischen Anbietern vor sich hin. Auch habe eBay bereits 2020 nicht mehr zur Spitzenklasse der Tech-Firmen gezählt.

Das hat die Plattform indes nicht daran gehindert, allen Unkenrufen zum Trotz auch ihr 30. Jubiläum zu begehen, und das nicht gerade als Sanierungsfall. In diesem Sinne: Gratulation! – nicht etwa dafür, keine Fehler gemacht zu haben (es gab viele), auch nicht dafür, alle Kunden glücklich gemacht zu haben (es gibt viel berechtigte Kritik), sondern dafür, eine ganz eigene, ganz unverwechselbare Form des Kaufens und Verkaufens in die Welt gebracht zu haben, die heute auch diejenigen als selbstverständlich empfinden, die eBay nicht mögen. (psz)`,
      },
      {
        title:
          'Google muss Suchdaten mit Konkurrenz teilen, darf Chrome und Android behalten ',
        sources: [
          'https://www.heise.de/news/Google-muss-Suchdaten-mit-Konkurrenz-teilen-darf-Chrome-und-Android-behalten-10629784.html',
        ],
        teaser:
          'Im Monopolprozess wegen Googles Suchmaschinengeschäft hat der Richter ein Urteil gefällt. Der Datenkonzern entgeht der Aufspaltung, muss aber offener werden. ',
        content: `Dass Googles Suchmaschinen-Geschäfte illegal sind, hatte ein US-Bundesgericht im Kartellrechtsverfahren gegen den Datenkonzern bereits vor rund einem Jahr entschieden. Jetzt hat der Richter die für Google daraus entstandenen Sanktionen verkündet. Demnach wird der Konzern nicht aufgespalten und darf Produkte wie den Chrome-Webbrowser sowie das Android-Betriebssystem behalten. Google wird aber dazu verpflichtet, Suchdaten und Suchergebnisse mit "qualifizierten Wettbewerbern" zu teilen.

Damit ist das US-Gericht in Washington, DC, nur zum Teil den Forderungen der Kläger gefolgt. Das US-Justizministerium und eine Reihe von US-Bundesstaaten hatten etwa verlangt, dass Google Chrome verkaufen soll. Google sei ein Monopolist und nutze seine marktbeherrschende Stellung aus, sodass zumindest das Browsergeschäft abgespalten werden soll, hieß es in dem bereits Anfang 2021 noch unter dem damaligen US-Präsidenten Joe Biden angestrengten Verfahren (Az. 1:20-cv-03010-APM).
Richter verlangt Offenheit und Mäßigung von Google

Dem ist US-Richter Amit P. Mehta aber nicht nachgekommen, wie die New York Times berichtet. Zwar hatte er letztes Jahr noch erklärt: "Google ist ein Monopolist und hat auch wie einer gehandelt, um sein Monopol aufrechtzuerhalten." Doch jetzt schlägt er versöhnliche Töne an und schreibt: "Die Kläger haben sich mit der Forderung nach einer Zwangsveräußerung dieser Schlüsselaktiva überfordert, obwohl Google diese nicht zur Durchsetzung illegaler Beschränkungen genutzt hat."

Allerdings kommt Google bei Weitem nicht ungeschoren davon. Der Richter verbietet dem Datenkonzern das Abschließen von Exklusivverträgen für die Google-Suche, Chrome, den Google-Assistenten und die Gemini-App. Einer der Vorwürfe war, dass Google 26 Milliarden US-Dollar allein im Jahr 2021 dafür gezahlt hat, nicht zuletzt an Apple, dass Chrome und die Google-Suche auf Endgeräten vorinstalliert werden. Das sei der fast vierfache Betrag der gesamten sonstigen Kosten der Suchmaschine, so der Richter.

Allerdings darf Google weiterhin Hersteller dafür bezahlen, Suchmaschine und Webbrowser auf den Geräten zu installieren und diese zu priorisieren, allerdings nur noch in beschränktem Maße. "Anders als in einem typischen Fall, in dem es die Aufgabe des Gerichts ist, einen Streit auf der Grundlage historischer Fakten zu lösen, wird das Gericht hier aufgefordert, in eine Kristallkugel zu schauen und in die Zukunft zu blicken", schreibt Mehta laut Thewrap. "Nicht gerade die Stärke eines Richters."
Google wehrt sich wohl trotzdem, auch im Monopolprozess wegen Werbung

Google dürfte trotz der Zugeständnisse hinsichtlich Chrome und Android Rechtsmittel einlegen, um ein milderes Urteil zu erwirken. Damit dürfte sich das Verfahren noch über Jahre hinziehen, sodass sich die Marktsituation angesichts der technologischen Entwicklung weiter ändern kann. Schon jetzt heißt es, dass KI-Suchmaschinen das Internet verändern, denn immer mehr Menschen nutzen Chatbots Künstlicher Intelligenz statt der klassischen Suchmaschine für ihre Fragen. Googles Marktanteile könnten sich deshalb massiv ändern in den nächsten Jahren.

Gleichzeitig wird demnächst ein weiteres Urteil zuungunsten des Datenkonzerns erwartet, denn im April hatte ein anderes US-Gericht ein illegales Monopol bei Google festgestellt. In dem Verfahren ging es um Technologien zum Platzieren von Online-Werbeanzeigen. Im September soll die Anhörung zu den Rechtsmitteln fortgesetzt werden, eine entsprechende Entscheidung steht noch aus.`,
      },
      {
        title: 'Überlastungsattacke erreicht 11,5 TBit pro Sekunde ',
        sources: [
          'https://www.heise.de/news/Ueberlastungsattacke-erreicht-11-5-TBit-pro-Sekunde-10630141.html',
        ],
        teaser:
          'Cloudflare meldet einen neuen Rekord bei abgewehrten Überlastungsattacken (DDoS). Ein Angriff am Montag erreichte 11,5 TBit pro Sekunde. ',
        content: `Der letzte rekordverdächtige Überlastungsangriff ist noch gar nicht so lange her, da vermeldet Cloudflare schon den nächsten beobachteten Spitzenwert. Am Montag erreichte ein Distributed-Denial-of-Service-Angriff (DDoS) in der Spitze eine Last von 11,5 Terabit pro Sekunde. Das entspricht umgerechnet mehr als 1,4 Terabyte je Sekunde oder dem Inhalt von 184 randvollen DVDs.

Das hat Cloudflare am Montagabend auf der Platform X mitgeteilt. "Cloudflares Abwehrmechanismen haben Überstunden geschoben. Über die vergangenen Wochen haben wir autonom hunderte hochvolumige DDoS-Attacken blockiert", schreibt das Unternehmen dort. "Die Größten erreichten Spitzenwerte von 11,5 Tbps". Dabei sendeten die Angreifer 5,1 Milliarden Pakete pro Sekunde (Bpps). Bei letzterer handelte es sich demnach um eine UDP-Flood-Attacke, die ihren Ausgangspunkt hauptsächlich in der Google-Cloud hatte. Die Zeitspanne, die der Höchstlast-Angriff einnahm, war etwa 35 Sekunden lang, schreibt Cloudflare weiter.
Details noch unklar

Weitere Details bleiben derzeit unklar, etwa, wer Ziel der Angriffe war und ist. Cloudflare hat jedoch eine vollständige Übersicht in einem "kommenden Bericht" angekündigt. Darin dürften dann auch das konkrete Datenvolumen der Attacke und ähnliche Details zu finden sein.

Erst Mitte Juni hat Cloudflare zuletzt einen Rekordwert für DDoS-Angriffe gemeldet. Dort sprach das IT-Unternehmen von dem "'größten jemals registrierten' Denial-of-Service-Angriff (DDoS) mit bislang kaum für möglich gehaltenen 7,3 Terabit pro Sekunde (TBit/s)", den es Mitte Mai dieses Jahres blockiert habe. In 45 Sekunden kam dabei ein Datenvolumen von 37,5 Terabyte zusammen.

Zuvor hat es Mitte April 2025 die bis dahin größte Attacke mit 6,5 TBit/s gegeben, wie Cloudflare im Threat-Report des ersten Quartals anmerkte. Dafür kamen 4,8 Milliarden Pakete pro Sekunde seitens der Täter zum Einsatz.`,
      },
      {
        title: 'Brutaler Absturz der VMware Explore',
        sources: [
          'https://www.heise.de/news/Brutaler-Absturz-der-VMware-Explore-10627791.html',
        ],
        teaser:
          'Auf weniger als ein Viertel ist die Teilnehmerzahl der VMware Explore eingebrochen. Doch Broadcom hält an seinem Kurs fest.',
        content: `Auf seiner Hausmesse VMware Explore, die nach der Einstellung des europäischen Ablegers in diesem Jahr nun ausschließlich in den USA stattfindet, hat Broadcom seine Strategie weiter konkretisiert und Produkte rund um seine VMware Cloud Foundation getaufte Plattform angekündigt. VCF erschien erst vor Kurzem in Version 9.

Selten zuvor in der Geschichte von VMware hat die Strategie des Herstellers die Kundenbasis und Community so sehr gespalten, wie seit der bei Kunden doch eher ungeliebten Übernahme durch den Chip-Riesen Broadcom. Verfechter der neuen Strategie und Partner, die ausschließlich auf die Produkte von VMware setzen, sehen es durchweg positiv: Broadcoms CEO Hock Tan hätte Ordnung in das Chaos mit tausenden von bestellbaren Produkten gebracht. Aus dem bisherigen VMware-Produktzoo rund um ESXi, vCenter, NSX, vSAN, Aria Automation und Operations und einigen mehr wurde die voll integrierte VCF-Plattform geschaffen und im Partner-Ökosystem richtig aufgeräumt.

"Partnern, die unser Ökosystem verstopft haben, wurde die Autorisierung entzogen", erklärte Laura Falko, verantwortlich für das globale Partnerprogramm von Broadcom, gegenüber europäischen Journalisten die immer noch laufenden Änderungen im Partnerprogramm. Und natürlich wird der Börsenkurs von Broadcom gefeiert, der sich seit der Übernahme von VMware vor zwei Jahren äußerst positiv entwickelt hat. Aus der Perspektive der Aktionäre macht Hock Tan also alles richtig.
Entsetzte Sponsoren

Die andere Hälfte beklagt den wenig wertschätzenden Umgang mit Kunden, Mitarbeitern und Partnern, die teils über 25 Jahre lang geholfen haben, die Erfolgsgeschichte von VMware mitzugestalten und zu ermöglichen. Hier verursacht der doch recht harsche Umgang mit (inzwischen häufig ehemaligen) Mitarbeitern, Partnern und Kunden ein gehöriges Maß an Unmut.

Die rückläufige Begeisterung bei Anwendern und den unfreiwillig weniger werdenden Partnern konnte man an der Teilnehmerzahl ablesen, die einen Negativrekord darstellt: Je nach Quelle waren zwischen 2500 und 5000 Personen im weitläufigen Konferenzzentrum des Venetian-Hotels in Las Vegas. Das Ergebnis war verwaiste Gänge, teilweise weit unterhalb der Raumkapazität besetzte Breakout Sessions und gähnende Leere im Ausstellungsbereich.

Und das, obwohl Sponsoren wie Microsoft, Google Cloud oder AWS für viel Geld die Hausmesse des konkurrierend-kooperienden Herstellers in Hoffnung auf qualifizierte Kundenkontakten mit einer kräftigen Finanzspritze unterstützt hatten. Diese zeigten sich im Gespräch mit der iX entsetzt über die wenigen Kundengespräche. Andere langjährige und auf früheren Hausmessen sehr aktive Partner waren überhaupt nicht vertreten – auf X musste sich Veeam bereits die Kritik gefallen lassen, VMware hätte den Backup-Spezialisten erst groß gemacht und jetzt zahle Veeam es VMware mit Undankbarkeit heim und würde nicht mal als Sponsor auftreten oder sich zu VCF 9 äußern.

Auch bei Kunden war die Stimmung eher verhalten: Wenige ganz große Kunden können sich mit dem quasi-Zwang, auf VCF gehen zu müssen, durchaus anfreunden – aber auch sie suchen nach Alternativen, nachdem Broadcom durch die schlecht kommunizierten Preiserhöhungen und als unfair empfundenen Änderungen der Spielregeln nicht mehr in jedem Kundenhaus als zuverlässiger und fairer Geschäftspartner wahrgenommen wird. Ein Teilnehmer aus einem mittelgroßen US-amerikanischen Unternehmen brachte es im Gespräch mit iX am Rande einer Session auf den Punkt: "Wir zahlen jetzt bei VCF für viel Software, die wir nicht wirklich nutzen."

Auch die Hyperscaler AWS, Google Cloud und Microsoft zeigten sich auf und nach der Messe wenig erfreut über Broadcoms Gebaren. Zahlten die drei großen Cloud Anbieter doch als Diamant-Sponsoren der Hausmesse den Löwenanteil des Ausstellersponsorings – alle anderen Partner- und Herstellerstände waren deutlich kleiner und günstiger –, so mussten sie sich bereits in den ersten fünf Minuten der Keynote des ersten Tages vorhalten lassen, dass VCF doch ohnehin viel besser und günstiger als die Angebote der Hyperscaler sei. Zumal hinter vorgehaltener Hand auf der Messe zu erfahren war, dass gleich am Freitag nach Abschluss der VMware Explore eine weitere Änderung anstünde, die den Hyperscalern nicht gefallen würde – und die kam dann auch prompt.

Im Blogbeitrag auf der Seite von VMware kündigt Abhay Kumar, Global Head of Managed Services der VCF Abteilung von Broadcom an, dass mit dem Start von Broadcoms neuem Fiskaljahr im November 2025 die Hyperscaler keine Lizenzen für VCF mehr den Kunden direkt bereitstellen dürfen, sondern diese ausschließlich über Broadcom bezogen werden müssen. Die Begründung: Das sei ja schließlich einfacher und besser für die Kunden und entspräche den Kundenwünschen, die dadurch noch mehr Kontrolle hätten, den Austragungsort ihrer Private-Cloud-Umgebungen zu bestimmen. Jedoch waren die Lizenzen vorher bereits portabel. Wenig überraschend führt diese Ankündigung nicht zu Begeisterungsstürmen bei den Hyperscalern. Aus Broadcoms Sicht ist das aber nur konsequent – sie werden nun nicht besser behandelt als Mitarbeiter, Partner und Kunden.`,
      },
    ];

    try {
      const result = await this.postService.createMany(postsToSeed);
      if (result.length !== postsToSeed.length) {
        console.error(
          `Expected to create ${postsToSeed.length} posts, but created only ${result.length}.`,
        );

        data.success = false;
        data.error = `Expected to create ${postsToSeed.length} posts, but created only ${result.length}.`;
      } else {
        data.posts = result.map((post) =>
          plainToClass(Post, post.toObject({ virtuals: true })),
        );
      }
    } catch (error) {
      const { message } = error as Error;
      console.error('Error creating posts:', error);
      data.success = false;
      data.error = `Error creating users: ${message || 'Unknown error'}`;
    }

    data.completedAt = new Date();

    return data;
  }
}
