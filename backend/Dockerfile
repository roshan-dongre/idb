FROM ubuntu:14.04.4

RUN apt-get update && apt-get install -y apt-transport-https
#Install Python Setuptools
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y python3.4
RUN apt-get install -y python-setuptools python-dev build-essential python-pip

#Install pip
RUN easy_install pip

#Install pip requirements
RUN pip install --upgrade pip && \
    pip --version             && \
    pip install coverage      && \
    pip install numpy         && \
    pip install pylint        && \
    pip install flask         && \
    pip install flask_cors    && \
    pip install Flask-Restless

COPY . /src
WORKDIR /src/flaskr/
EXPOSE 5000
ENTRYPOINT ["python"]
CMD ["flaskr.py"]
