package org.connect;
import io.quarkus.security.identity.SecurityIdentity;
import org.connect.model.chat.Message;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import javax.websocket.Session;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@ServerEndpoint("/chat/{roomid}/{username}")
@ApplicationScoped
public class ChatSocket {

    @Inject
    JsonWebToken jwt;

    @Inject
    SecurityIdentity identity;

    Map<String, Session> sessions = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("roomid") String roomid, @PathParam("username") String username) {
        sessions.put(username, session);
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
    public void onMessage(String message, @PathParam("roomid") String roomid, @PathParam("username") String username) {
        broadcast(message, roomid);
    }

    private void broadcast(String message, String roomid) {
        System.out.println(sessions.values());
        sessions.values().forEach(s -> {
            s.getAsyncRemote().sendObject(message, result ->  {
                if (result.getException() != null) {
                    System.out.println("Unable to send message: " + result.getException());
                }
            });
        });
    }

}