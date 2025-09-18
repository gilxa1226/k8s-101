'use client'

import React, { useEffect, useState } from 'react';

interface Link {
  id: number;
  linkId: number;
  link: string;
  description: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/link";

const LinksPage: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [newLink, setNewLink] = useState({ link: '', description: '' });
  const [editId, setEditId] = useState<number | null>(null);
  const [editLink, setEditLink] = useState({ linkId: -1, link: '', description: '' });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setLinks(data);
  };

  const addLink = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLink),
    });
    setNewLink({ link: '', description: '' });
    fetchLinks();
  };

  const startEdit = (link: Link) => {
    setEditId(link.id);
    setEditLink({linkId: link.linkId, link: link.link, description: link.description });
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId === null) return;
    await fetch(`${API_URL}/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editLink),
    });
    setEditId(null);
    fetchLinks();
  };

  const deleteLink = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchLinks();
  };

  return (
    <div>
      <h1>Links</h1>
      <form onSubmit={addLink}>
        <input
          type="text"
          placeholder="URL"
          value={newLink.link}
          onChange={e => setNewLink({ ...newLink, link: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newLink.description}
          onChange={e => setNewLink({ ...newLink, description: e.target.value })}
          required
        />
        <button type="submit">Add Link</button>
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1em' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>URL</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>Description</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map(link => (
            <tr key={link.id}>
              {editId === link.id ? (
                <td colSpan={3} style={{ padding: '8px' }}>
                  <form onSubmit={saveEdit} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={editLink.link}
                      onChange={e => setEditLink({ ...editLink, link: e.target.value })}
                      required
                      style={{ flex: 1 }}
                    />
                    <input
                      type="text"
                      value={editLink.description}
                      onChange={e => setEditLink({ ...editLink, description: e.target.value })}
                      required
                      style={{ flex: 1 }}
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditId(null)}>Cancel</button>
                  </form>
                </td>
              ) : (
                <>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{link.link}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{link.description}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    <button onClick={() => startEdit(link)} style={{ marginRight: '8px', background: 'none', border: 'none', cursor: 'pointer' }} title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm-6 6v-3a2 2 0 012-2h3" />
                      </svg>
                    </button>
                    <button onClick={() => deleteLink(link.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }} title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h10" />
                      </svg>
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinksPage;
