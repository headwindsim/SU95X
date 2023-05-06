@echo off

rem This is a script to use a locally build docker image to run the tests

set image="sha256:52415c40545b88c820f61f5d0ce77178599288c3bc60adae57acc5435d19d98c"

docker image inspect %image% 1> nul || docker system prune --filter label=local1=true -f
docker run --rm -it -v "%cd%:/external" %image% %*
