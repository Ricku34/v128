PROJECT     = v128
BUILD_DIR   = ./build
WABT_DIR    = ./wabt

WASM_JS := $(BUILD_DIR)/wasm-data.js
WASM_OBJECT := $(BUILD_DIR)/$(PROJECT).wasm
WAT_OBJECT := $(BUILD_DIR)/$(PROJECT).wat
WAT_SOURCES := $(sort $(wildcard ./src/wat/*.wat))
JS_SOURCES := $(wildcard ./src/js/*.js)
TARGETS := ./dist/$(PROJECT).js ./dist/$(PROJECT)-min.js ./dist/$(PROJECT)-node.js

all : ./node_modules $(WABT_DIR) $(BUILD_DIR) $(TARGETS) ./README.md
	@echo SUCCESS

cleanall:
	-@rm -rf $(BUILD_DIR) ./dist ./node_modules ./doc
	-@rm package-lock.json

clean:
	-@rm -rf $(BUILD_DIR) 

dist/%.js : $(WASM_JS) $(JS_SOURCES)
	@npx webpack

$(WASM_JS) : $(WASM_OBJECT)
	node ./src/scripts/wasm2js $< > $@

$(WAT_OBJECT): $(WAT_SOURCES)
	@cat $^ > $@

$(WASM_OBJECT) : $(WAT_OBJECT) 
	@$(WABT_DIR)/bin/wat2wasm $< -o $@

 $(BUILD_DIR):
	@mkdir $@

./node_modules:
	@npm install

# ./doc: $(JS_SOURCES) ./README.md
# 	@npx jsdoc -c jsdoc.json -t node_modules/jaguarjs-jsdoc -d $@ $^
./README.md : ./src/README.hbs $(JS_SOURCES)
	@npx jsdoc2md -t $< $(JS_SOURCES) > $@

$(WABT_DIR):
	@git clone --recursive https://github.com/WebAssembly/wabt
	@cd ./wabt && git submodule update --init &&	mkdir build && cd build && 	cmake .. &&	cmake --build . 
