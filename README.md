Quick Start
==========

    sbt update
    sbt deploy-html
    cd target/akka/
    bootAkka

Note in windows bootakka.bat should be run from the "target/akka/html"   directory




Open up a browser at http://localhost:9998/

    sbt console
    import akka.actor.Actor._
    val ms = remote.actorFor("message-service", "localhost", 1001)
    ms ! "hello"

You should see "hello" displayed in your browser window.

    ms ! "world"
    
You should see "world" displayed in your browser window.
    

## Problems ##

* If you leave the ajax action to timeout it doesn't renew itself
* Not absolutely sure this is the right way to do comet


This works ok. I changed the timeout to 100 ms, not 15 secs in poll.js.


