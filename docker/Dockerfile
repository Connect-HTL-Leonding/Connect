FROM jboss/keycloak:12.0.4

COPY ./realm/realm-export.json /tmp/my-realm.json

ENV -Dkeycloak.profile.upload_scripts=enabled
ENV DB_VENDOR MYSQL
ENV DB_ADDR db_keycloak
ENV DB_DATABASE keycloak
ENV DB_USER keycloak
ENV DB_PASSWORD password
ENV KEYCLOAK_USER admin
ENV KEYCLOAK_PASSWORD Pa55w0rd
ENV KEYCLOAK_STATISTICS all
ENV PROXY_ADDRESS_FORWARDING=true

ENV KEYCLOAK_IMPORT /tmp/my-realm.json -Dkeycloak.profile.feature.upload_scripts=enabled
  
RUN cp -r /opt/jboss/keycloak/themes/keycloak /opt/jboss/keycloak/themes/custom