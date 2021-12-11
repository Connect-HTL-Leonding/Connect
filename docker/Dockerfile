FROM jboss/keycloak:12.0.4

COPY realm-export.json /tmp/my-realm.json

ENV -Dkycloak.profile.upload_scripts=enabled
ENV DB_VENDOR MYSQL
ENV DB_ADDR db_keycloak
ENV DB_DATABASE keycloak
ENV DB_USER keycloak
ENV DB_PASSWORD password
ENV KEYCLOAK_USER admin
ENV KEYCLOAK_PASSWORD Pa55w0rd
ENV KEYCLOAK_STATISTICS all

ENV KEYCLOAK_IMPORT /tmp/my-realm.json
  
RUN cp -r /opt/jboss/keycloak/themes/keycloak /opt/jboss/keycloak/themes/custom