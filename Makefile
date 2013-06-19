
BASEURI = public/workpad

VERSION = $(shell cat ${BASEURI}/version.txt)

OPEN = $(shell which xdg-open || which gnome-open || which open)

OUTPUT_URI = ${BASEURI}/dist

WORKPAD_OUTPUT = "${OUTPUT_URI}/workpad-${VERSION}.js"
WORKPAD_FILES = ${BASEURI}/src/workpad.js \
  ${BASEURI}/src/browser.js \
  ${BASEURI}/src/util/array.js \
  ${BASEURI}/src/util/string.js



all: bundle minify

bundle:
	@@echo "Bundling..."
	@@echo "--------------"
	@@echo "Begin bundling workpad.js"
	@@touch ${WORKPAD_OUTPUT}
	@@rm ${WORKPAD_OUTPUT}
	@@cat ${WORKPAD_FILES} >> ${WORKPAD_OUTPUT}
	@@cat ${WORKPAD_OUTPUT} | sed "s/@VERSION/${VERSION}/" > "${WORKPAD_OUTPUT}.tmp"
	@@mv "${WORKPAD_OUTPUT}.tmp" ${WORKPAD_OUTPUT}
	@@echo "Bunling workpad.js complete"
	@@echo "--------------"

minify:
	@@echo "Minifying..."

test:
	@@${OPEN} ${BASEURI}/test/index.html