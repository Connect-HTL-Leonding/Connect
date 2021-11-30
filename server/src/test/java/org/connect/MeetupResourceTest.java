package org.connect;

import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;
import io.restassured.response.ResponseBody;
import org.connect.model.meetup.Meeting;
import org.connect.model.meetup.Meeting_User;
import org.connect.model.user.User;
import org.connect.service.FriendshipService;
import org.connect.service.MeetUpService;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jose4j.json.internal.json_simple.JSONObject;
import org.jose4j.json.internal.json_simple.parser.JSONParser;
import org.jose4j.json.internal.json_simple.parser.ParseException;
import org.junit.jupiter.api.*;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.ws.rs.core.MediaType;

import org.apache.commons.codec.binary.Base64;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertTrue;

@QuarkusTest
@TestHTTPEndpoint(MeetUpService.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class MeetupResourceTest {
    @ConfigProperty(name = "keycloak.url")
    String keycloakURL;
    @ConfigProperty(name = "quarkus.oidc.credentials.secret")
    String credential;

    String accessToken;

    @Inject
    EntityManager em;

    private Meeting m;
    private Meeting_User mu;
    private Object userId;



    @Transactional
    public void insert() {
        m = new Meeting();
        mu = new Meeting_User();
        mu.setUser_id(userId.toString());
        mu.setMeeting(m);
        em.persist(m);
        em.persist(mu);
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
        userId = json.get("sub");
        insert();
    }

    @Test
    public void testMeetupsFromMe() {
        given()
                .auth().preemptive().oauth2(accessToken)
                .when()
                .get("getMeetupsFromMe")
                .then()
                .statusCode(200);
    }


    @Test
    @Transactional
    public void testFind() {
        Response r = given()
                .auth().preemptive().oauth2(accessToken)
                .when()
                .get("getMeetupById/" + m.getId())
                .then()
                .extract().response();

        Assertions.assertEquals("" +m.getId(),r.jsonPath().getString("id"));

    }

    @Test
    public void testSetAccepted() {

        System.out.println(m.getId());
        System.out.println(mu.getId());
        given().
            auth().preemptive().oauth2(accessToken)
                .body(m.getId())
                .when()
                .post("setStatusA")
                .then()
                .statusCode(204);

        Response r = given()
                .auth().preemptive().oauth2(accessToken)
                .when()
                .get("getMeetupUser/" + m.getId())
                .then()
                .extract().response();

        Assertions.assertEquals("accepted",r.jsonPath().getString("status[0]"));

    }

    @Test
    public void testSetDeclined() {
        given().
                auth().preemptive().oauth2(accessToken)
                .body(m.getId())
                .when()
                .post("setStatusD")
                .then()
                .statusCode(204);

        Response r = given()
                .auth().preemptive().oauth2(accessToken)
                .when()
                .get("getMeetupUser/" + m.getId())
                .then()
                .extract().response();

        Assertions.assertEquals("declined",r.jsonPath().getString("status[0]"));

    }
}
