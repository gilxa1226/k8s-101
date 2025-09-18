package org.links.resource;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.links.entity.Link;
import org.links.repository.LinkRepository;

import java.util.List;

@Path("/link")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LinkResource {


    private final LinkRepository linkRepository;

    @Inject
    public LinkResource(LinkRepository linkRepository) {
        this.linkRepository = linkRepository;
    }

    @POST
    @Transactional
    public Response createLink(Link link) {
        link.persist();
        return Response.status(Response.Status.CREATED).entity(link).build();
    }

    @GET
    @Path("/{id}")
    public Link getLink(@PathParam("id") Long id) {
        return linkRepository.findById(id);
    }

    @GET
    public List<Link> getAllLinks() {
        return linkRepository.listAll();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void deleteLink(@PathParam("id") Long id) {
        Link delLink = linkRepository.findById(id);
        delLink.delete();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public void updateLink(@PathParam("id") Long id, Link link) {   
        Link updLink = linkRepository.findById(id);
        updLink.link = link.link;
        updLink.description = link.description;
        updLink.persist();
    }
}
