#!/bin/bash
MY_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$(basename "${BASH_SOURCE[0]}")"
MY_DIR="$(dirname $MY_PATH)"
cd $MY_DIR

rm -rf node_modules/
rm -rf dist/

yarn

yarn upgrade --latest \
    the-lodash \
    @kubevious/ui-framework \
    @kubevious/ui-components

${MY_DIR}/build.sh