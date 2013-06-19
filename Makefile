
BASEURI = public/workpad

VERSION = $(shell cat ${BASEURI}/version.txt)

OPEN = $(shell which xdg-open || which gnome-open || which open)

OUTPUT_URI = ${BASEURI}/dist

WORKPAD_OUTPUT = "${OUTPUT_URI}/workpad-${VERSION}.js"
WORKPAD_FILES = ${BASEURI}/src/workpad.js \
  ${BASEURI}/lib/base/base.js \
  ${BASEURI}/lib/rangy/rangy-core.js \
  ${BASEURI}/src/browser.js \
  ${BASEURI}/src/util/array.js \
  ${BASEURI}/src/util/string.js \
  ${BASEURI}/src/util/object.js \
  ${BASEURI}/src/util/events.js \
  ${BASEURI}/src/views/view.js \
  ${BASEURI}/src/views/wp.js \
  ${BASEURI}/src/init.js



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