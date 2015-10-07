/**
 * In Ermangelung eines Sprachpaketes für die Deutsche Sprache, müssen diverse genutzte Meldungen mit deutscher Übersetzung überschrieben werden.
 */

Spielebuch.language = {
    countdownStarted: 'Countdown gestartet...',
    countdownEnded: 'Countdown gestoppt.',
    countdownTime: function(timeLeft){
        return `Noch ${timeLeft} Sekunden...`;
    },
    destroyedObject: function(name){
        return `${name} wurde zerstört.`;
    },
    destroyedPlayer: function(name){
        return `${name} wurde getötet.`;
    },
    damage: function(attacker,target, damage){
        return `${attacker} greift ${target} an und verursacht ${damage} ${Spielebuch.Gameplay.damage}.`
    },
    criticalDamage: function(attacker,target, damage){
        return `${attacker} greift ${target} an und verursacht kritischen ${Spielebuch.Gameplay.damage} mit einem Wert von ${damage}.`
    },
    event: function(player, event, target){
        return `${player} benutzte ${event} auf ${target}.`;
    },
    equippingFailed: function(name,bodyPart){
        return `Du kannst ${name} nicht an ${bodyPart} tragen.`
    },
    equippingForbidden: function(name){
        return `Du kannst ${name} nicht ausrüsten.`
    }
};

/**
 * Die folgenden Texte werden in der erstellten Geschichte verwendet, wir definieren sie hier zusätzlich.
 * Das ist nötig um Spielebuch.print() zu nutzen. Da diese Funktion einen String anhand eines keys aus Spielebuch.language in das Log schreibt.
 * Man könnte natürlich auch Spielebuch.printd() (kurz für print directly) nutzen und direkt einen String übergeben.
 */
Spielebuch.language.cannotSee = 'Du versuchst einen Blick zu erhaschen, doch Du kannst nichts erkennen. Es ist zu weit entfernt.';