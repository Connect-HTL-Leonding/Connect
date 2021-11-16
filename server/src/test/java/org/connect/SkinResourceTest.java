package org.connect;

import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.connect.service.SkinService;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.junit.jupiter.api.*;

import javax.ws.rs.Path;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@QuarkusTest
@TestHTTPEndpoint(SkinService.class)
public class SkinResourceTest {

    /*
    @ConfigProperty(name = "keycloak.url")
    String keycloakURL;
    @ConfigProperty(name = "quarkus.oidc.credentials.secret")
    String credential;

    String userToken;
    String adminToken;

    @BeforeEach
    void setup() {
        if (userToken != null) {
            return;
        }
        RestAssured.baseURI = keycloakURL;
        System.out.println(RestAssured.baseURI);
        Response response =
                given().urlEncodingEnabled(true).auth().preemptive()
                        .basic("connect-client", credential)
                        .param("grant_type", "password")
                        .param("client_id", "connect-client")
                        .param("username", "jan")
                        .param("password", "passme2")
                        .header("Accept", ContentType.JSON.getAcceptHeader())
                        .post("/auth/realms/connect/protocol/openid-connect/token")
                        .then().statusCode(200).extract().response();
        System.out.println(response);
    }

    @Test
    public void testHelloEndpoint() {
        given()
                .auth().preemptive().oauth2(userToken)
                .when().get("/init")
                .then()
                .statusCode(200)
                .body(is("DB initialized"));
    }
     */

}