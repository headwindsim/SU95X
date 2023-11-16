@echo off

set image="ghcr.io/flybywiresim/dev-env@sha256:528f8e1ca9063b9346c7d4f684d7aadbcb58ca1fba2b1a3c2cdd9c820c4236f4"

docker image inspect %image% 1> nul || docker system prune --filter label=flybywiresim=true -f
docker run --rm -it -v "%cd%:/external" %image% %*
