package org.connect.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import java.io.Serializable;

@Entity
@NamedQueries({
        @NamedQuery(name = Person.FINDALL, query = "SELECT p FROM Person p"),
})
public class Person implements Serializable {

    public static final String FINDALL = "User.findAll";

    //Attribute
    @Id
    @GeneratedValue
    private long id;
    private String userName;
    private String firstname;
    private String lastname;

    public Person() {
    }

    public Person(String userName, String firstname, String lastname) {
        this.userName = userName;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
}