install: python-install
full-reset: repo-pull docker-reset

python-install:
	python3 -m venv venv && \
	. venv/bin/activate && \
	pip install --upgrade pip && \
	pip install -r requirements.txt

serve:
	. venv/bin/activate && \
	FLASK_APP=app FLASK_ENV=development \
	APP_SETTINGS=app.config.DevelopmentConfig \
	flask run --extra-files app/templates/patilloid.html:app/static/css/patilloid.css:app/static/js/patilloid.js

docker-reset:
	echo "Stopping container..." && \
	docker stop patilloid || true && \
	echo "Deleting container..." && \
	docker rm patilloid || true && \
	echo "Deleting image..." && \
	docker rmi patilloid || true && \
	echo "Rebuilding image..." && \
	docker build --tag patilloid . && \
	echo "Running new image in new container..." && \
	docker run -d --name patilloid --publish 5050:5050 patilloid && \
	echo "Set restart on failure..." && \
	docker update --restart=on-failure patilloid

repo-pull:
	git pull origin master
