open up a browser at http://localhost:9998/

import akka.actor.Actor._
val ms = remote.actorFor("message-service", "localhost", 11001)
ms ! "hello"

You should see "hello" displayed in your browser window.
