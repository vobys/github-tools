#!/usr/bin/env bash

#
# Use:
# ./docker-npm <<COMMANDS>>
#

if [[ "$#" -lt 1 ]] ; then
    echo "Use: ./docker-npm <<COMMANDS>>"
    exit 1
fi

docker run -i --rm --name github-nodejs -v "$(pwd)":/usr/src/app -w /usr/src/app node:9 npm "$@"
