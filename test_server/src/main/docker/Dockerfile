FROM adoptopenjdk:jdk

RUN mkdir /deployments
COPY target/lib/* /deployments/lib/
COPY target/*-runner.jar /deployments/
COPY src/main/docker/scripts/* /deployments/
RUN set -e 's/\r$//' -i /deplyments/*.sh && chmod +x /deployments/*.sh

EXPOSE 8080
WORKDIR /deployments
ENTRYPOINT ["./run.sh"]