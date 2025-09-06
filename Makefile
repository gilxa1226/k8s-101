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

.PHONY: build-frontend-container

build-frontend-container:
	@cd frontend && \
	GIT_HASH=$$(git rev-parse --short HEAD) && \
	docker build -t frontend:$$GIT_HASH .

.PHONY: build-backend-container

build-backend-container:
	@cd backend && \
	GIT_HASH=$$(git rev-parse --short HEAD) && \
	./mvnw clean package -Dquarkus.container-image.build=true -Dquarkus.container-image.group= -Dquarkus.container-image.name=backend -Dquarkus.container-image.tag=$$GIT_HASH