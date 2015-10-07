/**
 * Der User soll in der Lage sein, die Story neu zu starten.
 * Stories können aber nur auf dem Server erstellt werden, also benutzen wir methods.
 *
 * Die Story haben in eine Funktion gekapselt, die wir in der Methode ausführen, nachdem wir mit
 * Meteor.call('deleteStoryOfUser'); (wird von spielebuch:core bereitgestellt), die alte Story des Users
 * gelöscht haben.
 *
 * Die Story benötigt immer die _id des Users, schließlich soll jeder User seine eigene Story haben.
 *
 * Obwohl, ein Multiplayer-Modus... warum nicht, die nächsten Semesterferien kommen bestimmt ;)
 */
Meteor.methods({
    restartStory: function () {
        if (this.userId === null) {
            throw new Meteor.Error('403', 'User is not logged in.');
        } else {
            Meteor.call('deleteStoryOfUser');
            createStory(this.userId);
        }
    }
});
