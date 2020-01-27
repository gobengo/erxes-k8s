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

db.getSiblingDB('erxes_integrations').createUser(
  {
    user: 'erxes-integrations',
    pwd: 'erxes-integrations',
    roles: [{
      db: 'erxes_integrations',
      role: 'readWrite'
    }]
  },
  {
    w: "majority" ,
    wtimeout: 60 * 1000
  }
);

db.getSiblingDB('erxes_engages').createUser(
  {
    user: 'erxes-engages',
    pwd: 'erxes-engages',
    roles: [{
      db: 'erxes_engages',
      role: 'readWrite'
    }]
  },
  {
    w: "majority" ,
    wtimeout: 60 * 1000
  }
);
