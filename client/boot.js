/**
 * Spielebuch und Reader müssen initialisert werden, da das in mehreren Fällen wichtig ist,
 * benutzen wir eine Funktion
 */
initBook = function(){
    Spielebuch.init(function(err){
        if(!err){
            Reader.init();
        }
    });
};

/**
 * Immer wenn sicher eine User einlogt, soll getetstet werden, ob er bereits eine Story hat.
 * Wenn nicht, wird eine erstellt.
 *
 * In jedem Fall wird danach das Spielebuch und die UI (Reader) initialisiert.
 */
Accounts.onLogin(function () {
    if(Meteor.user().storyId==='') {
        Meteor.call('restartStory', initBook);
    }else{
        initBook();
    }
});

/**
 * Spielebuch und Reader müssen natürlich auch initialisert werden, wenn der User noch eingeloggt ist und die Applikation neu gestartet wird (Reload im Browser)
 */
Meteor.startup(function(){
    if(Meteor.user()){
        initBook();
    }
});