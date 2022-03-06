package org.connect.model.image;

import org.connect.model.user.User;

import javax.persistence.*;

@Entity
@NamedQueries({
        @NamedQuery(name = Image.FINDWITHID, query = "SELECT i FROM Image i where i.userId = :user_id"),
        @NamedQuery(name=Image.GETDEFAULTPFP,query = "select i from Image i where i.userId='ADMIN'")
})
public class Image {

    public static final String FINDWITHID = "image.findwithid";
    public static final String GETDEFAULTPFP = "image.getdefaultpfp";

    @Id
    @GeneratedValue
    private int Id;

    @Lob
    byte[] img;
    private String userId;

    public Image(String userId, byte[] img) {
        setImg(img);
        setUserId(userId);
    }

    public Image() {

    }

    public byte[] getImg() {
        return img;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
