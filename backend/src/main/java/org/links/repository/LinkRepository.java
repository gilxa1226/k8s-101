package org.links.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.links.entity.Link;

@ApplicationScoped
public class LinkRepository implements PanacheRepository<Link> {
    // PanacheRepository provides basic CRUD methods
}
