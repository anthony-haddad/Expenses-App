FROM node:19-alpine

# ARG user
# ARG uid

RUN apk update && apk add vim

# RUN adduser --disabled-password -u $uid -h /home/$user $user -G www-data

# RUN chown -R $uid:$uid /home/$user

WORKDIR /app

ENTRYPOINT [ "tail", "-f", "/dev/null" ]