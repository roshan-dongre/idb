FROM ubuntu:14.04.4

#Install Python Setuptools
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y apt-transport-https python3.4 python-setuptools python-dev build-essential python-pip

#Install pip
RUN easy_install pip

#Install pip requirements
RUN pip install --upgrade pip    && \
    pip --version                && \
    pip install coverage         && \
    pip install numpy            && \
    pip install pylint           && \
    pip install flask            && \
    pip install flask_cors       && \
    pip install flask_sqlalchemy && \
    pip install Flask-Restless

COPY . /src
WORKDIR /src/
EXPOSE 80
ENTRYPOINT ["python"]
CMD ["main.py"]
