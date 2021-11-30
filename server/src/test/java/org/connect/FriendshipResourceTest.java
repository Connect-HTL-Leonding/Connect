package org.connect;

import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.path.json.JsonPath;
import io.restassured.response.ResponseBody;
import org.apache.commons.codec.binary.Base64;
import org.connect.model.user.Friendship;
import org.connect.model.user.User;
import org.connect.service.FriendshipService;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jose4j.json.internal.json_simple.JSONObject;
import org.jose4j.json.internal.json_simple.parser.JSONParser;
import org.jose4j.json.internal.json_simple.parser.ParseException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.ws.rs.core.MediaType;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.hamcrest.Matchers.*;

@QuarkusTest
@TestHTTPEndpoint(FriendshipService.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class FriendshipResourceTest {

    @ConfigProperty(name = "keycloak.url")
    String keycloakURL;
    @ConfigProperty(name = "quarkus.oidc.credentials.secret")
    String credential;

    String accessToken;
    String userId;
    Friendship f;
    User u;

    @Inject
    EntityManager em;

    @Transactional
    void insert() {
        f = new Friendship();
        u = em.find(User.class,userId);
        User u2 = new User();
        u2.setId("9999");
        f.setUser2(u2);
        f.setUser1(u);
        em.persist(u2);
        em.persist(f);
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
                .get("findAll")
                .then()
                .body("$",hasSize(greaterThan(0)));
    }

    @Test
    public void findFriendshipsOfUser() {
        given()
                .auth().preemptive().oauth2(accessToken)
                .when()
                .get("findFriendshipsOfUser/" + u.getId())
                .then()
                .body("$",hasSize(greaterThan(0)));
    }
}
