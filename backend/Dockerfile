FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm cache clean --force
EXPOSE 3000
CMD ["./start.sh"]


# docker build -t mcqs_backend .
# docker run -p 3000:3000 -d mcqs_backend