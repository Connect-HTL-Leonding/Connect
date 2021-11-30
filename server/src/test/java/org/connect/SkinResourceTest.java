package org.connect;

import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;
import io.restassured.response.ResponseBody;
import io.restassured.response.ValidatableResponse;
import org.apache.commons.codec.binary.Base64;
import org.connect.model.skin.Skin;
import org.connect.service.SkinService;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.hamcrest.Matcher;
import org.jose4j.json.internal.json_simple.JSONObject;
import org.jose4j.json.internal.json_simple.parser.JSONParser;
import org.jose4j.json.internal.json_simple.parser.ParseException;
import org.junit.jupiter.api.*;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.ws.rs.core.MediaType;
import static org.hamcrest.Matchers.*;


import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.*;


@QuarkusTest
@TestHTTPEndpoint(SkinService.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class SkinResourceTest {


    @ConfigProperty(name = "keycloak.url")
    String keycloakURL;
    @ConfigProperty(name = "quarkus.oidc.credentials.secret")
    String credential;
    String userId;
    String accessToken;
    Skin s;

    @Inject
    EntityManager em;

    @Transactional
    void insert() {
        s = new Skin();
        s.setTitle("Coden");
        em.persist(s);
    }

    @BeforeAll
    void setup() throws ParseException {
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

        // decode JWT
        String[] split_string = accessToken.split("\\.");
        String base64EncodedBody = split_string[1];

        Base64 base64Url = new Base64(true);
        String jwtBody = new String(base64Url.decode(base64EncodedBody));

        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(jwtBody);
        userId = json.get("sub").toString();
        insert();
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
        given()
                .auth().preemptive().oauth2(accessToken)
                .when().get("/findAll")
                .then()
                .body("$",hasSize(greaterThan(0)));

    }

    @Test
    public void testFind() {
        Response r = given()
                .auth().preemptive().oauth2(accessToken)
                .when().get("/find/" + s.getId())
                .then()
                .extract().response();

        Assertions.assertEquals(200,r.statusCode());
        Assertions.assertEquals("Coden",r.jsonPath().getString("title"));
    }

}