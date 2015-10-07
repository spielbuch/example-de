/**
 * Der User soll die Story zu jeder Zeit neu starten können.
 * Dazu verwenden wir einen Button.
 */
Template.header.events({
    'click .restart-story': function(event) {
        event.preventDefault();
        Session.set('spielebuchReady',false);
        Meteor.call('restartStory', initBook);
    }
});
