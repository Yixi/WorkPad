#/bin/bash

BASEURI=public/workpad

VERSION=$(cat $BASEURI/version.txt)
OUTPUT_URI=${BASEURI}/dist

WORKPAD_OUTPUT=${OUTPUT_URI}/workpad-${VERSION}.js
WORKPAD_MIN_OUTPUT=${OUTPUT_URI}/workpad-min-${VERSION}.js

SIZE_SRC=$(cat $WORKPAD_OUTPUT | wc -c)
SIZE_MIN=$(cat $WORKPAD_MIN_OUTPUT | wc -c)
SIZE_GZIP=$(gzip -nfc --best $WORKPAD_MIN_OUTPUT | wc -c)

echo "    `echo "scale=3;$SIZE_SRC/1024" | bc -l` bytes workpad-${VERSION}.js"
echo "     `echo "scale=3;$SIZE_MIN/1024" | bc -l` bytes workpad-min-${VERSION}.js"
echo "     `echo "scale=3;$SIZE_GZIP/1024" | bc -l` bytes workpad-min-${VERSION}.js gzipped"
echo "  `cat $WORKPAD_OUTPUT | wc -l` LOC"