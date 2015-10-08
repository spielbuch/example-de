/**
 * Auf geht's, wir erstellen eine interaktive Story.
 * Ich verwende dazu das erste Kapitel aus dem Fantasyroman Mundir - Interregnum,
 * vielen Dank an den Autor, das er das erlaubt (sämtliche Rechte am Inhalt des Buches verbleiben selbstverständlich beim Autor).
 * Ich lasse einfach mal diesen Amazon Partnerlink zum Buch hier und bedanke mich für die Unterstützung ;)
 * http://www.amazon.de/gp/product/1499307675/ref=as_li_tl?ie=UTF8&camp=1638&creative=19454&creativeASIN=1499307675&linkCode=as2&tag=budickeu-21
 */

/**
 * Um die Story für jeden User neu zu erstellen, packen wir sie in eine globale Funktion namens createStory().
 * @param userId: Um eine Story für einen User zu erstellen brauchen wir dessen userId.
 */
createStory = function (userId) {
    /**
     * Wir erstellen zuerst eine Story mit dem Story-Objekt, das uns das Spielebuch zur Verfügung stellt.
     */
    var story = new Spielebuch.Story(userId);

    /**
     * Eine Geschichte braucht einen Helden, dieser Held wird vom User gesteuert.
     * Wir kreiren ihn aus der Story.
     */
    var player = story.createPlayer();
    /**
     * Der Spieler soll einen Nahkampfschaden wirken (mit seinen Fäusten) und eine gewisse Gesundheit haben.
     */
    player.addEffect(new Spielebuch.Effect('Mensch', [Rules.humanHealth, Rules.humanFistDamage, Rules.noMoney]));
    /**
     * Wenn wir keinen Namen setzen, macht das der Zufallsgenerator, der Name des Helden ist aber unbekannt.
     */
    player.setName('Namenloser Held');


    /**
     * Eine Story besteht aus vielen Szenen. Man könnte eine Szene in diesem Zusammenhang mit der Szene im Theater vergleichen.
     * Sie ist ein fester Ort mit einer festen Situation. Ändert sich der Ort oder die Situation, sollte man eine neue Szene erstellen und zu dieser Wechseln.
     *
     * Die Szene wird aus der Story erstellt.
     */
    var sceneOne = story.addScene();
    /**
     * Jede Szene hat einen index, mit dessen Hilfe direkt zu dieser Szene gesprungen werden kann.
     * Wir werden den Index der ersten Szene brauchen, wenn wir die Story starten, deswegen speichern wir ihn
     * in einer extra Variable ab.
     */
    var firstScene = sceneOne.index; //

    /**
     * Ein Buch benötigt Text.
     * Wir schreiben ähh copy&pasten eine kurze Einleitung ;)
     */
    sceneOne.addText(`
        Als ich auf der Erde aufschlug, drehte ich den Kopf noch instinktiv zur Seite. Dieser
        Heldentat meines Gehirns verdankte ich es, dass meine Nase vor der enormen Wucht
        geschützt war, die nun die Seite meines Kopfes traf. Ich hatte einmal gelesen, dass  bei
        der Wechselwirkung zwischen zwei Körpern jede Aktion gleichzeitig eine gleich große
        Reaktion erzeugt, die auf den Verursacher der Aktion zurückwirkt
        Komischerweise ging mir genau das in diesem Moment durch den Kopf. Und noch
        während sich der Boden, von mir in Schwung gesetzt, ausdrehte, bildete ich mir ein, ein
        Lachen zu hören.
        Beide Hände aufgestützt wollte ich mich nach oben drücken. Doch die Befürchtung, zu
        irgendeiner Seite, oder sogar gen Himmel wegzufallen, hielt mich zurück.
    `);

    /**
     * Damit haben wir ein Buch geschrieben, naja fast, irgendwie... jetzt bringen wir eine wenig Interaktion rein.
     *
     * Um eine Story interaktiv zu machen benötigen wir GameObjects. Wir müssen sie aber nicht definieren,
     * wir kreiren sie aus dem Text indem wir Markdown-Language benötigen.
     *
     * Im folgenden, soll das Wort 'Kopf' ein Objekt sein, mit dem wir interagieren (heben) können.
     */
    var head = sceneOne.addText(`
        Ich hörte wie jemand neben mir leichtfüßig auf dem Boden aufkam und versuchte, den
        [Kopf](head) zu heben und aufzublicken. Es brummte, es war mir, als ob mein Gehirn mir an jeder
        Seite aus dem Schädel entfliehen wollte. Wahrscheinlich, um sich einen Ort zu suchen, an
        dem es in Ruhe seinen Geschäften nachgehen konnte.
    `);
    /**
     * Wir umgrenzen das Wort, welches der Name des GameObject sein soll mit [] und geben ihm einen Schlüssel 'head' in runden Klammern mit.
     * Dieser Schlüssel ist im Moment noch nutzlos (außer wir markieren mehrere Wörter in einem Text).
     *
     * Die Story sollte starten, das machen wir mit der Methode Story.Start() und übergeben als Parameter den Index der ersten Szene.
     * Wichtig in diesem Fall ist, dass wir die Rückgabe von sceneOne.addText() in einer Variable speichern.
     * Denn diese Variable enthällt nun, durch die Magie von spielebuch:core ein vollständiges GameObject, mit dem wir im weiteren arbeiten können.
     *
     * Als erstes möchten wir, dass wenn eine Aktion am Kopf ausgeführt wird, in die nächste Szene gewechselt wird.
     * Dazu erstellen wir am GameObject head ein event.
     */
    head.setEvent('Heben', function(){
        story.next(secondScene);
    }, 'fa-long-arrow-up');
    /**
     * Was haben wir gerade gemacht?
     * Der erste Parameter gibt den Namen an, den die Aktion haben soll.
     * Der zweite Parameter ist eine Funktion, die am Client ausgeführt wird, wenn dieser das Event triggert (anklickt).
     * Wichtig hierbeit:
     * Funktionen werden in der Datenbank als String gespeichert und am Client ausgeführt. Sie bekommen ein paar Variablen mit:
     * - story: Die aktuelle Story als StoryObject
     * - scene: Die aktuelle Szene als SceneObjekt
     * - player: Der aktulle Spieler als PlayerObjekt
     * - self: Das GameObject auf dem das Event ausgeführt wurde, in diesem Fall head.
     *
     * Der dritte Parameter ist die Klasse, die das Icon in der UI festlegt. Wir benutzen hier fontawesome.
     */

    /**
     * Nun wird zur nächsten Szene gesprungen, diese existiert aber noch nicht.
     * Also erstellen wir sie:
     */
    var sceneTwo = story.addScene();
    /**
     * In der event-Funktion von Heben wird die Variable secondScene benutzt.
     * Diese existiert aber in diesem Scope nicht. Der Client hat keinen Zugriff auf Server-Variablen.
     * Wir müssen also den Wert dieser Variable an den Client veröffentlichen.
     *
     * Alle Funktionen am Client haben nun die Variable secondScene mit dem Wert sceneTwo.index zur Verfügung.
     * Puh... nochmal gut gegangen.
     *
     * Im Code kann man es sich so vorstellen:
     *          story.publish('secondScene', sceneTwo.index);
     *      wird am Client zu:
     *          var secondScene = sceneTwo.index;
     */
    story.publish('secondScene', sceneTwo.index);

    /**
     * Auch diese Szene benötigt Text:
     */
    var helpingHand = sceneTwo.addText(`
        Es gelang mir schließlich, meinen Kopf zu heben und ich erblickte Aiden. Schwarze
        Haare, eine etwas breite Nase und ein freches Grinsen.
        Seine ersten Worte zu mir waren etwas von wegen, dass er mich gar nicht hätte kommen
        sehen. Er bedachte mich mit dem Blick eines nüchternen Trunkenbolds, der sich in der
        Überhebung sonnt, einmal nicht betrunken am Boden zu liegen und drauf und dran ist
        diese Tatsache moralisch und dramatisch auszuschlachten. Seinen Mund hatte er bereits
        geöffnet, als er mir die Hand reichte. Die Worte hatte sein Gehirn bereitgelegt und an die
        Zunge geschickt, diese wollte sie formen, als er mir aufhalf.
        Doch sein spöttischer Blick wich ehrlicher Besorgnis, als er sich mir genähert hatte und
        keine Fahne riechen konnte. Aiden hällt mir seine [Hand](helping_hand) hin.
    `);
    /**
     * Wir möchten, dass das hochziehen ein wenig dauert, deswegen benutzen wir einen Countdown, der im Hintergrund läuft.
     * UND: wir verwenden nun ein Icon aus ionicons.
     */
    helpingHand.setEvent('Ergreifen',
    function(){
        story.next(cutSceneHelpingHand);
    }, 'ion-android-hand');


    /**
     * Wir wollen eine kurze Zwischenszene, in der sich der Text ändert.
     */
    var cutSceneOne = story.addScene();
    story.publish('cutSceneHelpingHand', cutSceneOne.index);
    /**
     * Wir benutzen dafür die das onVisit Event der Szene.
     * Dieses Event wird immer ausgeführt, wenn die Szene startet
     * Wir schreiben eine kurze Meldung in das Log (Spielebuch.printd())
     * und starten anschließend einen Countdown
     * - der erste Parameter ist die Dauer in Millisekunden
     * - die zweite ist der Intervall in dem heruntergezählt wird in Millisekunden
     * - die anonyme Funktion am Ende wird ausgeführt wenn der Countdown zuende ist.
     * Da die anonyme Funktion im selben Scope liegt, wie das Callback von onVisit,
     * hat sie Zugriff auf die Variablen die mit publish veröffentlich wurden und
     * auf story, scene, player und self, wobei self hier undefined ist, da es sich nicht um ein Event eines GameObject handelt.
     */
    cutSceneOne.onVisit(function(){
        Spielebuch.printd('Aiden hilft dir auf die Beine...');
        Spielebuch.startUiCountdown(3000, 1000, function () {
            story.next(thirdScene);
        });
    });
    /**
     * Wir schreiben noch ein wenig Text...
     */
    cutSceneOne.addText(`
        Während der säuerliche Gestank, der von mir verursachten Pfütze langsam auf und mir in
        die Nase stieg, fasste ich schließlich den Entschluss, Aidens Hand zu nehmen und mich
        an ihr auf die Beine zu ziehen.
    `);

    /**
     * Danach wird zur dritten Szene gewechselt, diese erstelle wir jetzt... wobei...
     * ist schon ein wenig viel Code für eine Datei... lagern wir aus.
     *
     * Wir sehen uns in /server/scene_four.js
     * Dort definieren wir die globale Funktion createScneFour und rufen sie hier mit den parametern story und player auf (denn die brauchen wir noch).
     *
     * Somit können auch mehrere Autoren an einem Projekt arbeiten... cool, oder.
     */
    createSceneThree(story, player);
    /**
     * alle weiteren Szenen werden wir auf diese Art erstellen,
     * denn damit wird aus unser wahnsinnig komplexen Story übersichtlicher Code.
     */
    createSceneFour(story, player);


    story.start(firstScene);
};
