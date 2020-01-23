db.getSiblingDB('erxes').createUser(
  {
    user: 'erxes-api',
    pwd: 'erxes-api',
    roles: [{
      db: 'erxes',
      role: 'readWrite'
    }]
  },
  {
    w: "majority" ,
    wtimeout: 60 * 1000
  }
);
