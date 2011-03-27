import akka.actor._
import akka.actor.Actor._
import akka.http._
 
import javax.servlet.http.HttpServletResponse
 
class CometService extends Actor with Endpoint {

  self.dispatcher = Endpoint.Dispatcher

  def hook(uri:String) = uri.startsWith("/comet/")
  def provide(uri:String) = Actor.actorOf[CometActor].start

  override def preStart = Actor.registry.actorsFor(classOf[RootEndpoint]).head ! Endpoint.Attach(hook, provide)

  def receive = handleHttpRequest  
}

class CometActor extends Actor {

  def receive = {
    case get: Get =>       
	become(waiting(get))
  }

  def waiting(get: Get): Receive = {
    case message => {
      get OK message.toString
      unbecome
    }            
  } 
}

