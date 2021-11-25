package org.connect;

import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.path.json.JsonPath;
import io.restassured.response.ResponseBody;
import org.connect.model.user.Friendship;
import org.connect.model.user.User;
import org.connect.service.FriendshipService;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.ws.rs.core.MediaType;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.hamcrest.Matchers.*;

@QuarkusTest
@TestHTTPEndpoint(FriendshipService.class)
public class FriendshipResourceTest {

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
        // User got created in the import.sql
        given()
                .auth().preemptive().oauth2(accessToken)
                .when()
                .get("findFriendshipsOfUser/0d3dcf03-9d38-4c12-af82-a9467c786db5")
                .then()
                .body("$",hasSize(greaterThan(0)));
    }
}
