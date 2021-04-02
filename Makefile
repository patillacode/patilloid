install: python-install

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

