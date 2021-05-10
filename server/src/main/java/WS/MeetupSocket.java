package WS;
import io.quarkus.security.identity.SecurityIdentity;
import org.connect.model.chat.Message;
import org.connect.model.meetup.Meeting;
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

@ServerEndpoint("/meetup/{id}")
@ApplicationScoped
public class MeetupSocket {

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

    @OnClose
    public void onClose(Session session, @PathParam("id") String id) {
        sessions.remove(id);
        System.out.println(id + " left");
    }
/*
    @OnError
    public void onError(Session session, @PathParam("roomid") String roomid, Throwable throwable, @PathParam("username") String username) {
        sessions.remove(username);
        broadcast("User " + username + " left on error: " + throwable);
    }

     */

    @OnMessage
    public void onMessage(long message, @PathParam("id") String id) {
        broadcast(message, id);
    }

    private void broadcast(long message, String id) {
            TypedQuery<Object[]> query = em.createQuery("select m.creator.id, mu.user_id from Meeting m join m.mu_list mu where m.id = :id ", Object[].class);
            query.setParameter("id", message);
            List<Object[]> list = query.getResultList();
            sessions.values().forEach(s -> {
                for(Object[] o : list) {
                    if(o[0].equals(users.get(s)) || o[1].equals(users.get(s))) {
                        System.out.println(message);
                        s.getAsyncRemote().sendObject(message, result -> {
                            if (result.getException() != null) {
                                System.out.println("Unable to send message: " + result.getException());
                            }
                        });
                    }
                }

        });

    }
}