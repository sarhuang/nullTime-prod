# Sprint 2

Kuba Zeligowski • huncfut • nullTime

### What you planned to do
* Migrate backend to quarkus [#37](https://github.com/utk-cs340-fall22/nullTime/issues/37) 
* Create a greeter endpoint [#38](https://github.com/utk-cs340-fall22/nullTime/issues/38)
* Write tests for the greeter endpoint [#39](https://github.com/utk-cs340-fall22/nullTime/issues/39)
* Write a cdk for the project [#40](https://github.com/utk-cs340-fall22/nullTime/issues/40)
* Write first working endpoint [#41](https://github.com/utk-cs340-fall22/nullTime/issues/41)

### What you did not do
* Did not write the actual lobby/new endpoint

### What problems you encountered
Getting the kotlin to work on the AWS system was way more difficult than anticipated. Also there were problems with @Inject with kontlin, yielding unexpected errors. The API Gateway did not work at first, causing the entire lambda to be practically useless.

### Issues you worked on
* Migrate backend to quarkus [#37](https://github.com/utk-cs340-fall22/nullTime/issues/37) 
* Create a greeter endpoint [#38](https://github.com/utk-cs340-fall22/nullTime/issues/38)
* Write tests for the greeter endpoint [#39](https://github.com/utk-cs340-fall22/nullTime/issues/39)
* Write a cdk for the project [#40](https://github.com/utk-cs340-fall22/nullTime/issues/40)

### Files you worked on
* null-time-api/\* – every single file was created by me during this sprint (moved to quarkus)
* cdk/\* – every single file was created by me during this sprint

### What you accomplished
Successfully moved to Quarkus despite extreme difficulties. I was able to move past the unexpected infamous NullPointerExceptions and got an endpoint to work. CDK turned out good, making it way easier to deploy code to the AWS.
