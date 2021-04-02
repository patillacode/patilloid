FROM python:3.8-slim-buster

# RUN apt-get update && apt-get install -y make gcc
RUN mkdir patilloid

COPY . patilloid

WORKDIR patilloid

RUN pip install --upgrade pip && pip install -r requirements.txt

CMD ["waitress-serve", "--port=5050","--call", "app:create_app"]

