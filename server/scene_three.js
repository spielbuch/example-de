createSceneThree = function(story,player){
    /**
     * Auch hier, wie gehabt:
     * Szene erstellen, index für den Client veröffentlichen.
     * Und wir können die Variable scene nutzen, das wir keinen mit Scenen verschmutzten Scope mehr haben.
     */
    var scene = story.addScene();
    story.publish('thirdScene', scene.index);

};