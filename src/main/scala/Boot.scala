import akka.actor._
import akka.http._
import akka.config._
import akka.config.Supervision._
import akka.util._

class Boot 
{
  import Actor._

  val factory = 
    SupervisorFactory(
      SupervisorConfig(
	OneForOneStrategy(List(classOf[Exception]), 3, 100),
        Supervise(Actor.actorOf[RootEndpoint], Permanent) ::
        Supervise(Actor.actorOf[CometService], Permanent) :: Nil))
  
  factory.newInstance.start

  remote.start(getClass().getClassLoader())
  remote.register("message-service", actorOf[MessageActor])

}

class MessageActor extends Actor {
  def receive = {
    case x => Actor.registry.actorsFor[CometActor] foreach (_ ! x)
  }
}
