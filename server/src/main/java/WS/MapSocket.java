package WS;
import io.quarkus.security.identity.SecurityIdentity;
import org.connect.model.chat.Message;
import org.connect.model.user.Friendship;
import org.connect.model.user.User;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import javax.websocket.Session;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@ServerEndpoint("/map/{id}")
@ApplicationScoped
public class MapSocket {

    @Inject
    JsonWebToken jwt;

    @Inject
    SecurityIdentity identity;

    @Inject
    EntityManager em;

    Map<String, Session> sessions = new ConcurrentHashMap<>();
    Map<Session, String> users = new ConcurrentHashMap<>();
    @OnOpen
    public void onOpen(Session session, @PathParam("id") String id) {
        sessions.put(id, session);
        users.put(session, id);

        sessions.values().forEach(s -> {
            System.out.println("id: " + users.get(s));
            });
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
    public void onMessage(String message, @PathParam("id") String id) {
        broadcast(message, id);
    }

    private void broadcast(String message, String id) {
        TypedQuery tq = em.createNamedQuery(Friendship.USERSOFFRIENDSHIPS, Object[].class);
        tq.setParameter("user", em.find(User.class, id));
        List<Object[]> list = tq.getResultList();
        list.forEach(l -> {
            sessions.values().forEach(s -> {
                if(users.get(s).equals(l[0]) || users.get(s).equals(l[1])) {
                    s.getAsyncRemote().sendObject(message, result -> {
                        if (result.getException() != null) {
                            System.out.println("Unable to send message: " + result.getException());
                        }
                    });
                }
            });
        });

    }
}