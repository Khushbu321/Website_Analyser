exports.up = pgm => {
  pgm.createTable("url", {
    id: "id",
    name: { type: "text", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
  pgm.createTable("urlData", {
    id: "id",
    urlId: {
      type: "integer",
      notNull: true
    },
    data: { type: "text", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
  pgm.createIndex("urlData", "urlId");
};
