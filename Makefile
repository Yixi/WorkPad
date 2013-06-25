
BASEURI = public/workpad

VERSION = $(shell cat ${BASEURI}/version.txt)

OPEN = $(shell which xdg-open || which gnome-open || which open)

OUTPUT_URI = ${BASEURI}/dist

WORKPAD_OUTPUT = "${OUTPUT_URI}/workpad-${VERSION}.js"
WORKPAD_MIN_OUTPUT = "${OUTPUT_URI}/workpad-min-${VERSION}.js"
WORKPAD_MIN_SOURCEMAP_OUTPUT = "${OUTPUT_URI}/workpad.js.map"

WORKPAD_FILES = ${BASEURI}/src/workpad.js \
  ${BASEURI}/lib/base/base.js \
  ${BASEURI}/lib/rangy/rangy-core.js \
  ${BASEURI}/src/browser.js \
  ${BASEURI}/src/util/debug.js \
  ${BASEURI}/src/util/array.js \
  ${BASEURI}/src/util/string.js \
  ${BASEURI}/src/util/object.js \
  ${BASEURI}/src/util/events.js \
  ${BASEURI}/src/data/predata.js \
  ${BASEURI}/src/data/check.js \
  ${BASEURI}/src/data/pretty.js \
  ${BASEURI}/src/dom/class.js \
  ${BASEURI}/src/dom/offset.js \
  ${BASEURI}/src/dom/set_attributes.js \
  ${BASEURI}/src/dom/styles.js \
  ${BASEURI}/src/dom/insert.js \
  ${BASEURI}/src/dom/observe.js \
  ${BASEURI}/src/dom/delegate.js \
  ${BASEURI}/src/dom/get_parent_element.js \
  ${BASEURI}/src/dom/edit_area.js \
  ${BASEURI}/src/commands.js \
  ${BASEURI}/src/views/view.js \
  ${BASEURI}/src/views/composer.js \
  ${BASEURI}/src/views/composer.observe.js \
  ${BASEURI}/src/views/wp.js \
  ${BASEURI}/src/views/wp.dom.js \
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
	@@echo "---------------"
	@@java -jar ${BASEURI}/tools/compiler.jar \
	       --compilation_level SIMPLE_OPTIMIZATIONS \
	       --js ${WORKPAD_OUTPUT} \
	       --language_in=ECMASCRIPT5_STRICT \
	       --create_source_map ${WORKPAD_MIN_SOURCEMAP_OUTPUT} \
	       --source_map_format=V3 \
	       --js_output_file ${OUTPUT_URI}/1.js
	@@java -jar ${BASEURI}/tools/compiler.jar \
	       --js ${OUTPUT_URI}/1.js \
	       --js_output_file ${OUTPUT_URI}/2.js
	@@rm ${WORKPAD_MIN_OUTPUT}
	@@cat  ${BASEURI}/lincence ${OUTPUT_URI}/2.js ${BASEURI}/sourcemap >> ${WORKPAD_MIN_OUTPUT}
	@@rm ${OUTPUT_URI}/2.js ${OUTPUT_URI}/1.js
	@@echo "Minifying workpad-${VERSION}.js complete"


test:
	@@${OPEN} ${BASEURI}/test/index.html