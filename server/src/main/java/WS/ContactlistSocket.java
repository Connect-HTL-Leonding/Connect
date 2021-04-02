package WS;

import io.quarkus.security.identity.SecurityIdentity;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.lang.reflect.Array;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/contactListSocket/{userid}")
@ApplicationScoped
public class ContactlistSocket {
    @Inject
    JsonWebToken jwt;

    @Inject
    SecurityIdentity identity;

    Map<String, Session> sessions = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("userid") String userid) {
        sessions.put(userid, session);
    }

    /*
    @OnClose
    public void onClose(Session session, @PathParam("roomid") String roomid, @PathParam("username") String username) {
        sessions.remove(username);
        broadcast("User " + username + " left");
    }

    @OnError
    public void onError(Session session, @PathParam("roomid") String roomid, Throwable throwable, @PathParam("username") String username) {
        sessions.remove(username);
        broadcast("User " + username + " left on error: " + throwable);
    }

     */

    @OnMessage
    public void onMessage(String message) {
        broadcast("reload");
    }

    private void broadcast(String message) {
        sessions.values().forEach(s -> {
            s.getAsyncRemote().sendObject(message, result -> {
                if (result.getException() != null) {
                    System.out.println("Unable to send message: " + result.getException());
                }
            });

        });
    }

}
