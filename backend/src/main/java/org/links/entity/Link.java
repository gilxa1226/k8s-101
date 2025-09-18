package org.links.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;


@Entity
public class Link extends PanacheEntity {
    
    public long id;
    public long linkId;
    public String link;
    public String description;

    @Override
    public String toString() {
        return "Link{" + 
            "id=" + id + 
            "linkId=" + linkId +
            "link='" + link + '\'' +
            "description='" + description + '\''+ 
            "}";
    }

}
