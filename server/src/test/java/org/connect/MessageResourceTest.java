package org.connect;

import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;
import io.restassured.response.ResponseBody;
import org.apache.commons.codec.binary.Base64;
import org.connect.model.chat.Message;
import org.connect.model.chat.Room;
import org.connect.model.user.User;
import org.connect.service.MessageService;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jose4j.json.internal.json_simple.JSONObject;
import org.jose4j.json.internal.json_simple.parser.JSONParser;
import org.jose4j.json.internal.json_simple.parser.ParseException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.ws.rs.core.MediaType;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.with;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertTrue;

@QuarkusTest
@TestHTTPEndpoint(MessageService.class)
public class MessageResourceTest {
    @ConfigProperty(name = "keycloak.url")
    String keycloakURL;
    @ConfigProperty(name = "quarkus.oidc.credentials.secret")
    String credential;

    String accessToken;

    @Inject
    JsonWebToken jwt;

    @Inject
    EntityManager em;

    private String userId;
    private Room r;
    private Message m2;
    @Transactional
    public void insert() {
        Message m = new Message();
        m2 = new Message();
        r = new Room();
        m.setRoom(r);
        m2.setRoom(r);
        User u = em.find(User.class,userId);
        m.setUser(u);
        em.persist(m);
        em.persist(r);
        em.persist(m2);
    }

    @BeforeEach
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

        // jwt body
        String jwtBody = new String(base64Url.decode(base64EncodedBody));

        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(jwtBody);
        userId = json.get("sub").toString();
        insert();

    }

    @Test
    public void testFindAll() {
        given()
                .auth().preemptive().oauth2(accessToken)
                .when()
                .get("findAll/" + r.getId())
                .then()
                .body("$",hasSize(greaterThan(0)));
    }

   /* @Test
    @Transactional
    public void testCreate() {
        Message message = new Message();
        message.setRoom(r);
        System.out.println(r.getId());
        given()
                .auth().preemptive().oauth2(accessToken)
                .param("message", message)
                .param("id", r.getId())
                .when()
                .post("create/" + r.getId())
                        .then().statusCode(200);
        // size 2 because of the one message created in the insert method + the one in the post
        given()
                .auth().preemptive().oauth2(accessToken)
                .when()
                .get("findAll/" + r.getId())
                .then()
                .body("$",hasSize(2));
    } */


    @Test
    public void findLatestMessage() {
         Response res = given()
                .auth().preemptive().oauth2(accessToken)
                .when()
                .get("findLatestMessage/" + r.getId())
                .then()
                .extract().response();
         Assertions.assertEquals("" +m2.getId(),res.jsonPath().getString("id"));
    }
}
