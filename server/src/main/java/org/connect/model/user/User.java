package org.connect.model.skin;

import io.quarkus.security.identity.SecurityIdentity;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.security.Principal;

@Entity
public class User implements Serializable {

    @Id
    private String id;
    private String userName;

    //Userinfo (bigggggg)
    private String attributes;

    public User() {
    }

    public User(SecurityIdentity identity) {
        this.userName = identity.getPrincipal().getName();
        this.attributes = identity.getPrincipal().toString();
        System.out.println(attributes);
    }

    public User(JsonWebToken token) {
        /*
        if(token.claim("sub").isPresent()){
            this.id =
        }
        */

        this.id = token.claim("sub").get().toString();
        this.userName = token.getName();
        this.attributes = token.getRawToken();
        System.out.println(this.id);
    }

    public String getUserName() {
        return userName;
    }

    public String getAttributes() {
        return attributes;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setAttributes(String attributes) {
        this.attributes = attributes;
    }
}