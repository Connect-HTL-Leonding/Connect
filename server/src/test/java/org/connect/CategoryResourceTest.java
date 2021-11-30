package org.connect;

import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.path.json.JsonPath;
import io.restassured.response.ResponseBody;
import org.apache.commons.codec.binary.Base64;
import org.connect.model.skin.Category;
import org.connect.service.ChatService;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jose4j.json.internal.json_simple.JSONObject;
import org.jose4j.json.internal.json_simple.parser.JSONParser;
import org.jose4j.json.internal.json_simple.parser.ParseException;
import org.junit.jupiter.api.BeforeAll;

import javax.ws.rs.core.MediaType;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertTrue;

@QuarkusTest
@TestHTTPEndpoint(Category.class)
public class CategoryResourceTest {
    @ConfigProperty(name = "keycloak.url")
    String keycloakURL;
    @ConfigProperty(name = "quarkus.oidc.credentials.secret")
    String credential;

    String accessToken;
    String userId;

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
    }
}
