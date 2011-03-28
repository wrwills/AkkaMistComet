import sbt._

class Project(info: ProjectInfo) extends DefaultProject(info) 
with AkkaProject 
with sbt_akka_bivy.AkkaKernelDeployment{

  val AkkaRepo = "Akka Maven Repository" at "http://akka.io/repository"

  val akka_kernel = akkaModule("kernel")
  val akka_http   = akkaModule("http")
  val akka_remote = akkaModule("remote")

  override def akkaKernelBootClass = "akka.kernel.Main"
  def htmlDir = "src" / "main" / "html"
  
  lazy val deployHtml = task {
    FileUtilities.copyDirectory(htmlDir, bundleDir / "html", log)
    None
  } dependsOn(akkaBundle) describedAs("deploy html")

}
