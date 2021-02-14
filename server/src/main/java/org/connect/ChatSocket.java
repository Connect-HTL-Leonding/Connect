package org.connect;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.enterprise.context.ApplicationScoped;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import javax.websocket.Session;

@ServerEndpoint("/chat/{roomid}")
@ApplicationScoped
public class ChatSocket {

    Map<String, Session> sessions = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("roomid") String roomid) {
        sessions.put(roomid, session);
    }

    @OnClose
    public void onClose(Session session, @PathParam("roomid") String roomid) {
        sessions.remove(roomid);
        broadcast("User " + roomid + " left");
    }

    @OnError
    public void onError(Session session, @PathParam("roomid") String roomid, Throwable throwable) {
        sessions.remove(roomid);
        broadcast("User " + roomid + " left on error: " + throwable);
    }

    @OnMessage
    public void onMessage(String message, @PathParam("roomid") String roomid) {
        broadcast(">> " + roomid + ": " + message);
    }

    private void broadcast(String message) {
        sessions.values().forEach(s -> {
            s.getAsyncRemote().sendObject(message, result ->  {
                if (result.getException() != null) {
                    System.out.println("Unable to send message: " + result.getException());
                }
            });
        });
    }

}