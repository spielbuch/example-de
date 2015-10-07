/**
 * Wir erstellen Regeln, die wir später öfters nutzen werden.
 * Da die Regeln auf dem Server und dem Client verwendet werden, müssen sie im Ordner /lib liegen.
 * Außerdem sind sie global (deswege deklaration ohne var).
 */
Rules = {};
/**
 * Eine Regele besteht aus einem Schlüssel und einem Wert,
 * ist der Wert eine Zahl in einem String mit einem vorgestellten +/-, manipuliert die Regel den Ausgangswert für einen bestimmten Schlüssel.
 * Absolute Werte werden als Number angegeben. Sie dienen als Startwert. Eine Regel mit absolutem Wert, die auf andere Regeln folgt, überschreibt diese mit ihrem Wert.
 *
 * Anmerkung: '+30' und '30' sind identisch. '+30' ist nur eindeutiger in der View. Z. B.: Ein Schwert bietet '+30' Angriff, oder ein Schwert bietet '30' Angriff.
 * Ersteres ist eindeutiger und besser zu verstehen.
 *
 * Rechenbeispiele:
 * 15
 * '+5'
 * '-4'
 * '3'
 * = 19
 *
 * 15
 * '+3'
 * '-16'
 * 12 //überschreibt alle vorherigen Werte
 * = 12
 *
 */

/**
 * Die Namen von Angriffswert, Rüstungswert und Gesundheit werden im Spielebuch.Gameplay - Objekt festgelegt.
 * Diese Einstellugn wird in diesem Beispiel in /lib/config.js festgelegt.
 *
 * Wir könnten statt Spielebuch.Gameplay.hitpoints auch 'Gesundheit' schreiben.
 * Allerdings kann ich mit diesem Vorgehen den Code in die Englische Version mit Copy&Paste übernehmen
 * und ich vermeide Fehler (die durch meine miserable Rechtschreibung entstehen könnten).
 *
 * Der Schlüssel eines Wertes kann übrigens frei gewählt werden.
 * Rules.brave = new Spielebuch.Rule('Tapferkeit', 20);
 *
 * Dieser Wert kann im Spiel abgefragt werden
 * var braveness = player.getValueByName('Tapferkeit');
 * if(bravebess<30){
 *  //Spieler rennt weg
 * }
 *
 * Vollkommene Freiheit... just saying ;)
 */


/**
 * Diese Regeln haben absolute Werte, sie sind die initialen Werte der Objekte
 */
Rules.wooden = new Spielebuch.Rule(Spielebuch.Gameplay.hitpoints, 60);
Rules.humanHealth = new Spielebuch.Rule(Spielebuch.Gameplay.hitpoints, 80);
Rules.humanFistDamage = new Spielebuch.Rule(Spielebuch.Gameplay.damage, 20);
/**
 * Die Folgenden Regeln manipulieren den Ausgangswert des Objekte, auf das sie angewendet werden.
 */
Rules.iron = new Spielebuch.Rule(Spielebuch.Gameplay.hitpoints, '+5');
Rules.lowerHP = new Spielebuch.Rule(Spielebuch.Gameplay.hitpoints, '-15');
Rules.lowDamage = new Spielebuch.Rule(Spielebuch.Gameplay.damage, '+10');
Rules.swordDamage = new Spielebuch.Rule(Spielebuch.Gameplay.damage, '+60');
Rules.deathly = new Spielebuch.Rule(Spielebuch.Gameplay.hitpoints, 0); //this sets health to zero aka. kills everything

Rules.shieldDefense = new Spielebuch.Rule(Spielebuch.Gameplay.defense, '+20');

/**
 * Wir erstellen noch zwei Regeln:
 * Einmal das der Spieler ohne Geld startet.
 * Und zum zweiten, eine Regel, die die Axt Geld verdienen lässt.
 */
Rules.noMoney = new Spielebuch.Rule('Geld', 0);
Rules.woodMoney = new Spielebuch.Rule('Holz zu Geld',1);