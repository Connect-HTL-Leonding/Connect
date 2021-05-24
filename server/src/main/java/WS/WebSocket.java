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

@ServerEndpoint("/websocket/{id}")
@ApplicationScoped
public class WebSocket {

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
    public void onMessage(String message, @PathParam("id") String id) {
        String[] s = message.split(":");
        switch(s[0]) {
            case("meetupAccepted"):broadcastMeetup(s[1], id);;
            break;
            case("chatMessage"):broadcastMessage(s[1], "chatMessage:");
            break;
            case("positionUpdate"):broadcastPosition(id);
            break;
            case("newMeetup"):broadcastMessage(s[1], "newMeetup:");
            break;
            case("acceptMeetup"):broadcastMessage(s[1], "acceptMeetup:");;
            break;
            case("declineMeetup"):broadcastMessage(s[1], "declineMeetup:");;
            break;

        }

    }

    private void broadcastPosition(String id) {
        TypedQuery tq = em.createNamedQuery(Friendship.USERSOFFRIENDSHIPS, Object[].class);
        tq.setParameter("user", em.find(User.class, id));
        List<Object[]> list = tq.getResultList();
        list.forEach(l -> {
            sessions.values().forEach(s -> {
                if(users.get(s).equals(l[0]) || users.get(s).equals(l[1])) {
                    String message = "positionUpdate:" + id;
                    s.getAsyncRemote().sendObject(message, result -> {
                        if (result.getException() != null) {
                            System.out.println("Unable to send message: " + result.getException());
                        }
                    });
                }
            });
        });

    }

    private void broadcastMessage(String id, String type) {
        TypedQuery<String> query = em.createQuery("select rm.id from Room m join m.users rm where m.id = :id", String.class);
        query.setParameter("id", Long.valueOf(id));
        List<String> list = query.getResultList();

        sessions.values().forEach(s -> {
            for(String u : list) {
                if (u.equals(users.get(s))) {
                    String message = type + id;
                    s.getAsyncRemote().sendObject(message, result -> {
                        if (result.getException() != null) {
                            System.out.println("Unable to send message: " + result.getException());
                        }
                    });
                }
            }
        });
    }

    private void broadcastMeetup(String message, String id) {
        TypedQuery<Object[]> query = em.createQuery("select m.creator.id, mu.user_id from Meeting m join m.mu_list mu where m.id = :id ", Object[].class);
        query.setParameter("id", Long.valueOf(message));
        List<Object[]> list = query.getResultList();
        sessions.values().forEach(s -> {
            for(Object[] o : list) {
                if(o[0].equals(users.get(s)) || o[1].equals(users.get(s))) {
                    String msg = "meetupAccepted:" + message;
                    System.out.println(msg);
                    s.getAsyncRemote().sendObject(msg, result -> {
                        if (result.getException() != null) {
                            System.out.println("Unable to send message: " + result.getException());
                        }
                    });
                }
            }

        });

    }
}