export function getTags(state) {
    const tags: string[] = [];
    state.notes.forEach(note => {
      note.tags && note.tags.forEach(tag => {
        if (tags.indexOf(tag) === -1) {
          tags.push(tag);
        }
      });
    });
    return tags;
  }
  