.PHONY: clean build build-js

clean:
	@rm -rf dist

build: clean
	@bun build src/index.ts --target node --compile --outfile installr
	@mkdir dist
	@mv installr dist
	@chmod +x dist/installr
	@echo "Build complete 🎉"