DOCS_SRC := $(wildcard docs/*.tex)
DOCS_BUILD := docs/build
DOCS_PDFS := $(patsubst docs/%.tex,$(DOCS_BUILD)/%.pdf,$(DOCS_SRC))

.PHONY: docs

docs: $(DOCS_PDFS)

$(DOCS_BUILD)/%.pdf: docs/%.tex | $(DOCS_BUILD)
	pdflatex -output-directory=$(DOCS_BUILD) $<

$(DOCS_BUILD):
	mkdir -p $(DOCS_BUILD)

.PHONY: clean-docs

clean-docs:
	rm -rf $(DOCS_BUILD)