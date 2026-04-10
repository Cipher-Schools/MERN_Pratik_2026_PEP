#we will create a docker base image to wrap dependencies of our project.
#the base image will behave like instruction for the docker to build the image.
#docer images are builds on the based on the contents of the docker file.
#So docker file is a list of instuctions describing how you can deploy your application in a docker container.
# here we will use alpine version of nginx(webserver just like apache,IIS, LiteSpeed, and Caddy).
#we will use linux alpine version of nginx because it is a very small image and it is also very fast.

FROM nginx:alpine
COPY index.html style.css script.js /usr/share/nginx/html/
EXPOSE 80

# Your files are on Windows 
# Docker copies them into a Linux container 
# Nginx runs inside that container and uses Linux paths 
# docker build -t pratik-portfolio .
# docker run -d -p 8080:80 --name pratik-container pratik-portfolio