package org.connect.model.image;

import org.connect.model.user.User;

import javax.persistence.*;

@Entity
@NamedQueries({
        @NamedQuery(name = Image.FINDWITHID, query = "SELECT i FROM Image i where i.userId = :user_id"),
        @NamedQuery(name=Image.GETDEFAULTPFP,query = "select i from Image i where i.Id=1000")
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

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Image image = (Image) o;

        return Id == image.Id;
    }

    @Override
    public int hashCode() {
        return Id;
    }
}
