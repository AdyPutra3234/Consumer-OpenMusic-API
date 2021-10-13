class Listener {
  constructor(songsService, mailSender) {
    this._songsService = songsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const content = {
        songs: await this._songsService.getSongsFromPlaylist(playlistId),
      };

      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(content));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
