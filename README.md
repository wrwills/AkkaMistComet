Quick Start
==========

    sbt update
    sbt deploy-html
    cd target/akka/
    sh bootAkka
    

Open up a browser at http://localhost:9998/

    sbt console
    import akka.actor.Actor._
    val ms = remote.actorFor("message-service", "localhost", 11001)
    ms ! "hello"

You should see "hello" displayed in your browser window.

    ms ! "world"
    
You should see "world" displayed in your browser window.
    

## Problems ##

* If you leave the ajax action to timeout it doesn't renew itself
* Not absolutely sure this is the right way to do comet
