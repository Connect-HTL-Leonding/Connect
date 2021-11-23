package org.connect;

import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;
import io.restassured.response.ResponseBody;
import io.restassured.response.ValidatableResponse;
import org.connect.model.skin.Skin;
import org.connect.service.SkinService;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.hamcrest.Matcher;
import org.junit.jupiter.api.*;

import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.*;


@QuarkusTest
@TestHTTPEndpoint(SkinService.class)
public class SkinResourceTest {


    @ConfigProperty(name = "keycloak.url")
    String keycloakURL;
    @ConfigProperty(name = "quarkus.oidc.credentials.secret")
    String credential;

    String accessToken;

    @BeforeEach
    void setup() {
        if (accessToken != null) {
            return;
        }

        ResponseBody body =
                given().
                        contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        //urlEncodingEnabled(true).auth().preemptive()
                        //.basic("connect-client", credential)
                        .param("client_id", "connect-client")
                        .param("client_secret", credential)
                        .param("scope", "openid")
                        .param("grant_type", "password")
                        .param("username", "tobi")
                        .param("password", "geheim")
                        //.header("Accept", ContentType.JSON.getAcceptHeader())
                        .when()
                        .post("http://localhost:8010/auth/realms/connect/protocol/openid-connect/token")
                        .then().statusCode(200)
                        .extract().response().body();

        //überprüfen, ob access_token zurückkommt
        assertTrue(body.asString().contains("access_token"));

        //access_token extrahieren
        JsonPath jsonPathEvaluator = body.jsonPath();
        accessToken = jsonPathEvaluator.get("access_token");
    }

    @Test
    public void testTestEndpoint() {
        given()
                .auth().preemptive().oauth2(accessToken)
                .when().get("/test")
                .then()
                .statusCode(200)
                .body(is("success"));
    }

    @Test
    public void testFindAll() {
       Response r = given()
                .auth().preemptive().oauth2(accessToken)
                .when().get("/findAll")
                .then()
               .extract().response();

       Assertions.assertEquals("Basketball",r.jsonPath().getString("title[2]"));
    }

    @Test
    public void testFind() {
        // Tests to see whether the FUßball skin exists
        Response r = given()
                .auth().preemptive().oauth2(accessToken)
                .when().get("/find/11")
                .then()
                .extract().response();

        Assertions.assertEquals(200,r.statusCode());
        Assertions.assertEquals("Fußball",r.jsonPath().getString("title"));
    }

}