const { Pool } = require('pg');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsFromPlaylist(playlistId) {
    const query = {
      text: `SELECT songs.* FROM playlistsongs
      RIGHT JOIN songs ON songs.id = song_id WHERE playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = SongsService;
