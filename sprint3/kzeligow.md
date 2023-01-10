# Sprint 3

Kuba Zeligowski • huncfut • nullTime

### What you planned to do
* [#58](https://github.com/utk-cs340-fall22/nullTime/issues/58) 
* [#59](https://github.com/utk-cs340-fall22/nullTime/issues/59) 
* [#60](https://github.com/utk-cs340-fall22/nullTime/issues/60) 
* [#61](https://github.com/utk-cs340-fall22/nullTime/issues/61) 
* [#62](https://github.com/utk-cs340-fall22/nullTime/issues/62) 
* [#63](https://github.com/utk-cs340-fall22/nullTime/issues/63) 
* [#64](https://github.com/utk-cs340-fall22/nullTime/issues/64) 
* [#65](https://github.com/utk-cs340-fall22/nullTime/issues/65) 
* [#66](https://github.com/utk-cs340-fall22/nullTime/issues/66) 
* [#67](https://github.com/utk-cs340-fall22/nullTime/issues/67) 

### What you did not do
* There are some problems parsing the output from EndpointHello::get

### What problems you encountered
AWS documentation is a total disaster. It is very inconsistant and full of errors. Alpha versions of their libs have better documentation than the stable releases – which are also only stable on paper as the alphas had less errors. Also managing routes with the API brought some problems, as well as the JSON serialization is not ideal in native kotlin – probably will start using Gson soon.

### Issues you worked on
* [#58](https://github.com/utk-cs340-fall22/nullTime/issues/58) 
* [#59](https://github.com/utk-cs340-fall22/nullTime/issues/59) 
* [#60](https://github.com/utk-cs340-fall22/nullTime/issues/60) 
* [#61](https://github.com/utk-cs340-fall22/nullTime/issues/61) 
* [#62](https://github.com/utk-cs340-fall22/nullTime/issues/62) 
* [#63](https://github.com/utk-cs340-fall22/nullTime/issues/63) 
* [#64](https://github.com/utk-cs340-fall22/nullTime/issues/64) 
* [#65](https://github.com/utk-cs340-fall22/nullTime/issues/65) 
* [#66](https://github.com/utk-cs340-fall22/nullTime/issues/66) 
* [#67](https://github.com/utk-cs340-fall22/nullTime/issues/67) 

### Files you worked on
* aws/\* – every single file was created by me during this sprint

### What you accomplished
A great amount – at least personaly. After too many hours of debuging AWS java.core and trying to figure out what is actually going on and what the structures actually look like (using the logs) I have finally been able to create a stable CDK which allows us to both deploy the entire backend to the AWS platform as well as run the container natively using docker and SAM. This makes it increadibly easy to test both in the dev mode and later how it would behave on a production level. I have also completely restructured the kotlin API to properly build separate microservices into packed files, which would be later used for testing and deployment. The structure is becoming more defined – it evens seems like we are making a tiny backend aws framework. Finally created the Server class which handles running all the different endpoints in the respective micorservice. Also created the /lobby/hello endpoint for testing. Great sprint.
