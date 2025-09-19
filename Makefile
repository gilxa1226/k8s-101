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
	read -p "Enter frontend tag name: " TAG && \
	docker build -t frontend:$$TAG .

.PHONY: build-backend-container

build-backend-container:
	@cd backend && \
	read -p "Enter backend tag name: " TAG && \
	./mvnw clean package -Dquarkus.container-image.build=true -Dquarkus.container-image.group= -Dquarkus.container-image.name=backend -Dquarkus.container-image.tag=$$TAG

# Build both frontend and backend containers
.PHONY: build-containers
build-containers: build-frontend-container build-backend-container

# Push both frontend and backend containers to Docker Hub
.PHONY: push-containers
push-containers:
	docker login
	@read -p "Enter Docker Hub username: " USERNAME; \
	read -p "Enter tag name: " TAG; \
	docker tag frontend:$$TAG $$USERNAME/frontend:$$TAG; \
	docker tag backend:$$TAG $$USERNAME/backend:$$TAG; \
	docker push $$USERNAME/frontend:$$TAG; \
	docker push $$USERNAME/backend:$$TAG

# Start Minikube with ingress and dashboard addons enabled
.PHONY: start-minikube
start-minikube:
	minikube start --addons ingress,dashboard,metrics-server

.PHONY: stop-minikube
stop-minikube:
	minikube stop

.PHONY: delete-minikube
delete-minikube:
	minikube delete