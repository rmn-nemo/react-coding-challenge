export const sessionStorage = {

  save: function (sessionData) {
    localStorage.setItem('session', JSON.stringify(sessionData));
  },

  read: function () {
    const raw = localStorage.getItem('session');
    return raw ? JSON.parse(raw) : raw;
  },

  update: function (data) {
    const session = this.read() || {};
    this.save({ ...session, ...data });
  },

  clear: function () {
    localStorage.removeItem('session');
  },

  sessionExists: function () {
    return !!this.read();
  }
};
