@echo off

rem This is a script to use a locally build docker image to run the tests

set image="sha256:ce649668671f2a9949ca56155cd92179ccd8cb1f555d26e582821a7de03b5c7a"

docker image inspect %image% 1> nul || docker system prune --filter label=local1=true -f
docker run --rm -it -v "%cd%:/external" %image% %*
